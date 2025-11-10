
export enum Sentiment {
  Positive = 'positive',
  Negative = 'negative',
  Neutral = 'neutral'
}

export enum ActiveTab {
  TextInput = 'text-input',
  FileUpload = 'file-upload',
  BatchProcessing = 'batch-processing'
}

export interface SentimentScores {
  positive: number;
  negative: number;
  neutral: number;
}

export interface SentimentAnalysisResult {
  text: string;
  sentiment: Sentiment;
  confidence: number;
  scores: SentimentScores;
  keywords: string[];
  explanation: string;
  timestamp: string;
  apiUsed: 'gemini' | 'fallback';
}

export type ApiStatus = {
  status: 'ready' | 'loading' | 'error' | 'success';
  message: string;
};
