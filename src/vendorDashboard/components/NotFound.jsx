import React from "react";
import "../../App.css"; 

const NotFound = () => {
  return (
    <div className="nf-container">
      <div className="nf-content">
        <img
          className="nf-image"
          src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
          alt="Page Not Found"
        />

        <h1 className="nf-title">404</h1>
        <p className="nf-text">Oops! The page you are looking for does not exist.</p>

        <a href="/" className="nf-button">
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
