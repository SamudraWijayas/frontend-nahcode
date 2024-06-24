import React, { useState, useEffect } from "react";
import NavAdmin from "../../component/NavAdmin";
import Sidebar from "../../component/Sidebar";
import axios from "axios";
import { message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faBook,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [isModalUser, setIsModalUser] = useState(false);
  const [isModalEditUser, setIsModalEditUser] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [kategori, setKategori] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isSidebarHidden, setIsSidebarHidden] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openEditModal = (category) => {
    setSelectedCategory(category);
    setTitle(category.kategori);
    setIsModalEditOpen(true);
  };
  const closeEditModal = () => setIsModalEditOpen(false);
  const openUser = () => setIsModalUser(true);
  const closeUser = () => setIsModalUser(false);
  const openEditUser = (user) => {
    setSelectedUser(user);
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
    setIsModalEditUser(true);
  };
  const closeEditUser = () => setIsModalEditUser(false);
  const toggleSidebar = () => setIsSidebarHidden((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/kategori`,
        { kategori: title },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      message.success("Kategori berhasil ditambahkan!");
      closeModal();
      getKategori(); // Refresh kategori
    } catch (error) {
      console.error(error);
      message.error("Terjadi kesalahan saat menambahkan kategori");
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/kategori/${selectedCategory.id}`,
        { kategori: title },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      message.success("Kategori berhasil diperbarui!");
      closeEditModal();
      getKategori(); // Refresh kategori
    } catch (error) {
      console.error(error);
      message.error("Terjadi kesalahan saat memperbarui kategori");
    }
  };

  const submitUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users`,
        { name, email, role, password, confPassword },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      message.success("User berhasil ditambahkan!");
      closeUser();
      getUsers(); // Refresh users
    } catch (error) {
      console.error(error);
      message.error("Terjadi kesalahan saat menambahkan user");
    }
  };

  const handleEditUserSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/users/${selectedUser.id}`,
        { name, email, role, password, confPassword },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      message.success("User berhasil diperbarui!");
      closeEditUser();
      getUsers(); // Refresh users
    } catch (error) {
      console.error(error);
      message.error("Terjadi kesalahan saat memperbarui user");
    }
  };

  const getUsers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/users`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      message.error("Terjadi kesalahan saat mengambil data pengguna");
    }
  };

  const getKategori = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/kategori`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setKategori(response.data);
    } catch (error) {
      console.error("Error fetching kategori:", error);
      message.error("Terjadi kesalahan saat mengambil data kategori");
    }
  };

  useEffect(() => {
    getUsers();
    getKategori();
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
                      Home
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <ul className="box-info">
              <li>
                <FontAwesomeIcon icon={faBook} className="bx" />
                <span className="textt">
                  <h3>{users.length}</h3>
                  <p>Users</p>
                </span>
              </li>
              <li>
                <FontAwesomeIcon icon={faNewspaper} className="bx" />
                <span className="textt">
                  <h3>2834</h3>
                  <p>Artikel</p>
                </span>
              </li>
              <li>
                <i className="bx bxs-dollar-circle"></i>
                <span className="textt">
                  <h3>$2543</h3>
                  <p>Total Sales</p>
                </span>
              </li>
            </ul>

            <div className="table-data">
              <div className="order">
                <div className="head">
                  <h3>User</h3>
                  <button className="btn-download" onClick={openUser}>
                    Tambah User
                  </button>
                  <i className="bx bx-search"></i>
                  <i className="bx bx-filter"></i>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>
                          <img
                            src={
                              user.avatar
                                ? `${import.meta.env.VITE_API_URL}${
                                    user.avatar
                                  }`
                                : `${
                                    import.meta.env.VITE_API_URL
                                  }/uploads/avatar.png`
                            }
                            alt="Profile Picture"
                          />
                          <p>{user.name}</p>
                        </td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                          <button onClick={() => openEditUser(user)}>
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="todo">
                <div className="head">
                  <h3>Kategori</h3>
                  <button className="btn-download" onClick={openModal}>
                    Tambah Kategori
                  </button>
                  <i className="bx bx-plus"></i>
                  <i className="bx bx-filter"></i>
                </div>
                <ul className="todo-list">
                  {kategori.map((kategori) => (
                    <li className="completed" key={kategori.id}>
                      <p>{kategori.kategori}</p>
                      <button onClick={() => openEditModal(kategori)}>
                        Edit
                      </button>
                      <i className="bx bx-dots-vertical-rounded"></i>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </main>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Buat Kategori</h2>
            <form onSubmit={handleSubmit}>
              <label>Judul</label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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

      {isModalEditOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Kategori</h2>
            <form onSubmit={handleEditSubmit}>
              <label>Judul</label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <button type="submit" className="btn">
                Simpan
              </button>
              <button type="button" className="btn" onClick={closeEditModal}>
                Batal
              </button>
            </form>
          </div>
        </div>
      )}

      {isModalUser && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Tambah User</h2>
            <form onSubmit={submitUser}>
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

              <label>Role</label>
              <select
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="">Pilih Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>

              <label>Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <label>Konfirmasi Password</label>
              <input
                type="password"
                name="confPassword"
                value={confPassword}
                onChange={(e) => setConfPassword(e.target.value)}
                required
              />

              <button type="submit" className="btn">
                Tambah
              </button>
              <button type="button" className="btn" onClick={closeUser}>
                Batal
              </button>
            </form>
          </div>
        </div>
      )}

      {isModalEditUser && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit User</h2>
            <form onSubmit={handleEditUserSubmit}>
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

              <label>Role</label>
              <select
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="">Pilih Role</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>

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

              <button type="submit" className="btn">
                Simpan
              </button>
              <button type="button" className="btn" onClick={closeEditUser}>
                Batal
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
