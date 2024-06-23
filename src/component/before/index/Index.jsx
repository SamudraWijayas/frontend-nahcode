import React from "react";
import Background from "../../../assets/img/img-background-1.png";
import NavbarBefore from "../../NavbarBefore";


const Index = () => {
  return (
    <div>
      <div className="hero">
        <NavbarBefore/>
        <div className="home">
          <div className="cont">
            <div className="mask"></div>
            <img
              src={Background}
              alt="Background Image"
              className="background"
            />
          </div>
          <div className="text">
            <h3>Selamat datang DI</h3>
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

export default Index;
