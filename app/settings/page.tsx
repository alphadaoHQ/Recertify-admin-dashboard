"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { SettingsPage } from "@/components/pages/settings"

export default function Page() {
  return (
    <DashboardLayout>
      <SettingsPage />
    </DashboardLayout>
  )
}
