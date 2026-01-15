"use client"

import type React from "react"

import { useState } from "react"
import { Sidebar } from "./sidebar"
import { TopHeader } from "./top-header"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

return (
    <div className="flex h-screen bg-background relative overflow-hidden">
      {/* Background gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-600/5 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/3 via-transparent to-primary/3 pointer-events-none" />
      
      <Sidebar open={sidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <TopHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-auto bg-background/50 backdrop-blur-sm">
          <div className="p-8 relative">{children}</div>
        </main>
      </div>
    </div>
  )
}
