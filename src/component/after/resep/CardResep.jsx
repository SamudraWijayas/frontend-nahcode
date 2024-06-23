import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { getMe } from "../../../features/AuthSlice";

const CardResep = () => {
  const [categories, setCategories] = useState([]);
  const { token } = useSelector((state) => state.auth); // Mengambil token dari state Redux
  const [resep, setResep] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [recipeFavoriteCounts, setRecipeFavoriteCounts] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) return; // Jika tidak ada token, tidak perlu melakukan fetch data
    dispatch(getMe()); // Memanggil action getMe untuk mengambil data user berdasarkan token
  }, [dispatch, token]);

  useEffect(() => {
    if (token) {
      getResep(); // Memanggil fungsi getResep jika token tersedia
      getFavorites(); // Memanggil fungsi getFavorites jika token tersedia
    }
  }, [token]);

  useEffect(() => {
    fetchCategories(); // Memanggil fungsi fetchCategories saat komponen pertama kali dirender
  }, []);

  const getResep = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/resep`);
      // console.log("API Response Resep:", response.data); // Log respons API resep

      if (response.data && response.data.length > 0) {
        response.data.forEach((item) => {
          // console.log("Recipe item:", item); // Log setiap item resep
          // console.log("Created at:", item.created_at); // Log created_at untuk setiap item
        });

        const sortedResep = response.data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setResep(sortedResep);
        // Ambil jumlah favorit untuk setiap resep
        response.data.forEach((recipe) => {
          getFavoriteCount(recipe.id);
        });
        // console.log("Sorted Resep:", sortedResep); // Log resep yang telah diurutkan
      } else {
        console.log("No recipes found");
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const getFavorites = async () => {
    try {
      console.log("Fetching favorites for userId:", token.id); // Log userId (dalam hal ini, ID dari token)
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/favorites/${token.id}`,
        {
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
          },
        }
      );
      // console.log("Favorites Response:", response.data); // Log respons data favorit dari API
      setFavorites(response.data);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
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

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.kategori : "Unknown";
  };

  const isRecipeFavorited = (recipeId) => {
    return favorites.some((favorite) => favorite.resepId === recipeId);
  };

  return (
    <section className="card">
      <div className="item">
        {resep.map((data) => (
          <Link to={`/detail/${data.id}`} key={data.id}>
            <div
              className="box"
              data-aos="fade-up"
              data-aos-delay={data.delay}
            >
              <div
                className="card-img"
                style={{
                  backgroundImage: `url(${import.meta.env.VITE_API_URL}${data.gambar})`,
                }}
              ></div>
              <div className="card-text">
                <div className="duo">
                  <p>{getCategoryName(data.kategoriId)}</p>
                  <div className="icon-card">
                    <FontAwesomeIcon
                      icon={faBookmark}
                      color={
                        user && isRecipeFavorited(data.id) ? "red" : "black"
                      }
                    />
                    <span>{recipeFavoriteCounts[data.id] || 0}</span>{" "}
                    {/* Menampilkan jumlah favorit */}
                  </div>
                </div>
                <h1>{data.judul}</h1>
                <span>Lihat Resep &gt;&gt;</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <span>efe</span>
    </section>
  );
};

export default CardResep;
