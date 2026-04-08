"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FileText,
  BookOpen,
  History,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useState } from "react"

const mainNavItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/generate",
    label: "Generate Document",
    icon: FileText,
  },
  {
    href: "/simplify",
    label: "Simplify Text",
    icon: BookOpen,
  },
  {
    href: "/history",
    label: "History",
    icon: History,
  },
]

const bottomNavItems = [
  {
    href: "#",
    label: "Settings",
    icon: Settings,
  },
  {
    href: "#",
    label: "Help & Support",
    icon: HelpCircle,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        "fixed left-0 top-16 z-40 flex h-[calc(100vh-4rem)] flex-col border-r border-border/50 bg-sidebar transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-6 z-50 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-sm hover:bg-secondary hover:text-foreground"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </button>

      {/* Main Navigation */}
      <nav className="flex-1 space-y-1 p-3">
        {mainNavItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                collapsed && "justify-center px-2"
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon
                className={cn(
                  "h-5 w-5 shrink-0",
                  isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                )}
              />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="border-t border-border/50 p-3 space-y-1">
        {bottomNavItems.map((item) => {
          const Icon = item.icon

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:bg-secondary hover:text-foreground",
                collapsed && "justify-center px-2"
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="h-5 w-5 shrink-0 text-muted-foreground group-hover:text-foreground" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          )
        })}
      </div>
    </aside>
  )
}
