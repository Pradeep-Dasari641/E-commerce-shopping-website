import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../../NavBar/navBar";
import "./mens.css";
import { useCart } from "../../CartItems/CartContext"; // Import the useCart hook
import { useNavigate } from "react-router-dom";

const ShirtDetails = () => {
  const { state } = useLocation();
  const { shirt } = state;
  const { addToCart, getCart } = useCart();
  const navigate = useNavigate();

  // State for selected image
  const [selectedImage, setSelectedImage] = useState(shirt.thumbnail);

  const smallImages = shirt.images;

  const handleAddToCart = () => {
    addToCart(shirt);
  };

  const handleBuyNow = () => {
    // Retrieve existing products from local storage or initialize an empty array
    const existingProducts =
      JSON.parse(localStorage.getItem("selectedProducts")) || [];

    // Add the new product to the array
    existingProducts.push(shirt);

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
                alt={shirt.title}
                className="big-image"
              />
            </div>
            <div className="button-container">
              <button className="addBuy" onClick={handleAddToCart}>
                Add to Cart
              </button>
              <button className="addBuy" onClick={handleBuyNow}>
                Buy
              </button>
            </div>
          </div>

          {/* Image Details Column */}
          <div className="col-5 image-details">
            <h2>{shirt.title}</h2>
            <p className="name">
              <b className="tag">Description:</b> {shirt.description}
            </p>
            <p className="category">
              <b className="category-name">Category:</b> {shirt.category}
            </p>
            <p>
              <b className="Price">${shirt.price}</b>{" "}
              <span className="discount">{shirt.discountPercentage}% off</span>
            </p>
            <p className="name">
              <b className="tag">Brand:</b> {shirt.brand}
            </p>
            <p>
              <button className="rating">
                <b>{shirt.rating}</b>
              </button>
            </p>
            <p className="name">
              <b className="tag">Size:</b>{" "}
              {`Width:${shirt.dimensions.width} x Height:${shirt.dimensions.height} x Depth:${shirt.dimensions.depth}`}
            </p>
            <p className="name">
              <b className="tag">Stock Available:</b> {shirt.stock}
            </p>
            <p className="name">
              <b className="tag">Warranty:</b> {shirt.warrantyInformation}
            </p>
            <p className="name">
              <b className="tag">Delivery:</b> {shirt.shippingInformation}
            </p>
            <p className="name">
              <b className="tag">Stock:</b> {shirt.availabilityStatus}
            </p>

            <h2>Reviews</h2>
            <div>
              {shirt.reviews && shirt.reviews.length > 0 ? (
                shirt.reviews.map((review, index) => (
                  <div key={index} className="review">
                    <p className="Rating">
                      <b className="rating-details">Rating:</b> {review.rating} / 5
                    </p>
                    <p className="Rating">
                      <b className="rating-details">Comment:</b> {review.comment}
                    </p>
                    <p className="Rating">
                      <b className="rating-details">Reviewer:</b> {review.reviewerName}
                    </p>
                    <p className="Rating">
                      <b className="rating-details">Date:</b> {new Date(review.date).toLocaleDateString()}
                    </p>
                    <hr />
                  </div>
                ))
              ) : (
                <p>No reviews available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShirtDetails;
