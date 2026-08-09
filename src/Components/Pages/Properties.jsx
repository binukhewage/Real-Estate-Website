import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Properties.css';
import propertyData from '../Data/data.json';
import Navbar from '../Navbar/Navbar';

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function Properties() {
  const [searchCriteria, setSearchCriteria] = useState({
    type: '',
    priceRange: '',
    minBedrooms: '',
    maxBedrooms: '',
    fromDate: '',
    toDate: '',
    postcodeArea: '',
    _showFilter: false
  });
  const [filteredProperties, setFilteredProperties] = useState(propertyData.properties);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [showFavorites, setShowFavorites] = useState(false);
  const [dragging, setDragging] = useState(false);

  // ── Helpers ────────────────────────────────────
  const getMonthIndex = (month) => MONTHS.indexOf(month);

  const isWithinPriceRange = (price, range) => {
    const [min, max] = range.split('-').map(p => parseInt(p.replace(/[$,]/g, '')));
    return price >= min && price <= max;
  };

  // ── Handlers ──────────────────────────────────
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    const filtered = propertyData.properties.filter(property => {
      return (
        (searchCriteria.type === '' || property.type.toLowerCase().includes(searchCriteria.type.toLowerCase())) &&
        (searchCriteria.priceRange === '' || isWithinPriceRange(property.price, searchCriteria.priceRange)) &&
        (searchCriteria.minBedrooms === '' || property.bedrooms >= parseInt(searchCriteria.minBedrooms)) &&
        (searchCriteria.maxBedrooms === '' || property.bedrooms <= parseInt(searchCriteria.maxBedrooms)) &&
        (searchCriteria.postcodeArea === '' || property.postalCode.toString() === searchCriteria.postcodeArea) &&
        (searchCriteria.fromDate === '' || new Date(property.added.year, getMonthIndex(property.added.month), property.added.day) >= new Date(searchCriteria.fromDate)) &&
        (searchCriteria.toDate === '' || new Date(property.added.year, getMonthIndex(property.added.month), property.added.day) <= new Date(searchCriteria.toDate))
      );
    });
    setFilteredProperties(filtered);
  };

  const handleFavoriteToggle = (property) => {
    setFavorites(prev => {
      const exists = prev.some(fav => fav.id === property.id);
      const updated = exists ? prev.filter(fav => fav.id !== property.id) : [...prev, property];
      localStorage.setItem('favorites', JSON.stringify(updated));
      return updated;
    });
  };

  // ── Drag & Drop ───────────────────────────────
  const handleDragStart = (e, property) => {
    e.dataTransfer.setData('propertyId', property.id);
    setDragging(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('propertyId');
    const property = filteredProperties.find(p => p.id === id);
    if (property) handleFavoriteToggle(property);
    setDragging(false);
  };

  const handleDragOver = (e) => { e.preventDefault(); };
  const handleDragEnd = () => setDragging(false);

  // ── Refs / Memos ──────────────────────────────
  const isFavorited = useMemo(() => {
    const set = new Set(favorites.map(f => f.id));
    return (id) => set.has(id);
  }, [favorites]);

  return (
    <div className="properties-page">
      <Navbar dark={false} />

      {/* ════ Hero Banner ════ */}
      <section className="properties-hero">
        <div className="properties-hero-bg" />
        <div className="properties-hero-content">
          <p className="hero-eyebrow">UOW Properties</p>
          <h1 className="hero-title">
            Our <span className="gold">Portfolio</span>
          </h1>
          <p className="hero-sub">
            Explore our curated collection of exceptional residences.
            Each property is selected for its character, craftsmanship,
            and enduring value.
          </p>
        </div>
      </section>

      {/* ════ Toolbar ════ */}
      <div className="props-toolbar">
        <div className="props-toolbar-inner">
          <button
            className="props-filter-toggle"
            onClick={() => setSearchCriteria(prev => ({ ...prev, _showFilter: !prev._showFilter }))}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="6" x2="20" y2="6" /><line x1="8" y1="12" x2="20" y2="12" /><line x1="12" y1="18" x2="20" y2="18" />
            </svg>
            Filters
          </button>
          <span className="props-count">{filteredProperties.length} properties</span>
          <button
            className={`props-fav-toggle ${showFavorites ? 'active' : ''}`}
            onClick={() => setShowFavorites(!showFavorites)}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill={favorites.length > 0 ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
            <span className="props-fav-badge">{favorites.length}</span>
          </button>
        </div>
      </div>

      {/* ════ Filters Panel ════ */}
      <div className={`props-filters ${searchCriteria._showFilter ? 'open' : ''}`}>
        <div className="props-filters-inner">
          <div className="props-filter-group">
            <label>Type</label>
            <select name="type" value={searchCriteria.type} onChange={handleInputChange}>
              <option value="">All Types</option>
              <option value="house">House</option>
              <option value="flat">Flat</option>
            </select>
          </div>
          <div className="props-filter-group">
            <label>Price Range</label>
            <select name="priceRange" value={searchCriteria.priceRange} onChange={handleInputChange}>
              <option value="">Any Price</option>
              <option value="300000-400000">$300k – $400k</option>
              <option value="400000-500000">$400k – $500k</option>
              <option value="500000-600000">$500k – $600k</option>
              <option value="600000-700000">$600k – $700k</option>
              <option value="700000-800000">$700k – $800k</option>
              <option value="800000-900000">$800k – $900k</option>
            </select>
          </div>
          <div className="props-filter-group">
            <label>Bedrooms (Min)</label>
            <select name="minBedrooms" value={searchCriteria.minBedrooms} onChange={handleInputChange}>
              <option value="">Any</option>
              {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}+</option>)}
            </select>
          </div>
          <div className="props-filter-group">
            <label>Bedrooms (Max)</label>
            <select name="maxBedrooms" value={searchCriteria.maxBedrooms} onChange={handleInputChange}>
              <option value="">Any</option>
              {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div className="props-filter-group">
            <label>Postcode Area</label>
            <select name="postcodeArea" value={searchCriteria.postcodeArea} onChange={handleInputChange}>
              <option value="">All Areas</option>
              <option value="25">Area 25</option>
              <option value="55">Area 55</option>
              <option value="65">Area 65</option>
            </select>
          </div>
          <div className="props-filter-group">
            <label>From Date</label>
            <input type="date" name="fromDate" value={searchCriteria.fromDate} onChange={handleInputChange} />
          </div>
          <div className="props-filter-group">
            <label>To Date</label>
            <input type="date" name="toDate" value={searchCriteria.toDate} onChange={handleInputChange} />
          </div>
          <button className="props-filter-apply" onClick={handleSearch}>
            Apply Filters
          </button>
        </div>
      </div>
      {/* ════ Property Grid ════ */}
      <div className="props-grid-section">
        <div className="props-grid">
          {filteredProperties.length === 0 ? (
            <div className="props-empty">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <h3>No properties found</h3>
              <p>Try adjusting your filters to discover more listings.</p>
            </div>
          ) : (
            filteredProperties.map((property) => (
              <div
                className={`props-card ${dragging ? 'dragging' : ''}`}
                key={property.id}
                draggable
                onDragStart={(e) => handleDragStart(e, property)}
                onDragEnd={handleDragEnd}
              >
                <div className="props-card-image">
                  <div className="props-card-img" style={{ backgroundImage: `url(${property.picture})` }} />
                  <span className="props-card-badge">{property.type}</span>
                  <button
                    className={`props-card-fav ${isFavorited(property.id) ? 'favorited' : ''}`}
                    onClick={() => handleFavoriteToggle(property)}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill={isFavorited(property.id) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                    </svg>
                  </button>
                </div>
                <div className="props-card-body">
                  <div className="props-card-top">
                    <h3 className="props-card-name">{property.name}</h3>
                    <p className="props-card-location">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                      </svg>
                      {property.location}
                    </p>
                  </div>
                  <div className="props-card-details">
                    <span className="props-card-detail">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
                      </svg>
                      {property.bedrooms} bed
                    </span>
                    <span className="props-card-detail">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="6" width="20" height="12" rx="2" /><circle cx="6" cy="14" r="1" /><circle cx="18" cy="14" r="1" />
                      </svg>
                      2 bath
                    </span>
                    <span className="props-card-detail props-card-tenure">{property.tenure}</span>
                  </div>
                  <div className="props-card-footer">
                    <span className="props-card-price">${property.price.toLocaleString()}</span>
                    <Link to={`/Gallery/${property.id}`} className="props-card-cta">
                      View Details
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {/* ════ Favorites Overlay ════ */}
      <div className={`props-fav-overlay ${showFavorites ? 'show' : ''}`} onClick={() => setShowFavorites(false)}>
        <div className="props-fav-modal" onClick={e => e.stopPropagation()}>
          <div className="props-fav-modal-header">
            <h3>Your Favorites</h3>
            <button className="props-fav-modal-close" onClick={() => setShowFavorites(false)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          {favorites.length === 0 ? (
            <div className="props-fav-empty">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
              <p>No favorites yet. Drag properties here or tap the heart icon to save them.</p>
            </div>
          ) : (
            <div className="props-fav-list">
              {favorites.map(property => (
                <div className="props-fav-item" key={property.id}>
                  <div className="props-fav-item-img" style={{ backgroundImage: `url(${property.picture})` }} />
                  <div className="props-fav-item-body">
                    <h4>{property.name}</h4>
                    <p>{property.location}</p>
                    <span className="props-fav-item-price">${property.price.toLocaleString()}</span>
                  </div>
                  <div className="props-fav-item-actions">
                    <Link to={`/Gallery/${property.id}`} className="props-fav-item-view">View</Link>
                    <button className="props-fav-item-remove" onClick={() => handleFavoriteToggle(property)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ════ Footer ════ */}
      <footer className="props-footer">
        <div className="props-footer-inner">
          <div className="props-footer-brand">
            <span className="props-footer-logo">UOW<span className="gold">.</span></span>
            <p className="props-footer-tagline">Premium Real Estate</p>
          </div>
          <div className="props-footer-links">
            <Link to="/">Home</Link>
            <Link to="/properties">Properties</Link>
          </div>
          <div className="props-footer-copy">
            &copy; {new Date().getFullYear()} UOW Properties. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
