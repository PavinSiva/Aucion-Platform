import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./product.css";
import { io } from "socket.io-client";
import { useRef } from "react";
import engage from "./engage.png";

function ProductDetails({ duration }) {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state;

  if (!product) {
    navigate("/");
    return null;
  }

  const socket = useRef(null);

  useEffect(() => {
    socket.current = io("http://localhost:3000");

    socket.current.emit("joinRoom", product.name);

    socket.current.on("bidUpdated", (data) => {
      if (data.productName === product.name) {
        setCurrentBid(data.highestBid);

        localStorage.setItem(`currentBid_${product.name}`, data.highestBid);

        const newEntry = {
          bidder: data.highestBidder,
          bid: data.highestBid,
          timestamp: Date.now(),
        };
        setBidHistory((prevHistory) => {
          const updatedHistory = [...prevHistory, newEntry];
          localStorage.setItem(
            `bidHistory_${product.name}`,
            JSON.stringify(updatedHistory)
          );
          return updatedHistory;
        });

        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser?.fullName !== data.highestBidder) {
          alert(`You have been outbid! New highest bid: $${data.highestBid}`);
        }
      }
    });

    return () => {
      socket.current.disconnect();
    };
  }, [product.name]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const [currentBid, setCurrentBid] = useState(() => {
    const savedBid = localStorage.getItem(`currentBid_${product.name}`);
    return savedBid
      ? Number(savedBid)
      : Number(product.highestbid || product.sbid || 0);
  });

  const [bidHistory, setBidHistory] = useState(() => {
    const savedHistory = localStorage.getItem(`bidHistory_${product.name}`);
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  const [timeLeft, setTimeLeft] = useState(() => {
    const storedStartTime = localStorage.getItem(
      `auctionStartTime_${product._id}`
    );
    const startTime = storedStartTime ? Number(storedStartTime) : Date.now();

    if (!storedStartTime) {
      localStorage.setItem(`auctionStartTime_${product._id}`, startTime);
    }

    return Math.max(duration - (Date.now() - startTime), 0);
  });

  const resetTimer = () => {
    const newStartTime = Date.now();
    localStorage.setItem(`auctionStartTime_${product._id}`, newStartTime);
    setTimeLeft(duration);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => Math.max(prevTime - 1000, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!product.name) return;

    const fetchHighestBid = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/product/${product.name}`
        );
        const data = await response.json();

        if (response.ok && data.highestbid) {
          setCurrentBid(Number(data.highestbid));
          localStorage.setItem(
            `currentBid_${product.name}`,
            Number(data.highestbid)
          );

          const newEntry = {
            bidder: data.highestBidder,
            bid: data.highestbid,
            timestamp: Date.now(),
          };
          setBidHistory((prevHistory) => {
            const updatedHistory = [...prevHistory, newEntry];
            localStorage.setItem(
              `bidHistory_${product.name}`,
              JSON.stringify(updatedHistory)
            );
            return updatedHistory;
          });
        }
      } catch (error) {
        console.error("Error fetching highest bid:", error);
      }
    };

    fetchHighestBid();
  }, [product.name]);

  const increaseBid = async () => {
    const newBid = (currentBid ?? 0) + 10;
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const username = storedUser?.fullName;

    if (!username) {
      alert("Please Sign In.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/increaseBid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName: product.name,
          newBid,
          username,
        }),
      });

      const data = await response.json();

      if (response.ok && data.highestBid) {
        setCurrentBid(Number(data.highestBid));
        localStorage.setItem(
          `currentBid_${product.name}`,
          Number(data.highestBid)
        );

        const newEntry = {
          bidder: username,
          bid: newBid,
          timestamp: Date.now(),
        };
        setBidHistory((prevHistory) => {
          const updatedHistory = [...prevHistory, newEntry];
          localStorage.setItem(
            `bidHistory_${product.name}`,
            JSON.stringify(updatedHistory)
          );
          return updatedHistory;
        });

        socket.current.emit("newBid", {
          productName: product.name,
          highestBid: newBid,
          highestBidder: username,
        });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error in bid request:", error);
    }
  };

  const formatTime = (millisec) => {
    let total_sec = Math.max(Math.floor(millisec / 1000), 0);
    let total_min = Math.max(Math.floor(total_sec / 60), 0);
    let total_hr = Math.max(Math.floor(total_min / 60), 0);
    let days = Math.max(Math.floor(total_hr / 24), 0);

    let sec = total_sec % 60;
    let min = total_min % 60;
    let hr = total_hr % 24;

    return (
      <div className="timer">
        <div className="timer-box">
          {days}
          <span> Days</span>
        </div>{" "}
        :
        <div className="timer-box">
          {hr}
          <span> Hours</span>
        </div>{" "}
        :
        <div className="timer-box">
          {min}
          <span> Minutes</span>
        </div>{" "}
        :
        <div className="timer-box">
          {sec}
          <span> Seconds</span>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="d-container">
        <div className="b-img">
          <img src={product.img} alt={product.name} />
        </div>
        <div className="b-details">
          <h1>{product.name}</h1>
          <div className="des">
            <p>{product.bdescription}</p>
          </div>
          <div id="engage-con">
            <img src={engage} alt="" />
          </div>
        </div>
      </div>
      <div className="tb">
        <div id="ends">
          <h1>Auction ends in : </h1>
          {timeLeft > 0 ? <h2>{formatTime(timeLeft)}</h2> : <h2>Time's up!</h2>}
        </div>
        <div className="btn-timer">
          <div className="price">
            <h2>Starting Bid: ${Number(product.sbid).toLocaleString()}</h2>
            <h2>Current Bid: ${currentBid.toLocaleString()}</h2>
          </div>

          <div className="bid-btn">
            <button
              onClick={() => {
                navigate("/");
                setTimeout(() => {
                  document
                    .getElementById("productsale")
                    ?.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
            >
              NOT INTERESTED
            </button>
            <button onClick={increaseBid}> BID </button>
          </div>
        </div>
      </div>

      <div className="bid-history">
        <h2>Bid History</h2>
        <table>
          <thead>
            <tr>
              <th>Bidder</th>
              <th>Bid Amount</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {bidHistory.map((entry, index) => (
              <tr key={index}>
                <td>{entry.bidder}</td>
                <td>${entry.bid.toLocaleString()}</td>
                <td>{new Date(entry.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={resetTimer}>RESET TIMER</button>
    </div>
  );
}

export default ProductDetails;
