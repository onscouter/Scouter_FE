import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import EvaluationItem from "./EvaulationItem";
import type { RootState } from "@/store";
import {
  updateEvaluationLevel,
  addIndicator,
  deleteIndicator,
  editIndicator,
  selectRubric,
} from "@/store/newCompetencySlice";
import type { EvaluationLevelValue, RubricLevel } from "@/types/rubric";

interface EvaluationCriteriaSectionProps {
  competency_public_id: string;
  editable: boolean;
}

const EvaluationCriteriaSection: React.FC<EvaluationCriteriaSectionProps> = ({
  competency_public_id,
  editable,
}) => {
  const dispatch = useDispatch();
  const rubric = useSelector((state: RootState) =>
    selectRubric(state, competency_public_id)
  );

  const handleSave = (levelIndex: number, updatedLevel: RubricLevel) => {
    dispatch(
      updateEvaluationLevel({ competency_public_id, levelIndex, updatedLevel })
    );
  };

  const handleDeleteIndicator = (
    level: EvaluationLevelValue,
    evaluation_indicator_public_id: string
  ) => {
    dispatch(
      deleteIndicator({
        competency_public_id,
        level,
        evaluation_indicator_public_id,
      })
    );
  };

  const handleAddIndicator = (level: EvaluationLevelValue, text: string) => {
    dispatch(addIndicator({ competency_public_id, level, indicator: text }));
  };

  const handleEditIndicator = (
    level: EvaluationLevelValue,
    evaluation_indicator_public_id: string,
    newText: string
  ) => {
    dispatch(
      editIndicator({
        competency_public_id,
        level,
        evaluation_indicator_public_id,
        newText,
      })
    );
  };

  return (
    <Box>
      {rubric.map((level: RubricLevel, index: number) => (
        <EvaluationItem
          key={level.rubric_level_public_id}
          level={level}
          editable={editable}
          onSave={(updated: RubricLevel) => handleSave(index, updated)}
          onAddIndicator={handleAddIndicator}
          handleDeleteIndicator={handleDeleteIndicator}
          onEditIndicator={handleEditIndicator}
        />
      ))}
    </Box>
  );
};

export default EvaluationCriteriaSection;
