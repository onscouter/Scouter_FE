import { type CompetencyMinimal } from "@/types/competency";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setTitle, setDescription } from "@/store/newJobSlice";
import { setAppLoading } from "@/store/appSlice";
import { setCompetency } from "@/store/newCompetencySlice";
import { generateMockRubric } from "@/features/recruiter/competencyRubric/mockInterviewQuestions";
import JobFormPage from "@/pages/recruiter/job-form";

const CreateJobPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreate = ({
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

    setTimeout(() => {
      competencies.forEach((comp) => {
        const rubric = generateMockRubric(comp);
        dispatch(setCompetency(rubric));
      });

      dispatch(setAppLoading(false));
      navigate("/recruiter/create-job/competency-rubric");
    }, 1500);
  };

  return <JobFormPage mode="create" onSubmit={handleCreate} />;
};

export default CreateJobPage;
