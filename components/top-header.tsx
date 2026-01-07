"use client"

import { Menu, Bell, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WalletButton } from "@/components/ui/wallet-button"

export function TopHeader({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  return (
    <div className="h-16 border-b border-border bg-card flex items-center justify-between px-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onToggleSidebar} className="text-muted-foreground">
          <Menu className="w-5 h-5" />
        </Button>

        <div>
          <h1 className="text-sm font-semibold text-muted-foreground">Organization</h1>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-foreground">AlphaDAO Labs</span>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Bell className="w-5 h-5" />
        </Button>

        <div className="flex items-center gap-3">
          <WalletButton />

          <Button variant="ghost" size="sm" className="gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
              AD
            </div>
            <span className="text-sm text-foreground">Admin</span>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </Button>
        </div>
      </div>
    </div>
  )
}
