import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux"; // Import useSelector
import NavAdmin from "../NavAdmin";
import Sidebar from "../Sidebar";
import axios from "axios";
import { message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const ArtikelAdmin = () => {
  const [isSidebarHidden, setIsSidebarHidden] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [judul, setJudul] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [artikel, setArtikel] = useState([]);

  const token = useSelector((state) => state.auth.token); // Mengambil token dari Redux store

  useEffect(() => {
    getArtikel();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("judul", judul);
      formData.append("content", content);
      formData.append("gambar", image);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/artikel`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Sertakan token dalam header
          },
        }
      );
      console.log(response.data);
      message.success("Artikel berhasil ditambahkan!");
      closeModal();
      getArtikel(); // Segarkan artikel
    } catch (error) {
      console.error(error);
      message.error("Terjadi kesalahan saat menambahkan artikel");
    }
  };

  const deleteArtikel = async (artikelId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/artikel/${artikelId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Sertakan token dalam header
        },
      });
      getArtikel(); // Segarkan daftar setelah penghapusan
      message.success("Artikel berhasil dihapus");
    } catch (error) {
      console.error("Error deleting artikel:", error);
      message.error("Terjadi kesalahan saat menghapus artikel");
    }
  };

  const getArtikel = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/artikel-all`, {
        headers: {
          Authorization: `Bearer ${token}`, // Sertakan token dalam header
        },
      });
      setArtikel(response.data);
    } catch (error) {
      console.error("Error fetching artikel:", error);
      message.error("Terjadi kesalahan saat mengambil data artikel");
    }
  };

  const toggleSidebar = () => {
    setIsSidebarHidden((prev) => !prev);
  };

  return (
    <>
      <div className="dashboard">
        <Sidebar isSidebarHidden={isSidebarHidden} />
        <div className="content-dashboard">
          <NavAdmin toggleSidebar={toggleSidebar} />
          <main>
            <div className="head-title">
              <div className="left">
                <h1>Dashboard</h1>
                <ul className="breadcrumb">
                  <li>
                    <a href="#">Dashboard</a>
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faAngleRight} />
                  </li>
                  <li>
                    <a className="active" href="#">
                      Artikel
                    </a>
                  </li>
                </ul>
              </div>
              <button className="btn-download" onClick={openModal}>
                Buat Artikel
              </button>
            </div>

            <div className="table-data">
              <div className="order">
                <div className="head">
                  <h3>Artikel</h3>
                  <i className="bx bx-search"></i>
                  <i className="bx bx-filter"></i>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Judul</th>
                      <th>Content</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {artikel.map((data) => (
                      <tr key={data.id}>
                        <td>
                          <img
                            src={`${import.meta.env.VITE_API_URL}${data.gambar}`}
                            alt="Gambar Artikel"
                          />
                          <p>{data.judul}</p>
                        </td>
                        <td>
                          <pre className="content-pre">{data.content}</pre>
                        </td>
                        <td>
                          <button
                            onClick={() => deleteArtikel(data.id)}
                            className="status pending"
                          >
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Buat Artikel</h2>
            <form onSubmit={handleSubmit}>
              <label>Judul</label>
              <input
                type="text"
                name="judul"
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                required
              />

              <label>Content</label>
              <textarea
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)} // Corrected the onChange handler
                rows="5"
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

export default ArtikelAdmin;
