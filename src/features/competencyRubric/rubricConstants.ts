import type { EvaluationLevel } from "@/types/rubric";

export const defaultEvaluationLevels: EvaluationLevel[] = [
  {
    levelKey: "exceeds",
    label: "Exceeds Expectations",
    score: 5,
    description: "",
    indicators: [],
  },
  {
    levelKey: "above",
    label: "Above Average",
    score: 4,
    description: "",
    indicators: [],
  },
  {
    levelKey: "meets",
    label: "Meets Expectations",
    score: 3,
    description: "",
    indicators: [],
  },
  {
    levelKey: "below",
    label: "Below Expectations",
    score: 2,
    description: "",
    indicators: [],
  },
  {
    levelKey: "none",
    label: "Does Not Meet Expectations",
    score: 1,
    description: "",
    indicators: [],
  },
];
