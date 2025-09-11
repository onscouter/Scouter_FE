import React, { useState } from "react";
import { useSelector } from "react-redux";
import TrackerLayout from "@/layout/TrackerLayout";
import RubricHeader from "@/features/competencyRubric/components/RubricHeader";
import RubricEditor from "@/features/competencyRubric/components/RubricEditor";
import { buildPayload } from "@/features/createRole/buildPayload";
import { selectRubrics } from "@/store/rubricSlice";
import { selectNewJob } from "@/store/newJobSlice";

// const { mutate: saveRubrics, isPending } = useSaveAllRubrics();

const InterviewRubricPage: React.FC = () => {
  const rubricMap = useSelector(selectRubrics);
  const newJob = useSelector(selectNewJob);
  console.log(rubricMap, "rubricMap");
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

  // const handleSaveAll = () => {
  //   saveRubrics({
  //     jobId: newJob.id,
  //     rubrics: Object.values(rubricStore),
  //   });
  // };

  // const { mutate: createRole, isPending, isSuccess, error } = useCreateRole();

  const handleSave = () => {
    console.log(rubricMap);
    const payload = buildPayload(newJob, rubricMap);
    console.log(payload, "payload");
    // createRole({ rubric, newRole });
    // createRole({ name: "Hiring Manager", permissions: ["read", "write"] });
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
