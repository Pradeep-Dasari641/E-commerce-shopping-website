import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './mens.css';
import NavBar from '../../NavBar/navBar';

const Sunglasses = () => {
    const [sunglasses, setSunglasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            fetch('https://dummyjson.com/products/category/sunglasses')
                .then(response => response.json())
                .then(data => {
                    setSunglasses(data.products);
                    setLoading(false);
                });
        }, 2000);
    }, []);

    const handleImageClick = (sunglass) => {
        navigate(`/sunglass/${sunglass.id}`, { state: { sunglass } });
    };

    return (
        <div>
           <NavBar />

            <div className="shirts-container">
                <h1 className='heads'>Sunglasses</h1>
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
                        sunglasses.map((sunglass) => (
                            <div className="shirt-card" key={sunglass.id}>
                                <img
                                    src={sunglass.thumbnail}
                                    alt={sunglass.title}
                                    onClick={() => handleImageClick(sunglass)}
                                    style={{ cursor: 'pointer' }}
                                />
                                <b>{sunglass.title}</b>
                                <p>${sunglass.price}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sunglasses;
