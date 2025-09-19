import type { Employee } from "@/types/employee";
export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  employee: Employee;
}
