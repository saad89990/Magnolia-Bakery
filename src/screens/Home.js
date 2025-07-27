import "./Home.css";
import React, { useState, useEffect, useRef } from "react";
import Footer from "../components/Footer";
import Card from "../components/Card";
import FloatingCart from "./FloatingCart"; // update path as needed
import { useCart } from "../components/contextreducer";
import Carousel from "bootstrap/js/dist/carousel";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


export default function Home() {
  const cart = useCart();
  const [foodcat, setfoodcat] = useState([]);
  const [fooditem, setfooditem] = useState([]);
  const [search, setSearch] = useState("");

  // ✅ Carousel ref for JS initialization
  const carouselRef = useRef(null);

  const carouselStyle = {
    width: "100%",
    height: "500px",
    overflow: "hidden",
    position: "relative",
  };

  const imageStyle = {
    width: "100%",
    height: "500px",
    objectFit: "fill",
    display: "block",
    objectPosition: "top",
  };

  // ✅ Initialize carousel on mount
  useEffect(() => {
    if (carouselRef.current) {
      const carousel = new Carousel(carouselRef.current, {
        interval: 3000,
        ride: "carousel",
        pause: false,
        wrap: true,
      });

      return () => carousel.dispose();
    }
  }, []);

  const loaddata = async () => {
    console.log("API_URL:",API_BASE_URL);
    let response = await fetch(`${API_BASE_URL}/api/fooddata`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    console.log("API response:", response);
    setfooditem(response[0]);
    setfoodcat(response[1]);
  };

  useEffect(() => {
    loaddata();
  }, []);

  useEffect(() => {
    console.log("food item:", fooditem);
  }, [fooditem]);
  console.log("API_BASE_URL:", API_BASE_URL); 

  return (
    <>
      <div
        id="carouselExampleControls"
        className="carousel slide carousel-fade"
        ref={carouselRef}
        style={{ marginTop: "0", paddingTop: "0" }}
      >
        <div className="carousel-inner" style={carouselStyle}>
          <div className="carousel-caption" style={{ zIndex: "10" }}>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </form>
          </div>

          <div className="carousel-item active">
            
            <img
              src="https://thumbs.dreamstime.com/b/golden-birthday-cake-adorned-intricate-happy-topper-glows-softly-warm-candlelight-generated-ai-casting-delicate-334995859.jpg"
              className="d-block w-100"
              alt="..."
              style={imageStyle}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://images6.alphacoders.com/653/thumb-1920-653595.jpg"
              className="d-block w-100"
              alt="..."
              style={imageStyle}
            />
          </div>
          <div className="carousel-item">
            <img 
            
              src="https://imageproxy.wolt.com/assets/67320899e797795fa383a26c"
              className="d-block w-100"
              alt="..."
              style={imageStyle}
            />
            
            {/* https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1280&q=80 */}
          </div>
          <div className="carousel-item">
            <img
              src="https://png.pngtree.com/background/20230403/original/pngtree-chocolate-brown-cake-delicious-picture-image_2269944.jpg"
              className="d-block w-100"
              alt="..."
              style={imageStyle}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://img.freepik.com/premium-photo/blue-birthday-cake_605905-35473.jpg"
              className="d-block w-100"
              alt="..."
              style={imageStyle}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://chocolatecakeday.com/wp-content/uploads/2024/06/a-sumptuous-slice-of-belgian-chocolate-mousse-cake-garnished-with-gold-leaf-on-an-elegant-porcelain-plate-stockpack-adobe-stock-1000x675.jpg"
              className="d-block w-100"
              alt="..."
              style={imageStyle}
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

        <>
  {foodcat.length !== 0 ? (
    <div className="container">
      {foodcat.map((cat) => (
        <div key={cat._id}>
          <h3 className="mt-3">{cat.CategoryName}</h3>
          <hr />
          <div className="row">
            {fooditem.length !== 0 ? (
              fooditem
                .filter(
                  (item) =>
                    item.CategoryName === cat.CategoryName &&
                    item.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((item) => (
                  <div key={item._id} className="col-md-4 mb-4">
                    <Card item={item} />
                  </div>
                ))
            ) : (
              <div>No items found</div>
            )}
          </div>
        </div>
      ))}
    </div>
  ) : (
     <>
    {console.log("No categories found (empty foodcat) - showing special loader")}
    <section className="cake-loading-section">
      <div className="cake-loader-content">
        <span className="cake-emoji" aria-label="cake" role="img">
          🎂
        </span>
        <div className="cake-loading-title">Loading Cake Categories…</div>
        <div className="cake-loading-shimmer"></div>
        <div className="cake-loading-subtext">
          Let us bake something fresh for you!
        </div>
      </div>
    </section>
  </>
  )}
</>


      <FloatingCart />
      <Footer />
    </>
  );
}
