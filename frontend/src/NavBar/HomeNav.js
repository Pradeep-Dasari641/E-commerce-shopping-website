import React, { useState } from "react";
import "./navBar.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../CartItems/CartContext";
import axios from 'axios'


function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { getCart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');


  
  const handleSearch = async () => {
    try {
        const response = await axios.get(`https://dummyjson.com/products/category/mens-shirts`);
        const filteredProducts = response.data.products.filter(product =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Navigate to results page with products in state
        navigate('/results', { state: { products: filteredProducts } }); // Updated navigation
    } catch (error) {
        console.error("Error fetching the products", error);
    }
};

 

  const handleLogout = () => {
    navigate("/");
  };

  
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const goToProfile = () => {
    navigate("/Profile");
    setMenuOpen(false);
  };

  const goToOrder = () => {
    navigate("/myOrder");
    setMenuOpen((prev) => !prev);
  };

  const viewCart = () => {
    navigate("/cart"); // Navigate to cart page
  };

  // Get total count of items in cart
  const cartItems = getCart();
  const totalCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const navigateHome = () => {
    navigate("/home"); // Navigate to home page
  };

  

  return (
    <div className="all-bar">
      <div>
      <img className="logo" onClick={navigateHome} src="https://static.vecteezy.com/system/resources/previews/010/916/011/original/online-shopping-concept-design-or-3d-online-shopping-or-shopping-promotional-design-free-png.png" />
      </div>


      <div>
        <button className="all-cart" onClick={viewCart}>
          <i className="fa-solid fa-cart-shopping"></i>
          {totalCount > 0 && <span className="cart-count">{totalCount}</span>}
        </button>
      </div>

      <div className="home-profile">
        <button onClick={toggleMenu} className="profile-button">
        <i className="fa-solid fa-user"></i>
          Profile
        </button>
        {menuOpen && (
          <div className="dropdown">
            <button className="dropdown-item" onClick={goToProfile}>
              My Profile
            </button>
            <button className="dropdown-item" onClick={goToOrder}>
              My Orders
            </button>
            <button className="dropdown-item" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        )}
      </div>
     
    </div>
  );
}

export default NavBar;
