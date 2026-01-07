"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Download, TrendingUp, DollarSign, Percent, Calendar } from "lucide-react"

const revenueData = [
  { month: "Jan", revenue: 4200, fees: 840, platformRevenue: 3360 },
  { month: "Feb", revenue: 5100, fees: 1020, platformRevenue: 4080 },
  { month: "Mar", revenue: 4800, fees: 960, platformRevenue: 3840 },
  { month: "Apr", revenue: 6200, fees: 1240, platformRevenue: 4960 },
  { month: "May", revenue: 7100, fees: 1420, platformRevenue: 5680 },
  { month: "Jun", revenue: 8300, fees: 1660, platformRevenue: 6640 },
]

const transactionBreakdown = [
  { name: "Minting Fees", value: 35, color: "#a855f7" },
  { name: "Verification Services", value: 28, color: "#3b82f6" },
  { name: "Recertification", value: 22, color: "#8b5cf6" },
  { name: "Premium Services", value: 15, color: "#6366f1" },
]

const recentTransactions = [
  {
    id: 1,
    organization: "AlphaDAO Labs",
    type: "Minting Fee",
    amount: 250,
    date: "2024-12-22",
    status: "completed",
  },
  {
    id: 2,
    organization: "BlockChain Bootcamp",
    type: "Verification Service",
    amount: 180,
    date: "2024-12-21",
    status: "completed",
  },
  {
    id: 3,
    organization: "Tech Community Hub",
    type: "Recertification",
    amount: 120,
    date: "2024-12-20",
    status: "pending",
  },
  {
    id: 4,
    organization: "Web3 Education",
    type: "Premium Services",
    amount: 500,
    date: "2024-12-19",
    status: "completed",
  },
]

export function RevenuePage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Revenue Management</h1>
          <p className="text-muted-foreground mt-1">Track platform revenue and financial metrics</p>
        </div>
        <Button className="gap-2 bg-primary hover:bg-primary/90">
          <Download className="w-4 h-4" />
          Export Report
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">$35,700</div>
            <p className="text-xs text-muted-foreground mt-2">Last 6 months</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Monthly Average
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">$5,950</div>
            <p className="text-xs text-muted-foreground mt-2">+18% growth</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Percent className="w-4 h-4" />
              Platform Fee Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">20%</div>
            <p className="text-xs text-muted-foreground mt-2">Standard rate</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Processing Fee
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">$7,140</div>
            <p className="text-xs text-muted-foreground mt-2">Collected YTD</p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Trend */}
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Revenue Trend</CardTitle>
            <CardDescription>6-month revenue and platform fee collection</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }}
                  labelStyle={{ color: "#999" }}
                />
                <Legend />
                <Bar dataKey="revenue" fill="#a855f7" name="Total Revenue" />
                <Bar dataKey="platformRevenue" fill="#8b5cf6" name="Platform Revenue" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue Breakdown */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Revenue Sources</CardTitle>
            <CardDescription>By service type</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={transactionBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {transactionBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }}
                  labelStyle={{ color: "#999" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Recent Transactions</CardTitle>
          <CardDescription>Latest revenue collection activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Organization</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Type</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Amount</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-3 text-sm text-foreground font-medium">{transaction.organization}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{transaction.type}</td>
                    <td className="px-4 py-3 text-sm text-foreground font-semibold">${transaction.amount}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{transaction.date}</td>
                    <td className="px-4 py-3 text-sm">
                      <Badge
                        className={
                          transaction.status === "completed"
                            ? "bg-green-600"
                            : transaction.status === "pending"
                              ? "bg-yellow-600"
                              : "bg-gray-600"
                        }
                      >
                        {transaction.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
