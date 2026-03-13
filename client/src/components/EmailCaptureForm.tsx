import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

interface EmailCaptureFormProps {
  onSuccess?: (email: string, downloadToken: string) => void;
  onError?: (error: string) => void;
  source?: string;
}

/**
 * Email Capture Form Component
 * Collects email addresses for lead magnet delivery
 * Shows loading, success, and error states
 */
export default function EmailCaptureForm({
  onSuccess,
  onError,
  source = "free-offer",
}: EmailCaptureFormProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [downloadToken, setDownloadToken] = useState("");

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate email
    if (!email.trim()) {
      setError("Please enter your email address");
      onError?.("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      onError?.("Invalid email format");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/trpc/subscribers.capture", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.toLowerCase().trim(),
          source,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData?.message || "Failed to subscribe. Please try again."
        );
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Success!
      setSuccess(true);
      setDownloadToken(data.downloadToken);
      onSuccess?.(email, data.downloadToken);

      // Reset form after 2 seconds
      setTimeout(() => {
        setEmail("");
        setSuccess(false);
      }, 2000);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred. Please try again.";
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Success state
  if (success) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-green-400">
          <CheckCircle2 className="w-6 h-6" />
          <span className="font-bold">Email confirmed!</span>
        </div>
        <p className="text-gray-300 text-sm">
          Check your email for the download link. Your token: {downloadToken}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Email Input */}
      <div className="space-y-2">
        <label htmlFor="email" className="text-gray-300 text-sm font-medium">
          Enter your email to get instant access:
        </label>
        <Input
          id="email"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(""); // Clear error when user starts typing
          }}
          disabled={loading}
          className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-yellow-400"
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={loading || !email.trim()}
        className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Sending...</span>
          </div>
        ) : (
          <span>Get Instant Access</span>
        )}
      </Button>

      {/* Privacy Note */}
      <p className="text-gray-500 text-xs text-center">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </form>
  );
}
