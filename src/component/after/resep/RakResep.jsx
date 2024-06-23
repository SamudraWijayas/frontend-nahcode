import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../../features/AuthSlice";
import axios from "axios";
import NavbarAfter from "../../NavbarAfter";
import Footer from "../../Footer";
import Background from "../../../assets/img/img-background-2.png";
import Icon from "../../../assets/img/icon/icon-bookmark.png";
import { Link } from "react-router-dom";

const RakResep = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [categories, setCategories] = useState([]);
  const { token, isError } = useSelector((state) => state.auth);
  const [user, setUser] = useState(null);


  useEffect(() => {
    if (!token) {
      navigate("/"); // Arahkan ke halaman login jika tidak ada token
    } else {
      dispatch(getMe());
    }
  }, [dispatch, token, navigate]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

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
    const fetchFavorites = async () => {
      if (user) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/favorites/${user.id}`
          );
          setFavorites(response.data);
        } catch (error) {
          console.error("Error fetching favorites:", error);
        }
      }
    };

    fetchFavorites();
  }, [user]);

  // kategori
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

  const handleChange = (e) => {
    setSelectedCategory(e.target.value);
  };
  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.kategori : "Unknown";
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
          <div className="text1">
            <div className="titlenya">
              <h3>Rak Resep</h3>
              <img src={Icon} alt="Bookmark Icon" />
            </div>
            <form method="get" className="td-search-form-widget">
              <div role="search">
                <input
                  className="search-input"
                  type="text"
                  name="s"
                  id="s"
                  placeholder="Cari Resep ..."
                />
              </div>
              <i className="fa-solid fa-magnifying-glass search-icon"></i>
            </form>
          </div>
        </div>
      </div>
      <section className="card">
        <div className="item">
          {favorites.map((data) => (
            <Link to={`/detail/${data.resepId}`} key={data.resepId}>
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
                    
                    {/* <p>{data.kategori}</p>
                    <div className="icon-card">
                      <img src={IconStar} alt="Star Icon" />
                      <span>{data.rating}</span>
                    </div> */}
                  </div>
                  <h1>{data.judul}</h1>
                  <span>Lihat Resep &gt;&gt;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default RakResep;
