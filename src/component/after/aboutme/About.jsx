import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import axios from "axios";
import { message } from "antd";
import NavbarAfter from "../../NavbarAfter";
import Background from "../../../assets/img/img-background-2.png";
import Logo from "../../../assets/img/logo.png";
import Foto from "../../../assets/img/Group 322.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTiktok,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const About = () => {
  const { token } = useSelector((state) => state.auth);
  const [loadingUser, setLoadingUser] = useState(false);
  const [user, setUser] = useState(null);
  const [contactForm, setContactForm] = useState({
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      setLoadingUser(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      } finally {
        setLoadingUser(false);
      }
    };

    if (token) {
      fetchUserData();
    }
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm({
      ...contactForm,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/contacts`,
        {
          ...contactForm,
          userId: user.id, // Include user ID from Redux state
        }
      );
      console.log(response); // Log the response object

      if (response.status === 200 || response.status === 201) {
        message.success("Pesan berhasil dikirim!");
        setContactForm({
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        console.error(`Unexpected status code: ${response.status}`);
        message.error("Gagal mengirim pesan, coba lagi nanti.");
      }
    } catch (error) {
      console.error("Error sending contact form:", error);
      message.error("Terjadi kesalahan, coba lagi nanti.");
    }
  };

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
      <div className="about-me">
        <h1 data-aos="fade-up">Tentang Kami</h1>
        <div className="about-container">
          <div className="about-content">
            <div className="img" data-aos="fade-right">
              <img src={Logo} alt="" />
              <span>Selengkapnya &gt;&gt;</span>
            </div>
            <div className="about-text" data-aos="fade-left">
              <p>
                “Foodie” mengacu pada pecinta makanan, sementara “Frame”
                menunjukkan kerangka atau platform. Situs kami adalah tempat di
                mana para pecinta makanan dapat menemukan inspirasi dan
                membagikan resep dalam sebuah kerangka yang menarik. <br />
                <br />
                Foodie Frame akan menjadi solusi terbaik bagi para pengguna
                dalam mencari, menemukan, dan mengeksplorasi beragam resep
                makanan secara praktis dan berkesan. Dengan menyediakan akses
                mudah ke koleksi resep yang terverifikasi, fitur yang beragam
                dan inovatif, panduan langkah demi langkah yang jelas, serta
                interaksi komunitas yang aktif.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="team">
        <h1>Bertemu Dengan Kami</h1>
        <img src={Foto} alt="" />
      </div>

      <div className="follow">
        <h1>Ikuti Kami di:</h1>
        <div className="sosial">
          <div className="media tw">
            <FontAwesomeIcon icon={faTwitter} className="tw" />
          </div>
          <div className="media fb">
            <FontAwesomeIcon icon={faFacebook} className="fb" />
          </div>
          <div className="media ig">
            <FontAwesomeIcon icon={faInstagram} className="ig" />
          </div>
          <div className="media tt">
            <FontAwesomeIcon icon={faTiktok} className="tt" />
          </div>
        </div>
      </div>

      <div className="contact-form">
        <h1>Hubungi Kami</h1>
        <form onSubmit={handleSubmit} className="kontak">
          <p>
            Ajukan pengaduan/kritik & saran/testimoni anda pada form dibawah
            ini!
          </p>
          <div className="form-contact">
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              name="email"
              id="email"
              value={contactForm.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-contact">
            <label htmlFor="phone">No Handphone :</label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={contactForm.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-contact">
            <label htmlFor="subject">Subyek :</label>
            <input
              type="text"
              name="subject"
              id="subject"
              value={contactForm.subject}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-contact">
            <label htmlFor="message">Pesan :</label>
            <textarea
              id="message"
              name="message"
              placeholder="Tulis pesan"
              value={contactForm.message}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          <button type="submit" className="btn-cont">
            Kirim
          </button>
        </form>
      </div>
    </>
  );
};

export default About;
