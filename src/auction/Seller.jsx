import { useNavigate } from "react-router-dom";
import "./home.css";
import hammer from "./hammer.png";
import Logo from "./logo.jpeg";
import { VscAccount } from "react-icons/vsc";
import { useState, useEffect } from "react";
import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { FaFacebook, FaInstagram, FaSquareXTwitter } from "react-icons/fa6";
import per1 from "./per1.jpg";
import per2 from "./per2.jpg";
import per3 from "./per3.jpg";
import per4 from "./per4.jpg";
import per5 from "./per5.jpg";
import per6 from "./per6.jpg";
import per7 from "./per7.jpg";
import main6 from "./main6.png";
import imgdash from "./imgdash.png";
import welcome from "./welcome.png";

const Seller = ({ addProduct ,user , setUser }) => {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    sbid: "",
    sdescription: "",
    bdescription: "",
    img: "",
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const savedProducts = localStorage.getItem("products");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  const images = [per1, per2, per3, per4, per5, per6, per7];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProduct((prev) => ({ ...prev, img: imageUrl }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !product.name ||
      !product.sbid ||
      !product.sdescription ||
      !product.bdescription ||
      !product.img
    )
      return;

    setProducts([...products, product]);
    addProduct(product);
    setProduct({
      name: "",
      sbid: "",
      sdescription: "",
      bdescription: "",
      img: "",
    });
    localStorage.setItem("products", JSON.stringify(products));
    alert("Product added successfully!");

    navigate("/");
  };

  return (
    <div>
      <link
        href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
        rel="stylesheet"
      />

      <nav>
        <ul>
          <div id="head">
            <li>
              <p id="cchange">Grey Friday</p>
            </li>
            <li>
              <img id="nav-logo" src={Logo} alt="" />
            </li>
          </div>
          <li>
            <a className="nava" 
           id="cchange" href="#">
              <IoHomeOutline aria-label="Home" />
            </a>
          </li>
          <li>
            <a className="nava" id="cchange" href="#sale">
              Sell here
            </a>
          </li>
          <li>
            <a className="nava" id="cchange" href="#about">
              About
            </a>
          </li>
          <li>
            <a className="nava" id="cchange" href="#service">
              Service
            </a>
          </li>
          <li>
            <a className="nava"id="cchange" href="#footer">
              Contact
            </a>
          </li>
          <li>
            <div className="dropdown">
              <button id="login-btn" >
                <VscAccount />
              </button>
              <div className="dropdown-content">
                {user ? (
                  <>
                    <span className="dd">{user.fullName}</span>
                    <a
                      className="dd"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        console.log("Sign Out clicked");

                        localStorage.removeItem("user");
                        console.log("User removed from localStorage");

                        setUser(null);
                        console.log("User state updated to:", null);

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
      </nav>

      <div className="white"></div>
      <div className="main" id="sellerclr">
        <div className="main-text">
          <img src={welcome} id="welcome" alt="" />
          <h1>SELL YOUR PRODUCTS HERE</h1>
          <p>Turn your treasures into triumphs, one bid at a time!</p>
        </div>
        <div className="main-img">
          <img id="main-1" src={main6} alt="" />
        </div>
      </div>

      <div className="text-section" id="top">
        <div className="text">
          <h1>
            Place Your <span id="cchange">Products</span> <br />
            <span id="cchange">Sell</span> with passion{" "}
          </h1>
          <p>
            because every auction is an opportunity to{" "}
            <span id="cchange">create a story</span>
            <br />
            and find a new home for something special.
          </p>
          <a className="btn-explore" href="#sale" id="btn-salego"d>
            Explore Now
          </a>
        </div>
        <div className="icon">
          <img
            src={hammer}
            className="ham bx-tada"
            alt="Auction Hammer"
            height="300px"
          />
        </div>
      </div>

      <div className="image-con" id="about"  >
        <div className="slide">
          <h1>Top Buyers</h1>
          <img src={images[index]} alt="" />
        </div>
        <div className="logo-image">
          <img src={Logo} alt="" />
          <p>
            At <span id="iname">Grey Friday</span>, we bring buyers and sellers
            together in a dynamic and secure online auction marketplace...
          </p>
        </div>
        <div className="about-text">
          <h1>Why Choose Grey Friday?</h1>
          <ul>
            <li>Exclusive & Rare Items – Find one-of-a-kind treasures...</li>
            <li>
              Secure & Transparent Bidding – Our platform ensures a fair and
              trustworthy auction process.
            </li>
            <li>
              Expert Authentication – We verify the authenticity of high-value
              items...
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

      <div className="seller" id="sale">
        <h1>Seller Dashboard</h1>
        <form onSubmit={handleSubmit} className="product-form">
          <label>
            Name:{" "}
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={product.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Short Description:{" "}
            <textarea
              name="sdescription"
              className="sdes"
              placeholder="Product Description"
              value={product.sdescription}
              onChange={handleChange}
              required
            ></textarea>
          </label>
          <label>
            Long Description:{" "}
            <textarea
              name="bdescription"
              className="ldes"
              placeholder="Fill Complete details of the product"
              value={product.bdescription}
              onChange={handleChange}
            ></textarea>
          </label>
          <label>
            Starting bid:{" "}
            <input
              type="number"
              name="sbid"
              placeholder="Starting Bid ($)"
              value={product.sbid}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Image:{" "}
            <input
              type="file"
              accept="image/*"
              name="img"
              onChange={handleImageChange}
            />
          </label>

          {product.img && (
            <div>
              <p>Selected Image:</p>
              <img src={product.img} alt="Preview" width="200" />
            </div>
          )}

          <label>
            <button className="sellerbtn" type="submit">
              Add Product
            </button>
          </label>
        </form>
      </div>

      <div className="service" id="service">
        <div className="ser-content">
          <h1>Our Services</h1>
          <p>
            Grey Friday offers a range of services to help buyers and sellers
            navigate the auction process...
          </p>
          <ul>
            <li>Consignment Services</li>
            <li>Appraisal & Valuation</li>
            <li>Authentication & Certification</li>
            <li>Shipping & Delivery</li>
            <li>Customer Support</li>
          </ul>
        </div>
        <div className="ser-img">
          <img src={imgdash} id="ser-img" alt="" />
        </div>
      </div>

      <footer id="footer">
        <div className="row">
          <div className="coloumn">
            <img src={Logo} className="footer-logo" alt="Company Logo" />
            <p>
              At <span id="footer-cname">Grey Friday</span>, we bring buyers and
              sellers together in a dynamic and secure online auction
              marketplace...
            </p>
          </div>

          <div className="coloumn">
            <h3>Office</h3>
            <p>7/772 Church Street</p>
            <p>Anna Nagar</p>
            <p>Chennai, PIN 638008, Tamil Nadu</p>
            <p className="email">greyfriday@gmail.com</p>
            <h4>+91 - 9876554489</h4>
          </div>

          <div className="coloumn">
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
          </div>

          <div className="coloumn">
            <h2>Appointment</h2>
            <form onSubmit={handleSubmit}>
              <input type="number" placeholder="Contact Number" required />
              <button type="submit">Book Appointment</button>
            </form>
            <div className="social-icons">
              <a href="#" aria-label="Facebook">
                <FaFacebook className="fb" />
              </a>
              <a href="#" aria-label="Instagram">
                <FaInstagram className="ins" />
              </a>
              <a href="#" aria-label="Twitter">
                <FaSquareXTwitter className="x" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Seller;
