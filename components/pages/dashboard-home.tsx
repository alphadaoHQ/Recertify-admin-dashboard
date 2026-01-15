"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Plus, FileText, CheckCircle, Clock, TrendingUp } from "lucide-react"

const certificateData = [
  { month: "Jan", issued: 120, revoked: 20 },
  { month: "Feb", issued: 150, revoked: 25 },
  { month: "Mar", issued: 200, revoked: 30 },
  { month: "Apr", issued: 280, revoked: 35 },
  { month: "May", issued: 320, revoked: 40 },
  { month: "Jun", issued: 380, revoked: 45 },
]

const certificationTypes = [
  { name: "Web Development", value: 45, color: "#a855f7" },
  { name: "Data Science", value: 30, color: "#3b82f6" },
  { name: "Blockchain", value: 20, color: "#8b5cf6" },
  { name: "Other", value: 5, color: "#6366f1" },
]

export function DashboardHome() {
  return (
    <div className="space-y-8">
{/* Header */}
      <div className="flex items-center justify-between">
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold text-gradient">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back, manage your certifications and users</p>
        </div>
        <div className="flex gap-3 animate-slide-up">
          <Button variant="outline" className="btn-glass">Export Report</Button>
          <Button className="gap-2 btn-gradient shadow-lg">
            <Plus className="w-4 h-4" />
            Create Certification
          </Button>
        </div>
      </div>

{/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-elevated card-glass group card-stagger-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileText className="w-4 h-4 text-purple-400" />
              </div>
              Total Certificates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gradient">1,247</div>
            <p className="text-xs text-green-400 mt-2 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="card-elevated card-glass group card-stagger-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500/20 to-green-600/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <CheckCircle className="w-4 h-4 text-green-400" />
              </div>
              Active Certifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gradient">842</div>
            <p className="text-xs text-muted-foreground mt-2">Currently valid</p>
          </CardContent>
        </Card>

        <Card className="card-elevated card-glass group card-stagger-3">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-600/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Clock className="w-4 h-4 text-yellow-400" />
              </div>
              Pending Approvals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gradient">34</div>
            <p className="text-xs text-muted-foreground mt-2">Awaiting review</p>
          </CardContent>
        </Card>

        <Card className="card-elevated card-glass group card-stagger-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <TrendingUp className="w-4 h-4 text-blue-400" />
              </div>
              Verification Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gradient">156</div>
            <p className="text-xs text-muted-foreground mt-2">This month</p>
          </CardContent>
        </Card>
      </div>

{/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Certificates Issued Over Time */}
        <Card className="lg:col-span-2 card-elevated card-glass">
          <CardHeader>
            <CardTitle className="text-gradient">Certificates Issued Over Time</CardTitle>
            <CardDescription>Monthly issuance and revocation trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={certificateData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.3} />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: "rgba(0, 0, 0, 0.8)", 
                    border: "1px solid rgba(168, 85, 247, 0.3)",
                    backdropFilter: "blur(12px)",
                    borderRadius: "8px"
                  }}
                  labelStyle={{ color: "#999" }}
                />
                <Line 
                  type="monotone" 
                  dataKey="issued" 
                  stroke="url(#colorGradient)" 
                  strokeWidth={3}
                  dot={{ fill: "#a855f7", r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="revoked" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  dot={{ fill: "#ef4444", r: 3 }}
                  activeDot={{ r: 5 }}
                />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Certification Distribution */}
        <Card className="card-elevated card-glass">
          <CardHeader>
            <CardTitle className="text-gradient">Type Distribution</CardTitle>
            <CardDescription>By certification category</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={certificationTypes}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {certificationTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: "rgba(0, 0, 0, 0.8)", 
                    border: "1px solid rgba(168, 85, 247, 0.3)",
                    backdropFilter: "blur(12px)",
                    borderRadius: "8px"
                  }}
                  labelStyle={{ color: "#999" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

{/* Quick Actions */}
      <Card className="card-elevated card-glass">
        <CardHeader>
          <CardTitle className="text-gradient">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start gap-2 h-12 btn-glass group">
              <div className="w-6 h-6 rounded bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Plus className="w-3 h-3 text-primary-foreground" />
              </div>
              Create Certification
            </Button>
            <Button variant="outline" className="justify-start gap-2 h-12 btn-glass group">
              <div className="w-6 h-6 rounded bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Plus className="w-3 h-3 text-white" />
              </div>
              Issue Certificate
            </Button>
            <Button variant="outline" className="justify-start gap-2 h-12 btn-glass group">
              <div className="w-6 h-6 rounded bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileText className="w-3 h-3 text-white" />
              </div>
              View Verification Logs
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
