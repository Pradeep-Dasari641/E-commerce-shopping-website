import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './women.css';
import NavBar from '../../NavBar/navBar';

const Fragrances = () => {
    const [fragrances, setFragrances] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            fetch('https://dummyjson.com/products/category/fragrances')
                .then(response => response.json())
                .then(data => {
                    setFragrances(data.products);
                    setLoading(false);
                });
        }, 2000);
    }, []);

    const handleImageClick = (fragrance) => {
        navigate(`/fragrance/${fragrance.id}`, { state: { fragrance } });
    };

    return (
        <div>
            
             <NavBar />
            <div className="shirts-container">
                <h1 className='heads'>Fragrances</h1>
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
                        fragrances.map((fragrance) => (
                            <div className="shirt-card" key={fragrance.id}>
                                <img
                                    src={fragrance.thumbnail}
                                    alt={fragrance.title}
                                    onClick={() => handleImageClick(fragrance)}
                                    style={{ cursor: 'pointer' }}
                                />
                                <b>{fragrance.title}</b>
                                <p>${fragrance.price}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Fragrances;
