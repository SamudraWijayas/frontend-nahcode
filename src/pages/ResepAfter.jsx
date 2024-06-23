import React, {useEffect} from "react";

import CardResep from "../component/after/resep/CardResep";
import Footer from "../component/Footer";
import backgroundImage from "../assets/img/pattern.png"; // ganti dengan path yang sesuai
import HomeResep from "../component/after/resep/Resep";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/AuthSlice";

const ResepAfter = () => {
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
        <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", minHeight: "100vh" }}>
          <HomeResep />
          {/* <CardResep/> */}
          <Footer/>
        </div>
      );
}

export default ResepAfter