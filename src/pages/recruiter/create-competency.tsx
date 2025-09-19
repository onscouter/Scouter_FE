import React from "react";
import { useCreateJob } from "@/features/recruiter/createJob/useCreateJob";
import CompetencyForm from "@/pages/recruiter/competency-form";
import { buildPayload } from "@/features/recruiter/createJob/buildPayload";
import { useDispatch, useSelector } from "react-redux";
import { setAppLoading } from "@/store/appSlice";
import { selectNewJob, clearJob } from "@/store/newJobSlice";
import {
  clearCompetencies,
  selectCompetencies,
} from "@/store/newCompetencySlice";

const CreateCompetencyPage: React.FC = () => {
  const { mutateAsync: createJob } = useCreateJob();
  const dispatch = useDispatch();
  const competencyMap = useSelector(selectCompetencies);
  const newJob = useSelector(selectNewJob);

  const handleSave = () => {
    dispatch(setAppLoading(true));
    // toast.info("Creating New Job...");
    const payload = buildPayload(newJob, competencyMap);
    console.log(payload, "payload");
    createJob(payload);
    dispatch(clearJob());
    dispatch(clearCompetencies());
  };

  return <CompetencyForm handleSave={handleSave} />;
};

export default CreateCompetencyPage;
