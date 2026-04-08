"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  FileText,
  Users,
  Home,
  Briefcase,
  Handshake,
  ArrowRight,
} from "lucide-react"

const documentTemplates = [
  {
    id: "nda",
    title: "NDA",
    description: "Non-disclosure agreement to protect confidential information",
    icon: FileText,
    color: "from-amber-500/20 to-amber-500/5",
  },
  {
    id: "freelance-contract",
    title: "Freelance Contract",
    description: "Professional agreement for freelance services and deliverables",
    icon: Users,
    color: "from-blue-500/20 to-blue-500/5",
  },
  {
    id: "rental-agreement",
    title: "Rental Agreement",
    description: "Comprehensive lease agreement for residential properties",
    icon: Home,
    color: "from-emerald-500/20 to-emerald-500/5",
  },
  {
    id: "employment-letter",
    title: "Employment Letter",
    description: "Official offer letter and employment terms documentation",
    icon: Briefcase,
    color: "from-purple-500/20 to-purple-500/5",
  },
  {
    id: "partnership-agreement",
    title: "Partnership Agreement",
    description: "Legal contract defining business partnership terms",
    icon: Handshake,
    color: "from-rose-500/20 to-rose-500/5",
  },
]

export function DashboardContent() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Document Templates
        </h1>
        <p className="mt-2 text-muted-foreground">
          Select a template to generate your legal document with AI assistance.
        </p>
      </div>

      {/* Document Templates Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {documentTemplates.map((template) => {
          const Icon = template.icon
          return (
            <div
              key={template.id}
              className="group relative overflow-hidden rounded-xl border border-border/50 bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
            >
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${template.color} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
              />
              
              {/* Content */}
              <div className="relative p-6">
                {/* Icon */}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/80 transition-all duration-300 group-hover:bg-primary/10 group-hover:scale-110">
                  <Icon className="h-6 w-6 text-muted-foreground transition-colors duration-300 group-hover:text-primary" />
                </div>

                {/* Text */}
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {template.title}
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  {template.description}
                </p>

                {/* Generate Button */}
                <Link href={`/generate?template=${template.id}`}>
                  <Button
                    variant="outline"
                    className="w-full border-border/50 bg-transparent text-foreground transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground group-hover:border-primary/50"
                  >
                    Generate
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>

              {/* Subtle glow on hover */}
              <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 ring-1 ring-primary/20 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          )
        })}
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border/50 bg-card p-5">
          <p className="text-sm text-muted-foreground">Documents Generated</p>
          <p className="mt-1 text-2xl font-semibold text-foreground">127</p>
        </div>
        <div className="rounded-xl border border-border/50 bg-card p-5">
          <p className="text-sm text-muted-foreground">Time Saved</p>
          <p className="mt-1 text-2xl font-semibold text-foreground">43.5 hrs</p>
        </div>
        <div className="rounded-xl border border-border/50 bg-card p-5">
          <p className="text-sm text-muted-foreground">Accuracy Rate</p>
          <p className="mt-1 text-2xl font-semibold text-foreground">99.2%</p>
        </div>
      </div>
    </div>
  )
}
