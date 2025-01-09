import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import NavBar from '../../NavBar/navBar';

const KitchenAccessories = () => {
    const [accessories, setAccessories] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            fetch('https://dummyjson.com/products/category/kitchen-accessories')
                .then(response => response.json())
                .then(data => {
                    setAccessories(data.products);
                    setLoading(false);
                });
        }, 2000);
    }, []);

    const handleImageClick = (accessory) => {
        navigate(`/accessory/${accessory.id}`, { state: { accessory } });
    };

    return (
        <div>
            <NavBar />
            <div className="shirts-container">
                <h1 className='heads'>Kitchen Accessories</h1>
                <div className="shirts-grid">
                    {loading ? (
                        Array.from({ length: 30 }).map((_, index) => (
                            <div className="shirt-card shimmer" key={index}>
                                <div className="shimmer-image"></div>
                                <div className="shimmer-title"></div>
                                <div className="shimmer-price"></div>
                            </div>
                        ))
                    ) : (
                        accessories.map((accessory) => (
                            <div className="shirt-card" key={accessory.id}>
                                <img
                                    src={accessory.thumbnail}
                                    alt={accessory.title}
                                    onClick={() => handleImageClick(accessory)}
                                    style={{ cursor: 'pointer' }}
                                />
                                <b>{accessory.title}</b>
                                <p>${accessory.price}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default KitchenAccessories;
