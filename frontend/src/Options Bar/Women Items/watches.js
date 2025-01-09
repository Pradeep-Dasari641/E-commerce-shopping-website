import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './women.css';
import NavBar from '../../NavBar/navBar';

const WomensWatches = () => {
    const [watches, setWatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            fetch('https://dummyjson.com/products/category/womens-watches')
                .then(response => response.json())
                .then(data => {
                    setWatches(data.products);
                    setLoading(false);
                });
        }, 2000);
    }, []);

    const handleImageClick = (watch) => {
        navigate(`/watch/${watch.id}`, { state: { watch } });
    };

    return (
        <div>
            
            <NavBar />
            <div className="shirts-container">
                <h1 className='heads'>Women's Watches</h1>
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
                        watches.map((watch) => (
                            <div className="shirt-card" key={watch.id}>
                                <img
                                    src={watch.thumbnail}
                                    alt={watch.title}
                                    onClick={() => handleImageClick(watch)}
                                    style={{ cursor: 'pointer' }}
                                />
                                <b>{watch.title}</b>
                                <p>${watch.price}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default WomensWatches;
