import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

import NavbarAfter from "../../NavbarAfter";
import Background from "../../../assets/img/img-background-2.png";
import Icon from "../../../assets/img/icon/icon-articel.png";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { ArtikelMakanan } from "../../../data";

const Artikel = () => {
  const [artikel, setArtikel] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State untuk menyimpan nilai input pencarian

  useEffect(() => {
    getArtikel();
  }, []);

  const getArtikel = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/artikel-all`);
      setArtikel(response.data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update nilai input pencarian
  };

  const filteredArticles = artikel.filter((artikel) =>
    artikel.judul.toLowerCase().includes(searchTerm.toLowerCase())
  ); // Filter artikel berdasarkan input pencarian

  const margin = {
    marginBottom: "70px",
  };

  return (
    <>
      <div className="hero1">
        <NavbarAfter />
        <div className="home">
          <div className="cont1">
            <div className="mask1"></div>
            <img src={Background} alt="Background Image" className="background" />
          </div>
          <div className="text1">
            <div className="titlenya">
              <h3>Artikel</h3>
              <img src={Icon} alt="Icon" />
            </div>
            <form method="get" className="td-search-form-widget">
              <div role="search">
                <input
                  className="search-input"
                  type="text"
                  name="s"
                  id="s"
                  placeholder="Cari Artikel ..."
                  value={searchTerm} // Mengikat nilai input dengan state searchTerm
                  onChange={handleSearchChange} // Menambahkan event handler untuk perubahan input
                />
              </div>
              <i className="fa-solid fa-magnifying-glass search-icon"></i>
            </form>
            {/* <div className="list">
              <span>PALING BANYAK DICARI</span>
              <span>PALING BANYAK DISUKAI</span>
            </div> */}
          </div>
        </div>
      </div>
      <div className="art">
        <div className="artikel">
          {filteredArticles.map((artikel) => (
            <Link className="link" to={`/detail-all-artikel/${artikel.id}`} key={artikel.id}>
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
      </div>
      <section className="card">
        <hr style={margin} />
        <div className="item1">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={3}
            pagination={{ clickable: true, el: ".custom-pagination" }}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              480: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              640: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 50,
              },
              1173: {
                slidesPerView: 3,
                spaceBetween: 50,
              },
            }}
          >
            {ArtikelMakanan.map((data) => (
              <SwiperSlide key={data.id}>
                <Link to={`/detail-artikel/${data.id}`}>
                  <div className="card-artikel" data-aos="fade-up" data-aos-delay={data.delay}>
                    <div
                      className="card-img"
                      style={{ backgroundImage: `url(${data.image})` }}
                    ></div>
                    <div className="card-text" data-aos="fade-up" data-aos-duration="1500">
                      <div className="duo">
                        <p>{data.cate}</p>
                      </div>
                      <h1>{data.title}</h1>
                      <p className="description">{data.description}</p>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="custom-pagination"></div>
        </div>
      </section>
    </>
  );
};

export default Artikel;
