import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";  // ✅ Correct import
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


export default function Signup() {
  const navigate = useNavigate(); // ✅ Correct usage
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });
  const [passwordValid, setPasswordValid] = useState(null);
  const [nameValid, setNameValid] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/createuser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          location: credentials.geolocation,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Signup successful!");
        setTimeout(() => navigate("/login"), 1500); // ✅ Redirect after toast
      } else {
        toast.error(data.error || "Signup failed.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Error:", error);
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const validateName = (name) => {
    const regex = /^[A-Za-z\s]{2,}$/;
    return regex.test(name);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setCredentials({ ...credentials, password: value });
    setPasswordValid(value === "" || validatePassword(value));
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setCredentials({ ...credentials, name: value });
    setNameValid(value === "" || validateName(value));
  };

  return (
    <section className="text-center text-lg-start">
      <ToastContainer />
      <style>{`.cascading-right { margin-right: -50px; } @media (max-width: 991.98px) { .cascading-right { margin-right: 0; } }`}</style>
      <div className="container py-4">
        <div className="row g-0 align-items-center">
          <div className="col-lg-6 mb-5 mb-lg-0">
            <div className="card cascading-right bg-body-tertiary" style={{ backdropFilter: "blur(30px)" }}>
              <div className="card-body p-5 shadow-5 text-center">
                <h2 className="fw-bold mb-5">Sign up now</h2>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    className="form-control mb-2"
                    name="name"
                    value={credentials.name}
                    onChange={handleNameChange}
                    placeholder="Name"
                  />
                  {!nameValid && (
                    <div style={{ color: 'red', fontSize: '0.85em' }}>
                      Name must contain only letters and spaces (min 2 characters).
                    </div>
                  )}
                  <input
                    type="email"
                    className="form-control mb-4"
                    name="email"
                    value={credentials.email}
                    onChange={onChange}
                    placeholder="Email address"
                  />
                  <input
                    type="password"
                    className="form-control mb-2"
                    name="password"
                    value={credentials.password}
                    onChange={handlePasswordChange}
                    placeholder="Password"
                  />
                  {passwordValid === false && (
                    <div style={{ color: 'red', fontSize: '0.85em' }}>
                      Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.
                    </div>
                  )}
                  <input
                    type="text"
                    className="form-control mb-4"
                    name="geolocation"
                    value={credentials.geolocation}
                    onChange={onChange}
                    placeholder="Location"
                  />
                  <button type="submit" className="btn btn-primary btn-block mb-4">Sign up</button>
                  <div className="text-center">
                    <p>or sign up with:</p>
                    <button type="button" className="btn btn-link btn-floating mx-1"><i className="fab fa-facebook-f"></i></button>
                    <button type="button" className="btn btn-link btn-floating mx-1"><i className="fab fa-google"></i></button>
                    <button type="button" className="btn btn-link btn-floating mx-1"><i className="fab fa-twitter"></i></button>
                    <button type="button" className="btn btn-link btn-floating mx-1"><i className="fab fa-github"></i></button>
                  </div>
                  <Link to="/login" className="m-3 btn btn-danger">Already a User</Link>
                </form>
              </div>
            </div>
          </div>
          <div className="col-lg-6 mb-5 mb-lg-0">
            <img src="https://www.wegmans.com/wp-content/uploads/6158874_customCakes_Mobile.jpg" className="w-100 rounded-4 shadow-4" alt="Signup" />
          </div>
        </div>
      </div>
    </section>
  );
}
