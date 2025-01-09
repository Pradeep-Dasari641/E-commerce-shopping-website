import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './electronic.css';
import NavBar from '../../NavBar/navBar';

const Smartphones = () => {
    const [smartphones, setSmartphones] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            fetch('https://dummyjson.com/products/category/smartphones')
                .then(response => response.json())
                .then(data => {
                    setSmartphones(data.products);
                    setLoading(false);
                });
        }, 2000);
    }, []);

    const handleImageClick = (smartphone) => {
        navigate(`/smartphone/${smartphone.id}`, { state: { smartphone } });
    };

    return (
        <div>
           
           <NavBar />
            <div className="Electronic-container">
                <h1 className='heads'>Smartphones</h1>
                <div className="elec-grid">
                    {loading ? (
                        Array.from({ length: 16 }).map((_, index) => (
                            <div className="electronics-card shimmer" key={index}>
                                <div className="shimmer-image"></div>
                                <div className="shimmer-title"></div>
                                <div className="shimmer-price"></div>
                            </div>
                        ))
                    ) : (
                        smartphones.map((smartphone) => (
                            <div className="shirt-card" key={smartphone.id}>
                                <img
                                    src={smartphone.thumbnail}
                                    alt={smartphone.title}
                                    onClick={() => handleImageClick(smartphone)}
                                    style={{ cursor: 'pointer' }}
                                />
                                <b>{smartphone.title}</b>
                                <p>${smartphone.price}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Smartphones;
