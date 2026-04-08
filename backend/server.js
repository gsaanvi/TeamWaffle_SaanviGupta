require("dotenv").config();

const express = require("express");
const cors = require("cors");
const Anthropic = require("@anthropic-ai/sdk");

const app = express();
const PORT = 5000;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const ALLOWED_DOC_TYPES = new Set([
  "NDA",
  "Freelance Contract",
  "Rental Agreement",
  "Employment Letter",
  "Partnership Agreement",
]);

function buildGeneratePrompt(docType, fields) {
  const {
    party1Name = "",
    party2Name = "",
    date = "",
    jurisdiction = "",
    duration = "",
    keyTerms = "",
  } = fields || {};

  return [
    "Draft a complete, professional legal document using Indian legal context and conventions.",
    "Document type: " + docType,
    "",
    "Use these inputs exactly where relevant:",
    "party1Name: " + party1Name,
    "party2Name: " + party2Name,
    "date: " + date,
    "jurisdiction (Indian state): " + jurisdiction,
    "duration: " + duration,
    "keyTerms: " + keyTerms,
    "",
    "Requirements:",
    "1) Produce a clean formatted legal document with clear headings and clause structure.",
    "2) Adapt language and clauses to Indian legal practice and jurisdiction.",
    "3) Ensure all major sections expected for this document type are included.",
    "4) Output only the final document text.",
    "5) Do not include markdown, notes, or explanations.",
  ].join("\n");
}

function extractTextFromAnthropicResponse(response) {
  if (!response || !Array.isArray(response.content)) {
    return "";
  }

  return response.content
    .filter((part) => part && part.type === "text" && typeof part.text === "string")
    .map((part) => part.text)
    .join("\n")
    .trim();
}

function safeParseJsonFromText(text) {
  try {
    return JSON.parse(text);
  } catch (_err) {
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start !== -1 && end !== -1 && end > start) {
      const candidate = text.slice(start, end + 1);
      return JSON.parse(candidate);
    }
    throw new Error("Claude response was not valid JSON.");
  }
}

app.get("/", (_req, res) => {
  return res.json({
    message: "Lawffle backend is running",
  });
});

app.post("/api/generate", async (req, res) => {
  try {
    const { docType, fields } = req.body || {};

    if (!process.env.ANTHROPIC_API_KEY) {
      return res.status(500).json({
        error: "Server is missing ANTHROPIC_API_KEY configuration.",
      });
    }

    if (typeof docType !== "string" || !ALLOWED_DOC_TYPES.has(docType)) {
      return res.status(400).json({
        error:
          "Invalid docType. Allowed values: NDA, Freelance Contract, Rental Agreement, Employment Letter, Partnership Agreement.",
      });
    }

    if (!fields || typeof fields !== "object" || Array.isArray(fields)) {
      return res.status(400).json({
        error: "Invalid fields. Expected an object.",
      });
    }

    const prompt = buildGeneratePrompt(docType, fields);

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4000,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const document = extractTextFromAnthropicResponse(response);

    if (!document) {
      return res.status(502).json({
        error: "No document content was returned by Claude.",
      });
    }

    return res.json({ document });
  } catch (error) {
    console.error("Error in /api/generate:", error);
    return res.status(500).json({
      error: "Failed to generate legal document. Please try again.",
      details: error.message || "Unknown error",
    });
  }
});

app.post("/api/simplify", async (req, res) => {
  try {
    const { text } = req.body || {};

    if (!process.env.ANTHROPIC_API_KEY) {
      return res.status(500).json({
        error: "Server is missing ANTHROPIC_API_KEY configuration.",
      });
    }

    if (typeof text !== "string" || !text.trim()) {
      return res.status(400).json({
        error: "Invalid text. Expected a non-empty string.",
      });
    }

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1200,
      system:
        "You are a legal document analyser. Given legal text, return STRICT JSON with:\n{\n  summary: string (3 simple sentences),\n  risks: [\n    {\n      clause: string,\n      level: 'high' | 'medium' | 'low',\n      explanation: string\n    }\n  ]\n}\nDo not return anything except JSON.",
      messages: [
        {
          role: "user",
          content: text,
        },
      ],
    });

    const rawText = extractTextFromAnthropicResponse(response);
    if (!rawText) {
      return res.status(502).json({
        error: "No simplify content was returned by Claude.",
      });
    }

    const parsed = safeParseJsonFromText(rawText);
    const summary = typeof parsed.summary === "string" ? parsed.summary : "";
    const risks = Array.isArray(parsed.risks) ? parsed.risks : [];

    return res.json({ summary, risks });
  } catch (error) {
    console.error("Error in /api/simplify:", error);
    return res.status(500).json({
      error: "Failed to simplify legal text. Please try again.",
      details: error.message || "Unknown error",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
