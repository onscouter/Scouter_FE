import React from "react";
import { useCreateRole } from "@/features/createRole/useCreateRole";
import CompetencyForm from "@/pages/recruiter/competency-form";
import { buildPayload } from "@/features/createRole/buildPayload";
import { useDispatch, useSelector } from "react-redux";
import { selectRubrics } from "@/store/rubricSlice";
import { setAppLoading } from "@/store/appSlice";
import { selectNewJob } from "@/store/newJobSlice";

const CreateCompetencyPage: React.FC = () => {
  const { mutateAsync: createRole } = useCreateRole();
  const dispatch = useDispatch();
  const rubricMap = useSelector(selectRubrics);
  const newJob = useSelector(selectNewJob);

  const handleSave = () => {
    dispatch(setAppLoading(true));
    // toast.info("Creating New Role...");
    const payload = buildPayload(newJob, rubricMap);
    console.log(payload);
    createRole(payload);
  };

  return <CompetencyForm handleSave={handleSave} />;
};

export default CreateCompetencyPage;
