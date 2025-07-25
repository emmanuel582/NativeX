const { GoogleGenerativeAI } = require('@google/generative-ai');

// Hardcoded Gemini API key
const genAI = new GoogleGenerativeAI('AIzaSyCe8QI1tfVwTMYtLQxdIYAie9nC6sHqztg');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

/**
 * Detects intent from a WhatsApp message using Gemini AI.
 * For now, only supports 'time' intent: extracts a date/time in format 2/2/2007 if present.
 * Logs the detected intent and value to the console.
 * @param {string} message - The incoming WhatsApp message
 * @returns {Promise<{ intent: string, value: string|null }>} - The detected intent and value
 */
async function detectIntent(message) {
  // Prompt Gemini to extract a date in the format 2/2/2007 if present
  const prompt = `Extract a date from this message in the format D/M/YYYY (e.g., 2/2/2007). If no date is present, reply with "none". Message: "${message}"`;
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let date = response.text().trim();
    if (date.toLowerCase() === 'none' || !date.match(/\d{1,2}\/\d{1,2}\/\d{4}/)) {
      date = null;
    }
    const intent = date ? 'time' : 'unknown';
    console.log(`[Intent] Detected intent: ${intent}, value: ${date}`);
    return { intent, value: date };
  } catch (err) {
    console.error('[Intent] Error detecting intent:', err.message);
    return { intent: 'error', value: null };
  }
}

module.exports = { detectIntent }; 