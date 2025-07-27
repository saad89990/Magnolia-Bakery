import React from "react";
import "./Testimonial.css";
import Faizan_Image from '../screens/cake/faizan bhai.jpg';
import Saad_Image from '../screens/cake/saad_bhai.jpg';
import Ruman_Image from '../screens/cake/ruman.jpg';

export default function Testimonial() {
  const testimonials = [
    {
      name: "Saad Sheikh",
      quote:
        "Magnolia Bakery made my daughter’s birthday unforgettable! The design and flavor were spot on.",
      image:Saad_Image,
    },
    {
      name: "Faizan Sheikh",
      quote:
        "I ordered a custom chocolate truffle for my parents’ anniversary — everyone loved it!",
      image:Faizan_Image,
    },
    {
      name: "Ruman Sheikh",
      quote:
        "The cake not only looked stunning but tasted divine. Highly recommend Magnolia Bakery!",
      image:Ruman_Image,
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
