import React from "react";
import './Home.css'
import { Link } from "react-router-dom";


const HomeAndFurniture = () => {
    return(
        <div className='options-bar'>
            <ul>
                <li><Link to = "/furniture">Furniture</Link></li>
                <li><Link to ="/decoration">Home-Decoration</Link></li>
                <li><Link to ="/Kaccessories">Kitchen-Accessories</Link></li>
                

            </ul>
        </div>
    )
}


export default HomeAndFurniture