import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { message } from "antd";
import YouTube from "react-youtube";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import NavbarAfter from "../../NavbarAfter";
import Background from "../../../assets/img/img-background-2.png";
import Icon from "../../../assets/img/icon/icon-chef.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faBookmark,
  faShareAlt,
} from "@fortawesome/free-solid-svg-icons";

const Detail = () => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loadingRecipe, setLoadingRecipe] = useState(true);
  const [categories, setCategories] = useState([]);
  const [isFavorited, setIsFavorited] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [users, setUsers] = useState({});

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

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoadingRecipe(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/resep/${id}`
        );
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      } finally {
        setLoadingRecipe(false);
      }
    };

    if (id) {
      fetchRecipe();
    }
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
    if (user && id) {
      const checkFavoriteStatus = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/favorite/${user.id}/${id}`
          );
          setIsFavorited(response.data.isFavorited);
        } catch (error) {
          console.error("Error checking favorite status:", error);
        }
      };

      checkFavoriteStatus();
    }
  }, [user, id]);

  useEffect(() => {
    if (user) {
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

      getFavorites();
    }
  }, [user]);

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

  const toggleFavorite = async () => {
    try {
      if (isFavorited) {
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/favorite/${user.id}/${id}`
        );
        message.success("Resep dihapus dari favorit.");
        setFavoriteCount(favoriteCount - 1);
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/favorite`, {
          userId: user.id,
          resepId: id,
        });
        message.success("Resep ditambahkan ke favorit.");
        setFavoriteCount(favoriteCount + 1);
      }
      setIsFavorited(!isFavorited);
    } catch (error) {
      console.error("Error toggling favorite:", error);
      message.error("Gagal mengubah status favorit. Silakan coba lagi nanti.");
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.kategori : "Tidak Diketahui";
  };

  const getYoutubeVideoId = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/comments`, {
        comment: newComment,
        resepId: id,
        userId: user.id,
      });
      setNewComment("");
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/comments/${id}`
      );
      setComments(response.data);
    } catch (error) {
      console.error("Error adding comment:", error);
      message.error("Gagal menambahkan komentar. Silakan coba lagi nanti.");
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

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/comments/${id}`
        );
        setComments(response.data);
        const userIds = response.data.map((comment) => comment.userId);
        if (userIds.length > 0) {
          fetchUsers(userIds);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    if (id && token) {
      fetchComments();
    }
  }, [id, token]);

  const fetchUsers = async (userIds) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/users`,
        { params: { userIds } }
      );
      const updatedUsers = response.data.reduce((acc, user) => {
        acc[user.id] = user;
        return acc;
      }, {});
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  if (loadingUser || loadingRecipe) {
    return <div>Loading...</div>;
  }

  if (loadingRecipe) {
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
              <h3>Memasak</h3>
              <img src={Icon} alt="" />
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
        <form className="form-coment" onSubmit={handleCommentSubmit}>
          <img
            src={
              user && user.avatar
                ? `${import.meta.env.VITE_API_URL}${user.avatar}`
                : `${import.meta.env.VITE_API_URL}/uploads/avatar.png`
            }
            alt="User Avatar"
            className="img-profile"
          />
          <input
            type="text"
            placeholder="Tambahkan Komentar"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            required
          />
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
