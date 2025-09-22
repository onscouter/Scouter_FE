import { type Competency, type CompetencyMinimal } from "@/types/competency";
import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { setTitle, setDescription } from "@/store/newJobSlice";
import { setAppLoading } from "@/store/appSlice";
import JobFormPage from "@/pages/recruiter/job-form";
import { useEffect } from "react";
import { useGetJob } from "@/features/recruiter/editJob/useGetJob";
import { setJob } from "@/store/newJobSlice";
import { generateMockRubric } from "@/features/recruiter/competencyRubric/mockInterviewQuestions";
import {
  setCompetency,
  addRubricIfNotExists,
} from "@/store/newCompetencySlice";

const EditJobPage = () => {
  const { job_position_public_id } = useParams<{
    job_position_public_id: string;
  }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: job, isLoading } = useGetJob(job_position_public_id ?? "");
  useEffect(() => {
    dispatch(setAppLoading(isLoading || !job));
  }, [isLoading, dispatch, job]);

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
    dispatch(setAppLoading(true));
    dispatch(setTitle(title));
    dispatch(setDescription(description));

    competencies.forEach((comp) => {
      const rubric = generateMockRubric(comp);
      dispatch(addRubricIfNotExists(rubric));
    });

    setTimeout(() => {
      dispatch(setAppLoading(false));
      navigate(
        `/recruiter/edit-job/competency-rubric/${job_position_public_id}`
      );
    }, 50);
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
