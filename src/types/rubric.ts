import { type Theme } from "@mui/material/styles";
import type { CompetencyMinimal } from "./competency";

export interface Indicator {
  evaluation_indicator_public_id: string;
  indicator_text: string;
}

export interface RubricLevel {
  rubric_level_public_id: string;
  level: EvaluationLevelValue;
  description: string;
  indicators: Indicator[];
}

export interface RubricPromptInput {
  title: string;
  description: string;
  competencies: CompetencyMinimal[];
}

export type EvaluationLevelValue = 1 | 2 | 3 | 4 | 5;

export const getEvaluationLevelOptions = (theme: Theme) => [
  {
    label: "Does Not Meet Expectations",
    value: 1,
    color: theme.palette.evaluationType.doesNotMeet,
    textColor: theme.palette.evaluationType.doesNotMeetText,
    borderColor: theme.palette.evaluationType.doesNotMeetBorder,
  },
  {
    label: "Needs Improvement",
    value: 2,
    color: theme.palette.evaluationType.below,
    textColor: theme.palette.evaluationType.belowText,
    borderColor: theme.palette.evaluationType.belowBorder,
  },
  {
    label: "Meets Expectations",
    value: 3,
    color: theme.palette.evaluationType.meets,
    textColor: theme.palette.evaluationType.meetsText,
    borderColor: theme.palette.evaluationType.meetsBorder,
  },
  {
    label: "Above Average",
    value: 4,
    color: theme.palette.evaluationType.above,
    textColor: theme.palette.evaluationType.aboveText,
    borderColor: theme.palette.evaluationType.aboveBorder,
  },
  {
    label: "Exceeds Expectations",
    value: 5,
    color: theme.palette.evaluationType.exceeds,
    textColor: theme.palette.evaluationType.exceedsText,
    borderColor: theme.palette.evaluationType.exceedsBorder,
  },
];
