export const mockInterviewQuestions = [
  {
    id: "q1",
    text: "Describe your experience with professional communication in a real-world context.",
    type: "behavioral",
  },
  {
    id: "q2",
    text: "How do you approach developing your skills in professional communication?",
    type: "behavioral",
  },
  {
    id: "q3",
    text: "Give me an example of when you successfully demonstrated professional communication.",
    type: "behavioral",
  },
];

import { nanoid } from "nanoid";
import { defaultEvaluationLevels } from "@/features/competencyRubric/rubricConstants";
import type { Rubric, EvaluationLevel } from "@/types/rubric";

export const generateMockRubric = (competencyId: string): Rubric => {
  const criteria: EvaluationLevel[] = defaultEvaluationLevels.map((level) => ({
    ...level,
    description: level.description ?? "",

    indicators: [
      {
        id: nanoid(),
        competencyId,
        text: `Example indicator for ${level.label}`,
      },
    ],
  }));

  return {
    id: nanoid(),
    competencyId,
    questions: [],
    criteria,
  };
};
