import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './women.css';
import NavBar from '../../NavBar/navBar';

const WomensBags = () => {
    const [bags, setBags] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            fetch('https://dummyjson.com/products/category/womens-bags')
                .then(response => response.json())
                .then(data => {
                    setBags(data.products);
                    setLoading(false);
                });
        }, 2000);
    }, []);

    const handleImageClick = (bag) => {
        navigate(`/bag/${bag.id}`, { state: { bag } });
    };

    return (
        <div>
            
            <NavBar />
            <div className="shirts-container">
                <h1 className='heads'>Women's Bags</h1>
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
                        bags.map((bag) => (
                            <div className="shirt-card" key={bag.id}>
                                <img
                                    src={bag.thumbnail}
                                    alt={bag.title}
                                    onClick={() => handleImageClick(bag)}
                                    style={{ cursor: 'pointer' }}
                                />
                                <b>{bag.title}</b>
                                <p>${bag.price}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default WomensBags;
