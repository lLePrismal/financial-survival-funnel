import Stripe from "stripe";
import { ENV } from "./_core/env";
import { getDb } from "./db";
import { stripeCustomers, stripeOrders } from "../drizzle/schema";
import { eq } from "drizzle-orm";

const stripe = new Stripe(ENV.stripeSecretKey);

/**
 * Get or create a Stripe customer for a user
 */
export async function getOrCreateStripeCustomer(
  userId: number,
  email: string,
  name?: string
): Promise<string> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  // Check if customer already exists
  const existing = await db
    .select()
    .from(stripeCustomers)
    .where(eq(stripeCustomers.userId, userId))
    .limit(1);

  if (existing.length > 0) {
    return existing[0].stripeCustomerId;
  }

  // Create new Stripe customer
  const customer = await stripe.customers.create({
    email,
    name,
    metadata: {
      userId: userId.toString(),
    },
  });

  // Save to database
  await db.insert(stripeCustomers).values({
    userId,
    stripeCustomerId: customer.id,
  });

  return customer.id;
}

/**
 * Create a Stripe checkout session for a product
 */
export async function createCheckoutSession(
  productName: string,
  productPrice: number,
  customerEmail: string,
  userId?: number | null,
  userName?: string | null,
  origin?: string | null | undefined
): Promise<{
  sessionId: string;
  checkoutUrl: string;
}> {
  const baseUrl = origin || "https://finfunnel-7wtjyhxe.manus.space";
  const successUrl = `${baseUrl}/payment-success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${baseUrl}/payment-cancelled`;

  const sessionParams: Stripe.Checkout.SessionCreateParams = {
    payment_method_types: ["card"],
    mode: "payment",
    customer_email: customerEmail,
    client_reference_id: userId?.toString(),
    metadata: {
      userId: userId?.toString() || "guest",
      customerEmail,
      customerName: userName || "Guest",
      productName,
    },
    line_items: [
      {
        price_data: {
          currency: "php",
          product_data: {
            name: productName,
            description: `Financial Survival Funnel - ${productName}`,
          },
          unit_amount: productPrice,
        },
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    allow_promotion_codes: true,
  };

  const session = await stripe.checkout.sessions.create(sessionParams);

  if (!session.url) {
    throw new Error("Failed to create checkout session URL");
  }

  return {
    sessionId: session.id,
    checkoutUrl: session.url,
  };
}

/**
 * Save an order to the database
 */
export async function saveOrder(
  email: string,
  sessionId: string,
  productName: string,
  productPrice: number,
  userId?: number
): Promise<{
  success: boolean;
  orderId?: number;
  error?: string;
}> {
  try {
    const db = await getDb();
    if (!db) {
      throw new Error("Database not available");
    }

    await db.insert(stripeOrders).values({
      userId: userId || null,
      email,
      stripeCheckoutSessionId: sessionId,
      productName,
      productPrice,
      currency: "PHP",
      status: "pending",
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error("[Stripe] Failed to save order:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to save order",
    };
  }
}

/**
 * Update order status after payment confirmation
 */
export async function updateOrderStatus(
  sessionId: string,
  status: "completed" | "failed" | "cancelled",
  paymentIntentId?: string
): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    const db = await getDb();
    if (!db) {
      throw new Error("Database not available");
    }

    const updateData: any = {
      status,
    };

    if (status === "completed") {
      updateData.completedAt = new Date();
    }

    if (paymentIntentId) {
      updateData.stripePaymentIntentId = paymentIntentId;
    }

    await db
      .update(stripeOrders)
      .set(updateData)
      .where(eq(stripeOrders.stripeCheckoutSessionId, sessionId));

    return { success: true };
  } catch (error) {
    console.error("[Stripe] Failed to update order status:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update order",
    };
  }
}

/**
 * Get order by session ID
 */
export async function getOrderBySessionId(sessionId: string) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const result = await db
    .select()
    .from(stripeOrders)
    .where(eq(stripeOrders.stripeCheckoutSessionId, sessionId))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

/**
 * Get user's orders
 */
export async function getUserOrders(userId: number) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const result = await db
    .select()
    .from(stripeOrders)
    .where(eq(stripeOrders.userId, userId));

  return result;
}

/**
 * Retrieve a Stripe checkout session
 */
export async function getCheckoutSession(sessionId: string) {
  return stripe.checkout.sessions.retrieve(sessionId);
}

/**
 * Retrieve a Stripe payment intent
 */
export async function getPaymentIntent(paymentIntentId: string) {
  return stripe.paymentIntents.retrieve(paymentIntentId);
}

/**
 * Construct and verify a webhook event
 */
export function constructWebhookEvent(
  body: Buffer,
  signature: string
): Stripe.Event {
  return stripe.webhooks.constructEvent(
    body,
    signature,
    ENV.stripeWebhookSecret
  );
}
