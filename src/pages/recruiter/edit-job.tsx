import { type Competency, type CompetencyMinimal } from "@/types/competency";
import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { setTitle, setDescription, clearJob } from "@/store/newJobSlice";
import { setAppLoading } from "@/store/appSlice";
import JobFormPage from "@/pages/recruiter/job-form";
import { useEffect } from "react";
import { useGetJob } from "@/features/recruiter/editJob/useGetJob";
import { setJob } from "@/store/newJobSlice";
import {
  setCompetency,
  removeCompetency,
  clearCompetencies,
} from "@/store/newCompetencySlice";
import { useGenerateRubric } from "@/features/recruiter/competencyRubric/useGenerateRubric";

const EditJobPage = () => {
  const { job_position_public_id } = useParams<{
    job_position_public_id: string;
  }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearCompetencies());
    dispatch(clearJob());
  }, [dispatch]);

  const { data: job, isLoading } = useGetJob(job_position_public_id ?? "");

  const { mutate: generateRubric, isPending } = useGenerateRubric();

  useEffect(() => {
    dispatch(setAppLoading(isLoading || !job || isPending));
  }, [isLoading, isPending, dispatch, job]);

  useEffect(() => {
    if (job) {
      dispatch(setJob(job));
      job.competencies.forEach((competency: Competency) => {
        dispatch(setCompetency(competency));
      });
    }
  }, [job, dispatch]);

  const handleEdit = ({
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

    const existingIds = new Set(
      job.competencies.map((c: Competency) => c.competency_public_id)
    );

    const updatedIds = new Set(
      competencies.map((c: CompetencyMinimal) => c.competency_public_id)
    );

    const newCompetencies = competencies.filter(
      (c) => !existingIds.has(c.competency_public_id)
    );

    const removedCompetencies = job.competencies.filter(
      (c: Competency) => !updatedIds.has(c.competency_public_id)
    );

    console.log("New:", newCompetencies);
    console.log("Removed:", removedCompetencies);

    dispatch(
      removeCompetency(
        removedCompetencies.map((c: Competency) => c.competency_public_id)
      )
    );

    if (newCompetencies.length > 0) {
      generateRubric(
        { title, description, competencies: newCompetencies },
        {
          onSuccess: (data) => {
            data.competencies.forEach((c: Competency) => {
              dispatch(setCompetency(c));
            });
            navigate("/recruiter/create-job/competency-rubric");
          },
          onError: (error) => {
            console.error("Failed to generate rubric:", error);
          },
        }
      );
    } else {
      navigate(
        `/recruiter/edit-job/competency-rubric/${job_position_public_id}`
      );
    }
  };

  if (!job || isLoading) return null;

  return (
    <JobFormPage
      mode="edit"
      initialTitle={job.title}
      initialDescription={job.description}
      initialCompetencies={job.competencies}
      onSubmit={handleEdit}
    />
  );
};

export default EditJobPage;
