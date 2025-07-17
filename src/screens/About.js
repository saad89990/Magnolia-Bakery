import React from "react";
import "./About.css"; // We'll define better styles here

export default function About() {
  const teamMembers = [
    {
      name: "Arham Sheikh",
      role: "Founder & Cake Artist",
      quote: "Creating edible memories with every slice.",
      image:
        "https://images.unsplash.com/photo-1614289310515-7c7ed1ff7f0e?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Priya Sharma",
      role: "Pastry Chef",
      quote: "Every cake is a canvas. I paint with flavor.",
      image:
        "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Vikram Joshi",
      role: "Logistics & Quality",
      quote: "Timely delivery with the love baked in.",
      image:
        "https://images.unsplash.com/photo-1626332812204-34bbf6bb9dcb?auto=format&fit=crop&w=400&q=80",
    },
  ];

  return (
    <div className="about-team-container">
      <h1 className="team-title">Meet Our Team</h1>
      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <div className="team-card" key={index}>
            <img src={member.image} alt={member.name} className="team-img" />
            <div className="team-info">
              <h3>{member.name}</h3>
              <p className="team-role">{member.role}</p>
              <blockquote>"{member.quote}"</blockquote>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
