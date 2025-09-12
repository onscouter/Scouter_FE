import { Routes, Route } from "react-router-dom";
import RecruiterPage from "@/pages/RecruiterPage";
import LandingPage from "@/pages/LandingPage";
import NotFoundPage from "@/pages/NotFoundPage";
import { ToastContainer } from "react-toastify";
import useIsMobile from "@/hooks/useIsMobile";
import AuthenticationGuard from "@/guards/AuthenticationGuard";
import JobTrackerPage from "@/pages/JobTrackerPage";
import ViewCandidatePage from "@/pages/ViewCandidatePage";
import CreateRolePage from "@/pages/CreateRolePage";
import InterviewRubricPage from "@/pages/InterviewRubricPage";
import Loader from "@/components/LoaderOverlay";
import { useSelector } from "react-redux";
import { selectAppLoading } from "@/store/appSlice";
import LoginPage from "@/pages/LoginPage";
import InterviewTrackerPage from "@/pages/InterviewTrackerPage";

const AppRoutes = () => {
  const isMobile = useIsMobile();
  const isAppLoading = useSelector(selectAppLoading);

  return (
    <>
      {isAppLoading && <Loader />}

      <ToastContainer
        position={isMobile ? "top-center" : "bottom-right"}
        autoClose={3000}
        limit={3}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={isMobile ? { width: "90%", margin: "0 auto", left: "5%" } : {}}
      />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/recruiter-home"
          element={<AuthenticationGuard component={RecruiterPage} />}
        />
        <Route
          path="/recruiter-home/jobs"
          element={<AuthenticationGuard component={JobTrackerPage} />}
        />
        <Route
          path="/recruiter-home/jobs/:jobId"
          element={<AuthenticationGuard component={ViewCandidatePage} />}
        />
        <Route
          path="/recruiter-home/create-role"
          element={<AuthenticationGuard component={CreateRolePage} />}
        />
        <Route
          path="/recruiter-home/create-role/competency-rubric"
          element={<AuthenticationGuard component={InterviewRubricPage} />}
        />
        <Route
          path="/interviewer-home"
          element={<AuthenticationGuard component={InterviewTrackerPage} />}
        />
      </Routes>
    </>
  );
};

export default AppRoutes;
