"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Users } from "lucide-react"

const organizations = [
  {
    id: 1,
    name: "AlphaDAO Labs",
    type: "DAO",
    admin: "John Smith",
    members: 42,
    status: "active",
    verified: true,
  },
  {
    id: 2,
    name: "BlockChain Bootcamp",
    type: "Bootcamp",
    admin: "Sarah Johnson",
    members: 156,
    status: "active",
    verified: true,
  },
  {
    id: 3,
    name: "Tech Community Hub",
    type: "Community",
    admin: "Mike Chen",
    members: 89,
    status: "active",
    verified: false,
  },
]

export function OrganizationsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Organizations</h1>
          <p className="text-muted-foreground mt-1">Manage institutions, bootcamps, and communities</p>
        </div>
        <Button className="gap-2 bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4" />
          Create Organization
        </Button>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">All Organizations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Type</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Admin</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Members</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {organizations.map((org) => (
                  <tr key={org.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-3 text-sm text-foreground font-medium">{org.name}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      <Badge variant="outline">{org.type}</Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{org.admin}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground flex items-center gap-1">
                      <Users className="w-4 h-4" /> {org.members}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <Badge className={org.status === "active" ? "bg-green-600" : "bg-gray-600"}>{org.status}</Badge>
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
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
