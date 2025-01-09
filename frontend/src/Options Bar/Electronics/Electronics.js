import React from 'react'
import './electronic.css'
import { Link } from 'react-router-dom'

function Electronics() {
  return (
    <div className='options-bar'>
        <ul>
            <li><Link to ='/laptops'>Laptops</Link></li>
            <li><Link to ='/mobileAcces'>Mobil-Accessories</Link></li>
            <li><Link to = '/smartPhone'>Smartphones</Link></li>
            <li><Link to = '/tablet'>Tablets</Link></li>

            
        </ul>
    </div>
  )
}

export default Electronics