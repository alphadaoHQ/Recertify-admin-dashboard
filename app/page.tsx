"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { DashboardHome } from "@/components/pages/dashboard-home"

export default function Page() {
  return (
    <DashboardLayout>
      <DashboardHome />
    </DashboardLayout>
  )
}
