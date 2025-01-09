import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './women.css';
import NavBar from '../../NavBar/navBar';

const BeautyProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            fetch('https://dummyjson.com/products/category/beauty')
                .then(response => response.json())
                .then(data => {
                    setProducts(data.products);
                    setLoading(false);
                });
        }, 2000);
    }, []);

    const handleImageClick = (product) => {
        navigate(`/beauty/${product.id}`, { state: { product } });
    };

    return (
        <div>
            <NavBar />
            <div className="shirts-container">
                <h1 className='heads'>Beauty Products</h1>
                <div className="shirts-grid">
                    {loading ? (
                        Array.from({ length: 5 }).map((_, index) => (
                            <div className="shirt-card shimmer" key={index}>
                                <div className="shimmer-image"></div>
                                <div className="shimmer-title"></div>
                                <div className="shimmer-price"></div>
                            </div>
                        ))
                    ) : (
                        products.map((product) => (
                            <div className="shirt-card" key={product.id}>
                                <img
                                    src={product.thumbnail}
                                    alt={product.title}
                                    onClick={() => handleImageClick(product)}
                                    style={{ cursor: 'pointer' }}
                                />
                                <b>{product.title}</b>
                                <p>${product.price}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default BeautyProducts;
