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
        element={
          <AuthenticationGuard>
            <RecruiterLayout />
          </AuthenticationGuard>
        }
      >
        <Route path="jobs" element={<JobTrackerPage />} />
        <Route
          path="jobs/:job_position_public_id"
          element={<ViewCandidatePage />}
        />
        <Route path="create-job" element={<CreateRolePage />} />
        <Route
          path="create-job/competency-rubric"
          element={<CreateRubricPage />}
        />
        <Route
          path="edit-job/:job_position_public_id"
          element={<EditJobPage />}
        />
        <Route
          path="edit-job/competency-rubric/:job_position_public_id"
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
