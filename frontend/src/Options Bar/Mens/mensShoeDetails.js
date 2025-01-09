import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../../NavBar/navBar";
import { useCart } from "../../CartItems/CartContext"; // Import the useCart hook
import { useNavigate } from "react-router-dom";

const MenShoeDetails = () => {
  const { state } = useLocation();
  const { shoe } = state;
  const { addToCart, getCart } = useCart();
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(shoe.thumbnail);

  const smallImages = shoe.images;

  const handleAddToCart = () => {
    console.log("Shoe data:", shoe); // Log the shoe data for debugging
    addToCart(shoe); // Add the shoe to the cart
  };

  const handleBuyNow = () => {
    // Retrieve existing products from local storage or initialize an empty array
    const existingProducts =
      JSON.parse(localStorage.getItem("selectedProducts")) || [];

    // Add the new product to the array
    existingProducts.push(shoe);

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

          <div className="col-5 big-image">
            <div className="big-image-column">
              <img src={selectedImage} alt={shoe.title} className="big-image" />
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

          <div className="col-5 image-details">
            <h2>{shoe.title}</h2>
            <p className="name">
              <b className="tag">Description:</b> {shoe.description}
            </p>
            <p className="category">
              <b className="category-name">Category:</b> {shoe.category}
            </p>
            <p>
              <b className="Price">${shoe.price}</b>{" "}
              <span className="discount">{shoe.discountPercentage}% off</span>
            </p>
            <p className="name">
              <b className="tag">Brand:</b> {shoe.brand}
            </p>
            <p>
              <button className="rating">
                <b>{shoe.rating}</b>
              </button>
            </p>
            <p className="name">
              <b className="tag">Stock Available:</b> {shoe.stock}
            </p>

            <h2>Reviews</h2>
            <div>
              {shoe.reviews && shoe.reviews.length > 0 ? (
                shoe.reviews.map((review, index) => (
                  <div key={index} className="review">
                    <p className="Rating">
                      <b className="rating-details">Rating:</b> {review.rating} / 5
                    </p>
                    <p>
                      <b className="rating-details">Comment:</b> {review.comment}
                    </p>
                    <p>
                      <b className="rating-details">Reviewer:</b> {review.reviewerName}
                    </p>
                    <p>
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

export default MenShoeDetails;
