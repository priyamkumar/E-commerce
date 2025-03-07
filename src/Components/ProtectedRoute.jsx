import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

export default function ProtectedRoute({ isAdmin, children }) {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && isAuthenticated === false) {
      navigate("/signin");
    }
  }, [loading, isAuthenticated, navigate]);

  if (loading) return <Loader />;
  if (!isAuthenticated) return null;
  if (isAdmin === true && user.role !== "admin") navigate("/signin");
  return children;
}
