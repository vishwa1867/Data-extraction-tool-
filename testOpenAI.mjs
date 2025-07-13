// testOpenAI.mjs
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: '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', // 🔑 Replace with your actual key
  dangerouslyAllowBrowser: true
});

const response = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [{ role: "user", content: "Respond with just: Hello GPT works!" }]
});

console.log("✅ GPT Response:", response.choices[0].message.content);
