import React from "react";
import { IoHomeOutline, IoBicycleSharp } from "react-icons/io5";
import { FaFacebook, FaInstagram, FaSquareXTwitter } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import "./home.css";
import hammer from "./hammer.png";
import Logo from "./logo.jpeg";
import About from "./aboutimage.jpg";
import { VscAccount } from "react-icons/vsc";
import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Testimonials from "./Testimonials";


import per1 from "./per1.jpg";
import per2 from "./per2.jpg";
import per3 from "./per3.jpg";
import per4 from "./per4.jpg";
import per5 from "./per5.jpg";
import per6 from "./per6.jpg";
import per7 from "./per7.jpg";
import per8 from "./per8.png";
import main6 from "./main6.png";
import imgdash from "./imgdash.png";
import soon from "./soon.png";
import bg from "./bgtext.jpg";
import welcome from "./welcome.png";

import slide1 from "./slide1.png";
import slide2 from "./slide2.png";
import slide3 from "./slide3.png";
import slide4 from "./slide4.png";
import slide5 from "./slide5.png";
import slide6 from "./slide6.png";
import slide7 from "./slide7.png";
import slide8 from "./slide8.png";
import slide9 from "./slide9.png";


import wslide1 from "./wslide1.png";
import wslide2 from "./wslide2.png";
import wslide3 from "./wslide3.png";
import wslide4 from "./wslide4.png";
import wslide5 from "./wslide5.png";
import wslide6 from "./wslide6.png";
import wslide7 from "./wslide7.png";
import wslide8 from "./wslide8.png";
import wslide9 from "./wslide9.png";


const Home = ({ products, deleteProduct, user, setUser }) => {
  const navigate = useNavigate();

  const images = [per1, per2, per3, per4, per5, per6, per7, per8];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Appointment booked!");
  };

  const [bid, setBid] = useState(0);
  useEffect(() => {
    const savedBid = localStorage.getItem("currentBid");
    if (savedBid) {
      setBid(Number(savedBid));
    }
  }, []);

  const [scrolling, setScrolling] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true);
        controls.start({
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
        });
      } else {
        setScrolling(false);
        controls.start({ backgroundColor: "transparent", boxShadow: "none" });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls]);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div>
      <link
        href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
        rel="stylesheet"
      ></link>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="navbar"
      >
        <ul>
          <div id="head">
            <li>
              <p>Grey Friday</p>
            </li>
            <li>
              <img id="nav-logo" src={Logo} alt="" />
            </li>
          </div>

          <motion.li whileHover={{ scale: 1.1 }}>
            <a className="nava" href="#">
              <IoHomeOutline aria-label="Home" />
            </a>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }}>
            <a className="nava" href="#productsale">
              Products
            </a>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }}>
            <a className="nava" href="#about">
              About
            </a>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }}>
            <a className="nava" href="#service">
              Service
            </a>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }}>
            <a className="nava" href="#footer">
              Contact
            </a>
          </motion.li>

          <li>
            <div className="dropdown">
              <motion.button
                id="login-btn"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <VscAccount id="acc" />
              </motion.button>
              <div className="dropdown-content">
                {user ? (
                  <>
                    <span className="dd">{user.fullName}</span>
                    <a
                      className="dd"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        localStorage.removeItem("user");
                        setUser(null);
                        alert("Logged out!");
                      }}
                    >
                      Sign Out
                    </a>
                  </>
                ) : (
                  <a
                    className="dd"
                    href="#"
                    onClick={() => navigate("/navigation")}
                  >
                    Sign In
                  </a>
                )}
                <a className="dd" href="#">
                  Settings
                </a>
                <a className="dd" href="#productsale">
                  Products
                </a>
              </div>
            </div>
          </li>
        </ul>
      </motion.nav>

      <div>
        <div className="white"></div>

        <motion.div
          className="main"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="main-text"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          >
            <img src={welcome} id="welcome" alt="" />
            <h1>Online Auction Website</h1>
            <p>GREAT SAVINGS AND BARGAINS ONLINE RIGHT NOW!</p>
          </motion.div>

          <motion.div
            className="main-img"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          >
            <img id="main-1" src={main6} alt="" />
          </motion.div>
        </motion.div>
      </div>

      <div id="brandpar">
        <h1>Top Brands & Partners</h1>
          <div className="wslider">
          <div className="slide-track">
            <div className="br">
              <img src={wslide1} alt="" />
            </div>
            <div className="br">
              <img src={wslide2} alt="" />
            </div>
            <div className="br">
              <img src={wslide3} alt="" />
            </div>
            <div className="br">
              <img src={wslide4} alt="" />
            </div>
            <div className="br">
              <img src={wslide5} alt="" />
            </div>
            <div className="br">
              <img src={wslide6} alt="" />
            </div>
            <div className="br">
              <img src={wslide7} alt="" />
            </div>
            <div className="br">
              <img src={wslide8} alt="" />
            </div>
            <div className="br">
              <img src={wslide9} alt="" />
            </div>

            <div className="br">
              <img src={wslide1} alt="" />
            </div>
            <div className="br">
              <img src={wslide2} alt="" />
            </div>
            <div className="br">
              <img src={wslide3} alt="" />
            </div>
            <div className="br">
              <img src={wslide4} alt="" />
            </div>
            <div className="br">
              <img src={wslide5} alt="" />
            </div>
            <div className="br">
              <img src={wslide6} alt="" />
            </div>
            <div className="br">
              <img src={wslide7} alt="" />
            </div>
            <div className="br">
              <img src={wslide8} alt="" />
            </div>
            <div className="br">
              <img src={wslide9} alt="" />
            </div>
          </div>
        </div>
      </div>
      

      <motion.div
        className="text-section"
        id="top"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div
          className="text"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h1>
            <span>Hot </span>Sale! <br />
            Hunt Your Treasure
          </h1>
          <p>
            Let's go <span>Treasure</span> Hunting
          </p>
          <a className="btn-explore" href="#productsale">
            Explore Products
          </a>
        </motion.div>
        <div className="icon">
          <img
            src={hammer}
            className="ham bx-tada"
            alt="Auction Hammer"
            height="200px"
          />
        </div>
      </motion.div>

      <div className="image-con" id="about">
        <div className="slide">
          <h1>Top Buyers</h1>
          <img src={images[index]} alt="" />
        </div>
        <div className="logo-image">
          <img src={About} alt="" id="aboutimage" />
          <p>
            At <span id="iname">Grey Friday</span> , we bring buyers and sellers
            together in a dynamic and secure online auction marketplace. Our
            platform specializes in real estate, fine art, antiques,
            collectibles, automobiles, luxury goods, and industrial equipment.
          </p>
        </div>
        <div className="about-text">
          <h1>Why Choose Grey Friday?</h1>
          <ul>
            <li>
              Exclusive & Rare Items – Find one-of-a-kind treasures, from
              celebrity-owned memorabilia to ancient artifacts.
            </li>
            <li>
              Secure & Transparent Bidding – Our platform ensures a fair and
              trustworthy auction process.
            </li>
            <li>
              Secure & Transparent Bidding – Our platform ensures a fair and
              Expert Authentication – We verify the authenticity of high-value
              items, giving you confidence in your purchases.trustworthy auction
              process.
            </li>
            <li>
              Expert Authentication – We verify the authenticity of high-value
              items, giving you confidence in your purchases.
            </li>
          </ul>
        </div>
        <div className="works">
          <h1>How It Works</h1>
          <p>
            {" "}
            Browse: Explore auctions featuring rare and high-value items. <br />
            Bid: Place real-time bids and compete to win your desired items.{" "}
            <br />
            Win & Own: If your bid wins, complete the payment securely and get
            your item delivered.
          </p>
        </div>
      </div>

      <motion.div
        className="product"
        id="productsale"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            className="content"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
            }}
          >
            <motion.img
              src={product.img}
              alt={product.name}
              height="220px"
              onError={(e) => (e.target.style.display = "none")}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />
            <h2>{product.name}</h2>
            <p>{product.sdescription}</p>
            <h6>Starting bid: ${product.sbid}</h6>
            <div className="btn-container">
              <motion.button
                className="explore"
                onClick={() =>
                  navigate(`/product/${product.id}`, { state: product })
                }
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Explore
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="service"
        id="service"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <motion.div
          className="ser-content"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h1>Our Services</h1>
          <p>
            Grey Friday offers a range of services to help buyers and sellers
            navigate the auction process. Whether you’re looking to sell a
            valuable item or acquire a rare collectible, we provide the
            expertise and support you need. Our services include:
          </p>
          <ul>
            {[
              "Consignment Services",
              "Appraisal & Valuation",
              "Authentication & Certification",
              "Shipping & Delivery",
              "Customer Support",
            ].map((service, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {service}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="ser-img"
          // initial={{ opacity: 0, x: 50 }}
          // whileInView={{ opacity: 1, x: 0 }}
          // transition={{ duration: 0.8, ease: "easeOut" }}
          // viewport={{ once: true }}
        >
          <img src={imgdash} id="ser-img" alt="" />
        </motion.div>
      </motion.div>
      <Testimonials />

      <motion.footer
        id="footer"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="row">
          {/* Company Info Column */}
          <motion.div
            className="coloumn"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img src={Logo} className="footer-logo" alt="Company Logo" />
            <p>
              At <span id="footer-cname">Grey Friday</span>, we bring buyers and
              sellers together in a dynamic and secure online auction
              marketplace.
            </p>
          </motion.div>

          {/* Office Details Column */}
          <motion.div
            className="coloumn"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3>Office</h3>
            <p>7/772 Church Street</p>
            <p>Anna Nagar</p>
            <p>Chennai, PIN 638008, Tamil Nadu</p>
            <p className="email">greyfriday@gmail.com</p>
            <h4>+91 - 9876554489</h4>
          </motion.div>

          {/* Links Column */}
          <motion.div
            className="coloumn"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3>Links</h3>
            <ul>
              <li>
                <a href="#top">
                  <IoHomeOutline aria-label="Home" />
                </a>
              </li>
              <li>
                <a href="#productsale">Products</a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#service">Service</a>
              </li>
              <li>
                <a href="#footer">Contact</a>
              </li>
            </ul>
          </motion.div>

          {/* Appointment & Social Media Column */}
          <motion.div
            className="coloumn"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Appointment</h2>
            <form onSubmit={handleSubmit}>
              <input type="number" placeholder="Contact Number" required />
              <button type="submit">Book Appointment</button>
            </form>

            {/* Social Icons Animation */}
            <motion.div
              className="social-icons"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <a target="_blank" href="https://facebook.com" aria-label="Facebook">
                <FaFacebook className="fb" />
              </a>
              <a target="_blank" href="https://instagram.com" aria-label="Instagram">
                <FaInstagram className="ins" />
              </a>
              <a target="_blank" href="https://twitter.com" aria-label="Twitter">
                <FaSquareXTwitter className="x" />
              </a>
            </motion.div>
          </motion.div>
        </div>
        <div className="slider">
        <div className="slide-track">
          <div className="br">
            <img src={slide1} alt="" />
          </div>
          <div className="br">
            <img src={slide2} alt="" />
          </div>
          <div className="br">
            <img src={slide3} alt="" />
          </div>
          <div className="br">
            <img src={slide4} alt="" />
          </div>
          <div className="br">
            <img src={slide5} alt="" />
          </div>
          <div className="br">
            <img src={slide6} alt="" />
          </div>
          <div className="br">
            <img src={slide7} alt="" />
          </div>
          <div className="br">
            <img src={slide8} alt="" />
          </div>
          <div className="br">
            <img src={slide9} alt="" />
          </div>

          <div className="br">
            <img src={slide1} alt="" />
          </div>
          <div className="br">
            <img src={slide2} alt="" />
          </div>
          <div className="br">
            <img src={slide3} alt="" />
          </div>
          <div className="br">
            <img src={slide4} alt="" />
          </div>
          <div className="br">
            <img src={slide5} alt="" />
          </div>
          <div className="br">
            <img src={slide6} alt="" />
          </div>
          <div className="br">
            <img src={slide7} alt="" />
          </div>
          <div className="br">
            <img src={slide8} alt="" />
          </div>
          <div className="br">
            <img src={slide9} alt="" />
          </div>
        </div>
      </div>
      </motion.footer>
    </div>
  );
};

export default Home;
