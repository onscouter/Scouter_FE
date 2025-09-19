import type { Indicator, RubricLevel } from "@/types/rubric";
import type { JobMinimal, JobPayload } from "@/types/job";
import type { Competency } from "@/types/competency";
import type { InterviewQuestion } from "@/types/interview";

export const buildPayload = (
  form: JobMinimal,
  rubricMap: Record<string, Competency>
): JobPayload => {
  const competencies = Object.values(rubricMap)
    .filter((rubric) => rubric != null)
    .map((rubric) => ({
      competency_public_id: rubric.competency_public_id,
      competency_name: rubric.competency_name,
      description: rubric.description,
      questions: Array.isArray(rubric.questions)
        ? rubric.questions.map((q: InterviewQuestion) => ({
            interview_question_public_id: q.interview_question_public_id,
            question_text: q.question_text,
            type: q.type,
          }))
        : [],
      rubric_levels: Array.isArray(rubric.rubric_levels)
        ? rubric.rubric_levels.map((c: RubricLevel) => ({
            rubric_level_public_id: c.rubric_level_public_id,
            level: c.level,
            description: c.description,
            indicators: Array.isArray(c.indicators)
              ? c.indicators.map((i: Indicator) => ({
                  evaluation_indicator_public_id:
                    i.evaluation_indicator_public_id,
                  indicator_text: i.indicator_text,
                }))
              : [],
          }))
        : [],
    }));

  return {
    job_position_public_id: form.job_position_public_id,
    title: form.title,
    description: form.description,
    status: form.status,
    competencies: competencies,
  };
};
