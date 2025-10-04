import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { addInterview } from "@/features/recruiter/scheduleInterview/api";
import type { SuccessResponse } from "@/types/api/success";

interface UseAddInterviewProps {
  job_position_public_id: string;
}

export const useAddInterview = ({
  job_position_public_id,
}: UseAddInterviewProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<
    SuccessResponse,
    unknown,
    {
      job_interview_public_id: string;
      interviewer_public_id: string;
      datetime: string;
    }
  >({
    mutationFn: ({
      job_interview_public_id,
      interviewer_public_id,
      datetime,
    }: {
      job_interview_public_id: string;
      interviewer_public_id: string;
      datetime: string;
    }) =>
      addInterview(job_interview_public_id, interviewer_public_id, datetime),

    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["jobCandidate", { job_position_public_id }],
        exact: false,
      });
      if (res?.success) {
        toast.success(res.message);
        navigate(`/recruiter/jobs/${job_position_public_id}`);
      } else {
        toast.error("Unexpected error occurred.");
      }
    },

    onError: (err) => {
      let message = "An unknown error occurred.";
      if (axios.isAxiosError(err)) {
        message = err.response?.data?.detail ?? err.message;
      } else if (err instanceof Error) {
        message = err.message;
      }
      toast.error(message);
    },
  });
};
