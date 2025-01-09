import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../../NavBar/navBar";
import { useCart } from "../../CartItems/CartContext"; // Import the useCart hook
import { useNavigate } from "react-router-dom";

const FurnitureDetails = () => {
  const { state } = useLocation();
  const { item } = state;
  const { addToCart, getCart } = useCart();
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(item.thumbnail);

  const smallImages = item.images; // Assuming the API returns an array of images for the product

  const handleAddToCart = () => {
    addToCart(item);
  };

  const handleBuyNow = () => {
    // Retrieve existing products from local storage or initialize an empty array
    const existingProducts =
      JSON.parse(localStorage.getItem("selectedProducts")) || [];

    // Add the new product to the array
    existingProducts.push(item);

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
              <img src={selectedImage} alt={item.title} className="big-image" />
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
            <h2>{item.title}</h2>
            <p className="name">
              <b className="tag">Description:</b> {item.description}
            </p>
            <p className="category">
              <b className="category-name">Category:</b> {item.category}
            </p>
            <p>
              <b className="Price">${item.price}</b>{" "}
              <span className="discount">{item.discountPercentage}% off</span>
            </p>
            <p className="name">
              <b className="tag">Brand:</b> {item.brand}
            </p>
            <p>
              <button className="rating">
                <b>{item.rating}</b>
              </button>
            </p>
            <p className="name">
              <b className="tag">Size:</b>{" "}
              {`Width:${item.dimensions.width} x Height:${item.dimensions.height} x Depth:${item.dimensions.depth}`}
            </p>
            <p className="name">
              <b className="tag">Stock Available:</b> {item.stock}
            </p>
            <p className="name">
              <b className="tag">Warranty:</b> {item.warrantyInformation}
            </p>
            <p className="name">
              <b className="tag">Delivery:</b> {item.shippingInformation}
            </p>
            <p className="name">
              <b className="tag">Stock:</b> {item.availabilityStatus}
            </p>

            <h2>Reviews</h2>
            <div>
              {item.reviews && item.reviews.length > 0 ? (
                item.reviews.map((review, index) => (
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

export default FurnitureDetails;
