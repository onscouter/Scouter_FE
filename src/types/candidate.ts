import type { Evaluation } from "@/types/evaluation";
import type { PhoneNumber } from "@/types/employee";

export type CandidateMinimal = {
  candidate_public_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: PhoneNumber;
};

export interface Candidate extends CandidateMinimal {
  appliedDate: string;
  evaluations: Evaluation[];
  averageScore: number;
  decision: "Hire" | "Hold" | "Reject";
}
