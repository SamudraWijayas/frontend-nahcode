import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const CardHome = () => {
  const [categories, setCategories] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const [user, setUser] = useState(null);
  const [resep, setResep] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [recipeFavoriteCounts, setRecipeFavoriteCounts] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };

    if (token) {
      fetchUserData();
    }
  }, [token]);

  useEffect(() => {
    getResep();
    if (user) {
      getFavorites();
    }
  }, [user]);

  const getResep = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/resep`);
      console.log("API Response:", response.data); // Log respons API

      if (response.data && response.data.length > 0) {
        response.data.forEach((item) => {
          console.log("Recipe item:", item); // Log setiap item resep
          console.log("Created at:", item.created_at); // Log created_at untuk setiap item
        });

        const sortedResep = response.data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setResep(sortedResep);
        // Ambil jumlah favorit untuk setiap resep
        response.data.forEach((recipe) => {
          getFavoriteCount(recipe.id);
        });
        console.log("Sorted Resep:", sortedResep); // Log resep yang telah diurutkan
      } else {
        console.log("No recipes found");
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const getFavorites = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/favorites/${user.id}`
      );
      setFavorites(response.data);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const isRecipeFavorited = (recipeId) => {
    return favorites.some((favorite) => favorite.resepId === recipeId);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/kategori`
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const getFavoriteCount = async (recipeId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/favorites/count/${recipeId}`
      );
      setRecipeFavoriteCounts((prevCounts) => ({
        ...prevCounts,
        [recipeId]: response.data.count,
      }));
    } catch (error) {
      console.error(
        `Error fetching favorite count for recipe ${recipeId}:`,
        error
      );
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.kategori : "Unknown";
  };

  const timeAgo = (timestamp) => {
    const date = new Date(timestamp);
    console.log("Parsed Date:", date); // Log tanggal yang sudah diparse
    const seconds = Math.floor((new Date() - date) / 1000);
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
      return interval + " tahun yang lalu";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return interval + " bulan yang lalu";
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return interval + " hari yang lalu";
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return interval + " jam yang lalu";
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return interval + " menit yang lalu";
    }
    return Math.floor(seconds) + " detik yang lalu";
  };

  return (
    <section className="card">
      <h1 data-aos="fade-up">Resep Terbaru</h1>
      <div className="item">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={3}
          pagination={{ clickable: true, el: ".custom-pagination" }}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 20 },
            480: { slidesPerView: 2, spaceBetween: 30 },
            640: { slidesPerView: 3, spaceBetween: 40 },
            768: { slidesPerView: 3, spaceBetween: 50 },
            1173: { slidesPerView: 3, spaceBetween: 50 },
          }}
        >
          {resep.map((data) => (
            <SwiperSlide key={data.id}>
              <Link to={`/detail/${data.id}`}>
                <div className="jancok" data-aos="fade-up">
                  <div
                    className="card-img"
                    style={{
                      backgroundImage: `url(${import.meta.env.VITE_API_URL}${
                        data.gambar
                      })`,
                    }}
                  ></div>
                  <div className="card-text">
                    {/* <p className="date">{timeAgo(data.created_at)}</p> */}
                    <div className="duo">
                      <p>{getCategoryName(data.kategoriId)}</p>
                      <div className="icon-card">
                        <FontAwesomeIcon
                          icon={faBookmark}
                          color={
                            user && isRecipeFavorited(data.id) ? "red" : "black"
                          }
                        />
                        <span>{recipeFavoriteCounts[data.id] || 0}</span>
                      </div>
                    </div>
                    <h1>{data.judul}</h1>
                    <span>{timeAgo(data.created_at)}</span>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="custom-pagination"></div>
      </div>
    </section>
  );
};

export default CardHome;
