export type SizeType = 'BIG' | 'SMALL';

export type ColorType = 'GREEN' | 'RED' | 'VIOLET' | 'GREEN_VIOLET' | 'RED_VIOLET';

export interface WingoItem {
  issueNumber: string;
  period: string;
  number: number;
  size: SizeType;
  color: ColorType;
  time?: string;
}

export type PatternFamily = 'DRAGON' | 'STREAK' | 'TREND' | 'RANDOM';

export interface PatternInfo {
  id: number;
  name: string;
  example: string;
  count: number;
  confidence: number;
  strength: 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY HIGH' | 'EXTREME';
  family: PatternFamily;
  score: number;
  isActive: boolean;
}

export interface TransitionState {
  from: string;
  to: string;
  count: number;
  probability: number;
}

export type PredictionTargetType = 'SIZE' | 'COLOR';

export interface PredictionData {
  nextPeriod: string;
  currentPeriod: string;
  
  // Dynamic Target Selection: 'SIZE' (BIG/SMALL) or 'COLOR' (GREEN/RED) depending on which has higher probability!
  predictionType: PredictionTargetType;
  targetResult: 'BIG' | 'SMALL' | 'GREEN' | 'RED';
  
  predictedOutcome: SizeType; // 'BIG' | 'SMALL'
  predictedColor: 'GREEN' | 'RED' | 'VIOLET'; // 'GREEN' | 'RED'
  predictedNumbers: [number, number]; // e.g. [2, 3]
  dominantPattern: string;
  dominantFamily: PatternFamily;
  confidence: number; // e.g. 96.7
  strength: 'MEDIUM' | 'HIGH' | 'VERY HIGH' | 'EXTREMELY HIGH';
  aiDecisionLevel: 'HIGH CONFIDENCE' | 'MEDIUM CONFIDENCE' | 'OBSERVE';
  
  // Size Probability Breakdown
  bigProbability: number;
  smallProbability: number;

  // Color Probability Breakdown
  greenProbability: number;
  redProbability: number;
  colorConfidence: number;
  sizeConfidence: number;

  // Gemini AI Deep Analysis & Tactical Reasoning
  aiReasoning?: string;
  geminiAnalyzed?: boolean;
  lossProtectionActive?: boolean;
  consecutiveLosses?: number;
  isSystemTrapDetected?: boolean;
  trapType?: string;
  trapCounterAction?: string;

  alternativeStates: {
    name: string;
    probability: number;
    color: string;
  }[];

  // Multi Window Analysis
  multiWindow: {
    window10: { pattern: string; conf: number; strength: string };
    window20: { pattern: string; conf: number; strength: string };
    window30: { pattern: string; conf: number; strength: string };
    window50: { pattern: string; conf: number; strength: string };
    window100: { pattern: string; conf: number; strength: string };
  };

  // Engine Metrics
  detectedPatternCount: number;
  activePatternCount: number;
  patternAgreementPercent: number;
  chaosIndex: number;
  similarityScorePercent: number;
  riskLevel: 'VERY LOW' | 'LOW' | 'MEDIUM' | 'HIGH';
  marketMomentum: 'BULLISH' | 'BEARISH' | 'STABLE';
  
  // 26 Analyzed Patterns
  patternsList: PatternInfo[];
  transitionsList: TransitionState[];
  evolutionTimeline: { roundRange: string; pattern: string; icon: string }[];
}

export type PredictionStatus = 'PENDING' | 'WIN' | 'LOSS' | 'JACKPOT_WIN';

export interface PredictionHistoryItem {
  id: string;
  period: string;
  predictionType?: PredictionTargetType;
  targetResult?: 'BIG' | 'SMALL' | 'GREEN' | 'RED';
  predictedOutcome: SizeType;
  predictedColor?: 'GREEN' | 'RED' | 'VIOLET';
  predictedNumbers: [number, number];
  dominantPattern: string;
  confidence: number;
  actualNumber?: number;
  actualOutcome?: SizeType;
  actualColor?: ColorType;
  status: PredictionStatus;
  timestamp: string;
}

export interface GlobalStats {
  totalAnalyzed: number;
  totalPredictions: number;
  winCount: number;
  lossCount: number;
  jackpotCount: number;
  winRate: number;
  currentStreak: number;
  maxWinStreak: number;
}
