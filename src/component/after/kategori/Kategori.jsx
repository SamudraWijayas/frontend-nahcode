import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import NavbarAfter from "../../NavbarAfter";
import Background from "../../../assets/img/img-background-2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

const Kategori = () => {
  const { kategori } = useParams();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resep, setResep] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/kategori/${kategori}`
        );
        setCategory(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching category:", error);
        setLoading(false);
      }
    };

    fetchCategory();
  }, [kategori]);

  useEffect(() => {
    // Set user jika diperlukan
    if (user) {
      getFavorites();
    }
  }, [user]); // Efek samping ini akan dijalankan setiap kali user berubah

  useEffect(() => {
    if (category) {
      getResep(category.id);
    }
  }, [category]); // Efek samping ini akan dijalankan setiap kali category berubah

  const getResep = async (categoryId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/resep/category/${categoryId}`
      );
      setResep(response.data);
      // Ambil jumlah favorit untuk setiap resep
      response.data.forEach((recipe) => {
        getFavoriteCount(recipe.id);
      });
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  // favorite
  const [favorites, setFavorites] = useState([]);
  const [recipeFavoriteCounts, setRecipeFavoriteCounts] = useState({});

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!category) {
    return <div>Resep tidak ditemukan</div>;
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
          <div className="text1">
            <div className="titlenya">
              <h3>{category.kategori}</h3>
            </div>
          </div>
        </div>
      </div>
      <section className="card">
        <div className="item">
          {resep.map((data) => (
            <Link to={`/detail/${data.id}`} key={data.id}>
              <div className="box" data-aos="fade-up">
                <div
                  className="card-img"
                  style={{
                    backgroundImage: `url(${import.meta.env.VITE_API_URL}${
                      data.gambar
                    })`,
                  }}
                ></div>
                <div className="card-text">
                  <div className="duo">
                    <p>{category.kategori}</p>
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
                  <span>Lihat Resep &gt;&gt;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

export default Kategori;
