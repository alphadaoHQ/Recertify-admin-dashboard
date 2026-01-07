"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Save } from "lucide-react"

export function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Configure global platform settings</p>
      </div>

      {/* Network Configuration */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Network Configuration</CardTitle>
          <CardDescription>Select blockchain network for minting</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-colors">
            <div>
              <h3 className="text-sm font-semibold text-foreground">TON Mainnet</h3>
              <p className="text-xs text-muted-foreground">Production network</p>
            </div>
            <Badge className="bg-green-600">Active</Badge>
          </div>
          <div className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-colors">
            <div>
              <h3 className="text-sm font-semibold text-foreground">TON Testnet</h3>
              <p className="text-xs text-muted-foreground">Testing and development</p>
            </div>
            <Badge variant="outline">Available</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Smart Contract Configuration */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Smart Contract Configuration</CardTitle>
          <CardDescription>Manage contract addresses and settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">NFT Contract Address</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="0x..."
                className="flex-1 px-3 py-2 rounded-lg bg-muted border border-border text-foreground text-sm"
              />
              <Button variant="outline" size="sm">
                Copy
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">SBT Contract Address</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="0x..."
                className="flex-1 px-3 py-2 rounded-lg bg-muted border border-border text-foreground text-sm"
              />
              <Button variant="outline" size="sm">
                Copy
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Notification Preferences</CardTitle>
          <CardDescription>Configure alert settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-border" />
            <span className="text-sm text-foreground">Email notifications for pending approvals</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-border" />
            <span className="text-sm text-foreground">Telegram alerts for failed minting</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded border-border" />
            <span className="text-sm text-foreground">Daily digest of platform activity</span>
          </label>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="bg-card border-border border-red-900">
        <CardHeader>
          <CardTitle className="text-red-500">Danger Zone</CardTitle>
          <CardDescription>Irreversible actions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            variant="outline"
            className="w-full justify-between text-red-500 border-red-500 hover:bg-red-500/10 bg-transparent"
          >
            Clear All Logs
            <ChevronRight className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            className="w-full justify-between text-red-500 border-red-500 hover:bg-red-500/10 bg-transparent"
          >
            Reset Platform
            <ChevronRight className="w-4 h-4" />
          </Button>
        </CardContent>
      </Card>

      <Button className="gap-2 bg-primary hover:bg-primary/90">
        <Save className="w-4 h-4" />
        Save Changes
      </Button>
    </div>
  )
}
