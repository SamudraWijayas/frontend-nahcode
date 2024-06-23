import React, { useEffect, useState } from "react";
import { message } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import NavbarAfter from "../../NavbarAfter";
import Background from "../../../assets/img/img-background-2.png";
import Icon from "../../../assets/img/icon/icon-rackrecipe.png";
import { useSelector } from "react-redux";

const Unggahan = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [artikel, setArtikel] = useState([]);
  const { token } = useSelector((state) => state.auth); // Ambil token dari Redux state

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  useEffect(() => {
    if (token) {
      getArtikel();
    }
  }, [token]); // Panggil getArtikel saat token berubah

  const getArtikel = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/artikel`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setArtikel(response.data);
    } catch (error) {
      console.error("Error fetching artikel:", error);
      message.error("Terjadi kesalahan saat mengambil data artikel");
    }
  };

  const addArtikel = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("judul", title);
      formData.append("content", description);
      formData.append("gambar", image);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/artikel`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      message.success("Artikel berhasil ditambahkan!");
      closeModal();
      getArtikel(); // Refresh daftar artikel setelah berhasil menambahkan
    } catch (error) {
      console.error(error);
      message.error("Terjadi kesalahan saat menambahkan artikel");
    }
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
              <h3>Postinganku</h3>
              <img src={Icon} alt="" />
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
            <button className="btn" onClick={openModal}>
              Buat Postingan
            </button>
          </div>
        </div>
      </div>

      <div className="art">
        <div className="artikel">
          {artikel.map((artikel) => (
            <Link
              className="link"
              to={`/detail-all-artikel/${artikel.id}`}
              key={artikel.id}
            >
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

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Buat Postingan</h2>
            <form onSubmit={addArtikel}>
              <label>Judul</label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <label>Deskripsi</label>
              <textarea
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
              <label>Gambar</label>
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                required
              />
              <button type="submit" className="btn">
                Posting
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

export default Unggahan;
