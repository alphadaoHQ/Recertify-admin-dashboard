"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Zap, Upload } from "lucide-react"
import { SingleMintForm } from "../forms/single-mint-form"
import { BatchMintForm } from "../forms/batch-mint-form"
import { AdminFunctionsPanel } from "../admin/admin-functions-panel"

const mintingRecords = [
  {
    id: 1,
    certificationId: "WEB-001",
    recipient: "alice.ton",
    status: "minted",
    txHash: "0x1234...abcd",
    mintedAt: "2024-01-15",
  },
  {
    id: 2,
    certificationId: "BLC-001",
    recipient: "bob.ton",
    status: "pending",
    txHash: "-",
    mintedAt: "2024-01-14",
  },
  {
    id: 3,
    certificationId: "WEB-002",
    recipient: "charlie.ton",
    status: "failed",
    txHash: "-",
    mintedAt: "2024-01-13",
  },
]

export function MintingPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Minting & Issuance</h1>
          <p className="text-muted-foreground mt-1">Mint and manage blockchain certifications</p>
        </div>
        <Button className="gap-2 bg-primary hover:bg-primary/90">
          <Zap className="w-4 h-4" />
          Mint Certificate
        </Button>
      </div>

      <Tabs defaultValue="single" className="space-y-6">
        <TabsList className="bg-card border border-border">
          <TabsTrigger value="single" className="data-[state=active]:bg-primary">
            <Zap className="w-4 h-4 mr-2" />
            Single Mint
          </TabsTrigger>
          <TabsTrigger value="batch" className="data-[state=active]:bg-primary">
            <Upload className="w-4 h-4 mr-2" />
            Batch Mint
          </TabsTrigger>
          <TabsTrigger value="admin" className="data-[state=active]:bg-primary">
            Manage
          </TabsTrigger>
        </TabsList>

        <TabsContent value="single">
          <SingleMintForm />
        </TabsContent>

        <TabsContent value="batch">
          <BatchMintForm />
        </TabsContent>

        <TabsContent value="admin">
          <AdminFunctionsPanel />
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Minted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">2,456</div>
            <p className="text-xs text-muted-foreground mt-2">Across all programs</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-500">12</div>
            <p className="text-xs text-muted-foreground mt-2">In progress</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Failed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-500">3</div>
            <p className="text-xs text-muted-foreground mt-2">Retry available</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Minting Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Certification</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Recipient</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">TX Hash</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Date</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mintingRecords.map((record) => (
                  <tr key={record.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-3 text-sm text-foreground font-medium">{record.certificationId}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{record.recipient}</td>
                    <td className="px-4 py-3 text-sm">
                      <Badge
                        className={
                          record.status === "minted"
                            ? "bg-green-600"
                            : record.status === "pending"
                              ? "bg-yellow-600"
                              : "bg-red-600"
                        }
                      >
                        {record.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground font-mono text-xs">{record.txHash}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{record.mintedAt}</td>
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
