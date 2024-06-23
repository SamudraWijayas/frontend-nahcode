import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UnggahArtikel = () => {
  useEffect(() => {
    getArtikel();
  }, []);
  const [artikel, setArtikel] = useState([]);
  const getArtikel = async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/artikel`);
    setArtikel(response.data);
  };
  return (
    <div>
      <div className="art">
        <div className="artikel">
          {artikel.map((artikel) => (
            <Link className="link" to={`/detail-artikel/${artikel.id}`} key={artikel.id}>
              <div
                className="content-artikel card"
                data-aos="fade-right"
              >
                <img
                  src={`${import.meta.env.VITE_API_URL}${artikel.gambar}`}
                  alt={artikel.judul}
                />{" "}
                {/* Path gambar */}
                <div className="content-text">
                  <h3>{artikel.judul}</h3>
                  <p>{artikel.content}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UnggahArtikel;
