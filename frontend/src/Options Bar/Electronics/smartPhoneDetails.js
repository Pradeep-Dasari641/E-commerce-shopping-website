import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../../NavBar/navBar";
import { useCart } from "../../CartItems/CartContext"; // Import the useCart hook
import { useNavigate } from "react-router-dom";

const SmartphoneDetails = () => {
  const { state } = useLocation();
  const { smartphone } = state;
  const { addToCart, getCart } = useCart();
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(smartphone.thumbnail);

  const smallImages = smartphone.images;

  const handleAddToCart = () => {
    addToCart(smartphone);
  };

  const handleBuyNow = () => {
    // Retrieve existing products from local storage or initialize an empty array
    const existingProducts =
      JSON.parse(localStorage.getItem("selectedProducts")) || [];

    // Add the new product to the array
    existingProducts.push(smartphone);

    // Save the updated array back to local storage
    localStorage.setItem("selectedProducts", JSON.stringify(existingProducts));

    // Navigate to MyOrder page
    navigate("/myOrder");
  };

  return (
    <div>
      <NavBar />
      <div className="container-fluid wrapper">
        <div className="row">
          {/* Small Images Column */}
          <div className="col-2 small-images">
            {smallImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Small thumbnail ${index + 1}`}
                className="small-image"
                onClick={() => setSelectedImage(image)}
                style={{ cursor: "pointer" }}
              />
            ))}
          </div>

          {/* Big Image Column */}
          <div className="col-5 big-image">
            <div className="big-image-column">
              <img
                src={selectedImage}
                alt={smartphone.title}
                className="big-image"
              />
            </div>
            <div className="button-container">
              <button className="addBuy" onClick={handleAddToCart}>
                Add to this Cart
              </button>
              <button className="addBuy" onClick={handleBuyNow}>
                Buy
              </button>
            </div>
          </div>

          {/* Image Details Column */}
          <div className="col-5 image-details">
            <h2>{smartphone.title}</h2>
            <p className="name">
              <b className="tag">Description:</b> {smartphone.description}
            </p>
            <p>
              <b>Category:</b> {smartphone.category}
            </p>
            <p>
              <b className="Price">${smartphone.price}</b>{" "}
              <span className="discount">
                {smartphone.discountPercentage}% off
              </span>
            </p>
            <p className="name">
              <b className="tag">Brand:</b> {smartphone.brand}
            </p>
            <p>
              <button className="rating">
                <b>{smartphone.rating}</b>
              </button>
            </p>
            <p className="name">
              <b className="tag">Stock Available:</b> {smartphone.stock}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartphoneDetails;
