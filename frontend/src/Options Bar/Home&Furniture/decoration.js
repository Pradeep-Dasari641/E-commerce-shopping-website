import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import NavBar from '../../NavBar/navBar';

const HomeDecoration = () => {
    const [decorations, setDecorations] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            fetch('https://dummyjson.com/products/category/home-decoration')
                .then(response => response.json())
                .then(data => {
                    setDecorations(data.products);
                    setLoading(false);
                });
        }, 2000);
    }, []);

    const handleImageClick = (decoration) => {
        navigate(`/decoration/${decoration.id}`, { state: { decoration } });
    };

    return (
        <div>
           
           <NavBar />
            <div className="shirts-container">
                <h1 className='heads'>Home Decoration</h1>
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
                        decorations.map((decoration) => (
                            <div className="shirt-card" key={decoration.id}>
                                <img
                                    src={decoration.thumbnail}
                                    alt={decoration.title}
                                    onClick={() => handleImageClick(decoration)}
                                    style={{ cursor: 'pointer' }}
                                />
                                <b>{decoration.title}</b>
                                <p>${decoration.price}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomeDecoration;
