import React, { useState, useEffect } from "react";
import FoodieLogo from "../assets/img/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";

const NavbarIndex = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 200); // Mengubah state berdasarkan posisi gulir
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
              <a href="/resep">Beranda</a>
            </li>
            <li>
              <a href="/aboutbef">Tentang Kami</a>
            </li>
            <li className="regis">
              <a href="/register">Registrasi</a>
            </li>
            <li className="login">
              <a href="/login">Masuk</a>
            </li>
          </ul>

          <div className="menu-toggle">
            <FontAwesomeIcon icon={faBars} onClick={handleToggleMenu} />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavbarIndex;
