import type { RubricLevel } from "@/types/rubric";

export const defaultRubricLevels: RubricLevel[] = [
  {
    rubric_level_public_id: crypto.randomUUID(),
    level: 5,
    description: "",
    indicators: [],
  },
  {
    rubric_level_public_id: crypto.randomUUID(),
    level: 4,
    description: "",
    indicators: [],
  },
  {
    rubric_level_public_id: crypto.randomUUID(),
    level: 3,
    description: "",
    indicators: [],
  },
  {
    rubric_level_public_id: crypto.randomUUID(),
    level: 2,
    description: "",
    indicators: [],
  },
  {
    rubric_level_public_id: crypto.randomUUID(),
    level: 1,
    description: "",
    indicators: [],
  },
];
