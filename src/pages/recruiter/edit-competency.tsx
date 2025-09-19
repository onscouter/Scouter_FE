import React from "react";
import { useUpdateJob } from "@/features/recruiter/editJob/useEditJob";
import InterviewRubricPage from "@/pages/recruiter/competency-form";
import { useParams } from "react-router-dom";
import { setAppLoading } from "@/store/appSlice";
import { clearJob, selectNewJob } from "@/store/newJobSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCompetencies,
  selectCompetencies,
} from "@/store/newCompetencySlice";
import { buildPayload } from "@/features/recruiter/createJob/buildPayload";

const EditCompetencyPage: React.FC = () => {
  const dispatch = useDispatch();
  const competencyMap = useSelector(selectCompetencies);
  const newJob = useSelector(selectNewJob);
  const { job_position_public_id } = useParams<{
    job_position_public_id: string;
  }>();
  const { mutateAsync: updateRole } = useUpdateJob(
    job_position_public_id ?? ""
  );

  const handleSave = () => {
    dispatch(setAppLoading(true));
    const payload = buildPayload(newJob, competencyMap);
    console.log(payload);
    updateRole(payload);
    dispatch(clearJob());
    dispatch(clearCompetencies());
  };

  return <InterviewRubricPage handleSave={handleSave} />;
};

export default EditCompetencyPage;
