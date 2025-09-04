import React, { useState } from "react";
import { useSelector } from "react-redux";
import TrackerLayout from "@/layout/TrackerLayout";
import RubricHeader from "@/features/competencyRubric/components/RubricHeader";
import RubricEditor from "@/features/competencyRubric/components/RubricEditor";
import { selectSelectedCompetencies } from "@/store/newJobSlice";
import type { Rubric } from "@/types/rubric";
import { selectRubrics } from "@/store/rubricSlice";

const InterviewRubricPage: React.FC = () => {
  // const { mutate: saveRubrics, isPending } = useSaveAllRubrics();

  const competencies = useSelector(selectSelectedCompetencies);
  const [stepIndex, setStepIndex] = useState(0);

  const current = competencies[stepIndex];

  const rubric = useSelector(selectRubrics);

  console.log(rubric, "rubric");

  const handleNext = () =>
    setStepIndex((prev) => Math.min(prev + 1, competencies.length - 1));
  const handlePrev = () => setStepIndex((prev) => Math.max(prev - 1, 0));

  // const handleSaveAll = () => {
  //   saveRubrics({
  //     jobId: newJob.id,
  //     rubrics: Object.values(rubricStore),
  //   });
  // };

  const handleSave = (rubric: Rubric) => {
    console.log(rubric);
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
