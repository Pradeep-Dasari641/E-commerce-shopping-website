import React from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import NavBar from '../NavBar/navBar';
import './cart.css';
import FooterBar from '../Footer/footerBar';

const Cart = () => {
    const { getCart, removeFromCart, decrementFromCart, addToCart } = useCart();
    const cartItems = getCart();
    const navigate = useNavigate(); // Initialize useNavigate

    const handleIncrement = (item) => {
        addToCart(item);
    };

    const handleDecrement = (item) => {
        decrementFromCart(item);
    };

    const handleDelete = (itemId) => {
        removeFromCart(itemId);
    };

    const handleBuy = (item) => {
        const selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];
        const existingProductIndex = selectedProducts.findIndex(product => product.id === item.id);

        if (existingProductIndex > -1) {
            // Update quantity if the product already exists in the order
            selectedProducts[existingProductIndex].quantity += item.quantity;
        } else {
            // Add new item to the order
            selectedProducts.push({ ...item, quantity: item.quantity });
        }

        localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));

        // Navigate to the order summary page after adding the item
        navigate('/myOrder');
    };

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div>
            <NavBar />
            <div className="cart-container">
                <h2>Your Cart</h2>
                {cartItems.length === 0 ? (
                    <img className='empty-cart' src='https://cdn-icons-png.flaticon.com/512/11329/11329060.png' alt="Empty Cart" />
                ) : (
                    <>
                        {cartItems.map((item, index) => (
                            <div key={index} className="cart-item">
                                <img src={item.thumbnail} alt={item.title} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <h3>{item.title}</h3>
                                    <div className="quantity-controls">
                                        <p className='quantity'><strong className='Bold'>Quantity:</strong></p>
                                        <button onClick={() => handleDecrement(item)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => handleIncrement(item)}>+</button>
                                    </div>
                                    <p><strong className='Bold'>Price: $</strong><span className='answer'>{(item.price * item.quantity).toFixed(2)}</span></p>
                                    <p><strong className='Bold'>Delivery: </strong><span className='answer'>{item.shippingInformation}</span></p>

                                    <button onClick={() => handleDelete(item.id)} className="delete-button">Delete</button>
                                    <button onClick={() => handleBuy(item)} className='buy-now'>Buy</button>
                                </div>
                            </div>
                        ))}
                        <div className="total-price">
                            <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
                        </div>
                    </>
                )}
            </div>

            <FooterBar />
        </div>
    );
};

export default Cart;
