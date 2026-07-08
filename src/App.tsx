import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RoomCard from './components/RoomCard';
import type { RoomType } from './components/RoomCard';
import { mockBranches } from './components/BranchExplorer';
import type { BranchType } from './components/BranchExplorer';
import Dashboard from './components/Dashboard';
import type { BookingType } from './components/Dashboard';
import SupportChat from './components/SupportChat';

// Import images for popular stays
import coupleImg from './assets/couple.png';
import tripleImg from './assets/triple.png';
import logoImg from './assets/logo.png';

// Lucide icons
import { 
  X, 
  Check, 
  Heart,
  Wifi,
  Lock,
  Wind,
  Sparkles,
  Building2,
  Star,
  Users,
  ShieldCheck,
  Home as HomeIcon,
  Headset,
  RefreshCw,
  ChevronRight
} from 'lucide-react';

const ROOM_TYPES: RoomType[] = [
  {
    id: 'bunk-bed',
    name: 'Bunk Bed',
    subtitle: '6 Beds Dormitory (Non-AC)',
    bestFor: 'Students & Backpackers',
    price: 420,
    isAc: false,
    features: ['Personal Locker', 'Reading Light', 'Charging Point', 'High Speed Wi-Fi', 'Shared Washroom'],
    extendStayPrice: 49,
    rebookingPrice: 69
  },
  {
    id: 'triple-sharing',
    name: 'Triple Sharing',
    subtitle: '3 Beds Room (Non-AC)',
    bestFor: 'Friends & Solo Travelers',
    price: 549,
    isAc: false,
    features: ['Locker Facility', 'Charging Point', 'Shared Washroom', 'High Speed Wi-Fi'],
    extendStayPrice: 49,
    rebookingPrice: 99
  },
  {
    id: 'double-sharing',
    name: 'Double Sharing AC',
    subtitle: '2 Beds Room (AC)',
    bestFor: 'Professionals & Friends',
    price: 669,
    isAc: true,
    features: ['AC Room', '2 Comfortable Beds', 'Study Table', 'Attached Washroom'],
    extendStayPrice: 49,
    rebookingPrice: 169
  },
  {
    id: 'couple-bed',
    name: 'King / Couple Bed AC',
    subtitle: 'Private Room (AC) (for 2 people)',
    bestFor: 'Couples & Premium Stay',
    price: 999,
    isAc: true,
    features: ['AC Room', 'King Size Bed', 'Attached Washroom', 'Premium Privacy'],
    extendStayPrice: 49,
    rebookingPrice: 299
  }
];

const POPULAR_STAYS = [
  {
    id: 'delhi-stay',
    name: 'Humsafar Central – Delhi',
    city: 'Delhi',
    address: 'Paharganj, New Delhi',
    price: 549,
    rating: 4.5,
    isBestSeller: false,
    image: coupleImg,
  },
  {
    id: 'mumbai-stay',
    name: 'Humsafar Metro – Mumbai',
    city: 'Mumbai',
    address: 'Andheri East, Mumbai',
    price: 669,
    rating: 4.4,
    isBestSeller: false,
    image: coupleImg,
  },
  {
    id: 'bangalore-stay',
    name: 'Humsafar Grand – Bangalore',
    city: 'Bangalore',
    address: 'Koramangala, Bangalore',
    price: 549,
    rating: 4.6,
    isBestSeller: true,
    image: tripleImg,
  }
];

const TRUST_STATS = [
  {
    id: 'branches',
    icon: <Building2 size={18} />,
    val: '100+',
    lbl: 'Branches Across India'
  },
  {
    id: 'travelers',
    icon: <Users size={18} />,
    val: '10,000+',
    lbl: 'Happy Travelers'
  },
  {
    id: 'rating',
    icon: <Star size={18} />,
    val: '4.5 ★',
    lbl: 'Average Rating'
  },
  {
    id: 'hours',
    icon: (
      <div className="trust-icon-24h" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
        </svg>
        <span style={{ position: 'absolute', fontSize: '6.5px', fontWeight: '800', color: 'inherit', top: '7.5px' }}>24</span>
      </div>
    ),
    val: '24 HOURS',
    lbl: 'Stay Anytime, Anywhere'
  },
  {
    id: 'rebooking',
    icon: <RefreshCw size={18} />,
    val: 'EASY RE-BOOKING',
    lbl: 'Change Plan? Re-book Easily!'
  },
  {
    id: 'safety',
    icon: <ShieldCheck size={18} />,
    val: 'SAFE & SECURE',
    lbl: 'Your Safety, Our Priority'
  },
  {
    id: 'support',
    icon: <Headset size={18} />,
    val: '24x7 SUPPORT',
    lbl: "We're Here to Help You"
  }
];

// Mock Live Booking notifications data
const LIVE_NAMES = ['Rahul', 'Amit', 'Sneha', 'Priyanjali', 'Rohan', 'Vikram', 'Divya', 'Aarav', 'Neha', 'Kabir'];
const LIVE_CITIES = ['Delhi', 'Mumbai', 'Bangalore', 'Jaipur', 'Pune', 'Patna'];
const LIVE_ROOMS = ['Bunk Bed', 'Triple Sharing', 'Double Sharing', 'King / Couple Bed'];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [searchCity, setSearchCity] = useState('');
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Ad video configuration states
  const [adVideoUrl, setAdVideoUrl] = useState(() => {
    const saved = localStorage.getItem('humsafar_ad_url');
    if (!saved || saved.includes('mixkit.co')) {
      return 'https://assets.codepen.io/6093409/river.mp4';
    }
    return saved;
  });
  const [adTitle, setAdTitle] = useState(() => {
    return localStorage.getItem('humsafar_ad_title') || 'Humsafar Stays & Homes';
  });
  const [adDesc, setAdDesc] = useState(() => {
    return localStorage.getItem('humsafar_ad_desc') || '₹49 Extension fee & 24H branch-wide validity.';
  });
  const [adCtaText, setAdCtaText] = useState(() => {
    return localStorage.getItem('humsafar_ad_cta_text') || 'Book Now';
  });
  const [showAdConfigModal, setShowAdConfigModal] = useState(false);
  const [videoError, setVideoError] = useState(false);

  // Form states for modal
  const [formVideoUrl, setFormVideoUrl] = useState(adVideoUrl);
  const [formTitle, setFormTitle] = useState(adTitle);
  const [formDesc, setFormDesc] = useState(adDesc);
  const [formCtaText, setFormCtaText] = useState(adCtaText);

  // Reset video error state if the URL is updated
  useEffect(() => {
    setVideoError(false);
  }, [adVideoUrl]);

  const handleSaveAdConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setAdVideoUrl(formVideoUrl);
    setAdTitle(formTitle);
    setAdDesc(formDesc);
    setAdCtaText(formCtaText);
    localStorage.setItem('humsafar_ad_url', formVideoUrl);
    localStorage.setItem('humsafar_ad_title', formTitle);
    localStorage.setItem('humsafar_ad_desc', formDesc);
    localStorage.setItem('humsafar_ad_cta_text', formCtaText);
    setShowAdConfigModal(false);
    
    // Trigger success notification
    setNotifications(prev => ['Ad Campaign Configured Successfully!', ...prev.slice(0, 2)]);
    setTimeout(() => {
      setNotifications(prev => prev.slice(0, -1));
    }, 4000);
  };
  
  // Login states
  const [loginPhone, setLoginPhone] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [otpVal, setOtpVal] = useState('');
  
  // Booking related state
  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [selectedBranch, setSelectedBranch] = useState<BranchType>(mockBranches[0]);
  const [isPaying, setIsPaying] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Active check-in state, persisted in localstorage
  const [activeBooking, setActiveBooking] = useState<BookingType | null>(() => {
    const saved = localStorage.getItem('humsafar_booking');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (new Date(parsed.expiresAt) <= new Date()) {
          localStorage.removeItem('humsafar_booking');
          return null;
        }
        return parsed;
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  // Simulated live feed notifications
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const name = LIVE_NAMES[Math.floor(Math.random() * LIVE_NAMES.length)];
      const city = LIVE_CITIES[Math.floor(Math.random() * LIVE_CITIES.length)];
      const room = LIVE_ROOMS[Math.floor(Math.random() * LIVE_ROOMS.length)];
      const action = Math.random() > 0.4 ? 'booked a' : 'extended stay for a';
      
      const newNotification = `${name} just ${action} ${room} in ${city} Branch!`;
      setNotifications(prev => [newNotification, ...prev.slice(0, 2)]);

      setTimeout(() => {
        setNotifications(prev => prev.slice(0, -1));
      }, 4000);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const handleSearch = (city: string) => {
    setSearchCity(city);
    setActiveTab('search');
  };

  const handleOpenCheckout = (room: RoomType) => {
    setSelectedRoom(room);
    setShowCheckout(true);
  };

  const handleVerifyOtp = () => {
    if (otpVal.length !== 4) return;
    
    const successMsg = `Welcome back! Logged in successfully.`;
    setNotifications(prev => [successMsg, ...prev]);
    
    setTimeout(() => {
      setLoginPhone('');
      setShowOtp(false);
      setOtpVal('');
      setNotifications(prev => prev.slice(0, -1));
      setActiveTab('home');
    }, 2000);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestPhone || !selectedRoom) return;

    setIsPaying(true);

    setTimeout(() => {
      setIsPaying(false);
      setBookingSuccess(true);
      
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
      const newBooking: BookingType = {
        id: `HS-${Math.floor(100000 + Math.random() * 900000)}`,
        guestName,
        room: selectedRoom,
        branch: selectedBranch,
        checkInTime: new Date().toLocaleString(),
        expiresAt
      };

      setActiveBooking(newBooking);
      localStorage.setItem('humsafar_booking', JSON.stringify(newBooking));

      setTimeout(() => {
        setBookingSuccess(false);
        setShowCheckout(false);
        setSelectedRoom(null);
        setGuestName('');
        setGuestPhone('');
        setActiveTab('dashboard');
      }, 2000);
    }, 2000);
  };

  const handleExtendStay = () => {
    if (!activeBooking) return;

    const currentExpiry = new Date(activeBooking.expiresAt);
    const newExpiry = new Date(currentExpiry.getTime() + 24 * 60 * 60 * 1000).toISOString();
    
    const updatedBooking = {
      ...activeBooking,
      expiresAt: newExpiry
    };

    setActiveBooking(updatedBooking);
    localStorage.setItem('humsafar_booking', JSON.stringify(updatedBooking));

    const extendNotice = `Pass extended successfully by 24 Hours!`;
    setNotifications(prev => [extendNotice, ...prev]);
    setTimeout(() => {
      setNotifications(prev => prev.slice(0, -1));
    }, 3000);
  };

  const handleChangeBranch = (newBranch: BranchType) => {
    if (!activeBooking) return;

    const updatedBooking = {
      ...activeBooking,
      branch: newBranch
    };

    setActiveBooking(updatedBooking);
    localStorage.setItem('humsafar_booking', JSON.stringify(updatedBooking));

    const transferNotice = `Check-in transferred to ${newBranch.name}!`;
    setNotifications(prev => [transferNotice, ...prev]);
    setTimeout(() => {
      setNotifications(prev => prev.slice(0, -1));
    }, 3000);
  };

  const handleClearBooking = () => {
    if (window.confirm("Are you sure you want to cancel your stay / check-out of the branch?")) {
      setActiveBooking(null);
      localStorage.removeItem('humsafar_booking');
    }
  };

  if (activeTab === 'login') {
    return (
      <div className="login-view-container">
        {/* Background Image and Overlays */}
        <div className="login-bg-overlay" style={{ backgroundImage: `url(${coupleImg})` }}></div>
        <div className="login-dark-mask"></div>

        {/* Minimal header */}
        <header className="login-header-bar">
          <div className="login-header-container">
            {/* Brand section */}
            <div className="brand" onClick={() => setActiveTab('home')} style={{ cursor: 'pointer' }}>
              <img src={logoImg} alt="Humsafar Logo" className="logo-img" />
              <div className="brand-info">
                <div className="brand-logo-text">
                  <span className="text-white">Hum</span>
                  <span className="text-gold">safar</span>
                </div>
              </div>
            </div>
            <div className="login-header-divider"></div>
            <div className="login-header-text">Stays and homes across 100+ branches, 24 Hours Valid</div>
          </div>
        </header>

        {/* Main Content */}
        <main className="login-main-content">
          <div className="login-left-panel">
            <h1 className="login-main-slogan">
              There's a<br />
              smarter way<br />
              to Humsafar<br />
              around
            </h1>
            <p className="login-sub-description">
              Sign up with your phone number and get exclusive access to discounts and savings on Humsafar stays and with our travel partners.
            </p>
          </div>

          <div className="login-right-panel">
            <div className="login-white-card">
              {/* Promo banner */}
              <div className="login-promo-banner">
                {/* dollar / promo icon */}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v8M8 12h8" />
                </svg>
                <span>Sign up &amp; Get ₹500 Humsafar Money</span>
              </div>

              {/* Login Card Body */}
              <div className="login-card-body">
                <div className="login-card-logo-wrapper">
                  <img src={logoImg} alt="Humsafar Logo" className="login-card-logo" />
                </div>
                <h2 className="login-card-title">Login / Signup</h2>
                <p className="login-card-sublabel">Please enter your phone number to continue</p>

                {showOtp ? (
                  // OTP Entry Mode
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className="login-input-row">
                      <input 
                        type="text" 
                        className="login-phone-field" 
                        maxLength={4}
                        placeholder="Enter 4-digit OTP (e.g. 1234)"
                        value={otpVal}
                        onChange={(e) => setOtpVal(e.target.value.replace(/\D/g, ''))}
                      />
                    </div>
                    <button 
                      type="button" 
                      className={`login-verify-btn ${otpVal.length === 4 ? 'active' : ''}`}
                      disabled={otpVal.length !== 4}
                      onClick={handleVerifyOtp}
                    >
                      Verify OTP
                    </button>
                    <p style={{ fontSize: '0.78rem', color: '#64748b', textAlign: 'center' }}>
                      Didn't receive OTP? <span style={{ color: '#f59e0b', cursor: 'pointer', fontWeight: 700 }} onClick={() => setOtpVal('')}>Resend OTP</span>
                    </p>
                  </div>
                ) : (
                  // Phone Number Entry Mode
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className="login-input-row">
                      <div className="login-country-dropdown">
                        <span>+91</span>
                        <span className="login-dropdown-arrow">▼</span>
                      </div>
                      <div className="login-country-divider"></div>
                      <input 
                        type="tel" 
                        className="login-phone-field" 
                        placeholder="Enter your 10 digit mobile number"
                        maxLength={10}
                        value={loginPhone}
                        onChange={(e) => setLoginPhone(e.target.value.replace(/\D/g, ''))}
                      />
                    </div>

                    <button 
                      type="button" 
                      className={`login-verify-btn ${loginPhone.length === 10 ? 'active' : ''}`}
                      disabled={loginPhone.length !== 10}
                      onClick={() => setShowOtp(true)}
                    >
                      Verify Number
                    </button>
                  </div>
                )}

                <div className="login-password-link">
                  Prefer to Sign in with password instead? <span>Click here</span>
                </div>

                <div className="login-or-divider">Or sign in as</div>

                <div className="login-agent-corp">
                  <div className="login-agent-link">
                    <span>Travel Agent</span>
                    <ChevronRight size={14} />
                  </div>
                  <div className="login-agent-divider"></div>
                  <div className="login-corporate-link">
                    <span>Corporate</span>
                    <ChevronRight size={14} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Toast Notifications Feed */}
      <div className="toast-feed">
        {notifications.map((note, idx) => (
          <div key={idx} className="toast-item">
            <span>🔔</span>
            <span>{note}</span>
          </div>
        ))}
      </div>

      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      <div className="main-content">
        {activeTab === 'home' && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            
            {/* Hero Banner with Search Overlay */}
            <Hero 
              onSearch={handleSearch} 
              selectedCity={searchCity}
            />

            {/* Maintenance Promo Banner */}
            <div className="maintenance-promo-banner">
              <div className="promo-banner-container">
                {/* Left: Price Badge */}
                <div className="promo-left">
                  <span className="promo-only">STARTING @</span>
                  <span className="promo-price-tag">₹420</span>
                  <span className="promo-label">ONLY</span>
                </div>

                <div className="promo-divider-vertical"></div>

                {/* Middle: Slogan Headings */}
                <div className="promo-middle">
                  <h3 className="promo-heading-main">ONE BOOKING.</h3>
                  <h4 className="promo-heading-gold">ANY BRANCH. 24 HOURS VALID.</h4>
                  <p className="promo-heading-sub">SIMPLE. AFFORDABLE. HASSLE-FREE.</p>
                </div>

                <div className="promo-divider-vertical hide-on-mobile"></div>

                {/* Right: Customizable Video Ad Player */}
                <div className="promo-video-ad-container">
                  {/* Blinking Live Ad Badge */}
                  <div className="ad-badge-live">
                    <span className="ad-badge-dot"></span>
                    <span>SPONSORED AD</span>
                  </div>

                  {/* Settings Gear Overlay */}
                  <button className="ad-configure-btn" onClick={() => {
                    setFormVideoUrl(adVideoUrl);
                    setFormTitle(adTitle);
                    setFormDesc(adDesc);
                    setFormCtaText(adCtaText);
                    setShowAdConfigModal(true);
                  }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '2px' }}>
                      <circle cx="12" cy="12" r="3" />
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                    </svg>
                    <span>Configure</span>
                  </button>

                  {/* Video Element */}
                  {!videoError ? (
                    <video 
                      key={adVideoUrl} 
                      src={adVideoUrl} 
                      autoPlay 
                      loop 
                      muted 
                      playsInline 
                      className="ad-video-element" 
                      onError={() => setVideoError(true)}
                    />
                  ) : (
                    <div className="ad-video-fallback" />
                  )}

                  {/* Glassmorphic Ad Copy Overlay */}
                  <div className="ad-video-overlay-banner">
                    <div className="ad-overlay-text">
                      <div className="ad-overlay-title">{adTitle}</div>
                      <div className="ad-overlay-desc">{adDesc}</div>
                    </div>
                    <button className="ad-overlay-cta" onClick={() => {
                      const staysSection = document.getElementById('stays-section');
                      if (staysSection) staysSection.scrollIntoView({ behavior: 'smooth' });
                    }}>
                      {adCtaText}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Room Tiers Section */}
            <section id="stays-section" className="room-tiers-section">
              <div className="room-tiers-container">
                <div className="room-tiers-grid">
                  {ROOM_TYPES.map(room => (
                    <RoomCard key={room.id} room={room} onBook={handleOpenCheckout} />
                  ))}
                </div>
              </div>
            </section>

            {/* Trust Stats Bar */}
            <div className="trust-stats-bar">
              <div className="trust-stats-container">
                {TRUST_STATS.map((stat, idx) => (
                  <React.Fragment key={stat.id}>
                    {idx > 0 && <div className="trust-stat-divider" />}
                    <div className="trust-stat-item">
                      <div className="trust-icon-wrapper">
                        {stat.icon}
                      </div>
                      <div className="trust-text">
                        <span className="trust-val">{stat.val}</span>
                        <span className="trust-lbl">{stat.lbl}</span>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Popular Stays Section */}
            <section className="popular-stays-section">
              <div className="popular-stays-container">
                <div className="popular-stays-header">
                  <h2 className="popular-stays-title">POPULAR STAYS</h2>
                  <a href="#view-all" className="view-all-link">
                    <span>View all</span>
                    <ChevronRight size={16} />
                  </a>
                </div>

                <div className="popular-stays-grid">
                  {POPULAR_STAYS.map(stay => (
                    <div key={stay.id} className="popular-stay-card">
                      <div className="popular-stay-img-wrapper" style={{ backgroundImage: `url(${stay.image})` }}>
                        <div className="badge-row">
                          <span className="rating-pill">
                            {stay.rating} <span className="star-char">★</span>
                          </span>
                          {stay.isBestSeller && (
                            <span className="bestseller-pill">BEST SELLER</span>
                          )}
                        </div>
                      </div>

                      <div className="popular-stay-details">
                        <div className="stay-name-row">
                          <h3 className="stay-name">{stay.name}</h3>
                          <div className="stay-price-col">
                            <span className="stay-price">₹{stay.price}</span>
                            <span className="stay-price-unit">/bed</span>
                          </div>
                        </div>

                        <div className="stay-location">
                          <svg className="location-pin-svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          <span>{stay.address}</span>
                        </div>

                        <div className="stay-amenities-row">
                          <div className="stay-amenity">
                            <Wifi size={13} />
                            <span>Wi-Fi</span>
                          </div>
                          <div className="stay-amenity">
                            <Lock size={13} />
                            <span>Locker</span>
                          </div>
                          <div className="stay-amenity">
                            <Wind size={13} />
                            <span>AC</span>
                          </div>
                          <div className="stay-amenity">
                            <Sparkles size={13} />
                            <span>Clean</span>
                          </div>
                        </div>

                        <div className="stay-footer-row">
                          <div className="stay-pills">
                            <span className="valid-pill">24 HR VALID</span>
                            <span className="rebook-pill">EASY RE-BOOKING</span>
                          </div>
                          <button className="heart-circle-btn">
                            <Heart size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'search' && (
          <div className="search-page-container">
            <div className="section-header">
              <h2>Available Stay Options in {searchCity || 'India'}</h2>
              <p>Choose your premium stay tier option.</p>
            </div>
            <div className="room-tiers-grid" style={{ marginTop: '2rem' }}>
              {ROOM_TYPES.map(room => (
                <RoomCard key={room.id} room={room} onBook={handleOpenCheckout} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'dashboard' && (
          <Dashboard 
            booking={activeBooking}
            onExtendStay={handleExtendStay}
            onChangeBranch={handleChangeBranch}
            onClearBooking={handleClearBooking}
            setActiveTab={setActiveTab}
          />
        )}
      </div>

      <SupportChat />

      {/* Dark Footer with 5 Feature Columns */}
      <footer id="contact-footer" className="custom-footer">
        <div className="footer-container">
          <div className="footer-columns-row">
            
            <div className="footer-col border-right">
              <div className="footer-icon-wrapper">
                <Users size={24} />
              </div>
              <div className="footer-text-block">
                <h4 className="footer-title">Saath ka Ehsaas</h4>
                <p className="footer-desc">You're never alone.</p>
              </div>
            </div>

            <div className="footer-col border-right">
              <div className="footer-icon-wrapper">
                <HomeIcon size={24} />
              </div>
              <div className="footer-text-block">
                <h4 className="footer-title">Ghar Jaisi Feel</h4>
                <p className="footer-desc">Because comfort matters.</p>
              </div>
            </div>

            <div className="footer-col border-right">
              <div className="footer-icon-wrapper">
                <ShieldCheck size={24} />
              </div>
              <div className="footer-text-block">
                <h4 className="footer-title">Surakshit Aapke Liye</h4>
                <p className="footer-desc">Your safety is our promise.</p>
              </div>
            </div>

            <div className="footer-col border-right">
              <div className="footer-icon-wrapper">
                <Heart size={24} />
              </div>
              <div className="footer-text-block">
                <h4 className="footer-title">Vishwas Jo Banaye Rishta</h4>
                <p className="footer-desc">Trusted stays, every time.</p>
              </div>
            </div>

            <div className="footer-col">
              <div className="footer-icon-wrapper">
                <Headset size={24} />
              </div>
              <div className="footer-text-block">
                <h4 className="footer-title">Hum Hamesha Saath Hain</h4>
                <p className="footer-desc">24/7 support, always.</p>
              </div>
            </div>

          </div>

          <div className="footer-tagline-gold">
            <img src={logoImg} alt="Humsafar Logo" className="footer-logo-img" />
            <span>HUMSAFAR – KYUNKI HAR SAFAR KHAAS HOTA HAI.</span>
          </div>
        </div>
      </footer>

      {/* Checkout / Mock Payment Modal */}
      {showCheckout && selectedRoom && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setShowCheckout(false)}>
              <X size={20} />
            </button>

            {isPaying ? (
              <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                <div className="payment-spinner"></div>
                <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.5rem' }}>Processing Payment</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Connecting securely to bank payment gateway...</p>
              </div>
            ) : bookingSuccess ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div className="success-check-circle">
                  <Check size={32} />
                </div>
                <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '0.5rem' }}>Booking Confirmed!</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  Your Humsafar Digital Pass has been generated. Redirecting to your dashboard...
                </p>
              </div>
            ) : (
              <form onSubmit={handleConfirmBooking} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.5rem', color: 'var(--color-gold)', marginBottom: '0.25rem' }}>Complete Bed Booking</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>You are booking a bed in: <strong>{selectedRoom.name}</strong></p>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-light)', padding: '1rem', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                    <span>Stay Period:</span>
                    <span>24 Hours</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                    <span>Rate:</span>
                    <span>₹{selectedRoom.price} /{selectedRoom.id === 'couple-bed' ? 'room' : 'bed'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', borderTop: '1px solid var(--border-light)', paddingTop: '0.5rem', fontWeight: 700 }} className="text-gold">
                    <span>Total Amount:</span>
                    <span>₹{selectedRoom.price}</span>
                  </div>
                </div>

                <div className="input-group">
                  <label>Full Guest Name</label>
                  <input 
                    type="text" 
                    className="input-field" 
                    required 
                    placeholder="Enter guest's full name"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                  />
                </div>

                <div className="input-group">
                  <label>Mobile Number</label>
                  <input 
                    type="tel" 
                    className="input-field" 
                    required 
                    placeholder="Enter 10-digit phone number"
                    pattern="[0-9]{10}"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                  />
                </div>

                <div className="input-group">
                  <label>Initial Check-In Branch</label>
                  <select 
                    className="input-field"
                    value={selectedBranch.id}
                    onChange={(e) => {
                      const branch = mockBranches.find(b => b.id === e.target.value);
                      if (branch) setSelectedBranch(branch);
                    }}
                  >
                    {mockBranches.map(b => (
                      <option key={b.id} value={b.id}>{b.name} ({b.city})</option>
                    ))}
                  </select>
                </div>

                <button type="submit" className="search-beds-btn" style={{ padding: '0.8rem', marginTop: '0.5rem', borderRadius: '8px' }}>
                  <span>Proceed to Payment</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Customizable Ad Video Modal */}
      {showAdConfigModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '460px' }}>
            <button className="modal-close" onClick={() => setShowAdConfigModal(false)}>
              <X size={20} />
            </button>

            <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.5rem', fontWeight: 800 }}>
              ⚙️ Configure Ad Campaign
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Set up or customize the video campaign running inside the banner.
            </p>

            <form onSubmit={handleSaveAdConfig} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div className="input-group">
                <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '0.35rem', fontSize: '0.75rem', fontWeight: 700 }}>Ad Video Source (MP4 URL)</label>
                <input 
                  type="url" 
                  required
                  className="input-field"
                  placeholder="https://example.com/video.mp4"
                  value={formVideoUrl}
                  onChange={(e) => setFormVideoUrl(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '0.35rem', fontSize: '0.75rem', fontWeight: 700 }}>Ad Title</label>
                <input 
                  type="text" 
                  required
                  maxLength={40}
                  className="input-field"
                  placeholder="e.g. Humsafar Stays & Homes"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '0.35rem', fontSize: '0.75rem', fontWeight: 700 }}>Ad Subtext / Description</label>
                <input 
                  type="text" 
                  required
                  maxLength={80}
                  className="input-field"
                  placeholder="e.g. ₹49 Extension fee & 24H branch-wide validity."
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '0.35rem', fontSize: '0.75rem', fontWeight: 700 }}>CTA Button Text</label>
                <input 
                  type="text" 
                  required
                  maxLength={15}
                  className="input-field"
                  placeholder="e.g. Book Now"
                  value={formCtaText}
                  onChange={(e) => setFormCtaText(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                <button 
                  type="button" 
                  className="action-btn" 
                  style={{ flex: 1 }}
                  onClick={() => setShowAdConfigModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="action-btn primary-action" 
                  style={{ flex: 1.5 }}
                >
                  Save Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
