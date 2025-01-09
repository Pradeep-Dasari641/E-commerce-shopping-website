import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../../NavBar/navBar";
import { useCart } from "../../CartItems/CartContext"; // Import the useCart hook
import { useNavigate } from "react-router-dom";

const DecorationDetails = () => {
  const { state } = useLocation();
  const { decoration } = state;
  const { addToCart, getCart } = useCart();
  const navigate = useNavigate();

  // State for selected image
  const [selectedImage, setSelectedImage] = useState(decoration.thumbnail);

  const smallImages = decoration.images;

  const handleAddToCart = () => {
    addToCart(decoration);
  };

  const handleBuyNow = () => {
    // Retrieve existing products from local storage or initialize an empty array
    const existingProducts =
      JSON.parse(localStorage.getItem("selectedProducts")) || [];

    // Add the new product to the array
    existingProducts.push(decoration);

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
                alt={decoration.title}
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
            <h2>{decoration.title}</h2>
            <p className="name">
              <b className="tag">Description:</b> {decoration.description}
            </p>
            <p className="category">
              <b className="category-name">Category:</b> {decoration.category}
            </p>
            <p>
              <b className="Price">${decoration.price}</b>{" "}
              <span className="discount">
                {decoration.discountPercentage}% off
              </span>
            </p>
            <p className="name">
              <b className="tag">Brand:</b> {decoration.brand}
            </p>
            <p>
              <button className="rating">
                <b>{decoration.rating}</b>
              </button>
            </p>
            <p className="name">
              <b className="tag">Size:</b>{" "}
              {`Width:${decoration.dimensions.width} x Height:${decoration.dimensions.height} x Depth:${decoration.dimensions.depth}`}
            </p>
            <p className="name">
              <b className="tag">Stock Available:</b> {decoration.stock}
            </p>
            <p className="name">
              <b className="tag">Warranty:</b> {decoration.warrantyInformation}
            </p>
            <p className="name">
              <b className="tag">Delivery:</b> {decoration.shippingInformation}
            </p>
            <p className="name">
              <b className="tag">Stock:</b> {decoration.availabilityStatus}
            </p>

            <h2>Reviews</h2>
            <div>
              {decoration.reviews && decoration.reviews.length > 0 ? (
                decoration.reviews.map((review, index) => (
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

export default DecorationDetails;
