import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./auction/Navigation";
import Home from "./auction/Home";
import ProductDetails from "./auction/Productdetails";
import Registration from "./auction/Registration";
import Seller from "./auction/Seller";
import "./App.css";
import axios from 'axios';

import img1 from "./auction/img1.png";
import img2 from "./auction/img2.jpg";
import img3 from "./auction/img3.jpg";
import img4 from "./auction/img4.png";
import img5 from "./auction/img5.png";
import img6 from "./auction/img6.png";
import img7 from "./auction/img7.png";
import img8 from "./auction/img8.png";
import img9 from "./auction/img9.jpg";
import img10 from "./auction/img10.png";
import img11 from "./auction/img11.png";
import img12 from "./auction/img12.png";
import img13 from "./auction/img13.png";


function App() {
  const [products, setProducts] = useState([
    {
      id: 1,
      img: img1,
      name: "Shoe",
      sdescription: "Limited edition",
      sbid: 600,
      bdescription:
        "Brand: Nike  Model: Air Jordan 1 Retro High OG  Condition: Brand New, Sealed Box  Size: Available in multiple sizes  Colorway: Iconic Red/Black/White combination  Material: Premium Leather, High-Top Design  Own a piece of sneaker history with these iconic Air Jordan 1 Retro High OGs. Crafted with premium leather and the classic Nike Swoosh, these high-top sneakers deliver both unmatched style and comfort. The exclusive colorway makes this pair a collector’s dream, perfect for sneakerheads, athletes, or fashion enthusiasts alike.",
    },
    {
      id: 2,
      img: img2,
      name: "Mobile",
      sdescription: "Limited edition",
      sbid: 900,
      bdescription:
        "Brand: Apple Model: iPhone 15 Pro Max (Limited Edition)  New, Sealed Box Storage: 512GB Color: Midnight Titanium   Display: 6.7-inch Super Retina XDR Display Processor: A17 Pro Chip for lightning-fast performance Special Features: Titanium frame, Always-On Display, ProMotion technology (120Hz refresh rate), Dynamic Island for interactive notifications",
    },
    {
      id: 3,
      img: img3,
      name: "Watch",
      sdescription: "Last Titanic Limited edition",
      sbid: 12500,
      bdescription:
        "Rolex Submariner Date 126610LV – A brand-new, unworn luxury timepiece featuring a stunning green ceramic bezel, black luminescent dial, and a durable Oystersteel case. Powered by an automatic self-winding Caliber 3235 movement with a 70-hour power reserve, this chronometer-certified watch is water-resistant up to 300 meters. Perfect for collectors, it comes with a scratch-resistant sapphire crystal, Rolex Glidelock extension system, and its original sealed box.",
    },
    {
      id: 4,
      img: img4,
      name: "Painting",
      sdescription: "Street Painter",
      sbid: 25000,
      bdescription:
        "Street Painter's Masterpiece – A breathtaking, one-of-a-kind painting crafted by a renowned urban artist, showcasing vibrant colors and intricate brushwork that captures the essence of city life. This original artwork, created on a premium canvas, is framed and ready for display. A perfect addition for collectors and art enthusiasts seeking an exclusive piece. ",
    },
    {
      id: 5,
      img: img5,
      name: "Statue",
      sdescription: "Ancient Statue",
      sbid: 75000,
      bdescription:
        "This ancient statue is a magnificent artifact showcasing the artistic mastery of a lost civilization, crafted from high-quality stone or marble with intricate carvings that reflect the cultural and spiritual essence of its time. Estimated to be over 500 years old, it stands approximately 3 feet tall and remains in well-preserved condition with minimal signs of wear. Believed to have originated from a royal or religious site, this rare piece holds immense historical significance, making it a prized addition for museums, collectors, and history enthusiasts. ",
    },
    {
      id: 6,
      img: img6,
      name: "Sword",
      sdescription: "Ancient Spartan Sword",
      sbid: 12000,
      bdescription:
        "This ancient Spartan sword is a rare and historically significant weapon, forged from high-carbon steel and designed for battle with a razor-sharp edge and sturdy hilt. Estimated to be over 1,000 years old, it features intricate engravings, possibly denoting its warrior owner or an era of great conquests. The sword remains in remarkable condition, with a well-preserved blade and an aged patina that enhances its authenticity. A true collector’s piece, ideal for museums, history enthusiasts, or weapon aficionados.",
    },
    {
      id: 7,
      img: img7,
      name: "Wedding Gown",
      sdescription: "Alia Bhatt's Wedding Gown",
      sbid: 3500,
      bdescription:
        "This stunning red wedding gown is an exquisite masterpiece, designed for elegance and grandeur. Crafted from luxurious silk and adorned with intricate hand-embroidered patterns, shimmering sequins, and delicate lace detailing, it exudes timeless beauty. The flowing silhouette, complemented by a long, graceful train, adds a regal touch, making it perfect for a bride who wants to make a statement. With a fitted bodice and rich red hues symbolizing love and prosperity, this gown is an exceptional piece for collectors or those seeking a once-in-a-lifetime ensemble. ",
    },
    {
      id: 8,
      img: img8,
      name: "Platinum Ring",
      sdescription: "Pure Platinum",
      sbid: 1500,
      bdescription:
        "This platinum ring is a symbol of luxury and elegance, featuring a flawless 2.5-carat round brilliant-cut diamond set in a 950 platinum band. The ring is adorned with pave-set diamond accents along the band, amplifying its brilliance and making it a perfect choice for engagements, anniversaries, or special occasions. The combination of platinum and high-quality diamonds ensures durability, while the sparkling diamond centerpiece catches the light from every angle. It’s a statement piece that combines timeless design with exceptional craftsmanship, perfect for anyone looking to own a luxurious ",
    },
    {
      id: 9,
      img: img9,
      name: "Neymar Jr Jersey",
      sdescription: "Used by Neymar Jr",
      sbid: 3500,
      bdescription:
        "This Neymar Jr Jersey is a rare piece of football memorabilia, personally hand-signed by the Brazilian superstar himself. Worn during a match, this authentic Paris Saint-Germain (PSG) home kit features Neymar’s iconic #10 and the PSG club crest, beautifully embroidered details, and premium materials. It comes with a Certificate of Authenticity and is housed in a display-ready frame, making it a must-have for football fans and collectors. Owning this jersey means having a unique piece of football history.",
    },
    {
      id: 10,
      img: img10,
      name: "Jewellery",
      sdescription: "Handmade / Unique Pattern",
      sbid: 15000,
      bdescription:
        "This Handmade Jewelry features a unique and intricate design, crafted with precision and care by skilled artisans. Made from solid platinum and adorned with natural diamonds, this piece embodies luxury and elegance. The necklace's stunning design includes brilliant-cut diamonds totaling 5 carats, ensuring exceptional sparkle and brilliance. Perfect for any special occasion or as an investment, this exquisite jewelry is a symbol of timeless beauty and sophistication. Whether for a wedding, anniversary, or as a collector’s item, this masterpiece is designed to leave a lasting impression.",
    },
    {
      id: 11,
      img: img11,
      name: "Hoodie",
      sdescription: "Limited Edition",
      sbid: 2500,
      bdescription:
        "This Limited Edition Hoodie is a statement piece in streetwear fashion. Crafted from a high-quality cotton fleece blend, it offers both comfort and durability, making it perfect for casual wear or layering. The hoodie features an oversized fit, bold graphic designs, and embroidered detailing, highlighting its exclusivity. Only 500 pieces worldwide make this hoodie a rare collectible, and its high-stitch durability ensures long-lasting quality. A perfect combination of style and comfort, this hoodie is ideal for fashion enthusiasts and collectors alike.",
    },
    {
      id: 12,
      img: img12,
      name: "Car",
      sdescription: "Vintage Vehicle",
      sbid: 390000,
      bdescription:
        "The 2023 Rolls-Royce Ghost in Arctic White is the epitome of modern luxury and craftsmanship. Powered by a 6.75L twin-turbocharged V12 engine, it delivers a smooth yet commanding 563 horsepower, making it a perfect blend of power and elegance. The cabin features a whisper-quiet interior, Bespoke Starlight Headliner, hand-stitched leather, and polished wood veneers, offering an unparalleled level of sophistication. With 0-60 mph in 4.6 seconds, this vehicle provides exceptional performance. Customizations are available, and it’s a limited production model, making it a true investment in luxury. ",
    },
  ]);

  const addProduct = async(newProduct) => {
    const updatedProducts = [
      ...products,
      { ...newProduct, id: products.length + 1 },
    ];
    setProducts(updatedProducts);

    try {
      const response = await fetch("http://localhost:3000/addproduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
  
      const data = await response.json();
      if (response.ok) {
        console.log("Product added successfully:", data);
      } else {
        console.error("Error adding product:", data.message);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const deleteProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const addProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/addproducts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ products }),
      });
   
  
      const data = await response.json();
      if (response.ok) {
        console.log("Products added successfully:", data);
      } else {
        console.error("Error adding products:", data.message);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };
  
  useEffect(() => {
    addProducts();
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              products={products}
              user={user}
              setUser={setUser}
              deleteProduct={deleteProduct}
            />
          }
        />
        <Route path="/navigation" element={<Navigation setUser={setUser} />} />
        <Route path="/registration" element={<Registration />} />
        <Route
          path="/product/:id"
          element={<ProductDetails duration={3 * 24 * 60 * 60 * 1000}  user={user} />}
        />
        <Route path="/seller" element={<Seller addProduct={addProduct}  user={user} setUser={setUser}/>} />
      </Routes>
    </Router>
  );
}


export default App;
