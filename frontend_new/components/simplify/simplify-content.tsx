"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Search,
  Copy,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  AlertCircle,
  Shield,
  Clock,
  DollarSign,
  Scale,
  FileWarning,
  Sparkles,
} from "lucide-react"

type RiskLevel = "high" | "medium" | "low"
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000"

interface RiskClause {
  id: string
  clause: string
  explanation: string
  level: RiskLevel
}

const riskConfig = {
  high: {
    label: "High Risk",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
    textColor: "text-red-400",
    badgeBg: "bg-red-500/20",
    icon: AlertTriangle,
  },
  medium: {
    label: "Medium Risk",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    textColor: "text-amber-400",
    badgeBg: "bg-amber-500/20",
    icon: AlertCircle,
  },
  low: {
    label: "Safe",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    textColor: "text-emerald-400",
    badgeBg: "bg-emerald-500/20",
    icon: Shield,
  },
}

export function SimplifyContent() {
  const [inputText, setInputText] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [summary, setSummary] = useState("")
  const [risks, setRisks] = useState<RiskClause[]>([])
  const [expandedClauses, setExpandedClauses] = useState<Set<string>>(new Set())
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")

  const handleAnalyze = async () => {
    if (!inputText.trim()) return

    setIsAnalyzing(true)
    setError("")
    setSummary("")
    setRisks([])

    try {
      const response = await fetch(`${API_BASE_URL}/api/simplify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
      })

      const payload = await response.json()

      if (!response.ok) {
        throw new Error(payload.error || "Failed to analyze document.")
      }

      const nextSummary = typeof payload.summary === "string" ? payload.summary : ""
      const nextRisks = Array.isArray(payload.risks)
        ? payload.risks
            .filter(
              (risk: { clause?: string; level?: string; explanation?: string }) =>
                typeof risk?.clause === "string" &&
                typeof risk?.explanation === "string" &&
                (risk?.level === "high" || risk?.level === "medium" || risk?.level === "low")
            )
            .map(
              (risk: { clause: string; level: RiskLevel; explanation: string }, index: number) => ({
                id: String(index + 1),
                clause: risk.clause,
                level: risk.level,
                explanation: risk.explanation,
              })
            )
        : []

      setSummary(nextSummary)
      setRisks(nextRisks)
      setExpandedClauses(
        new Set(
          nextRisks
            .filter((risk: RiskClause) => risk.level === "high")
            .map((risk: RiskClause) => risk.id)
        )
      )
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again."
      setError(message)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const toggleClause = (id: string) => {
    const newExpanded = new Set(expandedClauses)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedClauses(newExpanded)
  }

  const handleCopy = () => {
    if (!summary && risks.length === 0) return

    const text = `Summary:\n${summary}\n\nRisk Analysis:\n${risks
      .map((c) => `[${riskConfig[c.level].label}] ${c.clause}\n${c.explanation}`)
      .join("\n\n")}`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const riskCounts = {
    high: risks.filter((c) => c.level === "high").length,
    medium: risks.filter((c) => c.level === "medium").length,
    low: risks.filter((c) => c.level === "low").length,
  }

  const hasResults = summary.trim().length > 0 || risks.length > 0

  return (
    <div className="h-full">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Legal Simplifier
        </h1>
        <p className="mt-1 text-muted-foreground">
          Analyze legal documents and identify potential risks in plain language
        </p>
      </div>

      {/* Split Screen Layout */}
      <div className="grid h-[calc(100vh-220px)] min-h-[600px] gap-6 lg:grid-cols-2">
        {/* LEFT SIDE - Input */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">Legal Text Input</h2>
            <span className="text-sm text-muted-foreground">
              {inputText.length.toLocaleString()} characters
            </span>
          </div>

          <div className="relative flex-1 flex flex-col">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your legal clause or document here..."
              className="flex-1 w-full rounded-xl border border-border/50 bg-card px-5 py-4 text-foreground placeholder:text-muted-foreground/60 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 resize-none text-[15px] leading-relaxed transition-colors"
            />
          </div>

          <div className="mt-4">
            <Button
              onClick={handleAnalyze}
              disabled={!inputText.trim() || isAnalyzing}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base font-medium gap-2 transition-all duration-200"
            >
              {isAnalyzing ? (
                <>
                  <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Analyzing Document...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  Analyze Document
                </>
              )}
            </Button>
            {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
          </div>
        </div>

        {/* RIGHT SIDE - Output */}
        <div className="flex flex-col overflow-hidden rounded-xl border border-border/50 bg-card">
          {/* Output Header */}
          <div className="flex items-center justify-between border-b border-border/50 px-5 py-4">
            <h2 className="font-semibold text-foreground">Analysis Results</h2>
            {hasResults && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="text-muted-foreground hover:text-foreground hover:bg-secondary gap-1.5 h-8"
              >
                {copied ? (
                  <>
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    Copy
                  </>
                )}
              </Button>
            )}
          </div>

          {/* Output Content */}
          <div className="flex-1 overflow-y-auto p-5">
            {isAnalyzing ? (
              /* Loading State */
              <div className="space-y-6 animate-pulse">
                <div className="space-y-3">
                  <div className="h-4 w-32 rounded bg-secondary" />
                  <div className="h-24 rounded-lg bg-secondary" />
                </div>
                <div className="space-y-3">
                  <div className="h-4 w-40 rounded bg-secondary" />
                  <div className="h-16 rounded-lg bg-secondary" />
                  <div className="h-16 rounded-lg bg-secondary" />
                  <div className="h-16 rounded-lg bg-secondary" />
                </div>
              </div>
            ) : hasResults ? (
              /* Results */
              <div className="space-y-6 animate-in fade-in duration-500">
                {/* Plain-English Summary */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold text-foreground">Plain-English Summary</h3>
                  </div>
                  <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                    <p className="text-[15px] leading-relaxed text-foreground/90">{summary}</p>
                  </div>
                </div>

                {/* Risk Overview */}
                <div className="flex items-center gap-4 py-3 border-y border-border/50">
                  <span className="text-sm text-muted-foreground">Risk Summary:</span>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <div className="h-2 w-2 rounded-full bg-red-400" />
                      <span className="text-sm text-foreground">{riskCounts.high} High</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="h-2 w-2 rounded-full bg-amber-400" />
                      <span className="text-sm text-foreground">{riskCounts.medium} Medium</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="h-2 w-2 rounded-full bg-emerald-400" />
                      <span className="text-sm text-foreground">{riskCounts.low} Safe</span>
                    </div>
                  </div>
                </div>

                {/* Risk Analysis Clauses */}
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Flagged Clauses</h3>
                  <div className="space-y-3">
                    {risks.map((clause) => {
                      const config = riskConfig[clause.level]
                      const RiskIcon = config.icon
                      const isExpanded = expandedClauses.has(clause.id)

                      return (
                        <div
                          key={clause.id}
                          className={`rounded-lg border ${config.borderColor} ${config.bgColor} overflow-hidden transition-all duration-200`}
                        >
                          <button
                            onClick={() => toggleClause(clause.id)}
                            className="w-full flex items-start gap-3 p-4 text-left"
                          >
                            <RiskIcon className={`h-4 w-4 mt-0.5 shrink-0 ${config.textColor}`} />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`text-xs font-medium px-2 py-0.5 rounded ${config.badgeBg} ${config.textColor}`}>
                                  {config.label}
                                </span>
                              </div>
                              <p className="text-sm text-foreground/80 font-mono leading-relaxed line-clamp-2">
                                {clause.clause}
                              </p>
                            </div>
                            <div className="shrink-0 mt-0.5">
                              {isExpanded ? (
                                <ChevronUp className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <ChevronDown className="h-4 w-4 text-muted-foreground" />
                              )}
                            </div>
                          </button>

                          {/* Expanded Content */}
                          <div
                            className={`overflow-hidden transition-all duration-300 ease-out ${
                              isExpanded ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                            }`}
                          >
                            <div className="px-4 pb-4 pt-0">
                              <div className="ml-7 pl-4 border-l-2 border-border/50">
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                  {clause.explanation}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            ) : (
              /* Empty State */
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/50 mb-4">
                  <Scale className="h-7 w-7 text-muted-foreground/50" />
                </div>
                <h3 className="font-medium text-foreground mb-1">No Analysis Yet</h3>
                <p className="text-sm text-muted-foreground max-w-[280px]">
                  Paste your legal text on the left and click &quot;Analyze Document&quot; to get started
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
