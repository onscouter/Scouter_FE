import { Box, useTheme } from "@mui/material";
import TrackerLayout from "@/layout/TrackerLayout";
import CreateRoleHeader from "@/features/createRole/components/CreateRoleHeader";
import { useEffect, useState } from "react";
import DotLoader from "react-spinners/DotLoader";
import SuggestedCompetencies from "@/features/createRole/components/SuggestedCompetencies";
import { mockCompetencies } from "@/features/createRole/mockCompetencies";
import { type Competency } from "@/types/competency";
import SelectedCompetencies from "@/features/createRole/components/SelectedCompetencies";
import CreateRoleFooter from "@/features/createRole/components/CreateRoleFooter";
import CustomCompetencyForm from "@/features/createRole/components/CreateCustomCompetency";
import { useSuggestCompetencies } from "@/features/createRole/useSuggestCompetencies";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  setSuggestedCompetencies,
  toggleSelectedCompetency,
  clearSelectedCompetencies,
  addSelectedCompetency,
  removeSelectedCompetency,
  selectSuggestedCompetencies,
  selectSelectedCompetencies,
  setTitle,
  setDescription,
} from "@/store/newJobSlice";

const CreateRolePage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearSelectedCompetencies());
  }, [dispatch]);

  const suggestedCompetencies = useSelector(selectSuggestedCompetencies);
  const selectedCompetencies = useSelector(selectSelectedCompetencies);

  const { mutate: suggestCompetencies, isPending } = useSuggestCompetencies();

  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleOnClick = () => {
    navigate(`/recruiter-home/create-role/competency-rubric`);
  };

  const handleSuggestClick = async () => {
    setShowSuggestions(false);

    dispatch(setTitle(newTitle));
    dispatch(setDescription(newDescription));

    // need to replace with API call
    // if (newTitle && newDescription) {
    //   const mock = suggestCompetencies({
    //     title: newTitle,
    //     description: newDescription,
    //   });

    dispatch(setSuggestedCompetencies(mockCompetencies));
    setShowSuggestions(true);
    // }
  };

  const handleAdd = (comp: Competency) => {
    dispatch(addSelectedCompetency(comp));
  };

  const handleRemove = (comp: Competency) => {
    dispatch(removeSelectedCompetency(comp));
  };

  const handleToggle = (comp: Competency) => {
    dispatch(toggleSelectedCompetency(comp));
  };

  return (
    <TrackerLayout maxWidth={800}>
      <CreateRoleHeader
        title={newTitle}
        setTitle={setNewTitle}
        description={newDescription}
        setDescription={setNewDescription}
        handleSuggestClick={handleSuggestClick}
      />

      {isPending && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            my: 4,
          }}
          my={4}
        >
          <DotLoader size={80} color={theme.palette.primary.main} />
        </Box>
      )}

      {showSuggestions && !isPending && (
        <SuggestedCompetencies
          title={newTitle}
          competencies={suggestedCompetencies}
          selectedCompetencies={selectedCompetencies}
          handleToggle={handleToggle}
        />
      )}
      <Box mb={5} mt={4}>
        <CustomCompetencyForm
          onAdd={handleAdd}
          showForm={showForm}
          setShowForm={setShowForm}
        />
      </Box>

      <Box mb={4}>
        <SelectedCompetencies
          selected={selectedCompetencies}
          onRemove={handleRemove}
        />
      </Box>

      <CreateRoleFooter
        selected={selectedCompetencies}
        handleOnClick={handleOnClick}
      />
    </TrackerLayout>
  );
};

export default CreateRolePage;
