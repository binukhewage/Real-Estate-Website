import React from 'react'
import { Link } from 'react-router-dom'
import '../CSS/Home.css'
import Navbar from '../Navbar/Navbar'


export default function Home() {
  return (
    <div>
      <Navbar/>
      <section className="homewrapper">
        <div className="paddings ineerWidth flexCenter homecontainer">
          <div className="homeleft">
            <div className="hometitle">
              <h1>Discover <br/>
              More Suitable <br/>
              Property</h1>
            </div>
            <div className="orangecircle"/>
            <div className=" homedes">
            <span>At UOW PROPERTIES,</span> <br/>
            <span> we're proud to offer a wide variety of the latest and most desirable apartments for sale.</span>
            </div>
            <Link to='/Properties' class="homebtn">Browse Properties</Link>
          </div>
            <div className="flexColCenter homeright">
              <div className="homeimagecontainer">
              <img src='images/himage.jpg' alt=''/>
              </div>
          </div>
        </div>
      </section>
    </div>
  )
}
