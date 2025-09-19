import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { defaultRubricLevels } from "@/features/recruiter/competencyRubric/rubricConstants";
import type { RootState } from "@/store";
import type { Competency, CompetencyState } from "@/types/competency";
import type {
  EvaluationLevelValue,
  Indicator,
  RubricLevel,
} from "@/types/rubric";
import type { InterviewQuestion, QuestionType } from "@/types/interview";

const initialState: CompetencyState = {
  competencies: {},
};

const competencySlice = createSlice({
  name: "competency",
  initialState,
  reducers: {
    setCompetency(state, action: PayloadAction<Competency>) {
      const competency = action.payload;

      console.log(competency, "here in setCompetency");

      const fallbackRubricLevels = defaultRubricLevels.map((level) => ({
        rubric_level_public_id: level.rubric_level_public_id,
        level: level.level,
        description: level.description ?? "",
        indicators: (level.indicators || []).map((ind: Indicator) => ({
          ...ind,
        })),
      }));

      const hydratedRubricLevels = (competency.rubric_levels || []).map(
        (level) => ({
          ...level,
          indicators: (level.indicators || []).map((ind: Indicator) => ({
            ...ind,
          })),
        })
      );

      const hydratedQuestions = (competency.questions || []).map((q) => ({
        interview_question_public_id: q.interview_question_public_id,
        question_text: q.question_text,
        type: q.type,
      }));

      state.competencies[competency.competency_public_id] = {
        ...competency,
        rubric_levels:
          hydratedRubricLevels.length > 0
            ? hydratedRubricLevels
            : fallbackRubricLevels,
        questions: hydratedQuestions,
      };
    },
    addRubricIfNotExists(state, action: PayloadAction<Competency>) {
      const incomingCompetency = action.payload;

      // Check if a rubric with the same competency_name already exists
      const alreadyExists = Object.values(state.competencies).some(
        (rubric) =>
          rubric.competency_name === incomingCompetency.competency_name
      );

      if (!alreadyExists) {
        state.competencies[incomingCompetency.competency_public_id] = {
          ...incomingCompetency,
          rubric_levels:
            incomingCompetency.rubric_levels &&
            incomingCompetency.rubric_levels.length > 0
              ? incomingCompetency.rubric_levels
              : defaultRubricLevels.map((level) => ({
                  rubric_level_public_id: level.rubric_level_public_id,
                  level: level.level,
                  description: level.description ?? "",
                  indicators: (level.indicators || []).map(
                    (ind: Indicator) => ({
                      ...ind,
                    })
                  ),
                })),
        };
      }
    },
    addIndicator(
      state,
      action: PayloadAction<{
        competency_public_id: string;
        level: EvaluationLevelValue;
        indicator: string;
      }>
    ) {
      const { competency_public_id, level, indicator } = action.payload;
      const rubric = state.competencies[competency_public_id];

      if (!rubric || !indicator.trim()) return;

      const foundLevel = rubric.rubric_levels.find(
        (lvl) => lvl.level === level
      );
      if (!foundLevel) return;

      foundLevel.indicators.push({
        evaluation_indicator_public_id: crypto.randomUUID(),
        indicator_text: indicator.trim(),
      });
    },

    editIndicator(
      state,
      action: PayloadAction<{
        competency_public_id: string;
        level: EvaluationLevelValue;
        evaluation_indicator_public_id: string;
        newText: string;
      }>
    ) {
      const {
        competency_public_id,
        level,
        evaluation_indicator_public_id,
        newText,
      } = action.payload;
      const rubric = state.competencies[competency_public_id];
      if (!rubric) return;
      const foundLevel = rubric.rubric_levels.find(
        (lvl) => lvl.level === level
      );
      if (!foundLevel) return;
      const indicator = foundLevel.indicators.find(
        (i) =>
          i.evaluation_indicator_public_id === evaluation_indicator_public_id
      );
      if (indicator) {
        indicator.indicator_text = newText;
      }
    },

    deleteIndicator(
      state,
      action: PayloadAction<{
        competency_public_id: string;
        level: EvaluationLevelValue;
        evaluation_indicator_public_id: string;
      }>
    ) {
      const { competency_public_id, level, evaluation_indicator_public_id } =
        action.payload;
      const rubric = state.competencies[competency_public_id];
      if (!rubric) return;

      const foundLevel = rubric.rubric_levels.find(
        (lvl) => lvl.level === level
      );
      if (!foundLevel) return;

      foundLevel.indicators = foundLevel.indicators.filter(
        (ind) =>
          ind.evaluation_indicator_public_id !== evaluation_indicator_public_id
      );
    },

    addQuestion(
      state,
      action: PayloadAction<{
        competency_public_id: string;
        question: InterviewQuestion;
      }>
    ) {
      const { competency_public_id, question } = action.payload;
      const rubric = state.competencies[competency_public_id];
      if (rubric) {
        rubric.questions.push(question);
      }
    },

    updateQuestion(
      state,
      action: PayloadAction<{
        competency_public_id: string;
        interview_question_public_id: string;
        newText: string;
        newType: string;
      }>
    ) {
      const {
        competency_public_id,
        interview_question_public_id,
        newText,
        newType,
      } = action.payload;
      const rubric = state.competencies[competency_public_id];
      if (rubric) {
        const question = rubric.questions.find(
          (q) => q.interview_question_public_id === interview_question_public_id
        );
        if (question) {
          question.question_text = newText;
          question.type = newType as QuestionType;
        }
      }
    },

    removeQuestion(
      state,
      action: PayloadAction<{
        competency_public_id: string;
        interview_question_public_id: string;
      }>
    ) {
      const { competency_public_id, interview_question_public_id } =
        action.payload;
      const rubric = state.competencies[competency_public_id];
      if (rubric) {
        rubric.questions = rubric.questions.filter(
          (q) => q.interview_question_public_id !== interview_question_public_id
        );
      }
    },

    addEvaluationLevel(
      state,
      action: PayloadAction<{
        competency_public_id: string;
        level: RubricLevel;
      }>
    ) {
      const { competency_public_id, level } = action.payload;
      const rubric = state.competencies[competency_public_id];
      if (rubric) {
        rubric.rubric_levels.push(level);
      }
    },

    updateEvaluationLevel(
      state,
      action: PayloadAction<{
        competency_public_id: string;
        levelIndex: number;
        updatedLevel: RubricLevel;
      }>
    ) {
      const { competency_public_id, levelIndex, updatedLevel } = action.payload;
      const rubric = state.competencies[competency_public_id];
      if (rubric && rubric.rubric_levels[levelIndex]) {
        rubric.rubric_levels[levelIndex] = updatedLevel;
      }
    },

    clearCompetencies(state) {
      state.competencies = {};
    },
  },
});

export const {
  setCompetency,
  addQuestion,
  updateQuestion,
  removeQuestion,
  addIndicator,
  deleteIndicator,
  editIndicator,
  addEvaluationLevel,
  updateEvaluationLevel,
  clearCompetencies,
  addRubricIfNotExists,
} = competencySlice.actions;

export default competencySlice.reducer;

export const selectCompetencies = (state: RootState) =>
  state.competencies.competencies;
export const selectRubric = (state: RootState, competency_public_id: string) =>
  state.competencies.competencies[competency_public_id].rubric_levels;
export const selectQuestions = (
  state: RootState,
  competency_public_id: string
) => state.competencies.competencies[competency_public_id].questions;
