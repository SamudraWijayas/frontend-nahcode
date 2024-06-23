import React, { useState, useEffect } from "react";
import NavbarAfter from "../../NavbarAfter";
import Background from "../../../assets/img/img-background-2.png";
import Icon from "../../../assets/img/icon/icon-profile.png";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut, getMe, updateProfile } from "../../../features/AuthSlice";
import { message } from "antd"; // Import komponen message dari Ant Design

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const { token } = useSelector((state) => state.auth);

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

  const openModal = () => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
      setPreviewAvatar(
        user.avatar
          ? `${import.meta.env.VITE_API_URL}${user.avatar}`
          : `${import.meta.env.VITE_API_URL}/uploads/avatar.png`
      );
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPreviewAvatar(
      user?.avatar
        ? `${import.meta.env.VITE_API_URL}${user.avatar}`
        : `${import.meta.env.VITE_API_URL}/uploads/avatar.png`
    );
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    setPreviewAvatar(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("role", role);
    if (password) {
      formData.append("password", password);
    }
    if (confPassword) {
      formData.append("confPassword", confPassword);
    }
    if (avatar) {
      formData.append("avatar", avatar);
    }

    try {
      const response = await dispatch(updateProfile({ id: user.id, formData, token })).unwrap();
      message.success("Profil berhasil diupdate!");
      closeModal();
      dispatch(getMe()); // Secara opsional, Anda dapat menyegarkan data pengguna
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        message.error("Mohon login ke akun Anda");
        logout();
      } else {
        message.error("Terjadi kesalahan saat mengupdate profil");
      }
    }
  };

  const logout = () => {
    dispatch(logOut());
    navigate("/");
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
              <h3>Profile Saya</h3>
              <img src={Icon} alt="Profile Icon" />
            </div>
          </div>
        </div>
      </div>

      <div className="profile-container">
        <div className="profile-card">
          <header>
            {user && (
              <>
                <img
                  src={
                    user.avatar
                      ? `${import.meta.env.VITE_API_URL}${user.avatar}`
                      : `${import.meta.env.VITE_API_URL}/uploads/avatar.png`
                  }
                  alt="Profile Picture"
                />
                <div className="profile-info">
                  <h2>{user.name}</h2>
                  <p>{user.email}</p>
                </div>
              </>
            )}
            <div className="buttons">
              <button className="edit-btn" onClick={openModal}>
                Edit Profil
              </button>
            </div>
          </header>

          <div className="keluar">
            <button onClick={logout}>Keluar</button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Profil</h2>
            <form onSubmit={handleSubmit}>
              {previewAvatar && (
                <img
                  src={previewAvatar}
                  alt="Avatar Preview"
                  width="100"
                  height="100"
                  className="avatar-profile"
                />
              )}
              <label>Nama</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <label>Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="hidden"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              />

              <label>Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <label>Konfirmasi Password</label>
              <input
                type="password"
                name="confPassword"
                value={confPassword}
                onChange={(e) => setConfPassword(e.target.value)}
              />

              <label>Avatar</label>
              <input type="file" name="avatar" onChange={handleFileChange} />

              <button type="submit" className="btn">
                Simpan
              </button>
              <button type="button" className="btn" onClick={closeModal}>
                Batal
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
