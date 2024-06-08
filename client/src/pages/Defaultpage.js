import React from "react";

import { Link } from "react-router-dom";
import "../styles/Defaulthome.css";
import Footer from "../components/Layout/Footer";
export default function Defaultpage() {
  return (
    <div className="atveek">
      <div className="home-container">
        <section className="hero-section">
          <img src="LOOOGO.png" alt="" className="logo" />
          <h1>Welcome to Money Manager</h1>
          <p>Track and manage your expenses efficiently.</p>
          <div className="button-container">
            <Link className="button" to="/login">
              Login
            </Link>
            <Link className="button" to="/register">
              Signup
            </Link>
          </div>
        </section>

        <section className="feature-section">
          <div className="feature-image">
            <img src="img2.jpg" alt="Expense Tracking" />
          </div>
          <div className="feature-description">
            <h2>Expense Tracking Made Easy</h2>
            <p>
              Effortlessly monitor your spending habits with our intuitive
              expense tracking system.
            </p>
          </div>
        </section>

        <section className="benefits-section">
          <div className="benefit">
            <img src="th.jpg" alt="Efficient Management" />
            <h3>Efficient Management</h3>
            <p>
              Streamline your financial journey with our efficient management
              tools. Seamlessly organize and categorize expenses, providing a
              comprehensive overview of your financial landscape. Take charge of
              your finances with precision and simplicity, empowering you to
              make informed decisions.
            </p>
          </div>
          <div className="benefit">
            <img src="th(5).jpg" alt="Secure Transactions" />
            <h3>Secure Transactions</h3>
            <p>
              Elevate your financial security with our robust transaction
              system, employing cutting-edge encryption protocols. Your
              sensitive information is meticulously safeguarded, ensuring each
              transaction is shielded from potential threats for a worry-free
              financial experience.
            </p>
          </div>
          <div className="benefit">
            <img src="th(6).jpg" alt="Real-time Insights" />
            <h3>Real-time Insights</h3>
            <p>
              Illuminate your financial path with instantaneous insights into
              your spending habits. Our real-time analytics offer a dynamic
              snapshot of your financial behavior, enabling timely adjustments
              and fostering a proactive approach to managing your resources
              effectively. Stay ahead, stay informed.
            </p>
          </div>
          <div className="benefit">
            <img src="Money-Management.png" alt="Efficient Management" />
            <h3>Graphs and Charts</h3>
            <p>
              Graphs and charts simplify complex data, using visuals like bars
              or lines for quick understanding. Common types include bar charts
              for category comparison and line charts for trends, widely used
              for effective communication in diverse fields.
            </p>
          </div>
        </section>
      </div>
      <div className="app-container">
        {/* Your main content goes here */}

        {/* Professional Footer */}
        {/* <footer className="footer"> 
          <div className="footer-content">
            <div className="footer-section">
              <div className="footer-logo">
                <img src="LOOOGO.png" alt="" />
              </div>
              <div className="footer-contact">
                <p>Email: info@example.com</p>
                <p>Phone: +1 123 456 7890</p>
                <p>Address: 123 Street, City</p>
              </div>
            </div>
            <div className="footer-section">
              <h3>Social Media</h3>
              <div className="footer-social">
                <a
                  href="/"
                  className="social-icon"
                  target="_blank"
                  rel="noopener noreferrer"
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
          <div className="footer-copyright">
            &copy; 2024 Money Manager. All rights reserved.
          </div>
         </footer> */}
        <Footer />
      </div>
    </div>
  );
}
