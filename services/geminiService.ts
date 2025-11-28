import { GoogleGenAI } from "@google/genai";

// Safely access process.env to prevent "process is not defined" errors in browser environments
const apiKey = (typeof process !== 'undefined' && process.env) ? process.env.API_KEY : '';

const ai = new GoogleGenAI({ apiKey });

// Analyze an uploaded image of jewelry
export const analyzeJewelryImage = async (base64Image: string): Promise<string> => {
  try {
    const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: cleanBase64
            }
          },
          {
            text: "You are an expert gemologist and jewelry appraiser. Analyze this image. Identify the probable gemstones, metal type, estimated carat weight (if applicable), and style. Suggest an estimated price range (in USD) and 3 outfit styles that would match this piece. Format the output clearly."
          }
        ]
      }
    });

    return response.text || "Could not analyze the image. Please try again.";
  } catch (error) {
    console.error("Analysis Error:", error);
    throw new Error("Failed to analyze image.");
  }
};

// Generate a jewelry design based on text description
export const generateJewelryDesign = async (prompt: string): Promise<{ text: string, imageUrl?: string }> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `Design a piece of jewelry based on this description: ${prompt}. Ensure the image is photorealistic, high quality, on a neutral background.`
          }
        ]
      }
    });

    let generatedImageUrl: string | undefined;
    let generatedText: string = "";

    // Parse the response for image and text
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          generatedImageUrl = `data:image/png;base64,${part.inlineData.data}`;
        } else if (part.text) {
          generatedText += part.text;
        }
      }
    }

    if (!generatedImageUrl) {
        // Fallback or specific error handling if model returns only text
        generatedText = generatedText || "The model generated a description but no image was returned.";
    }

    return { text: generatedText, imageUrl: generatedImageUrl };

  } catch (error) {
    console.error("Generation Error:", error);
    throw new Error("Failed to generate design.");
  }
};