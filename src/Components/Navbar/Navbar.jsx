import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

export default function Navbar({ dark = true }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className={`navbar ${menuOpen ? 'show' : ''} ${scrolled ? 'scrolled' : ''} ${dark ? 'navbar--dark' : ''}`}>
      <Link to="/" className="nav-logo">
        UOW<span className="nav-logo-dot">.</span>
      </Link>

      <div className="menu-toggle" onClick={toggleMenu}>
        <span className={`hamburger ${menuOpen ? 'open' : ''}`} />
      </div>

      <ul className="nav-links">
        <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
        <li><Link to="/properties" onClick={() => setMenuOpen(false)}>Properties</Link></li>
      </ul>
    </nav>
  );
}
