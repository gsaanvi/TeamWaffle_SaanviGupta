"use client"

import { FileText, Shield } from "lucide-react"

const features = [
  {
    icon: FileText,
    title: "AI Document Generator",
    description:
      "Create legally-sound contracts, NDAs, and agreements in seconds. Our AI understands your needs and generates professional documents tailored to your specific requirements.",
  },
  {
    icon: Shield,
    title: "Legal Simplifier & Risk Scanner",
    description:
      "Transform complex legal jargon into plain English. Identify potential risks and red flags in contracts before you sign, with AI-powered clause analysis.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 
            className="text-balance text-3xl font-bold tracking-tight sm:text-4xl"
            style={{ color: "#E5E7EB" }}
          >
            Powerful AI Tools for Legal Work
          </h2>
          <p 
            className="mt-4 text-pretty text-lg"
            style={{ color: "#9CA3AF" }}
          >
            Everything you need to handle legal documents with confidence.
          </p>
        </div>

        {/* Premium Feature Cards */}
        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="group relative rounded-2xl border border-border/50 p-8 transition-all duration-500 hover:-translate-y-1"
                style={{ backgroundColor: "#121826" }}
              >
                {/* Hover glow effect */}
                <div 
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    boxShadow: "0 0 60px rgba(245, 197, 107, 0.08), 0 0 100px rgba(245, 197, 107, 0.04)"
                  }}
                />
                
                {/* Border glow on hover */}
                <div 
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    border: "1px solid rgba(245, 197, 107, 0.2)"
                  }}
                />
                
                <div className="relative z-10">
                  {/* Icon container */}
                  <div 
                    className="flex h-14 w-14 items-center justify-center rounded-xl transition-all duration-500 group-hover:scale-110"
                    style={{ 
                      backgroundColor: "rgba(245, 197, 107, 0.1)",
                    }}
                  >
                    <Icon className="h-7 w-7 text-primary transition-transform duration-500" />
                  </div>
                  
                  {/* Content */}
                  <h3 
                    className="mt-6 text-xl font-semibold"
                    style={{ color: "#E5E7EB" }}
                  >
                    {feature.title}
                  </h3>
                  <p 
                    className="mt-3 leading-relaxed"
                    style={{ color: "#9CA3AF" }}
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
