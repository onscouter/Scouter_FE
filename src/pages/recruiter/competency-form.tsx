import React, { useState } from "react";
import { useSelector } from "react-redux";
// import { toast } from "react-toastify";
import TrackerLayout from "@/layout/TrackerLayout";
import RubricHeader from "@/features/competencyRubric/components/RubricHeader";
import RubricEditor from "@/features/competencyRubric/components/RubricEditor";
import { selectRubrics } from "@/store/rubricSlice";
import { selectNewJob } from "@/store/newJobSlice";

interface CompetencyFormProps {
  handleSave: () => void;
}

const CompetencyForm: React.FC<CompetencyFormProps> = ({ handleSave }) => {
  const rubricMap = useSelector(selectRubrics);

  console.log(useSelector(selectRubrics));
  console.log(useSelector(selectNewJob));

  const competencyIds = Object.keys(rubricMap);
  const competencies = competencyIds.map((id) => ({
    competencyId: id,
    competencyName: rubricMap[id].competencyName,
    description: rubricMap[id].description,
  }));

  const [stepIndex, setStepIndex] = useState(0);
  const current = competencies[stepIndex];

  const handleNext = () =>
    setStepIndex((prev) => Math.min(prev + 1, competencies.length - 1));
  const handlePrev = () => setStepIndex((prev) => Math.max(prev - 1, 0));

  if (!current) return null;

  return (
    <TrackerLayout maxWidth={800}>
      <RubricHeader
        stepIndex={stepIndex}
        total={competencies.length}
        competencyId={current.competencyId}
        competencyName={current.competencyName}
        onNext={handleNext}
        onPrev={handlePrev}
        onSave={handleSave}
      />
      <RubricEditor competency={current} />
    </TrackerLayout>
  );
};

export default CompetencyForm;
