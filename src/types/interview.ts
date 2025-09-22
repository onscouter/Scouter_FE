import type { BaseFilters } from "@/types/filters";
import type { JobMinimal } from "@/types/job";
import type { CandidateMinimal } from "@/types/candidate";
import type { CompetencyMinimal } from "@/types/competency";
import { type Theme } from "@mui/material/styles";

export interface InterviewFilters extends BaseFilters {
  employee_public_id: string;
}

export interface InterviewMinimal {
  job_interview_public_id: string;
  interview_datetime: string;
  interview_status: string;
  competency: CompetencyMinimal;
}

export interface Interview extends InterviewMinimal {
  score: number | null;
  candidate: CandidateMinimal;
  job_position: JobMinimal;
}

export interface InterviewResponse {
  interviews: Interview[];
  total: number;
  page: number;
  limit: number;
}

export type QuestionType = "BEHAVIORAL" | "TECHNICAL" | "SITUATIONAL";

export const getInterviewQuestionTypeOptions = (theme: Theme) => [
  {
    label: "Behavioral",
    value: "BEHAVIORAL" as QuestionType,
    color: theme.palette.questionType.behavioral,
    textColor: theme.palette.questionType.behavioralText,
  },
  {
    label: "Technical",
    value: "TECHNICAL" as QuestionType,
    color: theme.palette.questionType.technical,
    textColor: theme.palette.questionType.technicalText,
  },
  {
    label: "Situational",
    value: "SITUATIONAL" as QuestionType,
    color: theme.palette.questionType.situational,
    textColor: theme.palette.questionType.situationalText,
  },
];

export interface InterviewQuestion {
  interview_question_public_id: string;
  question_text: string;
  type: QuestionType;
}

export interface InterviewWithMeta {
  interviewer_name: string;
  interviewer_role: string;
  total_interviews_conducted: number;
  scheduled_at: string;
  candidate: CandidateMinimal;
  competency: CompetencyMinimal;
}
