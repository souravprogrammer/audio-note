import Groq from 'groq-sdk';
export const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY ?? "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"
});