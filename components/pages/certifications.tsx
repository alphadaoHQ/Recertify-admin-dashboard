"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Eye } from "lucide-react"

const certifications = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    category: "Web Development",
    type: "NFT",
    issuedCount: 245,
    expiryPeriod: "2 years",
    status: "active",
  },
  {
    id: 2,
    title: "Blockchain Basics",
    category: "Blockchain",
    type: "SBT",
    issuedCount: 178,
    expiryPeriod: "1 year",
    status: "active",
  },
  {
    id: 3,
    title: "Smart Contract Development",
    category: "Blockchain",
    type: "NFT",
    issuedCount: 89,
    expiryPeriod: "2 years",
    status: "paused",
  },
]

export function CertificationsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Certification Programs</h1>
          <p className="text-muted-foreground mt-1">Create and manage certification programs</p>
        </div>
        <Button className="gap-2 bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4" />
          Create Program
        </Button>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Active Certifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Title</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Category</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Type</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Issued</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Expiry</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {certifications.map((cert) => (
                  <tr key={cert.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-3 text-sm text-foreground font-medium">{cert.title}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{cert.category}</td>
                    <td className="px-4 py-3 text-sm">
                      <Badge variant="secondary">{cert.type}</Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{cert.issuedCount}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{cert.expiryPeriod}</td>
                    <td className="px-4 py-3 text-sm">
                      <Badge className={cert.status === "active" ? "bg-green-600" : "bg-yellow-600"}>
                        {cert.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right flex justify-end gap-2">
                      <Button size="sm" variant="ghost" className="text-muted-foreground">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-muted-foreground">
                        <Edit className="w-4 h-4" />
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
