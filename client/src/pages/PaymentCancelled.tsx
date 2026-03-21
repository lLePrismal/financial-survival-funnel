import { XCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Payment Cancelled Page
 * Shown when user cancels payment at Stripe checkout
 */
export default function PaymentCancelled() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Cancelled Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-red-600 p-8 text-center">
            <XCircle className="w-16 h-16 mx-auto mb-4 text-white" />
            <h1 className="text-3xl font-bold text-white mb-2">
              Payment Cancelled
            </h1>
            <p className="text-orange-100">
              Your payment was not completed. No charges have been made.
            </p>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Message */}
            <div className="bg-orange-50 border-l-4 border-orange-500 p-6 mb-8 rounded">
              <h2 className="text-lg font-bold text-gray-900 mb-2">
                What Happened?
              </h2>
              <p className="text-gray-700">
                You cancelled the payment process at Stripe checkout. Your
                account has not been charged, and you can try again anytime.
              </p>
            </div>

            {/* Why Cancelled */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Common Reasons:
              </h3>

              <ul className="space-y-3 text-gray-700">
                <li className="flex gap-3">
                  <span className="text-orange-500">•</span>
                  <span>You accidentally clicked the back button</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-500">•</span>
                  <span>You wanted to review the offer again</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-500">•</span>
                  <span>You had a question before purchasing</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-500">•</span>
                  <span>You needed to use a different payment method</span>
                </li>
              </ul>
            </div>

            {/* CTA Section */}
            <div className="bg-blue-50 p-6 rounded-lg mb-8">
              <h3 className="font-bold text-gray-900 mb-2">Ready to Continue?</h3>
              <p className="text-gray-600 mb-4">
                The offer is still available. Click below to return to the
                product page and complete your purchase.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4">
              <Button
                onClick={() => (window.location.href = "/final-selection")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6"
              >
                Return to Products
              </Button>
              <Button
                onClick={() => (window.location.href = "/")}
                variant="outline"
                className="w-full"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back Home
              </Button>
            </div>

            {/* Support */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="font-bold text-gray-900 mb-2">Questions?</h3>
              <p className="text-gray-600 mb-2">
                If you have any questions about the products or payment, feel
                free to reach out:
              </p>
              <a
                href="mailto:support@finfunnel.manus.space"
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                support@finfunnel.manus.space
              </a>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-4 text-center text-sm text-gray-600 border-t">
            <p>No charges have been made to your account.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
