import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { CheckCircle, Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Payment Success Page
 * Shown after successful Stripe payment
 */
export default function PaymentSuccess() {
  const [location] = useLocation();
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    // Extract session ID from URL parameters
    const params = new URLSearchParams(window.location.search);
    const id = params.get("session_id");
    setSessionId(id);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-center">
            <CheckCircle className="w-16 h-16 mx-auto mb-4 text-white" />
            <h1 className="text-3xl font-bold text-white mb-2">
              Payment Successful! 🎉
            </h1>
            <p className="text-green-100">
              Thank you for your purchase. Your order has been confirmed.
            </p>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Order Confirmation */}
            <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-8 rounded">
              <h2 className="text-lg font-bold text-gray-900 mb-2">
                ✓ Order Confirmed
              </h2>
              <p className="text-gray-700 mb-2">
                Your payment has been processed successfully.
              </p>
              {sessionId && (
                <p className="text-sm text-gray-600 font-mono">
                  Session ID: {sessionId}
                </p>
              )}
            </div>

            {/* Next Steps */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                What's Next?
              </h3>

              <div className="space-y-4">
                {/* Email Confirmation */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Mail className="w-6 h-6 text-blue-500 mt-1" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Check Your Email
                    </h4>
                    <p className="text-gray-600">
                      A confirmation email has been sent with your order details
                      and download instructions.
                    </p>
                  </div>
                </div>

                {/* Download Content */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Download className="w-6 h-6 text-green-500 mt-1" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Access Your Content
                    </h4>
                    <p className="text-gray-600">
                      Your purchased materials are available immediately. Click
                      the download link in your email or access them from your
                      account dashboard.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Section */}
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h3 className="font-bold text-gray-900 mb-2">Need Help?</h3>
              <p className="text-gray-600 mb-4">
                If you don't receive your confirmation email within 5 minutes,
                check your spam folder or contact our support team.
              </p>
              <a
                href="mailto:support@finfunnel.manus.space"
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                support@finfunnel.manus.space
              </a>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                onClick={() => (window.location.href = "/")}
                variant="outline"
                className="flex-1"
              >
                Back to Home
              </Button>
              <Button
                onClick={() => (window.location.href = "/orders")}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                View My Orders
              </Button>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-4 text-center text-sm text-gray-600 border-t">
            <p>
              Thank you for choosing Financial Survival Funnel. We're committed
              to your success.
            </p>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>🔒 Secure payment powered by Stripe</p>
          <p>Your transaction is encrypted and secure</p>
        </div>
      </div>
    </div>
  );
}
