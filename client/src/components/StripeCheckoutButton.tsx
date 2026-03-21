import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface StripeCheckoutButtonProps {
  productId: string;
  productName: string;
  productPrice: number;
  className?: string;
  variant?: "default" | "outline" | "secondary" | "destructive" | "ghost";
  size?: "default" | "sm" | "lg";
}

/**
 * Stripe Checkout Button Component
 * Initiates payment flow for a product
 */
export function StripeCheckoutButton({
  productId,
  productName,
  productPrice,
  className,
  variant = "default",
  size = "default",
}: StripeCheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const createCheckout = trpc.payment.createCheckout.useMutation();

  const handleCheckout = async () => {
    try {
      setIsLoading(true);

      const result = await createCheckout.mutateAsync({
        productId,
        productName,
        productPrice,
      });

      if (result.success && result.checkoutUrl) {
        toast.success("Redirecting to payment...");
        // Open checkout in new tab
        window.open(result.checkoutUrl, "_blank");
      } else {
        toast.error(result.error || "Failed to create checkout session");
      }
    } catch (error) {
      console.error("[Checkout] Error:", error);
      toast.error("Failed to initiate payment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleCheckout}
      disabled={isLoading}
      className={className}
      variant={variant}
      size={size}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          💳 Buy Now (₱{(productPrice / 100).toLocaleString()})
        </>
      )}
    </Button>
  );
}
