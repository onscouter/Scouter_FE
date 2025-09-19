import type { JobMinimal } from "@/types/job";
import type { Company } from "@/types/company";

export interface PhoneNumber {
  number: string;
  country_code: string;
}

export interface Employee {
  employee_public_id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: "admin" | "recruiter" | "interviewer";
  company: Company;
  job_position: JobMinimal;
  created_at: string;
  phone_number: PhoneNumber;
}
