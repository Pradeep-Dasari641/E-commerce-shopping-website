import React from 'react'
import { Link } from 'react-router-dom'
import './sports.css'


function SportsItems() {
  return (
  <div>
      <div className='options-bar'>
        <ul>
            <li><Link to='/sports'>Sports-Accessories</Link></li>
        </ul>
    </div>
  </div>
  )
}

export default SportsItems