  import React, { useEffect, useState } from "react";
  import Background from "../../../assets/img/img-background-3.png";
  import NavbarAfter from "../../NavbarAfter";
  import { useSelector } from "react-redux";
  import axios from "axios";

  const Home = () => {
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

    return (
      <div>
        <div className="hero">
          <NavbarAfter />
          <div className="home">
            <div className="cont">
              <div className="maskhome"></div>
              <img
                src={Background}
                alt="Background Image"
                className="background"
              />
            </div>
            <div className="text">
              <h3>Selamat datang {user && user.name} di</h3>
              <h1>Foodie Frame</h1>
              <hr />
              <p>
                Dimana Setiap Rasa Bercerita <br />
                Petualangan kuliner Anda menanti
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default Home;
