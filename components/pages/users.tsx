"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Eye, Trash2 } from "lucide-react"

const users = [
  {
    id: 1,
    username: "alice_crypto",
    wallet: "0x1234...abcd",
    certifications: 3,
    status: "active",
    joined: "2024-01-10",
  },
  {
    id: 2,
    username: "bob_dev",
    wallet: "0x5678...efgh",
    certifications: 5,
    status: "active",
    joined: "2024-01-05",
  },
  {
    id: 3,
    username: "charlie_web",
    wallet: "0x9012...ijkl",
    certifications: 1,
    status: "inactive",
    joined: "2023-12-20",
  },
]

export function UsersPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">User & Wallet Management</h1>
        <p className="text-muted-foreground mt-1">Monitor and manage certified users</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Users className="w-4 h-4" />
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">1,247</div>
            <p className="text-xs text-muted-foreground mt-2">Active and inactive</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">1,089</div>
            <p className="text-xs text-muted-foreground mt-2">Currently certified</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Certifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">2.4</div>
            <p className="text-xs text-muted-foreground mt-2">Per user</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">All Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Username</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Wallet</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Certifications</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Joined</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-3 text-sm text-foreground font-medium">{user.username}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground font-mono text-xs">{user.wallet}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{user.certifications}</td>
                    <td className="px-4 py-3 text-sm">
                      <Badge className={user.status === "active" ? "bg-green-600" : "bg-gray-600"}>{user.status}</Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{user.joined}</td>
                    <td className="px-4 py-3 text-right flex justify-end gap-2">
                      <Button size="sm" variant="ghost" className="text-muted-foreground">
                        <Eye className="w-4 h-4" />
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
