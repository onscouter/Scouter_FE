import CustomCompetencyForm from "@/features/createRole/components/CreateCustomCompetency";
import CreateRoleFooter from "@/features/createRole/components/CreateRoleFooter";
import CreateRoleHeader from "@/features/createRole/components/CreateRoleHeader";
import SelectedCompetencies from "@/features/createRole/components/SelectedCompetencies";
import SuggestedCompetencies from "@/features/createRole/components/SuggestedCompetencies";
import { mockCompetencies } from "@/features/createRole/mockCompetencies";
import { useSuggestCompetencies } from "@/features/createRole/useSuggestCompetencies";
import TrackerLayout from "@/layout/TrackerLayout";
import { setAppLoading } from "@/store/appSlice";
import type { Competency } from "@/types/competency";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

interface JobFormPageProps {
  mode: "create" | "edit";
  initialTitle?: string;
  initialDescription?: string;
  initialCompetencies?: Competency[];
  onSubmit: (data: {
    title: string;
    description: string;
    competencies: Competency[];
  }) => void;
}

const JobFormPage: React.FC<JobFormPageProps> = ({
  mode,
  initialTitle = "",
  initialDescription = "",
  initialCompetencies = [],
  onSubmit,
}) => {
  const { isPending } = useSuggestCompetencies();

  const [newTitle, setNewTitle] = useState(initialTitle);
  const [newDescription, setNewDescription] = useState(initialDescription);
  const [selectedCompetencies, setSelectedCompetencies] =
    useState<Competency[]>(initialCompetencies);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleAdd = (c: Competency) => {
    setSelectedCompetencies((prev) =>
      prev.some((x) => x.competencyId === c.competencyId) ? prev : [...prev, c]
    );
  };

  const handleRemove = (c: Competency) => {
    setSelectedCompetencies((prev) =>
      prev.filter((x) => x.competencyId !== c.competencyId)
    );
  };

  const handleToggle = (c: Competency) => {
    setSelectedCompetencies((prev) =>
      prev.some((x) => x.competencyId === c.competencyId)
        ? prev.filter((x) => x.competencyId !== c.competencyId)
        : [...prev, c]
    );
  };

  const handleSubmit = () => {
    onSubmit({
      title: newTitle,
      description: newDescription,
      competencies: selectedCompetencies,
    });
  };

  useEffect(() => {
    setAppLoading(isPending);
  }, [isPending]);

  const handleSuggestClick = () => {
    // Replace with API call
    setShowSuggestions(true);
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

      {showSuggestions && !isPending && (
        <SuggestedCompetencies
          title={newTitle}
          competencies={mockCompetencies}
          selectedCompetencies={selectedCompetencies}
          handleToggle={handleToggle}
        />
      )}

      <Box my={4}>
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
        mode={mode}
        selected={selectedCompetencies}
        handleOnClick={handleSubmit}
      />
    </TrackerLayout>
  );
};

export default JobFormPage;
