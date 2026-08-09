import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Pages/Home';
import Properties from './Components/Pages/Properties';
import ImageGallery from './Components/Pages/ImageGallery';
import ErrorBoundary from './Components/Pages/ErrorBoundary';

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/Gallery/:propertyId" element={<ImageGallery />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
