import React, { useEffect } from "react";
import Home from "../component/after/home/Home";
import CardHome from "../component/after/home/CardHome";
import Artikel from "../component/after/home/Artikel";
import About from "../component/after/home/About";
import Footer from "../component/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/AuthSlice";

const HomePage = () => {
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
    <>
      <Home />
      <CardHome />
      <Artikel />
      <Footer />
    </>
  );
};

export default HomePage;
