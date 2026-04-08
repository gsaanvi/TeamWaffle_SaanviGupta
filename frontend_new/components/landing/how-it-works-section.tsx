"use client"

import { FileSearch, FormInput, Download } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: FileSearch,
    title: "Choose Document",
    description: "Select from our library of legal templates",
  },
  {
    number: "02",
    icon: FormInput,
    title: "Fill Details",
    description: "Answer simple questions about your needs",
  },
  {
    number: "03",
    icon: Download,
    title: "Generate & Download",
    description: "Get your professional document instantly",
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-24 sm:py-32 border-t border-border/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 
            className="text-balance text-3xl font-bold tracking-tight sm:text-4xl"
            style={{ color: "#E5E7EB" }}
          >
            How It Works
          </h2>
          <p 
            className="mt-4 text-lg"
            style={{ color: "#9CA3AF" }}
          >
            Three simple steps to your perfect legal document.
          </p>
        </div>

        {/* Steps - Horizontal Layout */}
        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={step.title}
                className="group relative flex flex-col items-center text-center"
              >
                {/* Connector line - only between steps */}
                {index < steps.length - 1 && (
                  <div 
                    className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px"
                    style={{ backgroundColor: "rgba(245, 197, 107, 0.15)" }}
                  />
                )}
                
                {/* Step number badge */}
                <div 
                  className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-105"
                  style={{ 
                    backgroundColor: "#121826",
                    border: "1px solid rgba(245, 197, 107, 0.15)"
                  }}
                >
                  {/* Hover glow */}
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      boxShadow: "0 0 40px rgba(245, 197, 107, 0.1)"
                    }}
                  />
                  <Icon className="h-8 w-8 text-primary relative z-10 transition-transform duration-500 group-hover:scale-110" />
                </div>
                
                {/* Step number */}
                <span 
                  className="text-xs font-medium tracking-widest mb-2"
                  style={{ color: "#F5C56B" }}
                >
                  STEP {step.number}
                </span>
                
                {/* Title */}
                <h3 
                  className="text-lg font-semibold mb-2"
                  style={{ color: "#E5E7EB" }}
                >
                  {step.title}
                </h3>
                
                {/* Description */}
                <p 
                  className="text-sm leading-relaxed max-w-[200px]"
                  style={{ color: "#6B7280" }}
                >
                  {step.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
