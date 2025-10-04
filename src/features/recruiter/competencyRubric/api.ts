import { aiApiClient } from "@/api";
import type { RubricPromptInput } from "@/types/rubric";

export const generateRubric = async (
  input: RubricPromptInput
): Promise<any> => {
  const response = await aiApiClient.post("/job/generate-rubric", input);
  return response.data;
};
