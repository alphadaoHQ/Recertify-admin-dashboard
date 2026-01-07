"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download } from "lucide-react"

const verificationLogs = [
  {
    id: 1,
    certificateId: "CERT-001",
    verifier: "Employer Inc",
    result: "valid",
    timestamp: "2024-01-15 10:30 AM",
  },
  {
    id: 2,
    certificateId: "CERT-002",
    verifier: "Tech Startup LLC",
    result: "valid",
    timestamp: "2024-01-14 03:45 PM",
  },
  {
    id: 3,
    certificateId: "CERT-003",
    verifier: "Blockchain Co",
    result: "expired",
    timestamp: "2024-01-13 09:15 AM",
  },
]

export function VerificationPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Verification & Audit Logs</h1>
          <p className="text-muted-foreground mt-1">Track certificate verifications and system activity</p>
        </div>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Download className="w-4 h-4" />
          Export Logs
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Verifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">3,256</div>
            <p className="text-xs text-muted-foreground mt-2">All time</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Valid</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">3,198</div>
            <p className="text-xs text-muted-foreground mt-2">98.2% success rate</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Issues Found</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-500">58</div>
            <p className="text-xs text-muted-foreground mt-2">Revoked or expired</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Recent Verification Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Certificate ID</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Verified By</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Result</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Timestamp</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {verificationLogs.map((log) => (
                  <tr key={log.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-3 text-sm text-foreground font-medium">{log.certificateId}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{log.verifier}</td>
                    <td className="px-4 py-3 text-sm">
                      <Badge className={log.result === "valid" ? "bg-green-600" : "bg-yellow-600"}>{log.result}</Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{log.timestamp}</td>
                    <td className="px-4 py-3 text-right">
                      <Button size="sm" variant="ghost" className="text-muted-foreground">
                        View
                      </Button>
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
