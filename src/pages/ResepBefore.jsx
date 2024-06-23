import React from "react";
import Footer from "../component/Footer";
import backgroundImage from "../assets/img/pattern.png"; // ganti dengan path yang sesuai
import HomeResep from "../component/before/resep/Resep";

const ResepBefore = () => {
  return (
    <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", minHeight: "100vh" }}>
      <HomeResep />
      <Footer/>
    </div>
  );
};

export default ResepBefore;
