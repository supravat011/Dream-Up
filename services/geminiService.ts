import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Initialize specific instances later to ensure key is present if possible, 
// though standard practice is generic initialization.
const ai = new GoogleGenAI({ apiKey });

export const generateOutfitAdvice = async (preferences: string, occasion: string): Promise<any[]> => {
  try {
    const prompt = `Suggest 3 stylish outfit combinations for a "${occasion}". 
    The user prefers: "${preferences}". 
    Return a list of outfits with a catchy name, a short description, and a list of key items.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              description: { type: Type.STRING },
              items: { 
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: ["name", "description", "items"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Outfit Planner Error:", error);
    throw error;
  }
};

export const generateVirtualTryOn = async (personImageBase64: string, garmentImageBase64: string): Promise<string | null> => {
  try {
    // Helper to strip data url prefix if present
    const cleanBase64 = (data: string) => data.split(',')[1] || data;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: cleanBase64(personImageBase64)
            }
          },
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: cleanBase64(garmentImageBase64)
            }
          },
          {
            text: "Generate a realistic image of the person in the first image wearing the garment shown in the second image. Maintain the person's pose, body shape, and the background of the first image. Ensure the lighting looks natural."
          }
        ]
      }
    });

    // Check parts for image
    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Gemini Try-On Error:", error);
    throw error;
  }
};
