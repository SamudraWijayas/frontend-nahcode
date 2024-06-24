import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavbarAfter from "../../NavbarAfter";
import Background from "../../../assets/img/img-background-2.png";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DetailArtikel = () => {
  const { id } = useParams();
  const [artikel, setArtikel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtikel = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/artikel-all/${id}`
        );
        setArtikel(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching article details:", error);
        setLoading(false);
      }
    };

    fetchArtikel();
  }, [id]);

  if (loading) {
    return (
      <>
        <div className="detail-artikel-content">
          <Skeleton height={315} width={560} />
          <div className="content-text">
            <Skeleton width={100} />
          </div>
        </div>
      </>
    );
  }

  if (!artikel) {
    return <div>Article not found</div>;
  }

  return (
    <>
      <div className="hero1">
        <NavbarAfter />
        <div className="home">
          <div className="cont1">
            <div className="mask1"></div>
            <img
              src={Background}
              alt="Background Image"
              className="background"
            />
          </div>
        </div>
      </div>
      <div className="detail-artikel-cont">
        <div className="detail-artikel-content">
          <h1>{artikel.judul}</h1>
          <img
            src={`${import.meta.env.VITE_API_URL}${artikel.gambar}`}
            alt={artikel.judul}
          />
          <div className="content-text">{artikel.content}</div>
        </div>
      </div>
    </>
  );
};

export default DetailArtikel;
