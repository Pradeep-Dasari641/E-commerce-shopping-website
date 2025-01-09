import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../../NavBar/navBar";
import { useCart } from "../../CartItems/CartContext"; // Import the useCart hook
import { useNavigate } from "react-router-dom";

const SunglassDetails = () => {
  const { state } = useLocation();
  const { sunglass } = state;
  const { addToCart, getCart } = useCart();
  const navigate = useNavigate();

  // State for selected image
  const [selectedImage, setSelectedImage] = useState(sunglass.thumbnail);

  const smallImages = sunglass.images;

  const handleAddToCart = () => {
    addToCart(sunglass);
  };

  const handleBuyNow = () => {
    // Retrieve existing products from local storage or initialize an empty array
    const existingProducts =
      JSON.parse(localStorage.getItem("selectedProducts")) || [];

    // Add the new product to the array
    existingProducts.push(sunglass);

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
                alt={sunglass.title}
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
            <h2>{sunglass.title}</h2>
            <p className="name">
              <b className="tag">Description:</b> {sunglass.description}
            </p>
            <p className="category">
              <b className="category-name">Category:</b> {sunglass.category}
            </p>
            <p>
              <b className="Price">${sunglass.price}</b>{" "}
              <span className="discount">
                {sunglass.discountPercentage}% off
              </span>
            </p>
            <p className="name">
              <b className="tag">Brand:</b> {sunglass.brand}
            </p>
            <p>
              <button className="rating">
                <b>{sunglass.rating}</b>
              </button>
            </p>
            <p className="name">
              <b className="tag">Size:</b>{" "}
              {`Width:${sunglass.dimensions.width} x Height:${sunglass.dimensions.height} x Depth:${sunglass.dimensions.depth}`}
            </p>
            <p className="name">
              <b className="tag">Stock Available:</b> {sunglass.stock}
            </p>
            <p className="name">
              <b className="tag">Warranty:</b> {sunglass.warrantyInformation}
            </p>
            <p className="name">
              <b className="tag">Delivery:</b> {sunglass.shippingInformation}
            </p>
            <p className="name">
              <b className="tag">Stock:</b> {sunglass.availabilityStatus}
            </p>

            <h2>Reviews</h2>
            <div>
              {sunglass.reviews && sunglass.reviews.length > 0 ? (
                sunglass.reviews.map((review, index) => (
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

export default SunglassDetails;
