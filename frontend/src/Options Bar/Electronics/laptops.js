import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './electronic.css';
import NavBar from '../../NavBar/navBar';

const Laptops = () => {
    const [laptops, setLaptops] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            fetch('https://dummyjson.com/products/category/laptops')
                .then(response => response.json())
                .then(data => {
                    setLaptops(data.products);
                    setLoading(false);
                });
        }, 2000);
    }, []);

    const handleImageClick = (laptop) => {
        navigate(`/laptop/${laptop.id}`, { state: { laptop } });
    };

    return (
        <div>
            
            <NavBar />
            <div className="Electronic-container">
                <h1 className='heads'>Laptops</h1>
                <div className="elec-grid">
                    {loading ? (
                        Array.from({ length: 5 }).map((_, index) => (
                            <div className="electronics-card shimmer" key={index}>
                                <div className="shimmer-image"></div>
                                <div className="shimmer-title"></div>
                                <div className="shimmer-price"></div>
                            </div>
                        ))
                    ) : (
                        laptops.map((laptop) => (
                            <div className="electronic-card" key={laptop.id}>
                                <img
                                    src={laptop.thumbnail}
                                    alt={laptop.title}
                                    onClick={() => handleImageClick(laptop)}
                                    style={{ cursor: 'pointer' }}
                                />
                                <b>{laptop.title}</b>
                                <p>${laptop.price}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Laptops;
