import React, { useState } from "react";
import { useCart, useDispatchCart } from "./contextreducer";

export default function Card({ item , onAddToCart}) {

  const dispatch = useDispatchCart();
  const options = item.options && item.options[0];
  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState(
    options ? Object.keys(options)[0] : ""
  );

  const handleAddToCart = async () => {
  const cartItem = {
    type: "ADD",
    id: item.id,
    name: item.name,
    qty:quantity,
    size: selectedOption,
    price: quantity * parseInt(options[selectedOption]),
    img: item.img,
  };
  dispatch(cartItem);
  if (typeof onAddToCart === "function") {
    onAddToCart(); // ✅ Call floating cart trigger
  }
};



  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const pricePerItem = options ? parseInt(options[selectedOption]) : 0;
  const totalPrice = quantity * pricePerItem;

  return (
    <div
      className="food-card shadow-sm"
      style={{
        background: "#fffefc",
        borderRadius: "16px",
        overflow: "hidden",
        transition: "transform 0.2s ease-in-out",
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
        maxWidth: "320px",
      }}
    >
      <img
        src={item.img}
        alt={item.name}
        style={{
          width: "100%",
          height: "180px",
          objectFit: "cover",
          borderTopLeftRadius: "16px",
          borderTopRightRadius: "16px",
        }}
      />
      <div style={{ padding: "16px" }}>
        <h5 style={{ marginBottom: "8px", color: "#a55b4e", fontWeight: "600" }}>
          {item.name}
        </h5>
        <p style={{ fontSize: "13px", color: "#9b7e7e", marginBottom: "6px" }}>
          {item.CategoryName}
        </p>
        <p
          style={{
            fontSize: "14px",
            color: "#6f5c5c",
            lineHeight: "1.5",
            textOverflow: "ellipsis",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            marginBottom: "12px",
          }}
          title={item.description}
        >
          {item.description}
        </p>

        {/* Quantity and Options */}
        {options && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "12px",
              marginBottom: "12px",
            }}
          >
            {/* Quantity */}
            <select
              value={quantity}
              onChange={handleQuantityChange}
              style={{
                padding: "8px 12px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                backgroundColor: "#fff",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
                fontSize: "14px",
                transition: "all 0.3s ease",
                flex: 1,
              }}
            >
              {[...Array(6)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  Qty: {i + 1}
                </option>
              ))}
            </select>

            {/* Options */}
            <select
              value={selectedOption}
              onChange={handleOptionChange}
              style={{
                padding: "8px 12px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                backgroundColor: "#fff",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
                fontSize: "14px",
                transition: "all 0.3s ease",
                flex: 1,
              }}
            >
              {Object.entries(options).map(([option, price]) => (
                <option key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)} - ₹{price}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Total and Add to Cart */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: "16px",
              fontWeight: "600",
              color: "#a55b4e",
            }}
          >
            Total: ₹{totalPrice}
          </span>
          <button
            style={{
              backgroundColor: "#a55b4e",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "8px 14px",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
              transition: "background 0.3s ease",
            }}
            onClick={handleAddToCart}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#8a4a3f")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#a55b4e")}
          >
            Add to Cart
          </button>

        </div>
      </div>
    </div>
  );
}
