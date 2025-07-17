import React from "react";
import "./Testimonial.css";

export default function Testimonial() {
  const testimonials = [
    {
      name: "Ayesha Khan",
      quote:
        "Arham Cake made my daughter’s birthday unforgettable! The design and flavor were spot on.",
      image:
        "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Rohan Mehta",
      quote:
        "I ordered a custom chocolate truffle for my parents’ anniversary — everyone loved it!",
      image:
        "https://images.unsplash.com/photo-1573497019419-2c1a9c65d15e?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Sneha Patil",
      quote:
        "The cake not only looked stunning but tasted divine. Highly recommend Arham Cake!",
      image:
        "https://images.unsplash.com/photo-1612436996684-5b6e6a1a4e9d?auto=format&fit=crop&w=400&q=80",
    },
  ];

  return (
    <div className="about-testimonials">
      <h1 className="section-title">Happy Clients</h1>
      <div className="testimonial-grid">
        {testimonials.map((client, index) => (
          <div className="testimonial-card" key={index}>
            <img
              src={client.image}
              alt={client.name}
              className="client-img"
            />
            <blockquote>"{client.quote}"</blockquote>
            <h5>— {client.name}</h5>
          </div>
        ))}
      </div>
    </div>
  );
}
