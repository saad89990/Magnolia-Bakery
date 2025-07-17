import React, { useState } from "react";
import { useCart, useDispatchCart } from "../components/contextreducer";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Cart() {
  const navigate = useNavigate();
  const cartData = useCart();
  const dispatch = useDispatchCart();
  const [loading, setLoading] = useState(false);

  const getValidId = (item, index) => {
    return item.id || `${item.name}-${item.size}-${index}`;
  };

  const handlecheckout = async () => {
    if (cartData.length === 0) return;

    setLoading(true);
    const amount = cartData.reduce((total, item) => total + item.price, 0);
    const userid = localStorage.getItem("userid");

    try {
      const res = await fetch("http://localhost:5005/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      const orderData = await res.json();
      console.log("✅ Razorpay Order Created:", orderData);

      await fetch("http://localhost:5005/api/save-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: localStorage.getItem("name"),
          userEmail: localStorage.getItem("email"),
          userid,
          totalPrice: orderData.amount / 100,
          order_id: orderData.id,
          payment_id: null,
          status: "pending",
          currency: "INR",
          purchaseData: null,
        }),
      });

      const options = {
        key: "rzp_test_L8m42RzjwBXoft",
        amount: orderData.amount,
        currency: "INR",
        name: "ARHAM CAKE",
        description: "Delicious Cakes",
        order_id: orderData.id,
        handler: async function (response) {
          console.log("🧾 Razorpay Payment Details:", response);
          verifyPayment(response);
        },
        modal: {
          ondismiss: async function () {
            try {
              await fetch("http://localhost:5005/api/save-payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  signature: null,
                  payment_id: null,
                  order_id: orderData.id,
                  status: "pending",
                  userid,
                  totalPrice: orderData.amount / 100,
                }),
              });
              toast.info("🕓 Payment dismissed. Status saved as pending.");
            } catch (err) {
              console.error("❌ Error marking pending payment:", err.message);
            }
          },
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.modal.closed", async () => {
        try {
          await fetch("http://localhost:5005/api/save-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              signature: null,
              payment_id: null,
              order_id: orderData.id,
              status: "cancelled",
              userid,
              totalPrice: orderData.amount / 100,
            }),
          });
          toast.info("🕓 Payment dismissed. Status saved as pending.");
        } catch (err) {
          console.error("❌ Error marking pending payment:", err.message);
        }
      });

      rzp.open();

    } catch (error) {
      console.error("Checkout error:", error.message);
      toast.error("❌ Checkout failed. Please try again.");

      await fetch("http://localhost:5005/api/save-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: localStorage.getItem("name"),
          userEmail: localStorage.getItem("email"),
          userid,
          totalPrice: amount / 100,
          order_id: null,
          payment_id: null,
          status: "cancelled",
          currency: "INR",
        }),
      });
    } finally {
      setLoading(false);
    }
  };

  const verifyPayment = async (response) => {
    try {
      console.log("verify function called");
      const res = await fetch("http://localhost:5005/api/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(response),
      });

      const result = await res.json();
      let status = result.success ? "successful" : "failed";

      const saveResponse = await fetch("http://localhost:5005/api/save-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: localStorage.getItem("name"),
          userEmail: localStorage.getItem("email"),
          userid: localStorage.getItem("userid"),
          totalPrice: response.amount / 100,
          order_id: response.razorpay_order_id,
          payment_id: response.razorpay_payment_id,
          status,
          currency: "INR",
          purchaseData: cartData.map(item => ({
            name: item.name,
            qty: item.qty,
            size: item.size,
            price: item.price,
          })),
        }),
      });

      const saveResult = await saveResponse.json();
      if (saveResult.success) {
        navigate("/myorders");
        dispatch({type:"CLEAR"});

        toast.success(status === "successful" ? "🎉 Payment successful!" : "❌ Payment failed. Please try again.");
      } else {
        toast.error("⚠ Failed to update payment status:", saveResult.message);
      }
    } catch (error) {
      console.error("❌ Error during payment verification:", error);

      await fetch("http://localhost:5005/api/save-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: localStorage.getItem("name"),
          userEmail: localStorage.getItem("email"),
          userid: localStorage.getItem("userid"),
          totalPrice: response.amount / 100,
          order_id: response.razorpay_order_id,
          payment_id: null,
          status: "failed",
          currency: "INR",
          purchaseData: cartData.map(item => ({
            name: item.name,
            qty: item.qty,
            size: item.size,
            price: item.price,
          })),
        }),
      });
    }
  };

  const handleRemoveItem = (index) => {
    if (window.confirm("Remove this item from your cart?")) {
      dispatch({ type: "REMOVE", index });
    }
  };

  const totalAmount = cartData.reduce((total, item) => total + item.price, 0);

   return (
    <>
      <ToastContainer position="top-right" theme="colored" />

      {
        cartData.length === 0 ? (
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ height: "75vh", textAlign: "center" }}
          >
            <div className="text-muted fs-3 mb-3">
              🛒 Your Cart is Empty
            </div>
            <button
              className="btn btn-outline-primary"
              onClick={() => navigate("/")}
              style={{
                padding: "10px 20px",
                borderRadius: "6px",
                fontWeight: "500"
              }}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="container my-5">
            <h2 className="mb-4" style={{ color: "#a55b4e" }}>Your Shopping Cart</h2>
            <div className="row">
              {/* Cart Items */}
              <div className="col-md-8">
                {cartData.map((item, index) => {
                  const key = getValidId(item, index);
                  return (
                    <div
                      key={key}
                      className="d-flex border rounded p-3 mb-3 align-items-start"
                      style={{
                        backgroundColor: "#fffefc",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
                      }}
                    >
                      <img
                        src={item.img}
                        alt={item.name}
                        style={{
                          width: "120px",
                          height: "120px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          marginRight: "16px",
                        }}
                      />
                      <div className="flex-grow-1">
                        <h5 className="fw-semibold">{item.name}</h5>
                        <p className="text-muted mb-1">Size: {item.size}</p>

                        {/* Quantity Controller */}
                        <div className="mb-2 d-flex align-items-center">
                          <span>{item.qty}</span>
                        </div>

                        <p className="mb-1 text-muted small">₹{item.price / item.qty} per item</p>
                        <h6 className="text-danger mb-2">₹{item.price}</h6>
                        <p className="mb-1 text-success small">Eligible for FREE Delivery</p>
                        <button
                          className="btn btn-sm btn-link text-danger p-0"
                          onClick={() => handleRemoveItem(index)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Summary + Checkout */}
              <div className="col-md-4">
                <div
                  className="p-4 rounded"
                  style={{
                    backgroundColor: "#fdf9f6",
                    border: "1px solid #eee",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                  }}
                >
                  <h5 className="mb-3">
                    Subtotal ({cartData.reduce((acc, item) => acc + item.qty, 0)} items):{" "}
                    <strong>₹{totalAmount}</strong>
                  </h5>

                  <p className="text-muted mb-3">
                    Estimated Delivery:{" "}
                    <strong className="text-success">3–5 business days</strong>
                  </p>

                  <button
                    className="btn w-100 d-flex justify-content-center align-items-center"
                    style={{
                      backgroundColor: "#a55b4e",
                      color: "#fff",
                      fontWeight: "500",
                      padding: "10px 0",
                      borderRadius: "6px",
                    }}
                    onClick={handlecheckout}
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="spinner-border spinner-border-sm text-light" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : (
                      "Proceed to Checkout"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </>
  );
}
