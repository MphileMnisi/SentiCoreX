
import { GoogleGenAI, Type } from "@google/genai";
import { Sentiment, SentimentAnalysisResult, SentimentScores } from '../types';

// NOTE: API key is hardcoded here for simplicity in this educational project.
// In a production environment, this should always be handled via secure environment variables.
const API_KEY = "AIzaSyAYNv7c0Qy0egMc7aMOwDSMNx6nZBRcuX4";

const extractKeywords = (text: string): string[] => {
  const stopWords = new Set([
      'a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 
      'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 
      'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'this', 'that', 
      'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them'
  ]);
  
  const words = text
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 2 && !stopWords.has(word));
  
  const wordCount: { [key: string]: number } = {};
  words.forEach(word => {
      wordCount[word] = (wordCount[word] || 0) + 1;
  });
  
  return Object.entries(wordCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(entry => entry[0]);
};

const createFallbackAnalysis = (text: string): SentimentAnalysisResult => {
    console.warn("Using fallback sentiment analysis.");
    const textLower = text.toLowerCase();
    const positiveWords = ['love', 'great', 'good', 'excellent', 'amazing', 'happy', 'fantastic', 'wonderful', 'best', 'perfect'];
    const negativeWords = ['hate', 'terrible', 'bad', 'awful', 'horrible', 'sad', 'worst', 'disappointing', 'poor'];
    
    const positiveCount = positiveWords.filter(word => textLower.includes(word)).length;
    const negativeCount = negativeWords.filter(word => textLower.includes(word)).length;

    let sentiment: Sentiment;
    let confidence: number;

    if (positiveCount > negativeCount) {
        sentiment = Sentiment.Positive;
        confidence = Math.min(0.95, 0.7 + (positiveCount * 0.05));
    } else if (negativeCount > positiveCount) {
        sentiment = Sentiment.Negative;
        confidence = Math.min(0.95, 0.7 + (negativeCount * 0.05));
    } else {
        sentiment = Sentiment.Neutral;
        confidence = 0.75;
    }

    const scores: SentimentScores = {
        [Sentiment.Positive]: sentiment === Sentiment.Positive ? confidence : (1 - confidence) / 2,
        [Sentiment.Negative]: sentiment === Sentiment.Negative ? confidence : (1 - confidence) / 2,
        [Sentiment.Neutral]: sentiment === Sentiment.Neutral ? confidence : (1 - confidence) / 2,
    };
    
    return {
        text,
        sentiment,
        confidence,
        scores,
        keywords: extractKeywords(text),
        explanation: `Analysis based on keyword matching. The text seems to be ${sentiment}.`,
        timestamp: new Date().toISOString(),
        apiUsed: 'fallback',
    };
};


export const analyzeSentiment = async (text: string): Promise<SentimentAnalysisResult> => {
  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Analyze the sentiment of the following text.
Text: "${text}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            sentiment: {
              type: Type.STRING,
              description: "The overall sentiment. Must be 'positive', 'negative', or 'neutral'.",
              enum: ["positive", "negative", "neutral"],
            },
            confidence: {
              type: Type.NUMBER,
              description: "A score from 0.0 to 1.0 indicating the confidence in the sentiment analysis.",
            },
            scores: {
              type: Type.OBJECT,
              properties: {
                positive: { type: Type.NUMBER, description: "Positive score from 0.0 to 1.0" },
                negative: { type: Type.NUMBER, description: "Negative score from 0.0 to 1.0" },
                neutral: { type: Type.NUMBER, description: "Neutral score from 0.0 to 1.0" },
              },
              required: ["positive", "negative", "neutral"],
            },
            keywords: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "An array of 3-5 most relevant keywords or key phrases from the text.",
            },
            explanation: {
              type: Type.STRING,
              description: "A brief, one-sentence explanation for the sentiment classification.",
            },
          },
          required: ["sentiment", "confidence", "scores", "keywords", "explanation"],
        },
      },
    });

    const jsonString = response.text;
    const analysis = JSON.parse(jsonString);

    return {
      text,
      sentiment: analysis.sentiment as Sentiment,
      confidence: analysis.confidence,
      scores: analysis.scores,
      keywords: analysis.keywords,
      explanation: analysis.explanation,
      timestamp: new Date().toISOString(),
      apiUsed: 'gemini',
    };
  } catch (error) {
    console.error("Gemini API call failed:", error);
    return createFallbackAnalysis(text);
  }
};
