import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import NavbarBefore from "../../NavbarBefore"; // Pastikan nama komponen benar
import Background from "../../../assets/img/img-background-2.png";
import Icon from "../../../assets/img/icon/icon-coverfood.png";

const Resep = () => {
  const [kategori, setKategori] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State untuk menyimpan nilai input pencarian

  useEffect(() => {
    const getKategori = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/kategori`
        );
        setKategori(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    getKategori();
  }, []);

  // card
  const [categories, setCategories] = useState([]);
  const [resep, setResep] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [recipeFavoriteCounts, setRecipeFavoriteCounts] = useState({});

  useEffect(() => {
    getResep();
  }, []);

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

  // search
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update nilai input pencarian
  };

  const filteredResep = resep.filter((resep) =>
    resep.judul.toLowerCase().includes(searchTerm.toLowerCase())
  ); // Filter artikel berdasarkan input pencarian

  const margin = {
    marginBottom: "70px",
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

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.kategori : "Unknown";
  };

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
          <div className="text1">
            <div className="titlenya">
              <h3>Resep</h3>
              <img src={Icon} alt="Cover Food Icon" />
            </div>
            <form method="get" className="td-search-form-widget">
              <div role="search">
                <input
                  className="search-input"
                  type="text"
                  name="s"
                  id="s"
                  placeholder="Cari Resep ..."
                  value={searchTerm} // Mengikat nilai input dengan state searchTerm
                  onChange={handleSearchChange} // Menambahkan event handler untuk perubahan input
                />
              </div>
              <i className="fa-solid fa-magnifying-glass search-icon"></i>
            </form>
            {/* <div className="kategori">
              {kategori.map((kategoriItem) => (
                <Link
                  to={`/kategori/${kategoriItem.kategori}`}
                  key={kategoriItem.id}
                  className="link"
                >
                  <div className="list">
                    <span>{kategoriItem.kategori}</span>
                  </div>
                </Link>
              ))}
            </div> */}
          </div>
        </div>
      </div>

      <section className="card">
        <div className="item">
          {filteredResep.map((data) => (
            <Link to={`/detailbef/${data.id}`} key={data.id}>
              <div
                className="box"
                data-aos="fade-up"
                data-aos-delay={data.delay}
              >
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
                    <p>{getCategoryName(data.kategoriId)}</p>
                    <div className="icon-card">
                      <FontAwesomeIcon icon={faBookmark} color={"black"} />
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
      </section>
    </>
  );
};

export default Resep;
