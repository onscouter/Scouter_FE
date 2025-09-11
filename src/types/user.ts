export interface PhoneNumber {
  number: string;
  country_code: string;
}

export interface Company {
  company_public_id: string;
  name: string;
  is_active: boolean;
  created_at: string;
}

export interface Employee {
  employee_public_id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: "admin" | "recruiter" | "interviewer";
  company: Company;
  job_position_id: number;
  created_at: string;
  phone_number: PhoneNumber;
}

export interface Evaluation {
  name: string;
  status: "Completed" | "Scheduled" | "Not Started" | "N/A";
  score: number | null;
  scheduledDate?: string;
}

export interface Candidate {
  candidate_public_id: string;
  first_name: string;
  last_name: string;
  email: string;
  appliedDate: string;
  evaluations: Evaluation[];
  averageScore: number;
  decision: "Hire" | "Hold" | "Reject";
}
