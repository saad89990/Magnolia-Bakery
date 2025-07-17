import React from "react";
import { useCart } from "../components/contextreducer";
import { Link } from "react-router-dom";

export default function FloatingCart() {
  const cart = useCart();

  if (cart.length === 0) return null;

  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  // Since item.price already includes qty, just sum item.price directly
  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        backgroundColor: "#fff",
        borderTop: "1px solid #ddd",
        boxShadow: "0 -2px 8px rgba(0,0,0,0.1)",
        padding: "12px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div style={{ fontSize: "16px", fontWeight: "500", color: "#333" }}>
        🛒 {totalItems} item{totalItems > 1 ? "s" : ""} | ₹{totalPrice}
      </div>
      <Link
        to="/cart"
        style={{
          backgroundColor: "#a55b4e",
          color: "#fff",
          padding: "10px 18px",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: "600",
        }}
      >
        Go to Cart
      </Link>
    </div>
  );
}
