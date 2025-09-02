import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setSuggestedCompetencies } from "@/store/newJobSlice";
import { type Competency } from "@/types/competency";
import apiClient from "@/api";

export const useSuggestCompetencies = () => {
  const dispatch = useDispatch();

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
      dispatch(setSuggestedCompetencies(data));
    },
  });
};
