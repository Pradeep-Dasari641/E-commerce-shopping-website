import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './women.css';
import NavBar from '../../NavBar/navBar';

const Tops = () => {
    const [tops, setTops] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            fetch('https://dummyjson.com/products/category/tops')
                .then(response => response.json())
                .then(data => {
                    setTops(data.products);
                    setLoading(false);
                });
        }, 2000);
    }, []);

    const handleImageClick = (top) => {
        navigate(`/top/${top.id}`, { state: { top } });
    };

    return (
        <div>
           
            <NavBar />
            <div className="shirts-container">
                <h1 className='heads'>Tops</h1>
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
                        tops.map((top) => (
                            <div className="shirt-card" key={top.id}>
                                <img
                                    src={top.thumbnail}
                                    alt={top.title}
                                    onClick={() => handleImageClick(top)}
                                    style={{ cursor: 'pointer' }}
                                />
                                <b>{top.title}</b>
                                <p>${top.price}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Tops;
