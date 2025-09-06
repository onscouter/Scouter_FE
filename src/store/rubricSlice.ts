import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  Rubric,
  RubricState,
  EvaluationLevel,
  InterviewQuestion,
} from "@/types/rubric";
import { defaultEvaluationLevels } from "@/features/competencyRubric/rubricConstants";
import type { RootState } from ".";

const initialState: RubricState = {
  rubrics: {},
};

const rubricSlice = createSlice({
  name: "rubric",
  initialState,
  reducers: {
    setRubric(state, action: PayloadAction<Rubric>) {
      const rubric = action.payload;

      state.rubrics[rubric.competencyId] = {
        ...rubric,
        criteria:
          rubric.criteria && rubric.criteria.length > 0
            ? rubric.criteria
            : defaultEvaluationLevels.map((level) => ({
                ...level,
                description: level.description ?? "",
                indicators: level.indicators?.map((ind) => ({ ...ind })) ?? [],
              })),
      };
    },

    addIndicator(
      state,
      action: PayloadAction<{
        competencyId: string;
        levelKey: string;
        indicator: string;
      }>
    ) {
      const { competencyId, levelKey, indicator } = action.payload;
      const rubric = state.rubrics[competencyId];

      if (!rubric || !indicator.trim()) return;

      const level = rubric.criteria.find((lvl) => lvl.levelKey === levelKey);
      if (!level) return;

      level.indicators.push({
        id: crypto.randomUUID(),
        competencyId,
        text: indicator.trim(),
      });
    },

    editIndicator(
      state,
      action: PayloadAction<{
        competencyId: string;
        levelKey: string;
        indicatorId: string;
        newText: string;
      }>
    ) {
      const { competencyId, levelKey, indicatorId, newText } = action.payload;
      const rubric = state.rubrics[competencyId];
      if (!rubric) return;
      const level = rubric.criteria.find((lvl) => lvl.levelKey === levelKey);
      if (!level) return;
      const indicator = level.indicators.find((i) => i.id === indicatorId);
      if (indicator) {
        indicator.text = newText;
      }
    },

    deleteIndicator(
      state,
      action: PayloadAction<{
        competencyId: string;
        levelKey: string;
        indicatorId: string;
      }>
    ) {
      const { competencyId, levelKey, indicatorId } = action.payload;
      const rubric = state.rubrics[competencyId];
      if (!rubric) return;

      const level = rubric.criteria.find((lvl) => lvl.levelKey === levelKey);
      if (!level) return;

      level.indicators = level.indicators.filter(
        (ind) => ind.id !== indicatorId
      );
    },

    addQuestion(
      state,
      action: PayloadAction<{
        competencyId: string;
        question: InterviewQuestion;
      }>
    ) {
      const { competencyId, question } = action.payload;
      const rubric = state.rubrics[competencyId];
      if (rubric) {
        rubric.questions.push(question);
      }
    },

    updateQuestion(
      state,
      action: PayloadAction<{
        competencyId: string;
        questionId: string;
        newText: string;
      }>
    ) {
      const { competencyId, questionId, newText } = action.payload;
      const rubric = state.rubrics[competencyId];
      if (rubric) {
        const question = rubric.questions.find((q) => q.id === questionId);
        if (question) {
          question.text = newText;
        }
      }
    },

    removeQuestion(
      state,
      action: PayloadAction<{ competencyId: string; questionId: string }>
    ) {
      const { competencyId, questionId } = action.payload;
      const rubric = state.rubrics[competencyId];
      if (rubric) {
        rubric.questions = rubric.questions.filter((q) => q.id !== questionId);
      }
    },

    addEvaluationLevel(
      state,
      action: PayloadAction<{
        competencyId: string;
        level: EvaluationLevel;
      }>
    ) {
      const { competencyId, level } = action.payload;
      const rubric = state.rubrics[competencyId];
      if (rubric) {
        rubric.criteria.push(level);
      }
    },

    updateEvaluationLevel(
      state,
      action: PayloadAction<{
        competencyId: string;
        levelIndex: number;
        updatedLevel: EvaluationLevel;
      }>
    ) {
      const { competencyId, levelIndex, updatedLevel } = action.payload;
      const rubric = state.rubrics[competencyId];
      if (rubric && rubric.criteria[levelIndex]) {
        rubric.criteria[levelIndex] = updatedLevel;
      }
    },

    clearRubrics(state) {
      state.rubrics = {};
    },
  },
});

export const {
  setRubric,
  addQuestion,
  updateQuestion,
  removeQuestion,
  addIndicator,
  deleteIndicator,
  editIndicator,
  addEvaluationLevel,
  updateEvaluationLevel,
  clearRubrics,
} = rubricSlice.actions;

export default rubricSlice.reducer;

export const selectRubrics = (state: RootState) => state.rubric.rubrics;
export const selectCriteria = (state: RootState, competencyId: string) =>
  state.rubric.rubrics[competencyId].criteria;
export const selectQuestions = (state: RootState, competencyId: string) =>
  state.rubric.rubrics[competencyId].questions;
