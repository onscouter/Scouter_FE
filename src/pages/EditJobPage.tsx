import { type Competency } from "@/types/competency";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setTitle, setDescription } from "@/store/newJobSlice";
import { setAppLoading } from "@/store/appSlice";
import { selectRubrics, setRubric } from "@/store/rubricSlice";
import JobFormPage from "@/pages/JobFormPage";
import { useEffect } from "react";
import { useGetRole } from "@/features/editRole/useGetRole";
import type { Rubric } from "@/types/rubric";
import { generateMockRubric } from "@/features/competencyRubric/mockInterviewQuestions";

const EditJobPage = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(jobId);
  const { data, isLoading } = useGetRole(jobId ?? "");
  console.log(data);
  useEffect(() => {
    dispatch(setAppLoading(isLoading));
  }, [isLoading, dispatch]);

  useEffect(() => {
    // Only set Redux state when data is fully ready
    if (data) {
      dispatch(setTitle(data.title));
      dispatch(setDescription(data.description));
      data.rubric.forEach((rubricBlock: Rubric) => {
        dispatch(setRubric(rubricBlock));
      });
    }
  }, [data, dispatch]);

  const testing = useSelector(selectRubrics);
  console.log(testing);
  if (isLoading || !data) {
    return null; // or a loading spinner
  }

  const handleEdit = ({
    title,
    description,
    competencies,
  }: {
    title: string;
    description: string;
    competencies: Competency[];
  }) => {
    dispatch(setAppLoading(true));
    dispatch(setTitle(title));
    dispatch(setDescription(description));

    competencies.forEach((comp) => {
      const rubric = generateMockRubric(comp);
      dispatch(setRubric(rubric));
    });
    setTimeout(() => {
      dispatch(setAppLoading(false));
      navigate("/recruiter-home/edit-job/competency-rubric");
    }, 50);
  };

  return (
    <JobFormPage
      mode="edit"
      initialTitle={data.title}
      initialDescription={data.description}
      initialCompetencies={data.rubric}
      onSubmit={handleEdit}
    />
  );
};

export default EditJobPage;
