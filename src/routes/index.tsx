import { Routes, Route } from "react-router-dom";
import LandingPage from "@/pages";
import NotFoundPage from "@/pages/not-found";
import { ToastContainer } from "react-toastify";
import useIsMobile from "@/hooks/useIsMobile";
import Loader from "@/components/LoaderOverlay";
import { useSelector } from "react-redux";
import { selectAppLoading } from "@/store/appSlice";
import LoginPage from "@/pages/auth/login";
import AdminRoutes from "@/routes/AdminRoutes";
import RecruiterRoutes from "./RecruiterRoutes";
import InterviewerRoutes from "./InterviewerRoutes";

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
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/recruiter/*" element={<RecruiterRoutes />} />
        <Route path="/interviewer/*" element={<InterviewerRoutes />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
