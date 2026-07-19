export enum Grade {
  P1 = 'P1',
  P2 = 'P2',
  P3 = 'P3',
  P4 = 'P4',
  P5 = 'P5',
  P6 = 'P6'
}

export interface StudentProfile {
  id: string;
  name: string;
  grade: Grade;
  coins: number;
  xp: number;
  streak: number;
  lastActive: string; // ISO string
  purchasedAvatars: string[];
  purchasedStickers: string[];
  selectedAvatar: string;
  selectedPet: string;
}

export interface QuizAttempt {
  id: string;
  date: string; // ISO string
  grade: Grade;
  topic: string;
  score: number; // e.g. 80 for 80%
  totalQuestions: number;
  correctAnswers: number;
  timeSpentSeconds: number;
}

export interface ParentSettings {
  parentPin: string;
  dailyQuestionTarget: number;
  screenTimeLimitMinutes: number;
  disabledTopics: Record<string, boolean>; // topicId -> true if disabled
  difficultyMultiplier: 'easy' | 'medium' | 'hard';
}

export interface RewardItem {
  id: string;
  name: string;
  cost: number;
  type: 'avatar' | 'sticker' | 'pet';
  value: string; // emoji or design details
  description: string;
}

export interface MathTopic {
  id: string;
  title: string;
  description: string;
  grade: Grade;
  icon: string; // Name of Lucide icon
}
