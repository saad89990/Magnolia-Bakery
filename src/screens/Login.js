import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

const BASE_URL = process.env.BASE_URL || "http://localhost:5005";

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/api/loginuser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
        credentials: "include",
      });
      const json = await res.json();
      if (res.ok) {
        localStorage.setItem("sitelogintoken", json.sitelogintoken);
        localStorage.setItem("userid", json.userid);
        localStorage.setItem("email", json.email);
        localStorage.setItem("name", json.name);
        toast.success("Login successful 🎉", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setTimeout(() => {
          navigate("/");
        }, 2200);
      } else {
        toast.error(json.error || "Login failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const onChange = (e) =>
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="glass-card">
          <h2 className="login-title">Welcome Back</h2>
          <p className="login-subtitle">
            "A cake is happiness you can eat. Log in and sweeten your journey!"
          </p>

          <form className="login-form" onSubmit={handleSubmit}>
            <input
              className="input-field"
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={onChange}
            />

            <div className="password-wrapper">
              <input
                className="input-field"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                required
                onChange={onChange}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`} />
              </button>
            </div>

            <button type="submit" className="login-btn">
              Log In
            </button>
          </form>

          <div className="divider">
            <span>or</span>
          </div>

          <div className="social-btns">
            <button
              type="button"
              className="social-btn google"
              onClick={() => toast.info("Google login coming soon")}
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                style={{ width: "20px", height: "20px" }}
              />
              Sign in with Google
            </button>


            <button
              type="button"
              className="social-btn github"
              onClick={() => toast.info("GitHub login coming soon")}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                alt="GitHub"
                style={{ width: "20px", height: "20px" }}
              /> Sign in with GitHub
            </button>
          </div>

          <p className="signup-text">
            Don’t have an account?{" "}
            <span onClick={() => navigate("/createuser")}>Sign up</span>
          </p>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
