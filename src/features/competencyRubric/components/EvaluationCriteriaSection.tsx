import { Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import EvaluationItem from "./EvaulationItem";
import type { RootState } from "@/store";
import {
  updateEvaluationLevel,
  addIndicator,
  deleteIndicator,
  editIndicator,
  selectCriteria,
} from "@/store/rubricSlice";
import type { EvaluationLevel } from "@/types/rubric";

interface EvaluationCriteriaSectionProps {
  competencyId: string;
  editable: boolean;
}

const EvaluationCriteriaSection: React.FC<EvaluationCriteriaSectionProps> = ({
  competencyId,
  editable,
}) => {
  const dispatch = useDispatch();
  const criteria = useSelector((state: RootState) =>
    selectCriteria(state, competencyId)
  );

  const handleSave = (levelIndex: number, updatedLevel: EvaluationLevel) => {
    dispatch(updateEvaluationLevel({ competencyId, levelIndex, updatedLevel }));
  };

  const handleDeleteIndicator = (levelKey: string, indicatorId: string) => {
    dispatch(
      deleteIndicator({
        competencyId,
        levelKey,
        indicatorId,
      })
    );
  };

  const onAddIndicator = (levelKey: string, indicatorText: string) => {
    dispatch(
      addIndicator({
        competencyId,
        levelKey,
        indicator: indicatorText,
      })
    );
  };

  const onEditIndicator = (
    levelKey: string,
    indicatorId: string,
    newText: string
  ) => {
    dispatch(
      editIndicator({
        competencyId,
        levelKey,
        indicatorId,
        newText,
      })
    );
  };

  return (
    <Box>
      {criteria.map((level, index) => (
        <EvaluationItem
          key={level.levelKey}
          level={level}
          editable={editable}
          onSave={(updated: EvaluationLevel) => handleSave(index, updated)}
          onAddIndicator={onAddIndicator}
          handleDeleteIndicator={handleDeleteIndicator}
          onEditIndicator={onEditIndicator}
        />
      ))}
    </Box>
  );
};

export default EvaluationCriteriaSection;
