import logoImg from '../assets/logo.png';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  if (activeTab === 'login') return null;

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Left: Brand Logo & Tagline */}
        <div className="brand" onClick={() => setActiveTab('home')} style={{ cursor: 'pointer' }}>
          <img src={logoImg} alt="Humsafar Logo" className="logo-img" />
          <div className="brand-info">
            <div className="brand-logo-text">
              <span className="text-white">Hum</span>
              <span className="text-gold">safar</span>
            </div>
            <div className="brand-tagline">Har Safar, Apnon Ke Saath.</div>
          </div>
        </div>

        {/* Middle Navigation Links */}
        <nav className="nav-links">
          <span 
            className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
          >
            Home
          </span>
          <span 
            className="nav-link"
            onClick={() => {
              setActiveTab('home');
              setTimeout(() => {
                const element = document.getElementById('stays-section');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
          >
            Stays
          </span>
          <span 
            className="nav-link"
            onClick={() => {
              setActiveTab('home');
              setTimeout(() => {
                const element = document.getElementById('stays-section');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
          >
            Offers
          </span>
          <span 
            className="nav-link"
            onClick={() => {
              setActiveTab('home');
              setTimeout(() => {
                const element = document.getElementById('why-humsafar');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
          >
            Why Humsafar
          </span>
          <span 
            className="nav-link"
            onClick={() => {
              setActiveTab('home');
              setTimeout(() => {
                const element = document.getElementById('contact-footer');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
          >
            Contact
          </span>
        </nav>

        {/* Right Support Info & Login Button */}
        <div className="nav-right">
          <div className="support-box">
            <div className="support-icon">
              <span>24</span>
            </div>
            <div className="support-details">
              <span className="support-title">24x7 Support</span>
              <span className="support-number">+91 99999 00000</span>
            </div>
          </div>

          <button className="login-btn" onClick={() => setActiveTab('login')}>
            <svg 
              className="login-icon"
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span>Login / Sign Up</span>
          </button>
        </div>
      </div>
    </header>
  );
}
