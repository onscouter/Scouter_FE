export const QuestionType = {
  Behavioral: "behavioral",
  Technical: "technical",
  Situational: "situational",
} as const;

export const LevelKey = {
  Exceeds: "exceeds",
  Above: "above",
  Meets: "meets",
  Below: "below",
  None: "none",
} as const;

export type QuestionType = (typeof QuestionType)[keyof typeof QuestionType];
export type LevelKey = (typeof LevelKey)[keyof typeof LevelKey];

export interface InterviewQuestion {
  id: string;
  text: string;
  type: QuestionType;
}

export interface Indicator {
  id: string;
  competencyId: string;
  text: string;
}

export interface EvaluationLevel {
  label: string;
  levelKey: LevelKey;
  score: number;
  description: string;
  indicators: Indicator[];
}

export interface Rubric {
  competencyId: string;
  questions: InterviewQuestion[];
  criteria: EvaluationLevel[];
}

export interface RubricState {
  rubrics: Record<string, Rubric>;
}
