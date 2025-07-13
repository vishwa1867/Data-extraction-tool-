import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

/**
 * 📌 Function 1: Beautify a JSON object into Markdown summary
 */
export const beautifyJSON = async (json) => {
  const prompt = `
You are a smart summarizer. Turn this JSON into a clean, readable Markdown summary.

JSON:
${JSON.stringify(json, null, 2)}

Return only the Markdown summary.
`;

  try {
    const res = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    return res.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI API error (beautifyJSON):", error);
    return "❌ Error generating summary from JSON.";
  }
};

/**
 * 📌 Function 2: Analyze raw OCR text
 * - Understands document type
 * - Extracts important data
 * - Returns clean Markdown summary
 */
export const analyzeDocumentText = async (rawText) => {
  const prompt = `
You are an intelligent assistant. A user has scanned a document using OCR.

Your tasks:
1. Identify the purpose of the document (e.g., invoice, medical report, certificate, ID proof, etc.).
2. Extract all key information (like name, date, diagnosis, total amount, ID number, etc.).
3. Present this information in a clean, readable Markdown summary using headings and bullet points.
4. Do not include raw text or JSON again.

---
Document Text:
"""
${rawText}
"""
---

Return only the Markdown summary.
`;

  try {
    const res = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    return res.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI API error (analyzeDocumentText):", error);
    return "❌ Error analyzing OCR text.";
  }
};
