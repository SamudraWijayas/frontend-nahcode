import { useState, useEffect } from "react";
import NavAdmin from "../NavAdmin";
import Sidebar from "../Sidebar";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/AuthSlice";
import { message } from "antd"; // Assuming you are using Ant Design for message alerts

const ResepAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isSidebarHidden, setIsSidebarHidden] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [bahan, setBahan] = useState("");
  const [langkah, setLangkah] = useState("");
  const [creator, setCreator] = useState("");
  const [estimasi, setEstimasi] = useState("");
  const [linkVideo, setLinkVideo] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/kategori`);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
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
      formData.append("deskripsi", deskripsi);
      formData.append("bahan", bahan);
      formData.append("langkah", langkah);
      formData.append("creator", creator);
      formData.append("estimasi", estimasi);
      formData.append("linkVideo", linkVideo);
      formData.append("gambar", image);
      formData.append("kategoriId", selectedCategory);

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/resep`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(response.data);
      message.success("Resep berhasil ditambahkan!");
      closeModal();
      getResep(); // Refresh recipes
    } catch (error) {
      console.error("Error adding recipe:", error);
      message.error("Terjadi kesalahan saat menambahkan resep");
    }
  };

  const toggleSidebar = () => {
    setIsSidebarHidden((prev) => !prev);
  };

  const getResep = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/resep`);
      setResep(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const deleteResep = async (resepId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/resep/${resepId}`);
      getResep(); // Refresh recipes after deletion
      message.success("Resep berhasil dihapus");
    } catch (error) {
      console.error("Error deleting recipe:", error);
      message.error("Terjadi kesalahan saat menghapus resep");
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.kategori : "Unknown";
  };

  const handleChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const [resep, setResep] = useState([]);

  useEffect(() => {
    getResep();
  }, []);

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
                      Resep
                    </a>
                  </li>
                </ul>
              </div>
              <button className="btn-download" onClick={openModal}>
                Buat Resep
              </button>
            </div>

            <div className="table-data">
              <div className="order">
                <div className="head">
                  <h3>Resep</h3>
                  <i className="bx bx-search"></i>
                  <i className="bx bx-filter"></i>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Judul</th>
                      <th>Kategori</th>
                      <th>Bahan</th>
                      <th>Langkah</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resep.map((resep) => (
                      <tr key={resep.id}>
                        <td>
                          <img src={`${import.meta.env.VITE_API_URL}${resep.gambar}`} alt="User" />
                          <p>{resep.judul}</p>
                        </td>
                        <td>{getCategoryName(resep.kategoriId)}</td>
                        <td>
                          <pre className="content-pre">{resep.bahan}</pre>
                        </td>
                        <td>
                          <pre className="content-pre">{resep.langkah}</pre>
                        </td>
                        <td>
                          <button onClick={() => deleteResep(resep.id)} className="status pending">
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
            <h2>Buat Resep</h2>
            <form onSubmit={handleSubmit}>
              <label>Judul</label>
              <input
                type="text"
                name="judul"
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                required
              />
              <label>Deskripsi</label>
              <input
                type="text"
                name="deskripsi"
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                required
              />

              <label>Kategori</label>
              <select
                value={selectedCategory}
                onChange={handleChange}
                name="kategoriId"
                required
              >
                <option value="">Pilih Kategori</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.kategori}
                  </option>
                ))}
              </select>

              <label>Bahan</label>
              <textarea
                name="bahan"
                value={bahan}
                onChange={(e) => setBahan(e.target.value)}
                rows="5"
                required
              ></textarea>

              <label>Langkah</label>
              <textarea
                name="langkah"
                value={langkah}
                onChange={(e) => setLangkah(e.target.value)}
                rows="5"
                required
              ></textarea>

              <label>Link Video</label>
              <input
                type="text"
                name="linkVideo"
                value={linkVideo}
                onChange={(e) => setLinkVideo(e.target.value)}
                required
              />

              <label>Creator</label>
              <input
                type="text"
                name="creator"
                value={creator}
                onChange={(e) => setCreator(e.target.value)}
                required
              />

              <label>Estimasi Waktu</label>
              <input
                type="text"
                name="estimasi"
                value={estimasi}
                onChange={(e) => setEstimasi(e.target.value)}
                required
              />

              <label>Gambar</label>
              <input
                type="file"
                name="gambar"
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

export default ResepAdmin;
