import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGauge, faNewspaper, faBook, faUnlock } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../features/AuthSlice";
import axios from "axios";

const Sidebar = ({ isSidebarHidden }) => {
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

  const logout = () => {
    dispatch(logOut());
    navigate("/");
  };

  return (
    <div id="sidebar" className={isSidebarHidden ? "hide" : ""}>
      <a href="#" className="brand">
        <i className="bx bxs-smile"></i>
        <span className="textt">{user && user.name}</span>
      </a>
      <ul className="side-menu top">
        <li>
          <NavLink to="/dashboard" className="active">
            <FontAwesomeIcon icon={faGauge} className="bx" />
            <span className="textt">Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/artikel-admin" className="active">
            <FontAwesomeIcon icon={faNewspaper} className="bx" />
            <span className="textt">Artikel</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/resep-admin" className="active">
            <FontAwesomeIcon icon={faBook} className="bx" />
            <span className="textt">Resep</span>
          </NavLink>
        </li>
      </ul>
      <ul className="side-menu">
        <li>
          <NavLink onClick={logout} className="logout">
            <FontAwesomeIcon icon={faUnlock} className="bx" />
            <span className="textt">Logout</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
