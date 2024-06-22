import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Properties from './Components/Pages/Properties';
import ImageGallery from './Components/Pages/ImageGallery';
import Navbar from './Components/Navbar/Navbar';
import ErrorBoundary from './Components/Pages/ErrorBoundary'; // Adjust the path as needed

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Properties />} />
            <Route path="/Gallery/:propertyId" element={<ImageGallery />} />
          </Routes>
        </ErrorBoundary>
      </div>
    </Router>
  );
}

export default App;
