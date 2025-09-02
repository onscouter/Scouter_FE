import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TrackerLayout from "@/layout/TrackerLayout";
import RubricHeader from "@/features/competencyRubric/components/RubricHeader";
import { selectRubrics, setRubric } from "@/store/rubricSlice";
import type { Rubric } from "@/types/rubric";
import RubricEditor from "@/features/competencyRubric/components/RubricEditor";
import { selectSelectedCompetencies } from "@/store/newJobSlice";

const InterviewRubricPage: React.FC = () => {
  const dispatch = useDispatch();
  const competencies = useSelector(selectSelectedCompetencies);
  const rubrics = useSelector(selectRubrics);
  const [stepIndex, setStepIndex] = useState(0);

  const current = competencies[stepIndex];

  useEffect(() => {
    competencies.forEach((comp) => {
      if (!rubrics[comp.id]) {
        const emptyRubric: Rubric = {
          competencyId: comp.id,
          questions: [],
          criteria: [],
        };
        dispatch(setRubric(emptyRubric));
      }
    });
  }, [competencies, dispatch, rubrics]);

  const handleNext = () =>
    setStepIndex((prev) => Math.min(prev + 1, competencies.length - 1));
  const handlePrev = () => setStepIndex((prev) => Math.max(prev - 1, 0));

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
      />
      <RubricEditor competency={current} />
      {/* TODO: Render rubric editor here for `current.id` */}
    </TrackerLayout>
  );
};

export default InterviewRubricPage;
