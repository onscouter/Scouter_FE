export interface PhoneNumber {
  number: string;
  country_code: string;
}

export interface Company {
  public_id: string;
  name: string;
  is_active: boolean;
  created_at: string;
}

export interface Employee {
  public_id: string;
  full_name: string;
  email: string;
  auth0_id: string;
  role: "admin" | "recruiter" | "interviewer";
  company: Company;
  job_position_id: number;
  created_at: string;
  is_onboarding: boolean;
  phone_number: PhoneNumber;
}

export interface Evaluation {
  name: string;
  status: "Completed" | "Scheduled" | "Not Started" | "N/A";
  score: number | null;
  scheduledDate?: string;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  appliedDate: string;
  evaluations: Evaluation[];
  averageScore: number;
  decision: "Hire" | "Hold" | "Reject";
}
