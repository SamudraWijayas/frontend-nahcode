import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Artikel = () => {
  const [artikel, setArtikel] = useState([]);

  useEffect(() => {
    getArtikel();
  }, []);

  const getArtikel = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/artikel-all`
      );
      setArtikel(response.data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };
  return (
    <div>
      <article>
        <h1 data-aos="fade-up">Artikel dan Berita</h1>
        <div className="artikel">
          {artikel.map((artikel) => (
            <Link
              className="link"
              to={`/detail-all-artikel/${artikel.id}`}
              key={artikel.id}
            >
              <div className="content-artikel card" data-aos="fade-right">
                <img
                  src={`${import.meta.env.VITE_API_URL}${artikel.gambar}`}
                  alt={artikel.judul}
                />
                <div className="content-text">
                  <h3>{artikel.judul}</h3>
                  <p>{artikel.content}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </article>
    </div>
  );
};

export default Artikel;
