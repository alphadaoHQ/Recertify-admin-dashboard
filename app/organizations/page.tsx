"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { OrganizationsPage } from "@/components/pages/organizations"

export default function Page() {
  return (
    <DashboardLayout>
      <OrganizationsPage />
    </DashboardLayout>
  )
}
