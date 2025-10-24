import { GoogleGenAI } from '@google/genai';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateContent = async (prompt: string, thinkingMode: boolean): Promise<string> => {
  try {
    const model = thinkingMode ? 'gemini-2.5-pro' : 'gemini-2.5-flash';
    
    // FIX: Moved systemInstruction into the config object as per @google/genai guidelines.
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        ...(thinkingMode ? { thinkingConfig: { thinkingBudget: 32768 } } : {}),
        systemInstruction: "Eres un consultor de negocios de IA de clase mundial. Proporciona respuestas perspicaces, estructuradas y profesionales. Formatea tu salida usando markdown.",
      },
    });

    return response.text;
  } catch (error) {
    console.error("Error generating content with Gemini:", error);
    if (error instanceof Error) {
        return `Error: No se pudo generar el contenido. ${error.message}`;
    }
    return "Error: Ocurrió un error desconocido al generar el contenido.";
  }
};
