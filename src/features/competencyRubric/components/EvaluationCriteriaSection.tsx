import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
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

  const handleDeleteIndicator = (score: number, indicatorId: string) => {
    dispatch(deleteIndicator({ competencyId, score, indicatorId }));
  };

  const handleAddIndicator = (score: number, text: string) => {
    dispatch(addIndicator({ competencyId, score, indicator: text }));
  };

  const handleEditIndicator = (
    score: number,
    indicatorId: string,
    newText: string
  ) => {
    dispatch(editIndicator({ competencyId, score, indicatorId, newText }));
  };

  return (
    <Box>
      {criteria.map((level, index) => (
        <EvaluationItem
          key={`${competencyId}-${level.score}`}
          level={level}
          editable={editable}
          onSave={(updated: EvaluationLevel) => handleSave(index, updated)}
          onAddIndicator={handleAddIndicator}
          handleDeleteIndicator={handleDeleteIndicator}
          onEditIndicator={handleEditIndicator}
        />
      ))}
    </Box>
  );
};

export default EvaluationCriteriaSection;
