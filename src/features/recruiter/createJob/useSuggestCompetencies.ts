import { useMutation } from "@tanstack/react-query";
import { generateCompetencies } from "./api";
import { toast } from "react-toastify";

export const useSuggestCompetencies = () => {
  return useMutation({
    mutationFn: generateCompetencies,
    onSuccess: (data) => {
      if (data?.competencies) {
        toast.success("Competencies generated successfully.");
      } else {
        toast.error("Unexpected error occurred.");
      }
      return data;
    },
    onError: (err: unknown) => {
      toast.error((err as Error).message || "Failed to create candidate.");
    },
  });
};
