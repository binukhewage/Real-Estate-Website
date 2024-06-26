import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={`navbar ${menuOpen ? 'show' : ''}`}>
      <Link to='/' className='navtitle'>U<span className='lg'>O</span>W RE$IDENCIES</Link>
      <div className='menu-toggle' onClick={toggleMenu}>
        ☰
      </div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/properties">Properties</Link></li>
      </ul>
    </nav>
  );
}
