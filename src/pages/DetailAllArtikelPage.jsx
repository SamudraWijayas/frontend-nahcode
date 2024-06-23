import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/AuthSlice";
import Footer from "../component/Footer";
import DetailAllArtikel from "../component/after/artikelafter/DetailAllArtikel";

const DetailArtikelPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);
  return (
    <div>
      <DetailAllArtikel />
      <Footer />
    </div>
  );
};

export default DetailArtikelPage;
