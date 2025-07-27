import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


export default function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 3;

    const userid = localStorage.getItem("userid");

    const fetchOrders = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/my-orders/${userid}`);
            const data = await res.json();

            // if (data.success && Array.isArray(data.orders)) {
            //     setOrders(data.orders.reverse());
            // } else {
            //     setOrders([]);
            //     toast.error("No orders found.");
            // }
            if (data.success && Array.isArray(data.orders)) {
                const sortedOrders = data.orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setOrders(sortedOrders);
            } else {
                setOrders([]);
                toast.error("No orders found.");
            }

        } catch (err) {
            console.error("❌ Error:", err.message);
            toast.error("Error fetching your orders.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const filteredOrders = statusFilter === "all"
        ? orders
        : orders.filter((o) => o.status === statusFilter);

    const indexOfLast = currentPage * ordersPerPage;
    const indexOfFirst = indexOfLast - ordersPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

    const handleDownloadInvoice = (order) => {
        const doc = new jsPDF();

        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.setTextColor("#000");
        doc.text("MagnoliaBakery - Invoice", 14, 20);

        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text(`Order ID: ${order.order_id}`, 14, 30);
        doc.text(`Status: ${order.status}`, 14, 37);
        doc.text(`Date: ${new Date(order.createdAt).toLocaleString()}`, 14, 44);

        if (order.payment_id) {
            doc.text(`Razorpay Payment ID: ${order.payment_id}`, 14, 51);
        }

        const tableData = order.items.map((item, index) => [
            index + 1,
            item.name,
            item.size,
            item.qty,
            `Rs. ${item.price}`

        ]);

        autoTable(doc, {
            head: [["#", "Item", "Size", "Qty", "Price"]],
            body: tableData,
            startY: order.payment_id ? 60 : 54,
            theme: "striped",
            headStyles: { fillColor: [165, 91, 78] },
        });

        // ✅ Fix unwanted characters and make bold total
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.text(`Total: Rs. ${order.totalPrice}`, 14, doc.lastAutoTable.finalY + 10);

        doc.save(`Invoice_${order.order_id}.pdf`);
    };



    return (
        <>
            <ToastContainer position="top-right" theme="colored" />
            <div className="container my-5">
                <h2 className="mb-4" style={{ color: "#a55b4e" }}>🧾 My Orders</h2>

                <div className="d-flex justify-content-between mb-3">
                    <select
                        className="form-select w-auto"
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value);
                            setCurrentPage(1);
                        }}
                    >
                        <option value="all">All</option>
                        <option value="pending">Pending</option>
                        <option value="successful">Successful</option>
                        <option value="failed">Failed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>

                {loading ? (
                    <div className="text-center">
                        <div className="spinner-border text-primary" role="status"></div>
                    </div>
                ) : currentOrders.length === 0 ? (
                    <div className="text-center text-muted">No orders found.</div>
                ) : (
                    currentOrders.map((order, i) => (
                        <div key={i} className="card mb-4 shadow-sm border">
                            <div className="card-header bg-light">
                                <strong>Order ID:</strong> {order.order_id || "N/A"} <br />
                                <strong>Status:</strong>{" "}
                                <span className={`badge bg-${order.status === "successful" ? "success" :
                                    order.status === "failed" ? "danger" :
                                        order.status === "cancelled" ? "secondary" : "warning"
                                    }`}>
                                    {order.status}
                                </span><br />
                                <small className="text-muted">
                                    Placed on: {new Date(order.createdAt).toLocaleString()}
                                </small>
                            </div>
                            <div className="card-body">
                                {Array.isArray(order.items) &&
                                    order.items.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="d-flex justify-content-between align-items-center border-bottom py-2"
                                        >
                                            <div className="d-flex align-items-center">

                                                <div>
                                                    <h6 className="mb-0">{item.name}</h6>
                                                    <small className="text-muted">
                                                        Size: {item.size}, Qty: {item.qty}
                                                    </small>
                                                </div>
                                            </div>
                                            <strong>₹{item.price}</strong>
                                        </div>
                                    ))}
                                <div className="text-end mt-3">
                                    <strong>Total: ₹{order.totalPrice}</strong>
                                </div>
                                <div className="mt-3 d-flex justify-content-between">
                                    <button
                                        className="btn btn-sm btn-outline-secondary fw-bold text-dark"
                                        onClick={() => handleDownloadInvoice(order)}
                                    >
                                        🧾 Download Invoice
                                    </button>

                                    {order.payment_id && (
                                        <a
                                            className="btn btn-sm btn-outline-info disabled"
                                            href="#"
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            🔗 View Razorpay Payment
                                        </a>

                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}

                {filteredOrders.length > ordersPerPage && (
                    <div className="d-flex justify-content-center mt-4">
                        <nav>
                            <ul className="pagination">
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                                        <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                                            {i + 1}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                )}
            </div>
        </>
    );
}
