import React, { useState } from 'react';
import heroDormImg from '../assets/hero_dorm.png';

// ==========================================
// CONFIGURABLE HERO BLOCKS FOR EASY FUTURE EDITING
// ==========================================

export const RIGHT_CARD_CONFIG = {
  show: true,
  title: "24 HR VALID",
  subtitle: "EASY RE-BOOKING",
  buttonText: "LOW CHARGES"
};

export const HERO_BADGES = [
  {
    id: 'safe-secure',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 11 11 13 15 9" />
      </svg>
    ),
    line1: "Safe &",
    line2: "Secure"
  },
  {
    id: '24h-valid',
    icon: (
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        <span className="badge-clock-text">24</span>
      </div>
    ),
    line1: "24 Hr",
    line2: "Valid"
  },
  {
    id: 'any-city',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    line1: "Any Place",
    line2: "Any City"
  }
];

interface HeroProps {
  onSearch: (city: string, category: string) => void;
  selectedCity: string;
}

export default function Hero({ onSearch, selectedCity }: HeroProps) {
  const [city, setCity] = useState(selectedCity || '');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState('1 Guest');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(city || 'All Cities', 'All Categories');
  };

  return (
    <div className="hero-section">
      <div className="hero-content-wrapper">
        {/* Left Side: Headings, taglines, sub-badges */}
        <div className="hero-left">
          <h1 className="hero-title">
            BOOK A BED,<br />
            <span className="text-gold">NOT A ROOM.</span>
          </h1>
          
          <div className="hero-subtitle-container">
            <p className="hero-subtitle" style={{ margin: 0 }}>
              One Booking. Any Branch. 24 Hours Valid.
            </p>
            <span className="hero-rebooking-pill">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '2px' }}>
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
              </svg>
              Easy Re-Booking
            </span>
          </div>

          <div className="hero-badges-row">
            {HERO_BADGES.map((badge, idx) => (
              <React.Fragment key={badge.id}>
                {idx > 0 && <div className="hero-badge-divider" />}
                <div className="hero-badge-item">
                  <div className="badge-icon-wrapper">
                    {badge.icon}
                  </div>
                  <div className="badge-text">
                    {badge.line1}<br />{badge.line2}
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Right Side: Image container with overlay card */}
        <div className="hero-right">
          <img src={heroDormImg} alt="Humsafar Dormitory" className="hero-img" />
          <div className="hero-fade-overlay"></div>
          
          {/* Floating Vertical Card Overlay */}
          {RIGHT_CARD_CONFIG.show && (
            <div className="hero-vertical-card">
              <div className="card-clock-circle">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                </svg>
                <span className="card-clock-number">24</span>
              </div>
              <div className="card-title-text">{RIGHT_CARD_CONFIG.title}</div>
              <div className="card-divider-dotted"></div>
              <div className="card-subtitle-text">{RIGHT_CARD_CONFIG.subtitle}</div>
              <div className="card-action-badge">{RIGHT_CARD_CONFIG.buttonText}</div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Search Bar Widget */}
      <div className="search-bar-floating">
        <form onSubmit={handleSubmit} className="search-bar-form">
          <div className="search-input-col border-right">
            <div className="search-input-label">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="search-icon-svg">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>Destination</span>
            </div>
            <input 
              type="text" 
              className="search-input-field" 
              placeholder="Search city or branch"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div className="search-input-col border-right">
            <div className="search-input-label">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="search-icon-svg">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span>Check-in</span>
            </div>
            <input 
              type="text" 
              className="search-input-field date-picker" 
              placeholder="Select date"
              onFocus={(e) => (e.target.type = 'date')}
              onBlur={(e) => (e.target.type = 'text')}
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
            />
          </div>

          <div className="search-input-col border-right">
            <div className="search-input-label">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="search-icon-svg">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span>Check-out</span>
            </div>
            <input 
              type="text" 
              className="search-input-field date-picker" 
              placeholder="Select date"
              onFocus={(e) => (e.target.type = 'date')}
              onBlur={(e) => (e.target.type = 'text')}
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
            />
          </div>

          <div className="search-input-col">
            <div className="search-input-label">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="search-icon-svg">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>Guests</span>
            </div>
            <div className="guests-select-wrapper">
              <select 
                className="search-select-field" 
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
              >
                <option value="1 Guest">1 Guest</option>
                <option value="2 Guests">2 Guests</option>
                <option value="3 Guests">3 Guests</option>
                <option value="4+ Guests">4+ Guests</option>
              </select>
            </div>
          </div>

          <button type="submit" className="search-beds-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="search-btn-icon">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span>Search Beds</span>
          </button>
        </form>
      </div>
    </div>
  );
}
