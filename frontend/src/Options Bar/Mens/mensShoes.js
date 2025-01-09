import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './mens.css';
import NavBar from '../../NavBar/navBar';

const MensShoes = () => {
    const [shoes, setShoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            fetch('https://dummyjson.com/products/category/mens-shoes')
                .then(response => response.json())
                .then(data => {
                    setShoes(data.products);
                    setLoading(false);
                });
        }, 2000);
    }, []);

    const handleImageClick = (shoe) => {
        navigate(`/shoe/${shoe.id}`, { state: { shoe } });
    };

    return (
        <div>
         
         <NavBar />
                
            <div className="shirts-container">
                <h1 className='heads'>Men's Shoes</h1>
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
                        shoes.map((shoe) => (
                            <div className="shirt-card" key={shoe.id}>
                                <img
                                    src={shoe.thumbnail}
                                    alt={shoe.title}
                                    onClick={() => handleImageClick(shoe)}
                                    style={{ cursor: 'pointer' }}
                                />
                                <b>{shoe.title}</b>
                                <p>${shoe.price}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default MensShoes;
