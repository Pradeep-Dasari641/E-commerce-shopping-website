import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './women.css';
import NavBar from '../../NavBar/navBar';

const WomensJewellery = () => {
    const [jewellery, setJewellery] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            fetch('https://dummyjson.com/products/category/womens-jewellery')
                .then(response => response.json())
                .then(data => {
                    setJewellery(data.products);
                    setLoading(false);
                });
        }, 2000);
    }, []);

    const handleImageClick = (item) => {
        navigate(`/jewellery/${item.id}`, { state: { item } });
    };

    return (
        <div>
            
            <NavBar />
            <div className="shirts-container">
                <h1 className='heads'>Women's Jewellery</h1>
                <div className="shirts-grid">
                    {loading ? (
                        Array.from({ length: 3 }).map((_, index) => (
                            <div className="shirt-card shimmer" key={index}>
                                <div className="shimmer-image"></div>
                                <div className="shimmer-title"></div>
                                <div className="shimmer-price"></div>
                            </div>
                        ))
                    ) : (
                        jewellery.map((item) => (
                            <div className="shirt-card" key={item.id}>
                                <img
                                    src={item.thumbnail}
                                    alt={item.title}
                                    onClick={() => handleImageClick(item)}
                                    style={{ cursor: 'pointer' }}
                                />
                                <b>{item.title}</b>
                                <p>${item.price}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default WomensJewellery;
