import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Properties.css';
import propertyData from '../Data/data.json'; // Adjust the path as needed
import Navbar from '../Navbar/Navbar';

export default function Properties() {
  // State for search criteria
  const [searchCriteria, setSearchCriteria] = useState({
    type: '',
    priceRange: '', // Updated state to handle price range
    minBedrooms: '',
    maxBedrooms: '',
    fromDate: '',
    toDate: '',
    postcodeArea: ''
  });

  // State for filtered properties
  const [filteredProperties, setFilteredProperties] = useState(propertyData.properties);

  // State for favorite properties
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  // State to show favorites list
  const [showFavorites, setShowFavorites] = useState(false);

  // State to toggle filter visibility
  const [showFilter, setShowFilter] = useState(false);

  // State to track dragging
  const [dragging, setDragging] = useState(false);

  // Handle input changes for search criteria
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearchCriteria({ ...searchCriteria, [name]: value });
  };

  // Filter properties based on search criteria
  const handleSearch = () => {
    let filtered = propertyData.properties.filter(property => {
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

  // Check if the property price is within the selected range
  const isWithinPriceRange = (price, range) => {
    const [min, max] = range.split('-').map(price => parseInt(price.replace(/[$,]/g, '')));
    return price >= min && price <= max;
  };

  // Get month index for date comparison
  const getMonthIndex = (month) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months.indexOf(month);
  };

  // Toggle favorite property
  const handleFavoriteToggle = (property) => {
    let updatedFavorites;
    if (favorites.some(fav => fav.id === property.id)) {
      updatedFavorites = favorites.filter(fav => fav.id !== property.id);
    } else {
      updatedFavorites = [...favorites, property];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  // Toggle the visibility of favorites list
  const toggleFavoritesList = () => {
    setShowFavorites(!showFavorites);
  };

  // Toggle the filter visibility
  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  // Handle drag start for a property
  const handleDragStart = (event, property) => {
    event.dataTransfer.setData('propertyId', property.id);
    setDragging(true);
  };

  // Handle drop event
  const handleDrop = (event) => {
    event.preventDefault();
    const propertyId = event.dataTransfer.getData('propertyId');
    const property = filteredProperties.find(prop => prop.id === propertyId);
    if (property) {
      handleFavoriteToggle(property);
    }
    setDragging(false);
  };

  // Prevent default drag over behavior
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Reset dragging state on drag end
  const handleDragEnd = () => {
    setDragging(false);
  };

  return (
    <div>
      <Navbar />
      <div className='properties'>
        <div className="search">
          <div className="search-fields">
            <select name="type" value={searchCriteria.type} onChange={handleInputChange}>
              <option value="">Any Type</option>
              <option value="house">House</option>
              <option value="flat">Flat</option>
            </select>
            <select name="priceRange" value={searchCriteria.priceRange} onChange={handleInputChange}>
              <option value="">Select Price Range</option>
              <option value="300000-400000">$300,000 - $400,000</option>
              <option value="400000-500000">$400,000 - $500,000</option>
              <option value="500000-600000">$500,000 - $600,000</option>
              <option value="600000-700000">$600,000 - $700,000</option>
              <option value="700000-800000">$700,000 - $800,000</option>
              <option value="800000-900000">$800,000 - $900,000</option>
            </select>
            <select name="minBedrooms" value={searchCriteria.minBedrooms} onChange={handleInputChange}>
              <option value="">Min Bedrooms</option>
              {[1, 2, 3, 4, 5].map(number => (
                <option key={number} value={number}>{number}</option>
              ))}
            </select>
            <select name="maxBedrooms" value={searchCriteria.maxBedrooms} onChange={handleInputChange}>
              <option value="">Max Bedrooms</option>
              {[1, 2, 3, 4, 5].map(number => (
                <option key={number} value={number}>{number}</option>
              ))}
            </select>
            <select name="postcodeArea" value={searchCriteria.postcodeArea} onChange={handleInputChange}>
              <option value="">Select Postcode Area</option>
              <option value="25">25</option>
              <option value="55">55</option>
              <option value="65">65</option>
            </select>
            <input type="date" name="fromDate" placeholder="From Date" onChange={handleInputChange} />
            <input type="date" name="toDate" placeholder="To Date" onChange={handleInputChange} />
            <button onClick={handleSearch}>Search</button>
          </div>
        </div>
        
        <div className="favorites-toggle">
          <button
            onClick={toggleFavoritesList}
            className="favorites-button"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {showFavorites ? '❌' : <i className="fas fa-heart"></i>}
          </button>
        </div>
        <div
          className={`content-container ${showFavorites ? 'show-favorites' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div className="box-container">
            {filteredProperties.map((property) => (
              <div
                className={`propboxes ${dragging ? 'dragging' : ''}`}
                key={property.id}
                draggable
                onDragStart={(event) => handleDragStart(event, property)}
                onDragEnd={handleDragEnd}
              >
                <div className="thumb" style={{ backgroundImage: `url(${property.picture})` }}>
                </div>
                <h3 className="property_name">{property.name}</h3>
                <h4 className="name">{property.type}</h4>
                <p className="location">
                  <i className="fas fa-map-marker-alt"></i>
                  <span> {property.location}</span>
                </p>
                <div className="flex">
                  <p><i className="fas fa-bed"></i><span> {property.bedrooms}</span></p>
                  <p><i className="fas fa-bath"></i><span> 2</span></p>
                </div>
                <div className="price">
                  <h3>${property.price}</h3>
                </div>
                <button
                  className={`favorite-btn ${favorites.some(fav => fav.id === property.id) ? 'favorited' : ''}`}
                  onClick={() => handleFavoriteToggle(property)}
                >
                  <i className="fas fa-heart"></i>
                </button>
                <Link to={`/Gallery/${property.id}`} className="btn">View Property</Link>
              </div>
            ))}
          </div>
        </div>
        <div className={`popup-overlay ${showFavorites ? 'show' : ''}`}>
          <div className="popup-content">
            <button className="close-btn" onClick={toggleFavoritesList}>×</button>
            <h3>Favorites</h3>
            <div className="box-container favorites-box">
              {favorites.map((property) => (
                <div className="propboxes favorite-card" key={property.id}>
                  <div className="thumb" style={{ backgroundImage: `url(${property.picture})` }}></div>
                  <h3 className="property_name">{property.name}</h3>
                  <h4 className="name">{property.type}</h4>
                  <p className="location">
                    <i className="fas fa-map-marker-alt"></i>
                    <span> {property.location}</span>
                  </p>
                  <div className="flex">
                    <p><i className="fas fa-bed"></i><span> {property.bedrooms}</span></p>
                    <p><i className="fas fa-bath"></i><span> 2</span></p>
                  </div>
                  <div className="price">
                    <h3>${property.price}</h3>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => handleFavoriteToggle(property)}
                  >
                    Remove
                  </button>
                  <Link to={`/Gallery/${property.id}`} className="btn">View Property</Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
