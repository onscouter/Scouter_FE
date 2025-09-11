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
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setTitle, setDescription } from "@/store/newJobSlice";
import { setAppLoading } from "@/store/appSlice";
import { setRubric } from "@/store/rubricSlice";
import { generateMockRubric } from "@/features/competencyRubric/mockInterviewQuestions";
import { useSuggestCompetencies } from "@/features/createRole/useSuggestCompetencies";

const CreateRolePage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const selectedCompetencies = useSelector(selectSelectedCompetencies);

  const { mutate: test, isPending } = useSuggestCompetencies();

  const suggestedCompetencies = mockCompetencies;
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCompetencies, setSelectedCompetencies] = useState<
    Competency[]
  >([]);

  const handleOnClick = () => {
    dispatch(setAppLoading(true));
    dispatch(setTitle(newTitle));
    dispatch(setDescription(newDescription));
    setTimeout(() => {
      selectedCompetencies.forEach((comp) => {
        const rubric = generateMockRubric(comp);
        dispatch(setRubric(rubric));
      });

      dispatch(setAppLoading(false));
      navigate("/recruiter-home/create-role/competency-rubric");
    }, 1500);
  };

  const handleAdd = (competency: Competency) => {
    setSelectedCompetencies((prev) =>
      prev.some((c) => c.id === competency.id) ? prev : [...prev, competency]
    );
  };

  const handleRemove = (competency: Competency) => {
    setSelectedCompetencies((prev) =>
      prev.filter((c) => c.id !== competency.id)
    );
  };

  const handleToggle = (competency: Competency) => {
    setSelectedCompetencies((prev) =>
      prev.some((c) => c.id === competency.id)
        ? prev.filter((c) => c.id !== competency.id)
        : [...prev, competency]
    );
  };

  const clearSelectedCompetencies = () => {
    setSelectedCompetencies([]);
  };

  const handleSuggestClick = async () => {
    setShowSuggestions(false);

    // need to replace with API call
    // if (newTitle && newDescription) {
    //   const mock = suggestCompetencies({
    //     title: newTitle,
    //     description: newDescription,
    //   });

    setShowSuggestions(true);
    // }
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
