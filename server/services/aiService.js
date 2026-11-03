const { GoogleGenerativeAI } = require("@google/generative-ai");

// Gemini client initialization
const getAIClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing in environment variables.");
  }
  return new GoogleGenerativeAI(apiKey);
};

/**
 * Generates context-aware captions & quotes from an image buffer
 */
const generateImageCaption = async (imageBuffer, mimeType = "image/jpeg") => {
  try {
    const genAI = getAIClient();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Analyze this image and return ONLY a valid JSON object (no markdown):
    {
      "caption": "A creative 1-2 sentence caption for social media",
      "quote": "An inspirational/deep quote matching the mood",
      "tags": ["tag1", "tag2", "tag3"]
    }`;

    const imagePart = {
      inlineData: {
        data: imageBuffer.toString("base64"),
        mimeType: mimeType,
      },
    };

    const result = await model.generateContent([prompt, imagePart]);
    const responseText = result.response.text().trim();
    const cleanedJson = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(cleanedJson);
  } catch (error) {
    console.error("AI Service Error:", error.message);
    throw new Error(`Failed to generate caption: ${error.message}`);
  }
};

module.exports = {
  generateImageCaption,
};
