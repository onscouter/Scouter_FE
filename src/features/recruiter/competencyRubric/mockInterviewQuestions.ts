import { defaultRubricLevels } from "@/features/recruiter/competencyRubric/rubricConstants";
import type { RubricLevel } from "@/types/rubric";
import type { Competency, CompetencyMinimal } from "@/types/competency";
import type { InterviewQuestion } from "@/types/interview";

export const generateMockRubric = (comp: CompetencyMinimal): Competency => {
  const rubric_levels: RubricLevel[] = defaultRubricLevels.map(
    (level: RubricLevel) => ({
      rubric_level_public_id: level.rubric_level_public_id,
      level: level.level,
      description: level.description ?? "",
      indicators: [
        {
          evaluation_indicator_public_id: crypto.randomUUID(),
          indicator_text: "Example indicator",
        },
      ],
    })
  );

  const questions: InterviewQuestion[] = [];

  return {
    competency_public_id: comp.competency_public_id,
    competency_name: comp.competency_name,
    description: comp.description || "",
    questions,
    rubric_levels,
  };
};
