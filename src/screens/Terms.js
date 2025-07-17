import React from 'react';

export default function Terms() {
  return (
    <div className="page-container">
      <h1 className="page-title">Terms & Conditions</h1>

      <div className="section">
        <h2>1. Acceptance</h2>
        <p>By placing an order, you agree to our terms in full — so please read carefully before proceeding.</p>
      </div>

      <div className="section">
        <h2>2. Orders & Payments</h2>
        <p>All prices are as displayed at checkout. Payment is processed instantly via secure gateways (e.g., Stripe, PayPal).</p>
      </div>

      <div className="section">
        <h2>3. Cancellation & Refunds</h2>
        <p>Cancellations accepted within 24 hours with full refund. If after that, a 50% fee applies due to custom prep.</p>
      </div>

      <div className="section">
        <h2>4. Delivery & Acceptance</h2>
        <p>Delivery is by the time slot you select. Please inspect upon arrival — report any issues within 2 hours.</p>
      </div>
    </div>
  );
}
