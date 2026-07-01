const axios = require('axios');
const {GoogleGenerativeAI} = require("@google/generative-ai");
const { model } = require("mongoose");

async function generateGroq(prompt, model = "openai/gpt-oss-20b") {
  const res = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model,
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1024,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      timeout: 30000,
    }
  );
  return res.data.choices[0].message.content;
}

// ── Gemini (fallback — use flash-lite, lower traffic than flash) ──────────
async function generateGemini(prompt, model = "gemini-2.5-flash-lite") {
  const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const geminiModel = genAi.getGenerativeModel({
    model,
    generationConfig: {
      thinkingConfig: { thinkingBudget: 0 }, // disable thinking = faster + no traffic issues
    },
  });
  const result = await geminiModel.generateContent(prompt);
  return result.response.text();
}

// ── Main function with auto-fallback ──────────────────────────────────────
async function generate(prompt, model = "openai/gpt-oss-20b") {
  // Detect which provider to use based on model name
  const isGeminiModel = model.startsWith("gemini") || model.startsWith("gemma");

  if (isGeminiModel) {
    try {
      return await generateGemini(prompt, model);
    } catch (err) {
      console.warn(`Gemini failed (${err.message}), falling back to Groq...`);
      return await generateGroq(prompt, "openai/gpt-oss-20b");
    }
  }

  // Default: Groq — if it fails, fall back to Gemini flash-lite
  try {
    return await generateGroq(prompt, model);
  } catch (err) {
    console.warn(`Groq failed (${err.message}), falling back to Gemini...`);
    return await generateGemini(prompt, "gemini-2.5-flash-lite");
  }
}

module.exports = { generate, generateGroq, generateGemini };