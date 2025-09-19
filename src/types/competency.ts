import type { RubricLevel } from "@/types/rubric";
import type { InterviewQuestion } from "@/types/interview";

export type CompetencyMinimal = {
  competency_public_id: string;
  competency_name: string;
  description?: string;
};

export interface Competency extends CompetencyMinimal {
  questions: InterviewQuestion[];
  rubric_levels: RubricLevel[];
}

export interface CompetencyState {
  competencies: Record<string, Competency>;
}
