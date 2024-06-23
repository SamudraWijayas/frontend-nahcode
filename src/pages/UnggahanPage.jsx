import React, { useEffect } from "react";
import Unggahan from "../component/after/unggahan/Unggahan";
import UnggahArtikel from "../component/after/unggahan/UnggahArtikel";
import Footer from "../component/Footer";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/AuthSlice";

const UnggahanPage = () => {
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
      <Unggahan />
      <Footer />
    </div>
  );
};

export default UnggahanPage;
