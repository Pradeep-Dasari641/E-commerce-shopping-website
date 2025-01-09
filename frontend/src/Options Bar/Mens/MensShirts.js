import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './mens.css';
import NavBar from '../../NavBar/navBar';
import FooterBar from '../../Footer/footerBar';

const MensShirts = () => {
    const [shirts, setShirts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            fetch('https://dummyjson.com/products/category/mens-shirts')
                .then(response => response.json())
                .then(data => {
                    setShirts(data.products);
                    setLoading(false);
                }
                
            );
        }, 2000);
    }, []);

    const handleImageClick = (shirt) => {
        navigate(`/shirt/${shirt.id}`, { state: { shirt } });
    };

    return (
        <div>

            <NavBar />

            <div className="shirts-container">
                <h1 className='heads'>Men's Shirts</h1>
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
                        shirts.map((shirt) => (
                            <div className="shirt-card" key={shirt.id}>
                                <img
                                    src={shirt.thumbnail}
                                    alt={shirt.title}
                                    onClick={() => handleImageClick(shirt)}
                                    style={{ cursor: 'pointer' }}
                                />
                                <b>{shirt.title}</b>
                                <p>${shirt.price}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
             
             <FooterBar />
        </div>

    );
};

export default MensShirts;
