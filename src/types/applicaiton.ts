import type { BaseFilters } from "@/types/filters";
import type { Interview } from "@/types/interview";
import type { CandidateMinimal } from "@/types/candidate";
import type { JobMinimal } from "@/types/job";

export interface Application {
  job_application_public_id: string;
  candidate: CandidateMinimal;
  created_at: string;
  status: string;
  interviews: Interview[];
}

export interface ApplicationFilter extends BaseFilters {
  job_position_public_id: string;
  job_status?: string;
}

export type ApplicationResponse = {
  applications: Application[];
  job_position: JobMinimal;
  total: number;
  page: number;
  limit: number;
};
