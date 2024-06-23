import React from "react";
import NavbarBefore from "../../NavbarBefore";
import Footer from "../../Footer";
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
  return (
    <>
      <div className="hero1">
        <NavbarBefore />
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
      <div class="about-me">
        <h1 data-aos="fade-up">Tentang Kami</h1>
        <div class="about-container">
          <div class="about-content">
            <div class="img" data-aos="fade-right">
              <img src={Logo} alt="" />
              <span>Selengkapnya &gt;&gt;</span>
            </div>
            <div class="about-text" data-aos="fade-left">
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
        <img src={Foto} alt="" srcset="" />
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
      <Footer/>
    </>
  );
};

export default About;
