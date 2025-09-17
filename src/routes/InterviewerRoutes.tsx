// routes/InterviewerRoutes.tsx
import { Route, Routes } from "react-router-dom";
// import AuthenticationGuard from "@/guards/AuthenticationGuard";
import InterviewTrackerPage from "@/pages/interviewer";

const InterviewerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<InterviewTrackerPage />} />
      {/* 
      <Route
        path="/"
        element={<AuthenticationGuard component={InterviewerLayout} />}
      >
        <Route path="jobs" element={<JobTrackerPage />} />
      </Route> */}
    </Routes>
  );
};

export default InterviewerRoutes;
