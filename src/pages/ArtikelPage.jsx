import React, {useEffect} from "react";

import Artikel from "../component/after/artikelafter/Artikel";
import Footer from "../component/Footer";
import backgroundImage from "../assets/img/pattern.png"; // ganti dengan path yang sesuai
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/AuthSlice"



const ArtikelPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isError} = useSelector(state => state.auth)

  useEffect(()=>{
    dispatch(getMe());
  }, [dispatch]);

  useEffect(()=>{
    if(isError){
      navigate("/");
    }
  }, [isError, navigate]);

  return (
    <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", minHeight: "100vh" }}>
      <Artikel />
      <Footer/>
    </div>
  );
};

export default ArtikelPage;
