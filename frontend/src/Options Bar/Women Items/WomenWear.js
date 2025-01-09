import React from "react";
import './women.css'
import { Link } from "react-router-dom";


const WomenWearOptions = () => {
    return(
        <div className='options-bar'>
             <ul>
                <li><Link to='/women-dresses'> Women-Dresses </Link></li>
                <li> <Link to='/jewellery'> Jewellery</Link></li>
                <li><Link to='/watches'>Watches </Link> </li>
                <li><Link to='/beauty'>Beauty </Link> </li>
                <li><Link to='/Fragrances'>  Fragrances </Link> </li>
                <li><Link to='/skinCare'>Skin-care</Link> </li>
                <li><Link to='/tops'> Tops </Link> </li>
                <li><Link to='/bags'> Women-Bags  </Link> </li>
                <li><Link to='/shoes'>  Shoes  </Link> </li>

                

             </ul>
        </div>
    )
}

export default WomenWearOptions