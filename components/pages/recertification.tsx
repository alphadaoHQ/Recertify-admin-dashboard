"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Clock, AlertCircle, CheckCircle } from "lucide-react"

const recertificationRequests = [
  {
    id: 1,
    recipientName: "Alice Johnson",
    certificationName: "Web Development Professional",
    originalIssueDate: "2023-01-15",
    expirationDate: "2025-01-15",
    daysUntilExpiry: 45,
    status: "pending",
    submittedDate: "2024-12-20",
  },
  {
    id: 2,
    recipientName: "Bob Smith",
    certificationName: "Blockchain Developer",
    originalIssueDate: "2022-06-20",
    expirationDate: "2024-06-20",
    daysUntilExpiry: -200,
    status: "expired",
    submittedDate: "2024-12-18",
  },
  {
    id: 3,
    recipientName: "Carol Davis",
    certificationName: "Data Science Specialist",
    originalIssueDate: "2023-03-10",
    expirationDate: "2025-03-10",
    daysUntilExpiry: 63,
    status: "approved",
    submittedDate: "2024-12-15",
  },
  {
    id: 4,
    recipientName: "David Wilson",
    certificationName: "Smart Contract Auditor",
    originalIssueDate: "2023-09-01",
    expirationDate: "2025-09-01",
    daysUntilExpiry: 238,
    status: "pending",
    submittedDate: "2024-12-22",
  },
]

const statusColors = {
  pending: "bg-yellow-600",
  approved: "bg-green-600",
  expired: "bg-red-600",
  rejected: "bg-gray-600",
}

const statusIcons = {
  pending: Clock,
  approved: CheckCircle,
  expired: AlertCircle,
  rejected: AlertCircle,
}

export function RecertificationPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Recertification Management</h1>
          <p className="text-muted-foreground mt-1">Track and manage certificate renewal requests</p>
        </div>
        <Button className="gap-2 bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4" />
          New Request
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Pending Reviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">12</div>
            <p className="text-xs text-muted-foreground mt-2">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Approved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">48</div>
            <p className="text-xs text-muted-foreground mt-2">This month</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Expiring Soon
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">23</div>
            <p className="text-xs text-muted-foreground mt-2">Within 60 days</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Expired
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">5</div>
            <p className="text-xs text-muted-foreground mt-2">Action needed</p>
          </CardContent>
        </Card>
      </div>

      {/* Recertification Requests Table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Recertification Requests</CardTitle>
          <CardDescription>All pending and processed renewal requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Recipient</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Certification</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Submitted</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Expiration</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Days Left</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recertificationRequests.map((request) => {
                  const StatusIcon = statusIcons[request.status as keyof typeof statusIcons]
                  return (
                    <tr key={request.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="px-4 py-3 text-sm text-foreground font-medium">{request.recipientName}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{request.certificationName}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{request.submittedDate}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{request.expirationDate}</td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={
                            request.daysUntilExpiry < 0 ? "text-destructive font-semibold" : "text-muted-foreground"
                          }
                        >
                          {Math.abs(request.daysUntilExpiry)} {request.daysUntilExpiry < 0 ? "days ago" : "days"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Badge className={statusColors[request.status as keyof typeof statusColors]}>
                            {request.status}
                          </Badge>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right flex justify-end gap-2">
                        <Button size="sm" variant="ghost" className="text-muted-foreground">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
