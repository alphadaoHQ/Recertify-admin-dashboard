"use client"

import { Menu, Bell, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WalletButton } from "@/components/ui/wallet-button"

export function TopHeader({ onToggleSidebar }: { onToggleSidebar: () => void }) {
return (
    <div className="h-16 border-b border-border/50 backdrop-blur-md bg-white/10 flex items-center justify-between px-8 shadow-lg">
      <div className="flex items-center gap-4">
<Button variant="ghost" size="icon" onClick={onToggleSidebar} className="text-muted-foreground hover:bg-white/10 transition-all duration-200 hover:scale-110">
          <Menu className="w-5 h-5" />
        </Button>

<div>
          <h1 className="text-sm font-semibold text-muted-foreground">Organization</h1>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gradient">AlphaDAO Labs</span>
            <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform duration-200 group-hover:translate-y-0.5" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
<Button variant="ghost" size="icon" className="text-muted-foreground hover:bg-white/10 transition-all duration-200 hover:scale-110 relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
        </Button>

        <div className="flex items-center gap-3">
          <WalletButton />

<Button variant="ghost" size="sm" className="gap-2 hover:bg-white/10 transition-all duration-200 hover:scale-105">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-primary-foreground text-xs font-bold shadow-lg">
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
