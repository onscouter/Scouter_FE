import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { generateRubric } from "@/features/recruiter/competencyRubric/api";

export const useGenerateRubric = () => {
  return useMutation({
    mutationFn: generateRubric,
    onSuccess: () => {
      toast.success("Rubric generated successfully!");
    },
    onError: (error: unknown) => {
      toast.error("Failed to generate rubric.");
      console.error("Rubric generation failed:", error);
    },
  });
};
