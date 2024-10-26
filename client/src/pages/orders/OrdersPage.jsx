import React, { useState } from "react";
import styles from "./Orders.module.css";

const OrdersPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 4;

    const orders = [
        {
            id: "ORD001",
            date: "2023-10-15",
            product: "Wireless Earbuds",
            quantity: 2,
            total: 129.99,
            status: "Delivered",
            image: "/placeholder.svg?height=80&width=80",
        },
        {
            id: "ORD002",
            date: "2023-10-18",
            product: "Smart Watch",
            quantity: 1,
            total: 199.99,
            status: "Shipped",
            image: "/placeholder.svg?height=80&width=80",
        },
        {
            id: "ORD003",
            date: "2023-10-20",
            product: "Laptop",
            quantity: 1,
            total: 999.99,
            status: "Processing",
            image: "/placeholder.svg?height=80&width=80",
        },
        {
            id: "ORD004",
            date: "2023-10-22",
            product: "Phone Case",
            quantity: 3,
            total: 39.99,
            status: "Delivered",
            image: "/placeholder.svg?height=80&width=80",
        },
        {
            id: "ORD005",
            date: "2023-10-25",
            product: "Bluetooth Speaker",
            quantity: 1,
            total: 79.99,
            status: "Shipped",
            image: "/placeholder.svg?height=80&width=80",
        },
    ];

    const filteredOrders = orders.filter((order) =>
        Object.values(order).some((value) =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(
        indexOfFirstOrder,
        indexOfLastOrder
    );
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

    return (
        <div className={styles.orderContainer}>
            <h1 className={styles.orderTitle}>Your Orders</h1>
            <div className={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="Search orders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                />
            </div>
            <div className={styles.orderList}>
                {currentOrders.map((order) => (
                    <div key={order.id} className={styles.orderItem}>
                        <div className={styles.orderItemContent}>
                            <img
                                src={order.image}
                                alt={order.product}
                                width={80}
                                height={80}
                                className={styles.orderImage}
                            />
                            <div className={styles.orderDetails}>
                                <h2 className={styles.productName}>
                                    {order.product}
                                </h2>
                                <p className={styles.orderInfo}>
                                    Quantity: {order.quantity}
                                </p>
                                <p className={styles.orderInfo}>
                                    Order Date: {order.date}
                                </p>
                                <p className={styles.orderId}>
                                    Order ID: {order.id}
                                </p>
                            </div>
                            <div className={styles.orderStatusPrice}>
                                <span
                                    className={`${styles.orderStatus} ${
                                        styles[`orderStatus${order.status}`]
                                    }`}
                                >
                                    {order.status}
                                </span>
                                <p className={styles.orderTotal}>
                                    ${order.total.toFixed(2)}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.pagination}>
                <p className={styles.paginationInfo}>
                    Showing {indexOfFirstOrder + 1} to{" "}
                    {Math.min(indexOfLastOrder, filteredOrders.length)} of{" "}
                    {filteredOrders.length} orders
                </p>
                <div className={styles.paginationButtons}>
                    <button
                        className={styles.paginationButton}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <button
                        className={styles.paginationButton}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrdersPage;
