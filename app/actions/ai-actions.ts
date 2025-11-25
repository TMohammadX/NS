"use server";

import { ListingResponse } from "@/types/dashboard";

const IMAGEN_API_URL = "https://us-central1-aiplatform.googleapis.com/v1/projects/YOUR_PROJECT_ID/locations/us-central1/publishers/google/models/imagen-3.0-generate-001:predict";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent";

async function fetchWithBackoff(url: string, options: RequestInit, retries = 3, delay = 1000): Promise<Response> {
    try {
        const response = await fetch(url, options);
        if (!response.ok && retries > 0) {
            if (response.status === 429 || response.status >= 500) {
                await new Promise((resolve) => setTimeout(resolve, delay));
                return fetchWithBackoff(url, options, retries - 1, delay * 2);
            }
        }
        return response;
    } catch (error) {
        if (retries > 0) {
            await new Promise((resolve) => setTimeout(resolve, delay));
            return fetchWithBackoff(url, options, retries - 1, delay * 2);
        }
        throw error;
    }
}

export async function generateDesignAction(prompt: string): Promise<string> {
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
        throw new Error("GOOGLE_API_KEY is not set");
    }

    // Note: For Imagen on Vertex AI, you typically need an access token, not just an API key.
    // However, for simplicity and assuming the user might be using a proxy or a different setup,
    // I'll structure this as a standard REST call. 
    // If using Gemini for image generation (which is also possible), the URL would be different.
    // Given the specific model name "imagen-3.0-generate-001", this usually implies Vertex AI.
    // For this implementation, I will assume the user has a way to authenticate or I will use a placeholder 
    // that they need to replace with their specific Vertex AI implementation details or use a standard Gemini image generation if available.

    // ALTERNATIVE: Using Gemini Pro Vision for text-to-image if available, or just mocking for now if credentials are complex.
    // Let's implement a standard fetch that the user might need to adjust for their specific Google Cloud auth (Service Account).

    // For the purpose of this "Next.js Application Build Specification", I will implement the fetch 
    // assuming a standard API key access if possible, or clearly comment on the auth requirement.

    // Actually, for "imagen-3.0-generate-001", it's strictly Vertex AI.
    // To keep it simple for the user without setting up full Google Cloud SDK, 
    // I will mock the response if the API key is "MOCK", otherwise try to call it.

    if (apiKey === "MOCK") {
        await new Promise(resolve => setTimeout(resolve, 2000));
        return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="; // Mock 1x1 pixel
    }

    // Real implementation would go here. 
    // Since Vertex AI requires complex auth (Bearer token from Service Account), 
    // and we only have GOOGLE_API_KEY (usually for AI Studio), 
    // I will use the Gemini API for image generation if supported, or fallback to a placeholder implementation 
    // that instructs the user.

    throw new Error("Vertex AI authentication requires a Service Account. Please implement the specific auth flow or use 'MOCK' as the API key for testing.");
}

export async function generateListingAction(designPrompt: string, productType: string): Promise<ListingResponse> {
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
        throw new Error("GOOGLE_API_KEY is not set");
    }

    const systemInstruction = `You are an expert SEO copywriter for Print-On-Demand (POD) products. 
  Create a compelling, keyword-rich title and description for a ${productType} based on the following design prompt: "${designPrompt}".
  The title should be under 10 words. The description should be persuasive and include relevant tags/keywords naturally.`;

    const payload = {
        contents: [{
            parts: [{ text: systemInstruction }]
        }],
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
                type: "OBJECT",
                properties: {
                    productTitle: { type: "STRING", description: "SEO-optimized title (max 10 words)" },
                    productDescription: { type: "STRING", description: "Compelling, keyword-rich description for the listing." }
                }
            }
        }
    };

    const response = await fetchWithBackoff(`${GEMINI_API_URL}?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Gemini API Error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const generatedText = data.candidates[0].content.parts[0].text;

    return JSON.parse(generatedText) as ListingResponse;
}
