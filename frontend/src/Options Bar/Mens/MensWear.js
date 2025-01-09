import React from 'react';
import { Link } from 'react-router-dom';
import './mens.css'; // Import CSS for styling



const MensWearOptions = () => {

    return (

        <div>
            
            <div className='options-bar'>
                <ul>
                    <li><Link to="/mens-shirts">Men's-Shirts</Link></li>
                    <li><Link to="/mensShoes">Men's-Shoes</Link></li>
                    <li><Link to="/mensWatches">Men's-Watches</Link></li>
                    <li><Link to="/menSunglasses">Sunglasses</Link></li>
                </ul>
            </div>
        </div>


    );
};

export default MensWearOptions;
