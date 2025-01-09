import React, { useEffect, useState } from "react";
import "./orders.css";
import { useUserContext } from "./UserContext";
import HomeNavBar from "../NavBar/HomeNav";
import { useNavigate } from "react-router-dom";

function MyOrder() {
  const { userData } = useUserContext();
  const navigate = useNavigate();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [name, setName] = useState(userData.username || "");
  const [address, setAddress] = useState(userData.address || "");
  const [email, setEmail] = useState(userData.email || "");
  const [mobileNumber, setMobileNumber] = useState(userData.mobileNumber || "");
  const [isEditing, setIsEditing] = useState({
    name: false,
    address: false,
    email: false,
    mobile: false,
  });
  const [updateMessage, setUpdateMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // New state for success message

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem("selectedProducts")) || [];
    setSelectedProducts(products);
  }, []);

  const handleEditField = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: true }));
  };

  const handleSave = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: false }));
    setUpdateMessage("Details updated successfully!");
    setTimeout(() => {
      setUpdateMessage("");
    }, 3000);
  };

  const handleDeleteProduct = (index) => {
    const updatedProducts = selectedProducts.filter((_, i) => i !== index);
    setSelectedProducts(updatedProducts);
    localStorage.setItem("selectedProducts", JSON.stringify(updatedProducts));
  };

  const handleSubmit = () => {
    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded");
      return;
    }

    const amount =
      selectedProducts.reduce(
        (total, product) => total + product.price * (product.quantity || 1),
        0
      ) * 100;

    const options = {
      key: "rzp_test_Su4WV4zdBIGTmZ",
      amount: amount,
      name: "RS Insurance Company",
      description: "Product/Service Description",
      image: "path_to_your_logo.png",
      handler: function (response) {

        const orderStatus = {
          orderId: response.razorpay_payment_id,
          status: "Processing",
          products: selectedProducts,
          notes: {
            address: address,
          },
          trackingLink: `https://example.com/track/${response.razorpay_payment_id}`,
          deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        };

        // Store the order in history
        const existingOrders = JSON.parse(localStorage.getItem("orderHistory")) || [];
        existingOrders.push(orderStatus);
        localStorage.setItem("orderHistory", JSON.stringify(existingOrders));

        localStorage.setItem("orderStatus", JSON.stringify(orderStatus));
        localStorage.removeItem("selectedProducts");
        setSelectedProducts([]);
        
        // Set the success message
        setSuccessMessage("Your order has been placed successfully!");
        setTimeout(() => {
          setSuccessMessage("");
          navigate("/History"); // Navigate after displaying the message
        }, 3000);
      },
      prefill: {
        name: name,
        email: email,
        contact: mobileNumber,
      },
      notes: {
        address: address,
      },
      theme: {
        color: "#F37254",
      },
    };

    const pay = new window.Razorpay(options);
    pay.open();
  };

  const totalPrice = selectedProducts
    .reduce(
      (total, product) => total + product.price * (product.quantity || 1),
      0
    )
    .toFixed(2);

  if (!selectedProducts.length) {
    return (
      <div>
        <HomeNavBar />
        <img
          className="no-products"
          src="https://thumbs.dreamstime.com/b/order-now-shopping-cart-white-background-65508048.jpg"
          alt="No Products"
        />
      </div>
    );
  }

  return (
    <div className="order-container">
      <HomeNavBar />
      <h3 className="summary">Order Summary</h3>

      {/* User Details */}
      <div className="order-login">
        {["name", "mobile", "address", "email"].map((field) => (
          <div className="input-group" key={field}>
            <input
              className={`order-name ${isEditing[field] ? "blink" : ""}`}
              type={field === "email" ? "email" : field === "mobile" ? "tel" : "text"}
              value={field === "name" ? name : field === "mobile" ? mobileNumber : field === "address" ? address : email}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              readOnly={!isEditing[field]}
              onChange={(e) => {
                if (field === "name") setName(e.target.value);
                else if (field === "mobile") setMobileNumber(e.target.value);
                else if (field === "address") setAddress(e.target.value);
                else if (field === "email") setEmail(e.target.value);
              }}
            />
            <span className="edit-icon" onClick={() => handleEditField(field)}>
              ✏️
            </span>
            {isEditing[field] && (
              <button onClick={() => handleSave(field)} className="save-button">
                Save
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Update message display */}
      {updateMessage && <div className="update-message">{updateMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>} {/* New success message display */}

      {/* Product List */}
      <div className="detail-order">
        {selectedProducts.map((product, index) => (
          <div key={index} className="order-item">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="small-image"
            />
            <div className="order-details">
              <h4 style={{color: "gray"}}>{product.title}</h4>
              <p style={{color: "green", fontSize: "20px"}}>Price: ${product.price}</p>
              <p style={{color: "green", fontSize: "20px"}}>Quantity: {product.quantity || 1}</p>
            </div>
            <span>
              <i
                className="fas fa-trash delete-icon"
                onClick={() => handleDeleteProduct(index)}
              ></i>
            </span>
          </div>
        ))}
        <p className="total-price" style={{color: "black"}}>Total Price: ${totalPrice}</p>
      </div>

      {/* Payment Button */}
      <div className="order-login">
        <button className="payment-button" onClick={handleSubmit}>
          Payment Options
        </button>
      </div>
    </div>
  );
}

export default MyOrder;
