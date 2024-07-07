import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Navbar from '../Navbar/Navbar';
import propertyData from '../Data/data.json'; // Adjust the path as needed
import '../CSS/ImageGallery.css'

// This component displays the image gallery and details for a selected property
export default function ImageGallery() {
  const { propertyId } = useParams(); // Extract propertyId from the URL parameters
  const [selectedProperty, setSelectedProperty] = useState(null); // State to store the selected property details
  const [largeImage, setLargeImage] = useState(''); // State for the large image

  // useEffect hook to fetch property data when component mounts or propertyId changes
  useEffect(() => {
    // Function to fetch property data based on propertyId
    const fetchProperty = async () => {
      try {
        const property = propertyData.properties.find(prop => prop.id === propertyId); // Find property by id
        setSelectedProperty(property); // Set the selected property
        if (property) {
          setLargeImage(property.picture); // Set the main picture as the initial large image
        }
      } catch (error) {
        console.error('Error fetching property:', error);
        setSelectedProperty(null); // Set selectedProperty to null on error
      }
    };

    fetchProperty();
  }, [propertyId]);

  // Render loading message if property data is not yet available
  if (!selectedProperty) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <>
      <Navbar /> {/* Navbar component */}
      <div className="heading">
        <h1>{selectedProperty.name}</h1> {/* Property name */}
        <p className="location">
          <i className="fas fa-map-marker-alt"></i>
          <span> {selectedProperty.location}</span> {/* Property location */}
        </p>
        <div className="desbox">
          <div className="all-images">
            {/* Display large image */}
            <div
              className="large-image"
              style={{ backgroundImage: `url(${largeImage})` }}
            ></div>
            {/* Thumbnail images for the gallery */}
            <div className="thumbnail-image-panel">
              {selectedProperty.gallery.map((image, index) => (
                <div
                  key={index}
                  className="thumbnail-image"
                  style={{ backgroundImage: `url(${image})` }}
                  onClick={() => setLargeImage(image)} // Update large image on click
                ></div>
              ))}
            </div>
          </div>
          <div className="tabs-container">
            <Tabs>
              <TabList>
                <Tab>Property Description</Tab>
                <Tab>Floor Plan</Tab>
                <Tab>Map Location</Tab>
              </TabList>

              <TabPanel>
                <div className="description">
                  <h2>{selectedProperty.name}</h2> {/* Property name */}
                  <p>{selectedProperty.description}</p> {/* Property description */}
                  <br />
                  <div className="property-details">
                    <h5>$ {selectedProperty.price}</h5> {/* Property price */}
                    <h5><i className="fas fa-bed"></i> {selectedProperty.bedrooms} BedRooms</h5> {/* Number of bedrooms */}
                    <h5><i className="fas fa-building"></i> {selectedProperty.tenure} Tenure</h5> {/* Property tenure */}
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <div className='tab-content'>
                  <img src={selectedProperty.floorPlan} alt="Floor Plan" /> {/* Floor plan image */}
                </div>
              </TabPanel>
              <TabPanel>
                <div className="tab-content">
                  <iframe 
                    title="Map Location"
                    src={selectedProperty.mapLocation} // Map location URL
                    width="600"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}
