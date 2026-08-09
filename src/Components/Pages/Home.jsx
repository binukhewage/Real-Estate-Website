import React from 'react'
import { Link } from 'react-router-dom'
import '../CSS/Home.css'
import Navbar from '../Navbar/Navbar'
import propertyData from '../Data/data.json'

const featuredProperties = propertyData.properties.slice(0, 3)

export default function Home() {
  return (
    <div className="home-page">
      <Navbar />

      {/* Hero — Ultra-Premium Luxury */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-content">
          <p className="hero-eyebrow">UOW Properties</p>
          <h1 className="hero-title">
            Where Vision<br />
            Meets <span className="gold">Residence</span>
          </h1>
          <p className="hero-sub">
            Curating exceptional properties for discerning buyers.
            Every home we represent is selected for its character,
            craftsmanship, and enduring value.
          </p>
          <div className="hero-actions">
            <Link to="/properties" className="btn-primary">Explore Properties</Link>
            <a href="#brand" className="btn-ghost">Our Story</a>
          </div>
        </div>
        <div className="hero-scroll">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* Stats — Premium Presentation */}
      <section className="stats">
        <div className="stat">
          <span className="stat-number">150+</span>
          <span className="stat-label">Properties Sold</span>
        </div>
        <div className="stat-divider" />
        <div className="stat">
          <span className="stat-number">99%</span>
          <span className="stat-label">Client Satisfaction</span>
        </div>
        <div className="stat-divider" />
        <div className="stat">
          <span className="stat-number">12</span>
          <span className="stat-label">Years of Excellence</span>
        </div>
        <div className="stat-divider" />
        <div className="stat">
          <span className="stat-number">£2.4B</span>
          <span className="stat-label">Portfolio Value</span>
        </div>
      </section>

      {/* Featured Properties — Luxury Grid */}
      <section className="featured">
        <div className="section-header">
          <p className="section-eyebrow">Our Portfolio</p>
          <h2 className="section-title">Featured Properties</h2>
          <p className="section-desc">
            A curated selection of our finest residences, each chosen for its
            exceptional quality and distinctive character.
          </p>
        </div>
        <div className="featured-grid">
          {featuredProperties.map((property) => (
            <Link
              to={`/Gallery/${property.id}`}
              key={property.id}
              className="property-card"
            >
              <div
                className="property-card-image"
                style={{ backgroundImage: `url(${property.picture})` }}
              >
                <span className="property-card-type">{property.type}</span>
              </div>
              <div className="property-card-body">
                <div className="property-card-meta">
                  <span className="property-card-location">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {property.location}
                  </span>
                  <span className="property-card-price">
                    ${property.price.toLocaleString()}
                  </span>
                </div>
                <h3 className="property-card-name">{property.name}</h3>
                <div className="property-card-details">
                  <span>{property.bedrooms} Beds</span>
                  <span className="dot">&#183;</span>
                  <span>{property.tenure}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="featured-cta">
          <Link to="/properties" className="btn-outline">View All Properties</Link>
        </div>
      </section>

      {/* Brand Story — Asymmetric Luxury */}
      <section className="brand" id="brand">
        <div className="brand-inner">
          <div className="brand-text">
            <p className="section-eyebrow">Our Philosophy</p>
            <h2 className="section-title">Built on Trust,<br />Driven by <span className="gold">Excellence</span></h2>
            <p className="brand-desc">
              At UOW Properties, we believe that finding a home is more than
              a transaction — it's the beginning of a new chapter. Our team of
              experienced professionals is dedicated to understanding your vision
              and matching you with properties that exceed expectations.
            </p>
            <p className="brand-desc">
              With deep knowledge of the local market and an unwavering commitment
              to integrity, we guide you through every step of the journey with
              care and precision.
            </p>
          </div>
          <div className="brand-visual">
            <div className="brand-accent" />
            <div className="brand-stats">
              <div className="brand-stat">
                <span className="brand-stat-num">12+</span>
                <span className="brand-stat-label">Years in the<br />Market</span>
              </div>
              <div className="brand-stat">
                <span className="brand-stat-num">50+</span>
                <span className="brand-stat-label">Expert<br />Advisors</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-inner">
          <h2 className="cta-title">Ready to Find Your<br />Perfect Home?</h2>
          <p className="cta-desc">
            Let our team of experts guide you to the property that matches
            your lifestyle and aspirations.
          </p>
          <Link to="/properties" className="btn-primary">Get Started</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="footer-logo">UOW<span className="gold">.</span></span>
            <p className="footer-tagline">Premium Real Estate</p>
          </div>
          <div className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/properties">Properties</Link>
          </div>
          <div className="footer-copy">
            &copy; {new Date().getFullYear()} UOW Properties. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
