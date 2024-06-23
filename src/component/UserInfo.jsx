import React, { useState, useEffect } from "react";
import AuthService from "../service/AuthService";

const UserInfo = ({ onLogout }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await AuthService.getUserInfo();
        setUserInfo(data);
      } catch (err) {
        // Jika error adalah objek, ambil pesan error dari objek tersebut
        const errorMessage = err.response?.data?.msg || err.message || "Terjadi kesalahan pada server";
        setError(errorMessage);
      }
    };

    fetchUserInfo();
  }, []);

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      onLogout();
    } catch (err) {
      const errorMessage = err.response?.data?.msg || err.message || "Terjadi kesalahan pada server";
      setError(errorMessage);
    }
  };

  return (
    <div>
      <h2>User Info</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {userInfo ? (
        <div>
          <p>Name: {userInfo.name}</p>
          <p>Email: {userInfo.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserInfo;
