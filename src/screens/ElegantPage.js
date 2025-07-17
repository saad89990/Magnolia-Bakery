import React from 'react';

export default function ElegantPage({ title, sections }) {
  return (
    <div className="page-container">
      <h1 className="page-title">{title}</h1>
      {sections.map(({ heading, content }, idx) => (
        <div className="section" key={idx}>
          <h2>{heading}</h2>
          {content.split('\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      ))}
    </div>
  );
}
