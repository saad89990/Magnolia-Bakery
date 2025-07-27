import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../components/contextreducer";
import "./Navbar.css";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const cartItems = useCart();
  const popoverRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch authentication & user data
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/check-auth`, {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (err) {
        console.error("Auth check error:", err);
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    checkAuth();
  }, [location]);

  // Handle logout
  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.clear();
        navigate("/login");
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // Close popover if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setPopoverOpen(false);
      }
    };

    if (popoverOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popoverOpen]);

  const name = localStorage.getItem("name");

  return (
    <nav className="navbar navbar-expand-lg navbar-custom mb-0 pb-0">
      <div className="container-fluid">
        <Link
          className="navbar-brand fs-1 fst-italic fw-bold text-white"
          to="/"
        >
          Magnolia Bakery
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Navigation Links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link fw-bold ${location.pathname === "/" ? "active" : "text-white"
                  }`}
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link fw-bold ${location.pathname === "/testimonial" ? "active" : "text-white"
                  }`}
                to="/testimonial"
              >
                Testimonials
              </Link>
            </li>
            {/* {isAuthenticated && (
              <li className="nav-item">
                <Link
                  className={`nav-link fw-bold ${
                    location.pathname === "/orders" ? "active" : "text-white"
                  }`}
                  to="/orders"
                >
                  My Orders
                </Link>
              </li>
            )} */}
            <li className="nav-item">
              <Link
                className={`nav-link fw-bold ${location.pathname === "/about" ? "active" : "text-white"
                  }`}
                to="/about"
              >
                Aboutus
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link fw-bold ${location.pathname === "/contact" ? "active" : "text-white"
                  }`}
                to="/contact"
              >
                Contactus
              </Link>
              </li>
            <li className="nav-item">
              <Link
                className={`nav-link fw-bold ${location.pathname === "/myorders" ? "active" : "text-white"
                  }`}
                to="/myorders"
              >
                MyOrders
              </Link>
            </li>

          </ul>

          {/* Right Side: Auth Buttons / Cart / Profile */}
          <div className="d-flex align-items-center position-relative">
            {!isAuthenticated ? (
              <>
              {location.pathname !== "/login" && (
                <Link className="btn btn-light text-success fw-bold mx-1" to="/login">
                  Login
                </Link>
                )}
                {location.pathname !== "/createuser" && (
                  <Link className="btn btn-light text-success fw-bold mx-1" to="/createuser">
                  Signup
                </Link> 
                )}
              </>
            ) : (
              <>
                <Link
                  className="btn btn-light position-relative text-success fw-bold mx-1"
                  to="/cart"
                >
                  🛒 My Cart
                  {cartItems.length > 0 && (
                    <span
                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                      style={{ fontSize: "0.75rem" }}
                    >
                      {cartItems.length}
                    </span>
                  )}
                </Link>

                {/* Profile Avatar */}
                <div
                  className="ms-3"
                  style={{ cursor: "pointer" }}
                  onClick={() => setPopoverOpen(!popoverOpen)}
                >
                  <img
                    src={
                      user?.avatar ||
                      "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                    }
                    alt="Profile"
                    className="rounded-circle"
                    style={{ width: "40px", height: "40px", objectFit: "cover" }}
                    title="Profile"
                  />
                </div>

                {/* Dropdown */}
                {popoverOpen && (
                  <div
                    ref={popoverRef}
                    className="dropdown-box shadow rounded bg-white border position-absolute"
                    style={{
                      top: "calc(100% + 10px)",
                      right: 0,
                      width: "220px",
                      zIndex: 9999,
                      padding: "15px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    }}
                  >
                    <div className="d-flex align-items-center mb-3">
                      <img
                        src={
                          user?.avatar ||
                          "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                        }
                        alt="Profile"
                        className="rounded-circle border border-white shadow-sm"
                        style={{ width: "42px", height: "42px", objectFit: "cover" }}
                      />
                      <div className="ms-2">
                        <h6 className="mb-0" style={{ color: "#a55b4e" }}>
                          {name || "User"}
                        </h6>
                        <small className="text-muted">Member</small>
                      </div>
                    </div>

                    <Link
                      to="/profile/edit"
                      className="btn btn-outline-success w-100 mb-2"
                      onClick={() => setPopoverOpen(false)}
                    >
                      Edit Profile
                    </Link>

                    <button
                      className="btn btn-danger w-100"
                      onClick={() => {
                        handleLogout();
                        setPopoverOpen(false);
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
