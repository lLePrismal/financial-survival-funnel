/**
 * Products Configuration
 * Defines all products available for purchase with their Stripe details
 */

export interface Product {
  id: string;
  name: string;
  description: string;
  priceInCents: number;
  currency: string;
  stripePriceId: string;
  features: string[];
  targetAudience: string;
  color: string; // Tailwind color for UI
}

export const PRODUCTS: Record<string, Product> = {
  mini_crisis_blueprint: {
    id: "mini_crisis_blueprint",
    name: "Mini Crisis Blueprint",
    description: "15-page comprehensive guide to survive financial crises",
    priceInCents: 14900, // ₱149 PHP
    currency: "PHP",
    stripePriceId: process.env.STRIPE_PRICE_MINI_CRISIS || "",
    features: [
      "15-page survival guide",
      "3-Level Crisis Budget Framework",
      "30-day survival cash plan",
      "Expense cutting checklist",
      "Email support for 30 days",
    ],
    targetAudience: "Call center agents, OFWs, breadwinners",
    color: "red",
  },

  twenty_four_hour_reset: {
    id: "twenty_four_hour_reset",
    name: "24-Hour Reset",
    description: "Emergency action plan for immediate income crisis",
    priceInCents: 19900, // ₱199 PHP
    currency: "PHP",
    stripePriceId: process.env.STRIPE_PRICE_24HR_RESET || "",
    features: [
      "24-hour action checklist",
      "Income recovery strategies",
      "Job search optimization",
      "Negotiation scripts",
      "Email support for 60 days",
      "Access to private community",
    ],
    targetAudience: "Side hustlers, VAs, freelancers",
    color: "yellow",
  },

  twenty_four_hour_reset_audio: {
    id: "twenty_four_hour_reset_audio",
    name: "24-Hour Reset Audio Version",
    description: "Audio version for night shift workers and busy professionals",
    priceInCents: 9900, // ₱99 PHP
    currency: "PHP",
    stripePriceId: process.env.STRIPE_PRICE_24HR_RESET_AUDIO || "",
    features: [
      "MP3 audio files (4 hours total)",
      "Playable while commuting or working",
      "Transcript included",
      "Lifetime access",
    ],
    targetAudience: "Night shift workers, busy professionals",
    color: "cyan",
  },

  rebuild_mindset: {
    id: "rebuild_mindset",
    name: "Rebuild Mindset",
    description: "Complete system for financial recovery and long-term security",
    priceInCents: 49900, // ₱499 PHP
    currency: "PHP",
    stripePriceId: process.env.STRIPE_PRICE_REBUILD_MINDSET || "",
    features: [
      "Complete 60-page system",
      "Mindset transformation modules",
      "Income diversification strategies",
      "Emergency fund building plan",
      "6 months of email support",
      "Monthly group coaching calls",
      "Private community access",
      "Lifetime updates",
    ],
    targetAudience: "Small business owners, serious entrepreneurs",
    color: "blue",
  },
};

/**
 * Get a product by ID
 */
export function getProduct(productId: string): Product | undefined {
  return PRODUCTS[productId];
}

/**
 * Get all products
 */
export function getAllProducts(): Product[] {
  return Object.values(PRODUCTS);
}

/**
 * Validate that all Stripe price IDs are configured
 */
export function validateStripeConfiguration(): { valid: boolean; missing: string[] } {
  const missing: string[] = [];

  Object.entries(PRODUCTS).forEach(([key, product]) => {
    if (!product.stripePriceId) {
      missing.push(`${key}: stripePriceId is not configured`);
    }
  });

  return {
    valid: missing.length === 0,
    missing,
  };
}
