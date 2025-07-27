import React from 'react';
import { Link } from 'react-router-dom';

export default function Cakes() {
  const cakes = [
    { name: "Classic Vanilla", desc: "Soft vanilla sponge with creamy vanilla buttercream." },
    { name: "Dark Chocolate", desc: "Rich chocolate sponge with ganache drizzle." },
    { name: "Red Velvet", desc: "Moist red velvet with cream cheese frosting." },
    { name: "Seasonal Special", desc: "Seasonal fruit-flavored cake using fresh ingredients." }
  ];

  return (
    <div className="page-container">
      <h1 className="page-title">Our Cake Collection</h1>
      {cakes.map((c, i) => (
        <div key={i} className="section">
          <h2>{c.name}</h2>
          <p>{c.desc}</p>
        </div>
      ))}
      <Link to="/contact" className="contact-form button">Crave something special? Order Now</Link>
    </div>
  );
}
