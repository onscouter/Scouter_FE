import { nanoid } from "nanoid";
import { defaultEvaluationLevels } from "@/features/competencyRubric/rubricConstants";
import type { Rubric, EvaluationLevel } from "@/types/rubric";
import type { Competency } from "@/types/competency";

export const generateMockRubric = (comp: Competency): Rubric => {
  const criteria: EvaluationLevel[] = defaultEvaluationLevels.map((level) => ({
    ...level,
    description: level.description ?? "",

    indicators: [
      {
        id: nanoid(),
        competencyId: comp.competencyId,
        text: `Example indicator`,
      },
    ],
  }));

  return {
    id: nanoid(),
    description: comp.description || "",
    competencyId: comp.competencyId,
    competencyName: comp.competencyName,
    questions: [],
    criteria,
  };
};
