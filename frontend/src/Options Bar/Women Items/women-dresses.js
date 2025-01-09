import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './women.css';
import NavBar from '../../NavBar/navBar';

const WomensDresses = () => {
    const [dresses, setDresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            fetch('https://dummyjson.com/products/category/womens-dresses')
                .then(response => response.json())
                .then(data => {
                    setDresses(data.products);
                    setLoading(false);
                });
        }, 2000);
    }, []);

    const handleImageClick = (dress) => {
        navigate(`/dress/${dress.id}`, { state: { dress } });
    };

    return (
        <div>
            <NavBar />
            <div className="shirts-container">
                <h1 className='heads'>Women's Dresses</h1>
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
                        dresses.map((dress) => (
                            <div className="shirt-card" key={dress.id}>
                                <img
                                    src={dress.thumbnail}
                                    alt={dress.title}
                                    onClick={() => handleImageClick(dress)}
                                    style={{ cursor: 'pointer' }}
                                />
                                <b>{dress.title}</b>
                                <p>${dress.price}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default WomensDresses;
