import React, { useMemo, useState } from "react";
import styles from "./Orders.module.css";
import { useFetchOrdersQuery } from "../../containers/orders/ordersApiSlice";

const OrdersPage = () => {
    const { data = [], isLoading } = useFetchOrdersQuery({});

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 5;

    const orders = useMemo(() => {
        return data.reduce((acc, item) => {
            const cartItems = item.cart.map((cartItem) => ({
                id: item.id,
                product: {
                    name: cartItem.product.name,
                    price: cartItem.product.price,
                    image: cartItem.product.image,
                },
                quantity: cartItem.quantity,
                status: item.status,
                createdAt: item.created_at,
            }));
            acc.push(...cartItems);
            return acc;
        }, []);
    }, [data]);

    const filteredOrders = useMemo(() => {
        const sortedOrders = [...orders].sort((itemA, itemB) => {
            return itemB.createdAt - itemA.createdAt;
        });

        return sortedOrders.filter((order) =>
            order.product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [orders, searchTerm]);

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
                {currentOrders.map((order, index) => (
                    <div key={index} className={styles.orderItem}>
                        <div className={styles.orderItemContent}>
                            <img
                                src={order.product.image}
                                alt={order.product.name}
                                width={80}
                                height={80}
                                className={styles.orderImage}
                            />
                            <div className={styles.orderDetails}>
                                <h2 className={styles.productName}>
                                    {order.product.name}
                                </h2>
                                <p className={styles.orderInfo}>
                                    Quantity: {order.quantity}
                                </p>
                                <p className={styles.orderInfo}>
                                    Order Date:{" "}
                                    {Intl.DateTimeFormat().format(
                                        Number.parseInt(order.createdAt)
                                    )}
                                </p>
                                <p className={styles.orderId}>
                                    Order ID: {order.id}
                                </p>
                            </div>
                            <div className={styles.orderStatusPrice}>
                                <span
                                    className={`${styles.orderStatus} ${
                                        styles[`orderStatus_${order.status}`]
                                    }`}
                                >
                                    {order.status}
                                </span>
                                <p className={styles.orderTotal}>
                                    ${order.product.price.toFixed(2)}
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
