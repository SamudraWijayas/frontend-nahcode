import React from "react";
import Logo from "../../../assets/img/logo.png";

const About = () => {
  return (
    <div>
      <div class="about">
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
    </div>
  );
};

export default About;
