import React, { useState } from "react";
import { useSelector } from "react-redux";
// import { toast } from "react-toastify";
import RubricHeader from "@/features/recruiter/competencyRubric/components/RubricHeader";
import RubricEditor from "@/features/recruiter/competencyRubric/components/RubricEditor";
import { selectCompetencies } from "@/store/newCompetencySlice";

interface CompetencyFormProps {
  handleSave: () => void;
}

const CompetencyForm: React.FC<CompetencyFormProps> = ({ handleSave }) => {
  const competencyMap = useSelector(selectCompetencies);
  const competency_public_id = Object.keys(competencyMap);
  const competencies = competency_public_id.map((id) => ({
    competency_public_id: id,
    competency_name: competencyMap[id].competency_name,
    description: competencyMap[id].description,
    questions: competencyMap[id].questions,
    rubric_levels: competencyMap[id].rubric_levels,
  }));

  const [stepIndex, setStepIndex] = useState(0);
  const current = competencies[stepIndex];

  const handleNext = () =>
    setStepIndex((prev) => Math.min(prev + 1, competencies.length - 1));
  const handlePrev = () => setStepIndex((prev) => Math.max(prev - 1, 0));

  if (!current) return null;

  return (
    <>
      <RubricHeader
        stepIndex={stepIndex}
        total={competencies.length}
        competency_public_id={current.competency_public_id}
        competency_name={current.competency_name}
        onNext={handleNext}
        onPrev={handlePrev}
        onSave={handleSave}
      />
      <RubricEditor competency={current} />
    </>
  );
};

export default CompetencyForm;
