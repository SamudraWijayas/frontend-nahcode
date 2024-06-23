import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faTiktok, faTwitter } from "@fortawesome/free-brands-svg-icons";
import FoodieLogo from "../assets/img/logo.png";

const Footer = () => {
  return (
    <div>
      <footer>
        <img src={FoodieLogo} alt="Foodie Logo" />
        <div className="footer-text">
          <p>
            &#169; Copyright 2022, All Rights Reserved by <br />
            ClarityUI
          </p>
        </div>
        <div className="sosmed">
          <div className="medsos">
            <FontAwesomeIcon icon={faTwitter} />
          </div>
          <div className="medsos">
            <FontAwesomeIcon icon={faFacebook} />
          </div>
          <div className="medsos">
            <FontAwesomeIcon icon={faInstagram} />
          </div>
          <div className="medsos">
            <FontAwesomeIcon icon={faTiktok} />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
