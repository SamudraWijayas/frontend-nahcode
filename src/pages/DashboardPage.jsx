import React, { useEffect } from "react";
import Dashboard from "../component/admin/Dashboard";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/AuthSlice";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, isError } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token) {
      navigate("/"); // Arahkan ke halaman login jika tidak ada token
    } else {
      dispatch(getMe());
    }
  }, [dispatch, token, navigate]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);
  return (
    <div>
      <Dashboard />
    </div>
  );
};

export default DashboardPage;
