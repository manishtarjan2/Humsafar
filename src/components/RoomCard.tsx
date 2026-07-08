import bunkImg from '../assets/bunk.png';
import tripleImg from '../assets/triple.png';
import doubleImg from '../assets/double.png';
import coupleImg from '../assets/couple.png';

export interface RoomType {
  id: string;
  name: string;
  subtitle: string;
  bestFor: string;
  price: number;
  isAc: boolean;
  features: string[];
  extendStayPrice: number;
  rebookingPrice: number;
}

interface RoomCardProps {
  room: RoomType;
  onBook: (room: RoomType) => void;
}

// Map room IDs to imported images
const imageMap: Record<string, string> = {
  'bunk-bed': bunkImg,
  'triple-sharing': tripleImg,
  'double-sharing': doubleImg,
  'couple-bed': coupleImg,
};

// SVG icons for each tier
const renderTierIcon = (id: string) => {
  if (id === 'bunk-bed') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="tier-icon-svg">
        <path d="M2 4v16M22 4v16M2 8h20M2 14h20M6 4v4M18 4v4M6 14v4" />
      </svg>
    );
  } else if (id === 'triple-sharing') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="tier-icon-svg">
        <path d="M3 10h18M3 14h18M3 6h6M15 6h6M5 6v4M19 6v4" />
        <rect x="2" y="16" width="20" height="4" rx="1" />
      </svg>
    );
  } else if (id === 'double-sharing') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="tier-icon-svg">
        <path d="M2 12h20M6 6v6M18 6v6M2 18v2M22 18v2" />
        <rect x="4" y="12" width="16" height="6" rx="1" />
      </svg>
    );
  } else {
    // couple-bed
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="tier-icon-svg">
        <path d="M2 4v16M22 4v16M2 8h20M2 17h20" />
        <rect x="6" y="8" width="12" height="6" rx="1" />
      </svg>
    );
  }
};

export default function RoomCard({ room, onBook }: RoomCardProps) {
  const roomImg = imageMap[room.id] || bunkImg;
  
  let colorThemeClass = 'bunk-theme';
  if (room.id === 'triple-sharing') colorThemeClass = 'triple-theme';
  else if (room.id === 'double-sharing') colorThemeClass = 'double-theme';
  else if (room.id === 'couple-bed') colorThemeClass = 'couple-theme';

  return (
    <div className={`horizontal-room-card ${colorThemeClass}`} onClick={() => onBook(room)}>
      {/* Top section: Text layout and right thumbnail image */}
      <div className="card-top-section">
        <div className="card-top-left">
          <div className="card-header-row">
            <div className="tier-icon-container">
              {renderTierIcon(room.id)}
            </div>
            <div className="tier-titles">
              <h3 className="tier-title">{room.name.toUpperCase()}</h3>
              <p className="tier-subtitle">{room.subtitle}</p>
            </div>
          </div>

          <div className="card-price-row">
            <div className="price-main-block">
              <span className="price-symbol">₹</span>
              <span className="price-amount">{room.price}</span>
              <span className="price-unit">/{room.id === 'couple-bed' ? 'room' : 'bed'}</span>
            </div>
            {room.id === 'couple-bed' && (
              <span className="price-sub-desc">(for 2 people)</span>
            )}
          </div>
        </div>

        {/* Chevron overlapping button (placed at the top section dividing line) */}
        <div className="card-chevron-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>

        {/* Image thumbnail in top section */}
        <div className="card-right-image" style={{ backgroundImage: `url(${roomImg})` }}></div>
      </div>

      {/* Dotted horizontal divider */}
      <div className="card-dotted-divider"></div>

      {/* Bottom section: Addon columns spanning full card width */}
      <div className="card-bottom-addons">
        <div className="addon-column border-right">
          <span className="addon-label">24 HR EXTENSION</span>
          <span className="addon-price">₹{room.extendStayPrice}</span>
        </div>
        <div className="addon-column">
          <span className="addon-label">RE-BOOKING</span>
          <span className="addon-price">₹{room.rebookingPrice}</span>
        </div>
      </div>
    </div>
  );
}
