import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './electronic.css';
import NavBar from '../../NavBar/navBar';

const MobileAccessories = () => {
    const [accessories, setAccessories] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            fetch('https://dummyjson.com/products/category/mobile-accessories')
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
            <div className="Electronic-container">
                <h1 className='heads'>Mobile Accessories</h1>
                <div className="elec-grid">
                    {loading ? (
                        Array.from({ length: 14 }).map((_, index) => (
                            <div className="electronics shimmer" key={index}>
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

export default MobileAccessories;
