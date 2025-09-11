export interface Job {
  job_position_public_id: string;
  title: string;
  status: JobStatus;
  description: string;
  created_at: string;
  job_applications: number;
  competencies: number;
}

export type Order = "asc" | "desc";

export type JobStatus = "ALL" | "ACTIVE" | "PAUSED" | "COMPLETED";

export const statusOptions: { label: string; value: JobStatus }[] = [
  { label: "All", value: "ALL" },
  { label: "Active", value: "ACTIVE" },
  { label: "Paused", value: "PAUSED" },
  { label: "Completed", value: "COMPLETED" },
];

export interface JobFilters {
  company_id: string;
  page?: number;
  limit?: number;
  search?: string;
  job_status?: string;
  orderBy?: string;
  order?: "asc" | "desc";
}

export type JobsResponse = {
  jobs: Job[];
  total: number;
  page: number;
  limit: number;
};
