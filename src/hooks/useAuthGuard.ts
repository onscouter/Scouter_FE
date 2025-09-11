import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/authSlice";
import apiClient from "@/api";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  exp: number;
  sub: string;
}

export function useAuthGuard() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const { exp } = jwtDecode<JwtPayload>(token);
    if (Date.now() / 1000 > exp) {
      // expired, will be handled by interceptor
      localStorage.removeItem("token");
      navigate("/login");
      return;
    }

    apiClient
      .get("/auth/me")
      .then((res) => dispatch(setUser(res.data)))
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login");
      })
      .finally(() => setLoading(false));
  }, [dispatch, navigate]);

  return loading;
}
