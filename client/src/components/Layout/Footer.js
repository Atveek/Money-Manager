import React from "react";
//import "./App.css"; // Ensure this import is present
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const footerStyle = {
    background: "linear-gradient(to right bottom, #000000, #232526)",
    padding: "10px 50px",
    color: "#eee",
    textAlign: "center",
    position: "relative",
    marginTop: "50px",
    width: "100%",
  };

  const footerContentStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  };

  const footerSectionStyle = {
    width: "100%",
    maxWidth: "300px",
    margin: "20px",
    color: "white",
  };

  const footerContactStyle = {
    fontSize: "1.2em",
  };

  const footerSocialStyle = {
    marginTop: "20px",
    color: "green",
  };

  const textCenterStyle = {
    textAlign: "center",
    color: "white",
    fontSize: "15px",
  };

  const mt3Style = {
    marginTop: "1rem",
  };
  const footersocial = {
    color: "white",
    background:"grey"
  };
 
  const title = {
    color:"white"
  }
  return (
    <footer style={footerStyle}>
      <div className="container">
        <div style={footerContentStyle}>
          <div style={footerSectionStyle}>
            <h6 style={textCenterStyle}>Money Manager</h6>
            <p style={textCenterStyle}>
              Manage your expenses efficiently and effortlessly.
            </p>
          </div>
          <div style={footerSectionStyle}>
            <h6>Contact Us</h6>
            <p>Email: support@moneymanager.com</p>
            <p>Phone: +123-456-7890</p>
          </div>
          <div style={footerSectionStyle}>
            <div className="footer-section">
              <h3 style={title}>Social Media</h3>
              <div className="footersocial" style={footersocial}>
                <a
                  href="/"
                  className="social-icon"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="white"
                >
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a
                  href="/"
                  className="social-icon"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a
                  href="/"
                  className="social-icon"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a
                  href="/"
                  className="social-icon"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ ...textCenterStyle, ...mt3Style }}>
        <p>&copy; 2024 Money Manager. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
