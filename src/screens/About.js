import React from "react";
import "./About.css"; // We'll define better styles here
import Arham_Image from '../screens/cake/arham.jpg';
import Fahim_Image from '../screens/cake/faim bhai.jpg';

export default function About() {
  const teamMembers = [
    {
      name: "Fahim Sheikh",
      role: "Founder & Cake Artist",
      quote: "Creating edible memories with every slice.",
      image:Fahim_Image,
    },
    {
      name: "Asma Sheikh",
      role: "Pastry Chef",
      quote: "Every cake is a canvas. I paint with flavor.",
      image:
        "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Arham Sheikh",
      role: "Logistics & Quality",
      quote: "Timely delivery with the love baked in.",
      image:
        Arham_Image,
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
