import React, { useRef, useState, useEffect } from "react";
import rev1 from "./rev1.jpg";
import rev2 from "./rev2.jpg";
import rev3 from "./rev3.jpg";
import rev4 from "./rev4.jpg";
import rev5 from "./rev5.jpg";
import rev6 from "./rev6.jpg";

const initialTestimonials = [
  { name: "Ralph Edwards", role: "CEO of FinTech Inc.", image: rev1, rating: 5, review: "Absolutely love this auction platform!" },
  { name: "Brooklyn Simmons", role: "Founder of E-Shopify", image: rev2, rating: 4, review: "Great deals on rare collectibles!" },
  { name: "Leslie Alexander", role: "Director at Global Solutions", image: rev3, rating: 5, review: "Won my dream item at an unbeatable price!" },
  { name: "Eleanor Pena", role: "Vintage Collector", image: rev4, rating: 5, review: "A fantastic place to find rare items!" },
  { name: "Darlene Robertson", role: "Art Enthusiast", image: rev5, rating: 4, review: "Best auction platform for rare art pieces!" },
  { name: "Jerome Bell", role: "Automobile Dealer", image: rev6, rating: 5, review: "Got a classic car at an unbelievable price!" }
];

const TestimonialCard = ({ name, role, image, rating, review }) => (
  <div className="testimonial-card">
    <img src={image} alt={`${name}'s profile`} className="testimonial-img" />
    <h3 className="testimonial-name">{name}</h3>
    <p className="testimonial-review">{review}</p>
    <div className="testimonial-role">{role}</div>
    <div className="testimonial-rating">
      <span className="rating-stars">{"★".repeat(rating) + "☆".repeat(5 - rating)}</span>
    </div>
  </div>
);

const Testimonials = () => {
  const scrollRef = useRef(null);
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({ name: "", role: "", review: "", rating: 5 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    const scrollSpeed = 7;
    let scrollInterval;

    const handleScroll = () => {
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
      }
    };

    if (!isHovered) {
      scrollInterval = setInterval(() => {
        if (scrollContainer) {
          scrollContainer.scrollLeft += scrollSpeed;
          handleScroll();
        }
      }, 10);
    }

    return () => clearInterval(scrollInterval);
  }, [isHovered]);

  const handleWheelScroll = (e) => {
    e.preventDefault();
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };

  const handleInputChange = (e) => {
    setNewReview({ ...newReview, [e.target.name]: e.target.value });
  };

  const submitReview = (e) => {
    e.preventDefault();
    if (newReview.name && newReview.review) {
      setTestimonials([...testimonials, { ...newReview, image: rev1 }]);
      setNewReview({ name: "", role: "", review: "", rating: 5 });
      setShowForm(false);
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= 300;
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += 300;
    }
  };

  return (
    <section className="testimonials-section">
      <h2>What Our Clients Say</h2>
      <div className="testimonials-wrapper">
        <div
          className="testimonials-container"
          ref={scrollRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onWheel={handleWheelScroll}
        >
          <div className="testimonial-slider">
            {[...testimonials, ...testimonials].map((testimonial, idx) => (
              <TestimonialCard key={idx} {...testimonial} />
            ))}
          </div>
        </div>

      </div>
      <button className="add-review-btn" onClick={() => setShowForm(true)}>Write a Review</button>

      {showForm && (
        <div className="review-modal">
          <div className="review-form">
            <h3>Write a Review</h3>
            <input type="text" name="name" placeholder="Your Name" value={newReview.name} onChange={handleInputChange} />
            <input type="text" name="role" placeholder="Your Role (Optional)" value={newReview.role} onChange={handleInputChange} />
            <textarea name="review" placeholder="Your Review" value={newReview.review} onChange={handleInputChange} />
            <label>Rating:</label>
            <select name="rating" value={newReview.rating} onChange={handleInputChange}>
              {[5, 4, 3, 2, 1].map((num) => (
                <option key={num} value={num}>{num} Stars</option>
              ))}
            </select>
            <button onClick={submitReview}>Submit</button>
            <button className="close-btn" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Testimonials;
