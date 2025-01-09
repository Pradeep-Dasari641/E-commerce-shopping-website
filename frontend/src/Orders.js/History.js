// OrderHistory.js
import React, { useEffect, useState } from "react";
import "./orderHistory.css";
import HomeNavBar from "../NavBar/HomeNav";

function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orderHistory")) || [];
    setOrders(storedOrders);
  }, []);

  const handleDeleteOrder = (orderId) => {
    const updatedOrders = orders.filter((order) => order.orderId !== orderId);
    setOrders(updatedOrders);
    localStorage.setItem("orderHistory", JSON.stringify(updatedOrders));
  };

  return (
    <div className="order-history-container">
      <HomeNavBar />
      <h3>Order History</h3>
      {orders.length === 0 ? (
        <img className="no-products"
         src="https://thumbs.dreamstime.com/b/order-now-shopping-cart-white-background-65508048.jpg" /> 
      ) : (
        orders.map((order) => (
          <div key={order.orderId} className="order-history-item">
            <p>
              <strong>Order ID:</strong> {order.orderId}
            </p>
            <p>
              <strong>Status:</strong> {order.status}
            </p>
            <p>
              <strong>Products:</strong>
            </p>
            <ul>
              {order.products.map((product, i) => (
                <li key={i} className="product-item">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="product-image"
                  />
                  <p className="pro-detail">{product.title} - Quantity: {product.quantity}</p>
                  
                  <span className="delete-icon">
                    <i
                      className="fas fa-trash delete-icon"
                      onClick={() => handleDeleteOrder(order.orderId)}
                    ></i>
                  </span>
                </li>
              ))}
            </ul>
            <p>
              <strong>Delivery Date:</strong> {order.deliveryDate}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default OrderHistory;
