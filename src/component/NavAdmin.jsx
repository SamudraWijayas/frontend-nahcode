import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NavAdmin = ({ toggleSidebar }) => {
  const [user, setUser] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const menuIconRef = useRef(null);

  useEffect(() => {
    const menuIcon = menuIconRef.current;
    menuIcon.addEventListener("click", toggleSidebar);

    return () => {
      menuIcon.removeEventListener("click", toggleSidebar);
    };
  }, [toggleSidebar]);

  return (
    <header>
      <div className="icon-bar-admin">
        <FontAwesomeIcon icon={faBars} ref={menuIconRef} />
      </div>
      <a href="#" className="nav-link">
        Categories
      </a>
      <form action="#">
        <div className="form-input">
          <input type="search" placeholder="Search..." />
          <button type="submit" className="search-btn">
            <i className="bx bx-search"></i>
          </button>
        </div>
      </form>
      <input type="checkbox" id="switch-mode" hidden />
      <label htmlFor="switch-mode" className="switch-mode"></label>
      <a href="#" className="profile">
        <img
          src={
            user && user.avatar
              ? `${import.meta.env.VITE_API_URL}${user.avatar}`
              : `${import.meta.env.VITE_API_URL}/uploads/avatar.png`
          }
          alt="Profile"
        />
      </a>
    </header>
  );
};

export default NavAdmin;
