import { useMutation } from "@tanstack/react-query";
import { type CompetencyMinimal } from "@/types/competency";
import apiClient from "@/api";

export const useSuggestCompetencies = () => {
  return useMutation({
    mutationFn: async ({
      title,
      description,
    }: {
      title: string;
      description: string;
    }): Promise<CompetencyMinimal[]> => {
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
