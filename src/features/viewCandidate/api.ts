import apiClient from "@/api";

export interface CandidateOut {
  public_id: string;
  full_name: string;
  email: string;
  phone_number: {
    number: string;
    country_code: string;
  };
}

export interface CompetencyMinimal {
  public_id: string;
  name: string;
}

export interface InterviewOut {
  public_id: string;
  interview_datetime: string;
  interview_status: string;
  score: number | null;
  outcome: string | null;
  competency: CompetencyMinimal;
}

export interface ApplicationOut {
  public_id: string;
  candidate: CandidateOut;
  created_at: string;
  status: string;
  interviews: InterviewOut[];
  job_position_title: string;
}

export interface ApplicationFilter {
  public_id: string;
  page?: number;
  limit?: number;
  search?: string;
  job_status?: string;
  orderBy?: string;
  order?: "asc" | "desc";
}

export type ApplicationResponse = {
  applications: ApplicationOut[];
  total: number;
  page: number;
  limit: number;
};

export const fetchApplications = async (
  filters: ApplicationFilter
): Promise<ApplicationResponse> => {
  const params = new URLSearchParams();
  params.append("public_id", filters.public_id);
  params.append("page", String(filters.page ?? 1));
  params.append("limit", String(filters.limit ?? 10));
  if (filters.search) params.append("search", filters.search);
  if (filters.orderBy) params.append("order_by", filters.orderBy);
  if (filters.order) params.append("order", filters.order);

  try {
    const response = await apiClient.get(
      `/application/${filters.public_id}?${params.toString()}`
    );

    return response.data;
  } catch (error) {
    console.error("Error in fetchApplications:", error);
    throw error;
  }
};
