import { GoogleGenAI, Type } from "@google/genai";

const parseResumeAnalysis = async (resumeText) => {
  try {
    const apiKey = import.meta.process.env.VITE_API_KEY;

    if (!apiKey) {
      console.warn("No API_KEY found in env, returning mock data.");
      return getMockAnalysis();
    }

    const ai = new GoogleGenAI({ apiKey });


    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        score: { type: Type.INTEGER },
        summary: { type: Type.STRING },
        strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
        weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
        roleMatch: { type: Type.STRING }
      },
      required: ["score", "summary", "strengths", "weaknesses", "roleMatch"]
    };

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analyze the following resume text. Act as a strict hiring manager.\n\nRESUME TEXT:\n${resumeText}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        systemInstruction:
          "You are an expert technical recruiter. Provide strong, honest feedback."
      }
    });

    if (response.text) {
      return JSON.parse(response.text);
    }

    throw new Error("Gemini did not return response text.");

  } catch (error) {
    console.error("Resume analysis failed:", error);
    return getMockAnalysis();
  }
};

const getMockAnalysis = () => ({
  score: 78,
  summary: "Strong profile with modern tech stack exposure, but lacks measurable results.",
  strengths: [
    "Well-organized skills section",
    "Clear job progression",
    "Relevant education"
  ],
  weaknesses: [
    "Lacks quantifiable achievement metrics",
    "Generic summary",
    "Missing targeted keywords"
  ],
  roleMatch: "Software Developer (Mid-Level)"
});

export const geminiService = {
  analyzeResume: parseResumeAnalysis
};
