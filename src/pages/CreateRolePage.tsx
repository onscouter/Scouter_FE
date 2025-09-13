import { type Competency } from "@/types/competency";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setTitle, setDescription } from "@/store/newJobSlice";
import { setAppLoading } from "@/store/appSlice";
import { setRubric } from "@/store/rubricSlice";
import { generateMockRubric } from "@/features/competencyRubric/mockInterviewQuestions";
import JobFormPage from "@/pages/JobFormPage";

const CreateRolePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreate = ({
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

    setTimeout(() => {
      competencies.forEach((comp) => {
        const rubric = generateMockRubric(comp);
        dispatch(setRubric(rubric));
      });

      dispatch(setAppLoading(false));
      navigate("/recruiter-home/create-role/competency-rubric");
    }, 1500);
  };

  return <JobFormPage mode="create" onSubmit={handleCreate} />;
};

export default CreateRolePage;
