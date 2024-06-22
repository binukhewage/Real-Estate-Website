import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Home from '../src/Components/Pages/Home';
import Properties from '../src/Components/Pages/Properties';
import ImageGallery from './Components/Pages/ImageGallery.jsx';




import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/Properties",
    element: <Properties/>,
  },
  {
    path: "/Gallery/:propertyId",
    element: <ImageGallery/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
