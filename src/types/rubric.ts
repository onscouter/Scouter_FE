export const QuestionType = {
  Behavioral: "behavioral",
  Technical: "technical",
  Situational: "situational",
} as const;

export type QuestionType = (typeof QuestionType)[keyof typeof QuestionType];

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
  score: number;
  description: string;
  indicators: Indicator[];
}

export interface Rubric {
  id: string;
  description: string;
  competencyId: string;
  competencyName: string;
  questions: InterviewQuestion[];
  criteria: EvaluationLevel[];
}

export interface RubricState {
  rubrics: Record<string, Rubric>;
}

export interface RoleCreatePayload {
  title: string;
  description: string;
  rubric: Rubric[];
}
