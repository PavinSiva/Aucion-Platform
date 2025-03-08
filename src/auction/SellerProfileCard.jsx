import React from "react";

import sellerImg from "./sellerimg.png"; // Make sure the image is in the correct path

const SellerProfileCard = () => {
  return (
    <div id="admininfo">
        <div className="white"></div>

    <div id="admin">
            <h1 >admin</h1>
    </div>

    <div className="seller-profile-card">

    <div className="profile-header">
      <img src={sellerImg} alt="Seller" className="profile-img" />
      <div>
        <h2>Steve</h2>
        <p className="role">Developer</p>
      </div>
    </div>
  

    <div className="content-container">
      <div className="top-section">
        <div className="about-section">
          <h3>About</h3>
          <p><strong>Age - </strong> 30</p>
          <p><strong>Occupation - </strong> Developer</p>
          <p><strong>Location - </strong> New York</p>
          <p><strong>Personality - </strong> Introvert</p>
          <p>Steve is a Developer who is interested in collecting Smart Gadgets.</p>
        </div>

        <div className="interest-section">
          <h3>Interest</h3>
          <div className="interest-bar">
            <span>Reading</span> <div className="bar"><div className="filled" style={{ width: "80%" }}></div></div>
          </div>
          <div className="interest-bar">
            <span>Cycling</span> <div className="bar"><div className="filled" style={{ width: "50%" }}></div></div>
          </div>
          <div className="interest-bar">
            <span>Music</span> <div className="bar"><div className="filled" style={{ width: "70%" }}></div></div>
          </div>
        </div>
      </div>

      <div className="bottom-section">
        <div className="goals-section">
          <h3>Goals & Needs</h3>
          <ul>
            <li>Participation in Auction</li>
            <li>Reminders</li>
            <li>Regular Notifications</li>
            <li>Easy Access</li>
          </ul>
        </div>
  

        <div className="frustration-section">
          <h3>Frustration</h3>
          <ul>
            <li>Hard to know where the auction is taking place.</li>
            <li>He wants to travel a lot to participate in the auction.</li>
          </ul>
        </div>
  
      </div>
  
    </div>
  </div>
  </div>
  );
};

export default SellerProfileCard;
