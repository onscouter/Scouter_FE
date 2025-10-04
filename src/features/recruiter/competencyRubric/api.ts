import apiClient from "@/api";
import type { RubricPromptInput } from "@/types/rubric";

export const generateRubric = async (
  input: RubricPromptInput
): Promise<any> => {
  const response = await apiClient.post("/job/generate-rubric", input);
  return response.data;
};
