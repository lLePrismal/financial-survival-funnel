import { Request, Response } from "express";
import { constructWebhookEvent, updateOrderStatus } from "./stripe-service";
import Stripe from "stripe";

/**
 * Handle Stripe webhook events
 * This endpoint processes payment confirmations and other Stripe events
 */
export async function handleStripeWebhook(req: Request, res: Response) {
  const signature = req.headers["stripe-signature"] as string;

  if (!signature) {
    console.error("[Webhook] Missing stripe-signature header");
    return res.status(400).json({ error: "Missing stripe-signature header" });
  }

  try {
    // Construct and verify the webhook event
    const event = constructWebhookEvent(req.body as Buffer, signature);

    // Handle test events for development
    if (event.id.startsWith("evt_test_")) {
      console.log("[Webhook] Test event detected, returning verification response");
      return res.json({ verified: true });
    }

    console.log(`[Webhook] Processing event: ${event.type} (${event.id})`);

    // Handle different event types
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log(`[Webhook] Checkout session completed: ${session.id}`);

        // Update order status to completed
        const paymentIntentId = session.payment_intent
          ? (typeof session.payment_intent === "string"
              ? session.payment_intent
              : session.payment_intent.id)
          : undefined;

        await updateOrderStatus(session.id, "completed", paymentIntentId);

        // TODO: Send confirmation email, trigger fulfillment, etc.
        console.log(`[Webhook] Order ${session.id} marked as completed`);
        break;
      }

      case "checkout.session.async_payment_succeeded": {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log(`[Webhook] Async payment succeeded: ${session.id}`);

        const paymentIntentId = session.payment_intent
          ? (typeof session.payment_intent === "string"
              ? session.payment_intent
              : session.payment_intent.id)
          : undefined;

        await updateOrderStatus(session.id, "completed", paymentIntentId);
        break;
      }

      case "checkout.session.async_payment_failed": {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log(`[Webhook] Async payment failed: ${session.id}`);

        await updateOrderStatus(session.id, "failed");
        // TODO: Send failure notification email
        break;
      }

      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`[Webhook] Payment intent succeeded: ${paymentIntent.id}`);
        // Additional processing if needed
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`[Webhook] Payment intent failed: ${paymentIntent.id}`);
        // Additional processing if needed
        break;
      }

      case "charge.refunded": {
        const charge = event.data.object as Stripe.Charge;
        console.log(`[Webhook] Charge refunded: ${charge.id}`);
        // TODO: Handle refund logic
        break;
      }

      default:
        console.log(`[Webhook] Unhandled event type: ${event.type}`);
    }

    // Return success response
    res.json({ received: true });
  } catch (error) {
    console.error("[Webhook] Error processing webhook:", error);

    if (error instanceof Error && error.message.includes("Webhook signature")) {
      return res.status(400).json({ error: "Invalid webhook signature" });
    }

    return res.status(500).json({ error: "Webhook processing failed" });
  }
}
