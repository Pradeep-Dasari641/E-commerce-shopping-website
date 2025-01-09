import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './electronic.css'; // Assuming you use the same CSS for consistency
import NavBar from '../../NavBar/navBar';

const Tablets = () => {
    const [tablets, setTablets] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            fetch('https://dummyjson.com/products/category/tablets')
                .then(response => response.json())
                .then(data => {
                    setTablets(data.products);
                    setLoading(false);
                });
        }, 2000);
    }, []);

    const handleImageClick = (tablet) => {
        navigate(`/tablet/${tablet.id}`, { state: { tablet } });
    };

    return (
        <div>
            
            <NavBar />
            <div className="Electronic-container">
                <h1 className='heads'>Tablets</h1>
                <div className="elec-grid">
                    {loading ? (
                        Array.from({ length: 3 }).map((_, index) => (
                            <div className="electronics-card shimmer" key={index}>
                                <div className="shimmer-image"></div>
                                <div className="shimmer-title"></div>
                                <div className="shimmer-price"></div>
                            </div>
                        ))
                    ) : (
                        tablets.map((tablet) => (
                            <div className="shirt-card" key={tablet.id}>
                                <img
                                    src={tablet.thumbnail}
                                    alt={tablet.title}
                                    onClick={() => handleImageClick(tablet)}
                                    style={{ cursor: 'pointer' }}
                                />
                                <b>{tablet.title}</b>
                                <p>${tablet.price}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Tablets;
