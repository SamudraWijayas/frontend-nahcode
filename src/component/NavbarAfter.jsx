import React, { useState, useEffect } from "react";
import axios from "axios";
import FoodieLogo from "../assets/img/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faSortDown,
  faBookmark,
  faFileArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

const NavbarAfter = () => {
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

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100); // Mengubah state berdasarkan posisi gulir
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div>
      <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="logo">
          <a href="#">
            <img src={FoodieLogo} className="logo2" alt="Foodie Logo" />
          </a>
        </div>
        <div className="groub">
          <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
            <li>
              <a href="/home">Beranda</a>
            </li>
            <li>
              <a href="/resep">Resep</a>
            </li>
            <li>
              <a href="/artikel">Artikel</a>
            </li>

            <li className="dropdown">
              <a href="#" className="kegiatan-link">
                Kegiatan
                <FontAwesomeIcon icon={faSortDown} className="dropdown-icon" />
              </a>
              <div className="dropdown-content">
                <a href="/rakresep" className="kegiatan-link">
                  <FontAwesomeIcon
                    icon={faBookmark}
                    className="dropdown-icon2"
                  />{" "}
                  Rak Resep
                </a>
                <a href="/unggahan" className="kegiatan-link">
                  <FontAwesomeIcon
                    icon={faFileArrowUp}
                    className="dropdown-icon2"
                  />
                  Unggahan
                </a>
              </div>
            </li>
            <li>
              <a href="/about">Tentang Kami</a>
            </li>
          </ul>
          <div className="menu-toggle">
            <FontAwesomeIcon icon={faBars} onClick={handleToggleMenu} />
          </div>
          <a href="/profil">
            <img
              src={
                user && user.avatar
                  ? `${import.meta.env.VITE_API_URL}${user.avatar}`
                  : `${import.meta.env.VITE_API_URL}/uploads/avatar.png`
              }
              alt="Profile"
              className="img-profile"
            />
          </a>
        </div>
      </nav>
    </div>
  );
};

export default NavbarAfter;
