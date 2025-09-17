// routes/RecruiterRoutes.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import RecruiterLayout from "@/layout/RecruiterLayout";
import AuthenticationGuard from "@/guards/AuthenticationGuard";

import RecruiterPage from "@/pages/recruiter"; // index.tsx
import JobTrackerPage from "@/pages/recruiter/job-tracker";
import ViewCandidatePage from "@/pages/candidates/view";
import CreateRolePage from "@/pages/recruiter/create-job";
import CreateRubricPage from "@/pages/recruiter/create-competency";
import EditJobPage from "@/pages/recruiter/edit-job";
import EditRubricPage from "@/pages/recruiter/edit-competency";

const RecruiterRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<RecruiterPage />} />

      <Route
        path="/"
        element={<AuthenticationGuard component={RecruiterLayout} />}
      >
        <Route path="jobs" element={<JobTrackerPage />} />
        <Route path="jobs/:jobId" element={<ViewCandidatePage />} />
        <Route path="create-role" element={<CreateRolePage />} />
        <Route
          path="create-role/competency-rubric"
          element={<CreateRubricPage />}
        />
        <Route path="edit-job/:jobId" element={<EditJobPage />} />
        <Route
          path="edit-job/competency-rubric/:jobId"
          element={<EditRubricPage />}
        />
      </Route>

      {/* Optional: redirect /recruiter/* unknown paths */}
      <Route
        path="/recruiter/*"
        element={<Navigate to="/recruiter" replace />}
      />
    </Routes>
  );
};

export default RecruiterRoutes;
