import CustomCompetencyForm from "@/features/recruiter/jobForm/components/CustomCompetency";
import CreateRoleFooter from "@/features/recruiter/jobForm/components/JobFormFooter";
import CreateRoleHeader from "@/features/recruiter/jobForm/components/JobFormHeader";
import SelectedCompetencies from "@/features/recruiter/jobForm/components/SelectedCompetencies";
import SuggestedCompetencies from "@/features/recruiter/jobForm/components/SuggestedCompetencies";
import { useSuggestCompetencies } from "@/features/recruiter/createJob/useSuggestCompetencies";
import type { CompetencyMinimal } from "@/types/competency";
import { Box } from "@mui/material";
import { useState } from "react";

interface JobFormPageProps {
  mode: "create" | "edit";
  initialTitle?: string;
  initialDescription?: string;
  initialCompetencies?: CompetencyMinimal[];
  onSubmit: (data: {
    title: string;
    description: string;
    competencies: CompetencyMinimal[];
  }) => void;
}

const JobFormPage: React.FC<JobFormPageProps> = ({
  mode,
  initialTitle = "",
  initialDescription = "",
  initialCompetencies = [],
  onSubmit,
}) => {
  const { mutate, isPending } = useSuggestCompetencies();

  const [newTitle, setNewTitle] = useState(initialTitle);
  const [newDescription, setNewDescription] = useState(initialDescription);
  const [selectedCompetencies, setSelectedCompetencies] =
    useState<CompetencyMinimal[]>(initialCompetencies);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [generatedCompetencies, setGeneratedCompetencies] = useState<
    CompetencyMinimal[]
  >([]);
  const [lastSuggestedTitle, setLastSuggestedTitle] = useState(initialTitle);
  const [lastSuggestedDescription, setLastSuggestedDescription] =
    useState(initialDescription);

  const handleAdd = (c: CompetencyMinimal) => {
    setSelectedCompetencies((prev) =>
      prev.some((x) => x.competency_public_id === c.competency_public_id)
        ? prev
        : [...prev, c]
    );
  };

  const handleRemove = (c: CompetencyMinimal) => {
    setSelectedCompetencies((prev) =>
      prev.filter((x) => x.competency_public_id !== c.competency_public_id)
    );
  };

  const handleToggle = (c: CompetencyMinimal) => {
    setSelectedCompetencies((prev) =>
      prev.some((x) => x.competency_public_id === c.competency_public_id)
        ? prev.filter((x) => x.competency_public_id !== c.competency_public_id)
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

  const isSuggestDisabled =
    !newTitle ||
    !newDescription ||
    (generatedCompetencies.length > 0 &&
      newTitle === lastSuggestedTitle &&
      newDescription === lastSuggestedDescription) ||
    (mode === "edit" &&
      newTitle === lastSuggestedTitle &&
      newDescription === lastSuggestedDescription);

  const handleSuggestClick = () => {
    setShowSuggestions(true);

    mutate(
      { job_title: newTitle, job_description: newDescription },
      {
        onSuccess: (data) => {
          if (data?.competencies) {
            setGeneratedCompetencies(data.competencies);
            setLastSuggestedTitle(newTitle);
            setLastSuggestedDescription(newDescription);
          }
        },
      }
    );
  };

  return (
    <>
      <CreateRoleHeader
        title={newTitle}
        setTitle={setNewTitle}
        description={newDescription}
        setDescription={setNewDescription}
        handleSuggestClick={handleSuggestClick}
        isSuggestDisabled={isSuggestDisabled}
      />

      {showSuggestions && (
        <SuggestedCompetencies
          title={newTitle}
          competencies={generatedCompetencies}
          selectedCompetencies={selectedCompetencies}
          handleToggle={handleToggle}
          isPending={isPending}
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
    </>
  );
};

export default JobFormPage;
