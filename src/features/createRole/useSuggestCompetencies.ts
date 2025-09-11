import { useMutation } from "@tanstack/react-query";
import { type Competency } from "@/types/competency";
import apiClient from "@/api";

export const useSuggestCompetencies = () => {
  return useMutation({
    mutationFn: async ({
      title,
      description,
    }: {
      title: string;
      description: string;
    }): Promise<Competency[]> => {
      const response = await apiClient.post("/gpt/competency-suggestions", {
        title,
        description,
      });
      return response.data.competencies;
    },
    onSuccess: (data) => {
      return data;
    },
  });
};
