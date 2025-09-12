import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteJobApi } from "@/features/jobTracker/api";
import { toast } from "react-toastify";

export const useDeleteJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (jobId: string) => deleteJobApi(jobId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      toast.success("Job deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete job");
    },
  });
};
