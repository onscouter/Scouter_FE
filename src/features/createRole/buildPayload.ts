import type {
  EvaluationLevel,
  Indicator,
  InterviewQuestion,
  RoleCreatePayload,
  Rubric,
} from "@/types/rubric";
import type { NewJobState } from "@/types/competency";

export const buildPayload = (
  form: NewJobState,
  rubricMap: Record<string, Rubric>
): RoleCreatePayload => {
  const rubricBlocks = Object.values(rubricMap)
    .filter((rubric) => rubric != null)
    .map((rubric) => ({
      id: rubric.id,
      competencyId: rubric.competencyId,
      competencyName: rubric.competencyName,
      description: rubric.description,
      questions: Array.isArray(rubric.questions)
        ? rubric.questions.map((q: InterviewQuestion) => ({
            id: q.id,
            text: q.text,
            type: q.type,
          }))
        : [],
      criteria: Array.isArray(rubric.criteria)
        ? rubric.criteria.map((c: EvaluationLevel) => ({
            score: c.score,
            description: c.description,
            indicators: Array.isArray(c.indicators)
              ? c.indicators.map((i: Indicator) => ({
                  id: i.id,
                  competencyId: i.competencyId,
                  text: i.text,
                }))
              : [],
          }))
        : [],
    }));

  return {
    title: form.title,
    description: form.description,
    rubric: rubricBlocks,
  };
};
