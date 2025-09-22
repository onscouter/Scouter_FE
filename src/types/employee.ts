import type { JobMinimal } from "@/types/job";
import type { Company } from "@/types/company";
import type { CompetencyMinimal } from "@/types/competency";
import type { CandidateMinimal } from "@/types/candidate";
import type { BaseFilters } from "./filters";

export interface PhoneNumber {
  number: string;
  country_code: string;
}

export interface EmployeeMinimal {
  employee_public_id: string;
  first_name: string;
  last_name: string;
  email: string;
  job_position: JobMinimal;
  phone_number: PhoneNumber;
}

export interface Employee extends EmployeeMinimal {
  role: "admin" | "recruiter" | "interviewer";
  company: Company;
  created_at: string;
}

export interface EmployeeInterview extends EmployeeMinimal {
  interview_count: number;
  last_interviewed_at: string | null;
}

export interface EmployeeInterviewerFilters extends BaseFilters {
  job_position_public_id: string;
  job_interview_public_id: string;
  job_application_public_id: string;
}

export type EmployeeInterviewerResponse = {
  employees: EmployeeInterview[];
  candidate: CandidateMinimal;
  competency: CompetencyMinimal;
  total: number;
  page: number;
  limit: number;
};
