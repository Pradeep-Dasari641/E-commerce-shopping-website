import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './sports.css';
import NavBar from '../../NavBar/navBar';

const SportsAccessories = () => {
    const [accessories, setAccessories] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            fetch('https://dummyjson.com/products/category/sports-accessories')
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
            <div className="sports-container">
                <h1 className='heads'>Sports Accessories</h1>
                <div className="sport-grid">
                    {loading ? (
                        Array.from({ length: 17 }).map((_, index) => (
                            <div className="sports-card shimmer" key={index}>
                                <div className="shimmer-image"></div>
                                <div className="shimmer-title"></div>
                                <div className="shimmer-price"></div>
                            </div>
                        ))
                    ) : (
                        accessories.map((accessory) => (
                            <div className="sports-card" key={accessory.id}>
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

export default SportsAccessories;
