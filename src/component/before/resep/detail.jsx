import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import YouTube from "react-youtube"; // Import YouTube component
import NavbarBefore from "../../NavbarBefore"; // Pastikan nama komponen benar
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import Skeleton CSS

import Background from "../../../assets/img/img-background-2.png";
import Icon from "../../../assets/img/icon/icon-chef.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faBookmark,
  faShareAlt,
} from "@fortawesome/free-solid-svg-icons";

const Detail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [isFavorited, setIsFavorited] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState({});
  const [user, setUser] = useState(null); // Add user state

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/resep/${id}`
        );
        setRecipe(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

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

  useEffect(() => {
    if (id) {
      const getFavoriteCount = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/favorites/count/${id}`
          );
          setFavoriteCount(response.data.count);
        } catch (error) {
          console.error("Error fetching favorite count:", error);
        }
      };

      getFavoriteCount();
    }
  }, [id]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/comments/${id}`
        );
        setComments(response.data);
        const userIds = response.data.map((comment) => comment.userId);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [id]);

  const toggleFavorite = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/favorites/toggle/${id}`
      );
      setIsFavorited(response.data.isFavorited);
      setFavoriteCount(response.data.favoriteCount);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: recipe.judul,
          text: `Lihat resep ${recipe.judul} di Foodie Frame!`,
          url: window.location.href,
        });
        message.success("Resep berhasil dibagikan.");
      } catch (error) {
        message.error("Gagal membagikan resep. Silakan coba lagi nanti.");
      }
    } else {
      message.error("Fitur berbagi tidak didukung di browser ini.");
    }
  };

  if (loading) {
    return (
      <>
        <NavbarBefore />
        <div className="container-memasak">
          <h1><Skeleton width={200} /></h1>
          <div className="detail-memasak">
            <Skeleton height={315} width={560} />
            <div className="detail-text">
              <div className="text-1">
                <h3><Skeleton width={100} /></h3>
                <p><Skeleton count={3} /></p>
              </div>
              <div className="text-1">
                <h3><Skeleton width={150} /></h3>
                <p><Skeleton width={100} /></p>
              </div>
              <div className="text-1">
                <h3><Skeleton width={100} /></h3>
                <span><Skeleton width={100} /></span>
                <p><Skeleton width={200} /></p>
              </div>
              <div className="icons">
                <Skeleton circle={true} height={30} width={30} />
                <Skeleton circle={true} height={30} width={30} />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!recipe) {
    return <div>Resep tidak ditemukan</div>;
  }

  const getYoutubeVideoId = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.kategori : "Tidak Diketahui";
  };

  const renderAvatar = (userId) => {
    if (users[userId] && users[userId].avatar) {
      return `${import.meta.env.VITE_API_URL}${users[userId].avatar}`;
    } else {
      return `${import.meta.env.VITE_API_URL}/uploads/avatar.png`;
    }
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
              <h3>Memasak</h3>
              <img src={Icon} alt="Icon Chef" />
            </div>
          </div>
        </div>
      </div>

      <div className="container-memasak">
        <h1>{recipe.judul}</h1>
        <div className="detail-memasak">
          {recipe.linkVideo ? (
            <YouTube
              videoId={getYoutubeVideoId(recipe.linkVideo)}
              opts={{
                height: "315",
                width: "560",
                playerVars: {
                  autoplay: 0,
                },
              }}
            />
          ) : (
            <img
              src={`${import.meta.env.VITE_API_URL}${recipe.gambar}`}
              alt="Gambar Resep"
            />
          )}
          <div className="detail-text">
            <div className="text-1">
              <h3>{getCategoryName(recipe.kategoriId)}</h3>
              <p>{recipe.deskripsi}</p>
            </div>
            <div className="text-1">
              <h3>Estimasi Waktu :</h3>
              <p>{recipe.estimasi}</p>
            </div>
            <div className="text-1">
              <h3>Creator :</h3>
              <span>{recipe.creator}</span>
              <p>Content Creator, Food Blogger, Food Reviewer</p>
            </div>

            <div className="icons">
              <div className="favorite-icon" onClick={toggleFavorite}>
                <FontAwesomeIcon
                  icon={faBookmark}
                  color={isFavorited ? "red" : "black"}
                />
                <span>{favoriteCount}</span>
              </div>
              <div className="share-icon" onClick={handleShare}>
                <FontAwesomeIcon icon={faShareAlt} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-bahan-makanan">
        <hr />
        <div className="resep-makanan">
          <div className="bahan">
            <h1>Bahan - Bahan :</h1>
            <ul>
              {recipe.bahan.split("\n").map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="cara-masak">
            <h1>Cara Memasak :</h1>
            <ul>
              {recipe.langkah.split("\n").map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="komentar">
        <hr />
        <div className="title-coment">
          <FontAwesomeIcon icon={faComment} />
          <span>{comments.length} Komentar</span>
        </div>
        <form className="form-coment">
          <input type="text" placeholder="Tambahkan Komentar" required />
          <button type="submit" className="btn-comment">
            Kirim
          </button>
        </form>
        <div className="isi-komentar">
          {comments.map((comment) => (
            <div key={comment.id} className="comment-section">
              <div className="comment">
                <div className="user-avatar">
                  <img
                    src={
                      comment.userAvatar
                        ? `${import.meta.env.VITE_API_URL}${comment.userAvatar}`
                        : `${import.meta.env.VITE_API_URL}/uploads/avatar.png`
                    }
                    alt="User Avatar"
                  />
                </div>
                <div className="comment-content">
                  <div className="user-name">{comment.userName}</div>

                  <div className="comment-text">{comment.comment}</div>
                  <div className="comment-time">{comment.createdAt}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Detail;
