import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // You can rename this to something more appropriate like 'furniture.css'
import NavBar from '../../NavBar/navBar';

const FurnitureList = () => {
    const [furniture, setFurniture] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            fetch('https://dummyjson.com/products/category/furniture')
                .then(response => response.json())
                .then(data => {
                    setFurniture(data.products);
                    setLoading(false);
                });
        }, 2000);
    }, []);

    const handleImageClick = (item) => {
        navigate(`/furniture/${item.id}`, { state: { item } });
    };

    return (
        <div>
           
           <NavBar />
            <div className="shirts-container">
                <h1 className='heads'>Furniture Collection</h1>
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
                        furniture.map((item) => (
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

export default FurnitureList;
