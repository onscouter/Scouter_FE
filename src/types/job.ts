import type { BaseFilters } from "@/types/filters";
import type { Competency, CompetencyMinimal } from "@/types/competency";

export type JobStatus = "ALL" | "ACTIVE" | "PAUSED" | "COMPLETED";

export const statusOptions: { label: string; value: JobStatus }[] = [
  { label: "All", value: "ALL" },
  { label: "Active", value: "ACTIVE" },
  { label: "Paused", value: "PAUSED" },
  { label: "Completed", value: "COMPLETED" },
];

export interface JobFilters extends BaseFilters {
  company_public_id: string;
  job_status?: JobStatus;
}

export interface JobMinimal {
  job_position_public_id: string;
  title: string;
  description: string;
  status: JobStatus;
}

export interface Job extends JobMinimal {
  created_at: string;
  job_applications: number;
  competencies: number;
}

export type JobsResponse = {
  jobs: Job[];
  total: number;
  page: number;
  limit: number;
};

export interface JobPayload extends JobMinimal {
  competencies: Competency[];
}

export interface JobPromptInput {
  job_title: string;
  job_description: string;
}

// export interface JobResponse {
//   job_position_public_id: string;
//   title: string;
//   description: string;
//   competencies: Competency[];
// }

export interface SuggestCompetencies {
  title: string;
  description: string;
  competencies: CompetencyMinimal[];
}
