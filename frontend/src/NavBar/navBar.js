import React, { useState, useEffect } from "react";
import "./navBar.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../CartItems/CartContext";


function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { getCart } = useCart();
  



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

  const goToOrders = () => {
    navigate('/History');
  };

  const viewCart = () => {
    navigate("/cart");
  };

  const cartItems = getCart();
  const totalCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const navigateHome = () => {
    navigate("/home");
  };

  return (
    <div className="all-bar">
      <div>
        <img className="logo" onClick={navigateHome} src="https://static.vecteezy.com/system/resources/previews/010/916/011/original/online-shopping-concept-design-or-3d-online-shopping-or-shopping-promotional-design-free-png.png" alt="" />
      </div>
      <div className="all-search">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for brands, products, & etc..."
            className="search-input"
          />
        </div>
      
      </div>

      <div>
        <button className="all-cart" onClick={viewCart}>
          <i className="fa-solid fa-cart-shopping"></i>
          {totalCount > 0 && <span className="cart-count">{totalCount}</span>}
        </button>
      </div>

      <div className="home-profile">
        <button onClick={toggleMenu} className="profile-button">
          <i className="fa-solid fa-user profile-icon"></i>
          Profile
        </button>
        {menuOpen && (
          <div className="dropdown">
            <button className="dropdown-item" onClick={goToProfile}>
              My Profile
            </button>

            <button className="dropdown-item" onClick={goToOrders}>
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
