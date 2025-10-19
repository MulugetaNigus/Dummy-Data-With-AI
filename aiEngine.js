// aiEngine.js
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function aiEngine(resource, count, attributes) {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  const prompt = `Generate exactly ${count} dummy ${resource} objects as a valid JSON array. Each object must have the following fields: ${attributes.join(', ')}. Ensure values are realistic and varied. Output only the JSON array, no extra text or explanations and finally REMEMBER TO USET THE REAL AND WORKING IMAGES URLS USE THIS EXACTLY URL ENDPOINTS FOR IMAGES = https://placehold.co/400x300.png?text=use+your+own+image+here.`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  // Clean up any markdown or extra formatting from Gemini's response
  const cleanedText = text
    .replace(/```json|```/g, '')
    .replace(/`/g, '')
    .trim();

  // Parse and return as JSON
  return JSON.parse(cleanedText);
}

module.exports = aiEngine;