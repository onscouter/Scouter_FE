import React from "react";
import { useUpdateRole } from "@/features/editRole/useEditRole";
import InterviewRubricPage from "@/pages/InterviewRubricPage";
import { useParams } from "react-router-dom";
import { setAppLoading } from "@/store/appSlice";
import { selectNewJob } from "@/store/newJobSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectRubrics } from "@/store/rubricSlice";
import { buildPayload } from "@/features/createRole/buildPayload";

const EditRubricPage: React.FC = () => {
  const dispatch = useDispatch();
  const rubricMap = useSelector(selectRubrics);
  const newJob = useSelector(selectNewJob);
  const { jobId } = useParams<{ jobId: string }>();
  const { mutateAsync: updateRole } = useUpdateRole(jobId ?? "");

  const handleSave = () => {
    dispatch(setAppLoading(true));
    const payload = buildPayload(newJob, rubricMap);
    console.log(payload);
    updateRole(payload);
  };

  return <InterviewRubricPage handleSave={handleSave} />;
};

export default EditRubricPage;
