import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "@/layout/AdminLayout";
import AdminLandingPage from "@/pages/admin";
import TeamDirectory from "@/pages/admin/team-directory";
import ActiveRoles from "@/pages/admin/active-roles";
import AuthenticationGuard from "@/guards/AuthenticationGuard";
// import Overview from "@/pages/admin/overview"; // if needed

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLandingPage />} />

      <Route
        path="/"
        element={
          <AuthenticationGuard>
            <AdminLayout />
          </AuthenticationGuard>
        }
      >
        {/* <Route path="overview" element={<Overview />} /> */}
        <Route path="team-directory" element={<TeamDirectory />} />
        <Route path="active-roles" element={<ActiveRoles />} />
      </Route>
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
};

export default AdminRoutes;
