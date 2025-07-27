import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function EditProfile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch user data on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const email=localStorage.getItem("email");
        const res = await fetch(`${API_BASE_URL}/api/user-profile/${email}`, {
          method: "GET",
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setFormData(prev => ({
            ...prev,
            name: data.name || "",
            email: data.email || "",
          }));  
        } else {
          toast.error("Failed to load user data");
        }
      } catch (error) {
        toast.error("Error fetching user data");
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    // Validate passwords if any password field is filled
    if (
      formData.oldPassword ||
      formData.newPassword ||
      formData.confirmNewPassword
    ) {
      if (!formData.oldPassword) {
        toast.error("Please enter your current password");
        return;
      }
      if (formData.newPassword.length < 6) {
        toast.error("New password must be at least 6 characters");
        return;
      }
      if (formData.newPassword !== formData.confirmNewPassword) {
        toast.error("New passwords do not match");
        return;
      }
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/update-profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: formData.name,
          email:formData.email,
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        }),
      });

      if (res.ok) {
        toast.success("Profile updated successfully!");
        setFormData(prev => ({
          ...prev,
          oldPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        }));
        // setTimeout(() => {
        //   navigate("/");
        // }, 1500);
      } else {
        const err = await res.json();
        toast.error(err.error || "Update failed");
      }
    } catch (error) {
      toast.error("An error occurred during update");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" theme="colored" style={{top:"70px"}}/>
      <div className="container my-5" style={{ maxWidth: "600px" }}>
        <h2 className="mb-4" style={{ color: "#a55b4e",top:"65px" }}>
          Edit Profile
        </h2>

        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-sm">
          {/* Name */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              required
              autoFocus
            />
          </div>

          {/* Email - readonly */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email (readonly)
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={formData.email}
              readOnly
            />
          </div>

          <hr />

          {/* Password change section */}
          <h5 className="mb-3" style={{ color: "#a55b4e" }}>
            Change Password
          </h5>

          <div className="mb-3">
            <label htmlFor="oldPassword" className="form-label">
              Current Password
            </label>
            <input
              type="password"
              id="oldPassword"
              name="oldPassword"
              className="form-control"
              value={formData.oldPassword}
              onChange={handleChange}
              placeholder="Enter current password"
              autoComplete="current-password"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="newPassword" className="form-label">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              className="form-control"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
              autoComplete="new-password"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="confirmNewPassword" className="form-label">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmNewPassword"
              name="confirmNewPassword"
              className="form-control"
              value={formData.confirmNewPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
              autoComplete="new-password"
            />
          </div>

          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => navigate("/")}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-success"
              disabled={loading}
              style={{ backgroundColor: "#a55b4e", borderColor: "#a55b4e" }}
            >
              {loading ? (
                <div
                  className="spinner-border spinner-border-sm text-light"
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
