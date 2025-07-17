import React from 'react';

export default function FAQ() {
  const faqList = [
    { q: "How do I place an order?", a: "Use the 'Order Now' button, choose your cake, customize, and checkout securely. We send email/SMS updates throughout." },
    { q: "Can I customize the cake design?", a: "Yes! Share your design ideas or upload a reference image. We'll collaborate to finalize it." },
    { q: "What’s the delivery timeline?", a: "Standard delivery is 48–72 hours. Rush orders available on request (extra charge may apply)." },
    { q: "How do I cancel or change my order?", a: "Contact us within 24 hours via email or phone. After this we may charge a partial fee." }
  ];

  return (
    <div className="page-container">
      <h1 className="page-title">Frequently Asked Questions</h1>
      {faqList.map((item, i) => (
        <div key={i} className="faq-item">
          <div className="faq-question">{item.q}</div>
          <div className="faq-answer">{item.a}</div>
        </div>
      ))}
    </div>
  );
}
