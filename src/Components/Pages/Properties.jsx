import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Properties.css';
import propertyData from '../Data/data.json'; // Adjust the path as needed
import Navbar from '../Navbar/Navbar';

export default function Properties() {
  const [searchCriteria, setSearchCriteria] = useState({
    type: '',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    maxBedrooms: '',
    fromDate: '',
    toDate: '',
    postcodeArea: ''
  });

  const [filteredProperties, setFilteredProperties] = useState(propertyData.properties);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearchCriteria({ ...searchCriteria, [name]: value });
  };

  const handleSearch = () => {
    let filtered = propertyData.properties.filter(property => {
      return (
        (searchCriteria.type === '' || property.type.toLowerCase().includes(searchCriteria.type.toLowerCase())) &&
        (searchCriteria.minPrice === '' || property.price >= parseInt(searchCriteria.minPrice)) &&
        (searchCriteria.maxPrice === '' || property.price <= parseInt(searchCriteria.maxPrice)) &&
        (searchCriteria.minBedrooms === '' || property.bedrooms >= parseInt(searchCriteria.minBedrooms)) &&
        (searchCriteria.maxBedrooms === '' || property.bedrooms <= parseInt(searchCriteria.maxBedrooms)) &&
        (searchCriteria.postcodeArea === '' || property.location.toLowerCase().includes(searchCriteria.postcodeArea.toLowerCase())) &&
        (searchCriteria.fromDate === '' || new Date(property.added.year, getMonthIndex(property.added.month), property.added.day) >= new Date(searchCriteria.fromDate)) &&
        (searchCriteria.toDate === '' || new Date(property.added.year, getMonthIndex(property.added.month), property.added.day) <= new Date(searchCriteria.toDate))
      );
    });
    setFilteredProperties(filtered);
  };

  const getMonthIndex = (month) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months.indexOf(month);
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
            <input type="number" name="minPrice" placeholder="Min Price" onChange={handleInputChange} />
            <input type="number" name="maxPrice" placeholder="Max Price" onChange={handleInputChange} />
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
            <input type="text" name="postcodeArea" placeholder="Postcode Area" onChange={handleInputChange} />
            <input type="date" name="fromDate" placeholder="From Date" onChange={handleInputChange} />
            <input type="date" name="toDate" placeholder="To Date" onChange={handleInputChange} />
            <button onClick={handleSearch}>Search</button>
          </div>
        </div>
        /* insert the heading */
        <div className="box-container">
          {filteredProperties.map((property) => (
            <div className="propboxes" key={property.id}>
              <div className="thumb">
                <div
                  className="image-box"
                  style={{ backgroundImage: `url(${property.picture})` }}
                ></div>
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
              <Link to={`/Gallery/${property.id}`} className="btn">View Property</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
