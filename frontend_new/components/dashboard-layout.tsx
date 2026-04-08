"use client"

import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"
import { useState, useEffect } from "react"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarWidth, setSidebarWidth] = useState(256) // 64px collapsed, 256px expanded

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Sidebar />
      <main className="ml-64 pt-16 min-h-screen transition-all duration-300">
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
