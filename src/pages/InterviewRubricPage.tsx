import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { toast } from "react-toastify";
import TrackerLayout from "@/layout/TrackerLayout";
import RubricHeader from "@/features/competencyRubric/components/RubricHeader";
import RubricEditor from "@/features/competencyRubric/components/RubricEditor";
import { buildPayload } from "@/features/createRole/buildPayload";
import { selectRubrics } from "@/store/rubricSlice";
import { selectNewJob } from "@/store/newJobSlice";
import { setAppLoading } from "@/store/appSlice";
import { useCreateRole } from "@/features/createRole/useCreateRole";

const InterviewRubricPage: React.FC = () => {
  const rubricMap = useSelector(selectRubrics);
  const newJob = useSelector(selectNewJob);
  const dispatch = useDispatch();

  const { mutateAsync: createRole } = useCreateRole();

  const competencyIds = Object.keys(rubricMap);
  const competencies = competencyIds.map((id) => ({
    id,
    name: rubricMap[id].competencyName,
    description: rubricMap[id].description,
  }));

  const [stepIndex, setStepIndex] = useState(0);
  const current = competencies[stepIndex];

  const handleNext = () =>
    setStepIndex((prev) => Math.min(prev + 1, competencies.length - 1));
  const handlePrev = () => setStepIndex((prev) => Math.max(prev - 1, 0));

  const handleSave = () => {
    dispatch(setAppLoading(true));
    // toast.info("Creating New Role...");
    const payload = buildPayload(newJob, rubricMap);
    createRole(payload);
  };

  if (!current) return null;

  return (
    <TrackerLayout maxWidth={800}>
      <RubricHeader
        stepIndex={stepIndex}
        total={competencies.length}
        competencyId={current.id}
        competencyName={current.name}
        onNext={handleNext}
        onPrev={handlePrev}
        onSave={handleSave}
      />
      <RubricEditor competency={current} />
    </TrackerLayout>
  );
};

export default InterviewRubricPage;
