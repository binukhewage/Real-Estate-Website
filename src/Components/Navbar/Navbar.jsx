import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className='navbar'>
      <Link href='/' className='navtitle'>U<span className='lg'>O</span>W RE$IDENCIES </Link>
      <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/properties">Properties</Link></li>
      

      
      
      
      </ul>
    </nav>
  )
}
