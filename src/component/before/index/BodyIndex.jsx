import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import ResepImage from "../../../assets/img/1.png";
import ResepImage2 from "../../../assets/img/2.png";
import ResepImage3 from "../../../assets/img/3.png";

const Index = () => {
  const [contact, setContact] = useState([]);

  useEffect(() => {
    console.log("VITE_API_URL:", import.meta.env.VITE_API_URL);
    getContact();
  }, []);

  const getContact = async () => {
    try {
      const apiUrl = `${import.meta.env.VITE_API_URL}/contacts`;
      console.log("Fetching from:", apiUrl);
      const response = await axios.get(apiUrl);
      setContact(response.data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  const getAbsoluteURL = (relativePath) => {
    return `${import.meta.env.VITE_API_URL}${relativePath}`;
  };

  return (
    <>
      <section>
        <div className="resep-container">
          <div className="resep" data-aos="fade-right">
            <img src={ResepImage} alt="Resep" />
            <div className="resep-text">
              <h1>Cari dan temukan resep dari Foodie Frame</h1>
              <p>
                Melalui fitur pencarian di Foodie Frame, kamu dapat menemukan
                resep berdasarkan bahan atau nama hidangan, memastikan kamu
                selalu mendapat inspirasi masak setiap harinya.
              </p>
              <span>
                <a href="/resepp">Masuk &gt;&gt;</a>
              </span>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="resep-container">
          <div className="resep2" data-aos="fade-left">
            <div className="resep-text">
              <h1>Simpan Resep Favoritmu</h1>
              <p>
                Gunakan fitur ini untuk menyimpan resep yang kamu sukai. Resep
                akan tersimpan di rak resep, kamu akan dengan mudah menemukan
                resep yang ingin kamu masak di kemudian hari.
              </p>
              <span>
                <a href="/login">Masuk &gt;&gt;</a>
              </span>
            </div>
            <img src={ResepImage2} alt="Resep" />
          </div>
        </div>
      </section>
      <section>
        <div className="resep-container">
          <div className="resep" data-aos="fade-right">
            <img src={ResepImage3} alt="Resep" />
            <div className="resep-text">
              <h1>Buat dan bagikan pengalamanmu</h1>
              <p>
                Gunakan fitur ini untuk membagikan pengalaman dan cerita menarik
                kamu tentang memasak menggunakan Foodie Frame agar di lihat oleh
                pengguna lainnya.
              </p>
              <span>
                <a href="/login">Masuk &gt;&gt;</a>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="review">
        <hr />
        <h1>Apa yang Orang Pikirkan Tentang Kami?</h1>
        <div className="review-container">
          {contact.map((contact) => (
            <div
              className="review-content"
              data-aos="fade-right"
              key={contact.id}
            >
              <div className="review-image">
                <img
                  src={
                    contact.userAvatar
                      ? getAbsoluteURL(contact.userAvatar)
                      : `${import.meta.env.VITE_API_URL}/uploads/avatar.png`
                  }
                  alt={contact.userName}
                />
              </div>
              <div className="review-text">
                <div className="review-stars">
                  {[...Array(5)].map((_, index) => (
                    <FontAwesomeIcon key={index} icon={faStar} />
                  ))}
                </div>
                <h3>"{contact.message}"</h3>
                <p>{contact.userName}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Index;
