import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Copy, TrendingUp, DollarSign, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

/**
 * Affiliate Program Page
 * Allows users to join affiliate program and track referrals/earnings
 */
export default function AffiliateProgram() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const [copied, setCopied] = useState(false);

  // Get affiliate data
  const affiliateQuery = trpc.affiliate.getAffiliateData.useQuery(undefined, {
    enabled: !!user,
  });
  const joinMutation = trpc.affiliate.joinProgram.useMutation();

  const affiliate = affiliateQuery.data;

  const handleJoinProgram = async () => {
    try {
      await joinMutation.mutateAsync();
      affiliateQuery.refetch();
      toast.success("Welcome to the affiliate program!");
    } catch (error) {
      toast.error("Failed to join program");
    }
  };

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    toast.success("Referral link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl mb-4">Please log in to access the affiliate program</p>
          <Button onClick={() => navigate("/")} className="bg-cyan-500 hover:bg-cyan-600">
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Affiliate Program</h1>
          <p className="text-gray-400">Earn 20% commission on every referral</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {!affiliate ? (
            // Join Program CTA
            <Card className="bg-gray-900 border-gray-800 p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Join Our Affiliate Program</h2>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Start earning 20% commission on every sale you refer. No limits, no caps. Get paid weekly.
              </p>
              <Button
                onClick={handleJoinProgram}
                disabled={joinMutation.isPending}
                className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 text-lg"
              >
                {joinMutation.isPending ? "Joining..." : "Join Affiliate Program"}
              </Button>
            </Card>
          ) : (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {/* Total Earnings */}
                <Card className="bg-gray-900 border-gray-800 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Total Earnings</p>
                      <p className="text-3xl font-bold text-green-400">
                        ₱{(affiliate.totalCommission / 100).toLocaleString()}
                      </p>
                    </div>
                    <DollarSign className="w-10 h-10 text-green-400 opacity-50" />
                  </div>
                </Card>

                {/* Total Referrals */}
                <Card className="bg-gray-900 border-gray-800 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Total Referrals</p>
                      <p className="text-3xl font-bold text-cyan-400">
                        {affiliate.totalReferrals}
                      </p>
                    </div>
                    <Users className="w-10 h-10 text-cyan-400 opacity-50" />
                  </div>
                </Card>

                {/* Commission Rate */}
                <Card className="bg-gray-900 border-gray-800 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Commission Rate</p>
                      <p className="text-3xl font-bold text-yellow-400">
                        {affiliate.commissionRate}%
                      </p>
                    </div>
                    <TrendingUp className="w-10 h-10 text-yellow-400 opacity-50" />
                  </div>
                </Card>
              </div>

              {/* Referral Link */}
              <Card className="bg-gray-900 border-gray-800 p-8 mb-12">
                <h2 className="text-2xl font-bold mb-6">Your Referral Link</h2>
                <div className="flex items-center gap-4 bg-gray-800 p-4 rounded-lg">
                  <input
                    type="text"
                    value={affiliate.referralLink}
                    readOnly
                    className="flex-1 bg-gray-700 text-white px-4 py-2 rounded border border-gray-600"
                  />
                  <Button
                    onClick={() => handleCopyLink(affiliate.referralLink)}
                    className="bg-cyan-500 hover:bg-cyan-600 flex items-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                </div>
                <p className="text-gray-400 text-sm mt-4">
                  Share this link with your audience. Every purchase made through this link earns you {affiliate.commissionRate}% commission.
                </p>
              </Card>

              {/* How It Works */}
              <Card className="bg-gray-900 border-gray-800 p-8">
                <h2 className="text-2xl font-bold mb-6">How It Works</h2>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-md bg-cyan-500 text-white font-bold">
                        1
                      </div>
                    </div>
                    <div>
                      <p className="font-bold">Share Your Link</p>
                      <p className="text-gray-400">Share your unique referral link on social media, email, or your website</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-md bg-cyan-500 text-white font-bold">
                        2
                      </div>
                    </div>
                    <div>
                      <p className="font-bold">People Click & Buy</p>
                      <p className="text-gray-400">Your audience clicks your link and purchases any of our products</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-md bg-cyan-500 text-white font-bold">
                        3
                      </div>
                    </div>
                    <div>
                      <p className="font-bold">Earn Commission</p>
                      <p className="text-gray-400">Earn {affiliate.commissionRate}% commission on every sale. Paid weekly to your account.</p>
                    </div>
                  </div>
                </div>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
