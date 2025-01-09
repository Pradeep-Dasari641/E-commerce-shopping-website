import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./sports.css";
import { useCart } from "../../CartItems/CartContext";
import NavBar from "../../NavBar/navBar";
import { useNavigate } from "react-router-dom";

const SportsDetails = () => {
  const { state } = useLocation();
  const { accessory } = state;
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // State for selected image and notification message
  const [selectedImage, setSelectedImage] = useState(accessory.thumbnail);

  const smallImages = accessory.images;

  const handleAddToCart = () => {
    addToCart(accessory);
  };

  const handleBuyNow = () => {
    // Retrieve existing products from local storage or initialize an empty array
    const existingProducts =
      JSON.parse(localStorage.getItem("selectedProducts")) || [];

    // Add the new product to the array
    existingProducts.push(accessory);

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
                alt={accessory.title}
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
            <h2>{accessory.title}</h2>
            <p className="name">
              <b className="tag">Description:</b> {accessory.description}
            </p>
            <p>
              <b>Category:</b> {accessory.category}
            </p>
            <p>
              <b className="Price">${accessory.price}</b>{" "}
              <span className="discount">
                {accessory.discountPercentage}% off
              </span>
            </p>
            <p className="name">
              <b className="tag">Brand:</b> {accessory.brand}
            </p>
            <p>
              <button className="rating">
                <b>{accessory.rating}</b>
              </button>
            </p>
            <p className="name">
              <b className="tag">Size:</b>{" "}
              {`Width:${accessory.dimensions.width} x Height:${accessory.dimensions.height} x Depth:${accessory.dimensions.depth}`}
            </p>
            <p className="name">
              <b className="tag">Stock Available:</b> {accessory.stock}
            </p>
            <p className="name">
              <b className="tag">Warranty:</b> {accessory.warrantyInformation}
            </p>
            <p className="name">
              <b className="tag">Delivery:</b> {accessory.shippingInformation}
            </p>
            <p className="name">
              <b className="tag">Stock:</b> {accessory.availabilityStatus}
            </p>

            <h2>Reviews</h2>
            <div>
              {accessory.reviews && accessory.reviews.length > 0 ? (
                accessory.reviews.map((review, index) => (
                  <div key={index} className="review">
                    <p>
                      <b>Rating:</b> {review.rating} / 5
                    </p>
                    <p>
                      <b>Comment:</b> {review.comment}
                    </p>
                    <p>
                      <b>Reviewer:</b> {review.reviewerName}
                    </p>
                    <p>
                      <b>Date:</b> {new Date(review.date).toLocaleDateString()}
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

export default SportsDetails;
