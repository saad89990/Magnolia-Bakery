import React, { useState } from 'react';
import './Contact.css'; // Make sure to import custom styles
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


export default function Contact() {
  const [name,setname]=useState('');
  const [email,setemail]=useState('');
  const [message,setmessage]=useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userid = localStorage.getItem("userid");

    const data = {
      email: email,
      name: name,
      Message: message,
      userid: userid
    };
    try {
      const response = await fetch(`${API_BASE_URL}/api/user_query`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const result = await response.json();
        toast.success("Query Submitted Sucessfully.");
      }
      else {
        const errordata = await response.json();
        console.error("Error:", errordata.error);
        toast.error("Something Went Wrong.");
      }
    }
    catch(error){
      toast.error("Internal Server Error.");
    }
    

  }
  return (
    <div className="page-container contact-page">
      <h1 className="page-title">Get in Touch</h1>

      <div className="contact-grid">
        {/* Contact Info */}
        <div className="contact-info">
          <div className="info-box">
            <h2><i className="fas fa-envelope"></i> Email</h2>
            <p><a href="mailto:hello@MagnoliaBakery.com">hello@MagnoliaBakery.com</a></p>
          </div>
          <div className="info-box">
            <h2><i className="fas fa-phone"></i> Phone</h2>
            <p>+91 93252 13064</p>
            <small>Mon–Sat, 9 AM–6 PM IST</small>
          </div>
          <div className="info-box">
            <h2><i className="fas fa-map-marker-alt"></i> Address</h2>
            <p>Plot No. 395, Near Babulban Masjid<br />Wardhaman Nagar, Nagpur<br />Maharashtra, India</p>
            <small>(By appointment only)</small>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form-section">
          <h2>Send Us a Message</h2>
          <form className="contact-form"  onSubmit={handleSubmit}>
            <div className="form-group floating-label">
              <input type="text" name='name' onChange={(e)=>setname(e.target.value)} required />
              <label>Your Name</label>
            </div>
            <div className="form-group floating-label">
              <input type="email" name='email' onChange={(e)=>setemail(e.target.value)} required />
              <label>Your Email</label>
            </div>
            <div className="form-group floating-label">
              <textarea rows="4" name='message' onChange={(e)=>setmessage(e.target.value)} required></textarea>
              <label>Your Message</label>
            </div>
            <button type="submit">Send Message</button>
          </form>
        </div>
        <ToastContainer></ToastContainer>
      </div>
    </div>
  );
}
