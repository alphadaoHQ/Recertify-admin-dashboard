"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { UsersPage } from "@/components/pages/users"

export default function Page() {
  return (
    <DashboardLayout>
      <UsersPage />
    </DashboardLayout>
  )
}
