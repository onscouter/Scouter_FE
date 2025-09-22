import { Route, Routes } from "react-router-dom";
import InterviewTrackerPage from "@/pages/interviewer";
import AuthenticationGuard from "@/guards/AuthenticationGuard";
import RecruiterLayout from "@/layout/RecruiterLayout";
import ViewRubricPage from "@/pages/interviewer/view-rubric";

const InterviewerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<InterviewTrackerPage />} />

      <Route
        path="/"
        element={
          <AuthenticationGuard>
            <RecruiterLayout />
          </AuthenticationGuard>
        }
      >
        <Route path="view-rubric/:" element={<ViewRubricPage />} />
      </Route>
    </Routes>
  );
};

export default InterviewerRoutes;
