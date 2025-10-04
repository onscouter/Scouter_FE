import { type Competency, type CompetencyMinimal } from "@/types/competency";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setTitle, setDescription } from "@/store/newJobSlice";
import { setAppLoading } from "@/store/appSlice";
import { setCompetency } from "@/store/newCompetencySlice";
import JobFormPage from "@/pages/recruiter/job-form";
import { useGenerateRubric } from "@/features/recruiter/competencyRubric/useGenerateRubric";
import { useEffect } from "react";

const CreateJobPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate: generateRubric, isPending } = useGenerateRubric();

  useEffect(() => {
    dispatch(setAppLoading(isPending));
  }, [isPending, dispatch]);

  const handleCreate = ({
    title,
    description,
    competencies,
  }: {
    title: string;
    description: string;
    competencies: CompetencyMinimal[];
  }) => {
    dispatch(setTitle(title));
    dispatch(setDescription(description));

    generateRubric(
      { title, description, competencies },
      {
        onSuccess: (data) => {
          data.competencies.forEach((c: Competency) => {
            dispatch(setCompetency(c));
          });

          navigate("/recruiter/create-job/competency-rubric");
        },
        onError: (error) => {
          console.error("Failed to generate rubric:", error);
          // Optional: fallback dispatch or retry logic
        },
      }
    );
  };

  return <JobFormPage mode="create" onSubmit={handleCreate} />;
};

export default CreateJobPage;
