import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-black to-gray-800 text-white py-8 mt-10 w-full">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-around text-center md:text-left">
          <div className="max-w-xs mb-6">
            <h6 className="text-xl font-semibold">Money Manager</h6>
            <p className="text-gray-400 text-sm">
              Manage your expenses efficiently and effortlessly.
            </p>
          </div>

          <div className="max-w-xs mb-6">
            <h6 className="text-xl font-semibold">Contact Us</h6>
            <p className="text-gray-400">Email: support@moneymanager.com</p>
            <p className="text-gray-400">Phone: +123-456-7890</p>
          </div>

          <div className="max-w-xs mb-6">
            <h3 className="text-xl font-semibold">Follow Us</h3>
            <div className="flex justify-center md:justify-start gap-4 mt-3">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 text-2xl"
              >
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 text-2xl"
              >
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-600 text-2xl"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 text-2xl"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm py-4 border-t border-gray-700">
        &copy; 2025 Money Manager. All rights reserved.
      </div>  
    </footer>
  );
};

export default Footer;
