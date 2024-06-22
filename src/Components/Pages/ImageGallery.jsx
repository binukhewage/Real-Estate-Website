import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Navbar from '../Navbar/Navbar';
import propertyData from '../Data/data.json'; // Adjust the path as needed
import '../CSS/ImageGallery.css'

export default function ImageGallery() {
  const { propertyId } = useParams();
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [largeImage, setLargeImage] = useState(''); // State for the large image

  useEffect(() => {
    // Simulate fetching data from propertyData
    const fetchProperty = async () => {
      try {
        const property = propertyData.properties.find(prop => prop.id === propertyId);
        setSelectedProperty(property);
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

  if (!selectedProperty) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <>
      <Navbar />
      <div className="heading">
        <h1>{selectedProperty.name}</h1>
        <h2>${selectedProperty.price}</h2>
        <p className="location">
          <i className="fas fa-map-marker-alt"></i>
          <span> {selectedProperty.location}</span>
        </p>
        <div className="desbox">
          <div className="all-images">
            <div
              className="large-image"
              style={{ backgroundImage: `url(${largeImage})` }}
            ></div>
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
                  <h2>{selectedProperty.name}</h2>
                  <p>{selectedProperty.description}</p>
                </div>  
              </TabPanel>
              <TabPanel>
                <div className='tab-content'>
                  <img src={selectedProperty.floorPlan} alt="Floor Plan" />
                </div>
              </TabPanel>
              <TabPanel>
                <div className="tab-content">
                  <iframe 
                    title="Map Location"
                    src={selectedProperty.mapLocation}
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
