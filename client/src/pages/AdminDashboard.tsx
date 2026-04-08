import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Download, Users, DollarSign, TrendingUp } from "lucide-react";
import { useState } from "react";

/**
 * Admin Dashboard Page
 * Shows metrics: subscribers, revenue, conversion rates, and email export
 */
export default function AdminDashboard() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const [isExporting, setIsExporting] = useState(false);

  // Redirect non-admin users
  if (user && user.role !== "admin") {
    navigate("/");
    return null;
  }

  // Get dashboard metrics from backend
  const metricsQuery = trpc.admin.getDashboardMetrics.useQuery();
  const exportMutation = trpc.admin.exportSubscribers.useMutation();

  const metrics = metricsQuery.data;

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const result = await exportMutation.mutateAsync();
      
      // Create CSV content
      const csv = (result.subscribers as any[])
        .map((sub: any) => `"${sub.email}","${sub.status}","${new Date(sub.createdAt).toLocaleDateString()}"`)
        .join("\n");
      
      const header = '"Email","Status","Joined Date"\n';
      const fullCsv = header + csv;

      // Download CSV file
      const blob = new Blob([fullCsv], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `subscribers-${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Funnel Performance & Metrics</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {metricsQuery.isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-400">Loading metrics...</p>
            </div>
          ) : (
            <>
              {/* Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {/* Subscribers Card */}
                <Card className="bg-gray-900 border-gray-800 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Total Subscribers</p>
                      <p className="text-3xl font-bold text-cyan-400">
                        {metrics?.subscriberCount || 0}
                      </p>
                    </div>
                    <Users className="w-10 h-10 text-cyan-400 opacity-50" />
                  </div>
                </Card>

                {/* Revenue Card */}
                <Card className="bg-gray-900 border-gray-800 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Total Revenue</p>
                      <p className="text-3xl font-bold text-green-400">
                        ₱{((metrics?.totalRevenue || 0) / 100).toLocaleString()}
                      </p>
                    </div>
                    <DollarSign className="w-10 h-10 text-green-400 opacity-50" />
                  </div>
                </Card>

                {/* Conversion Rate Card */}
                <Card className="bg-gray-900 border-gray-800 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Conversion Rate</p>
                      <p className="text-3xl font-bold text-yellow-400">
                        {metrics?.conversionRate.toFixed(1) || 0}%
                      </p>
                    </div>
                    <TrendingUp className="w-10 h-10 text-yellow-400 opacity-50" />
                  </div>
                </Card>

                {/* Orders Card */}
                <Card className="bg-gray-900 border-gray-800 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Total Orders</p>
                      <p className="text-3xl font-bold text-red-400">
                        {metrics?.totalOrders || 0}
                      </p>
                    </div>
                    <TrendingUp className="w-10 h-10 text-red-400 opacity-50" />
                  </div>
                </Card>
              </div>

              {/* Revenue by Product */}
              {metrics?.revenueByProduct && Object.keys(metrics.revenueByProduct).length > 0 && (
                <Card className="bg-gray-900 border-gray-800 p-8 mb-12">
                  <h2 className="text-2xl font-bold mb-6">Revenue by Product</h2>
                  <div className="space-y-4">
                    {Object.entries(metrics.revenueByProduct as Record<string, { count: number; total: number }>).map(([product, data]) => (
                      <div key={product} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <div>
                          <p className="font-semibold">{product}</p>
                          <p className="text-sm text-gray-400">{data.count} sales</p>
                        </div>
                        <p className="text-xl font-bold text-green-400">
                          ₱{(data.total / 100).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Export Section */}
              <Card className="bg-gray-900 border-gray-800 p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Email List Export</h2>
                    <p className="text-gray-400">
                      Download all subscriber emails as CSV for email marketing campaigns
                    </p>
                  </div>
                  <Button
                    onClick={handleExport}
                    disabled={isExporting || exportMutation.isPending}
                    className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg flex items-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    {isExporting ? "Exporting..." : "Export CSV"}
                  </Button>
                </div>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
