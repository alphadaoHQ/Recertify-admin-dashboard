"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Building2, Award, Zap, Users, FileText, RotateCcw, TrendingUp, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Organizations", href: "/organizations", icon: Building2 },
  { name: "Certifications", href: "/certifications", icon: Award },
  { name: "Minting", href: "/minting", icon: Zap },
  { name: "Users", href: "/users", icon: Users },
  { name: "Verification Logs", href: "/verification", icon: FileText },
  { name: "Recertification", href: "/recertification", icon: RotateCcw },
  { name: "Revenue", href: "/revenue", icon: TrendingUp },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function Sidebar({ open }: { open: boolean }) {
  const pathname = usePathname()

return (
    <div
      className={cn("glass-dark border-r border-border/50 transition-all duration-300 flex flex-col shadow-xl", open ? "w-64" : "w-20")}
    >
{/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-border/50 glass-dark">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg">
            <img src="/recertify%20logo.png" alt="Recertify Logo" className="w-6 h-6 rounded object-cover" />
          </div>
          {open && <span className="font-bold text-gradient">Recertify</span>}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        <div className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105",
                  isActive
                    ? "bg-gradient-to-r from-primary to-purple-600 text-primary-foreground shadow-lg"
                    : "text-muted-foreground hover:bg-white/10 hover:text-foreground hover:shadow-md",
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {open && <span className="text-sm font-medium">{item.name}</span>}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-border p-4">
        <div className={cn("text-xs text-muted-foreground", !open && "text-center")}>
          {open ? "Recertify Admin" : "v0.2"}
        </div>
      </div>
    </div>
  )
}
