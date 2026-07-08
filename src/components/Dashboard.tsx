import { useState, useEffect } from 'react';
import { 
  Ticket, 
  MapPin, 
  Clock, 
  RefreshCw, 
  PlusCircle, 
  ShieldCheck, 
  Coffee
} from 'lucide-react';
import type { RoomType } from './RoomCard';
import { mockBranches } from './BranchExplorer';
import type { BranchType } from './BranchExplorer';

export interface BookingType {
  id: string;
  guestName: string;
  room: RoomType;
  branch: BranchType;
  checkInTime: string;
  expiresAt: string; // ISO string
}

interface DashboardProps {
  booking: BookingType | null;
  onExtendStay: () => void;
  onChangeBranch: (newBranch: BranchType) => void;
  onClearBooking: () => void;
  setActiveTab: (tab: string) => void;
}

export default function Dashboard({ 
  booking, 
  onExtendStay, 
  onChangeBranch, 
  onClearBooking,
  setActiveTab 
}: DashboardProps) {
  const [showExtendModal, setShowExtendModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');
  const [isExpiringSoon, setIsExpiringSoon] = useState(false);

  // Time remaining calculator
  useEffect(() => {
    if (!booking) return;

    const interval = setInterval(() => {
      const difference = +new Date(booking.expiresAt) - +new Date();
      
      if (difference <= 0) {
        setTimeLeft('Expired');
        setIsExpiringSoon(true);
        clearInterval(interval);
        return;
      }

      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
      
      // Expiring in less than 3 hours
      if (difference < 3 * 60 * 60 * 1000) {
        setIsExpiringSoon(true);
      } else {
        setIsExpiringSoon(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [booking]);

  if (!booking) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 1.5rem', maxWidth: '600px', margin: '0 auto' }}>
        <Ticket size={64} className="text-gold" style={{ marginBottom: '1.5rem' }} />
        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem' }}>No Active Booking Pass</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          You don't have an active Humsafar pass right now. Book a bed to get a digital check-in card valid across all Indian branches!
        </p>
        <button 
          className="nav-action-btn" 
          style={{ padding: '0.8rem 2rem', fontSize: '1rem', margin: '0 auto' }}
          onClick={() => setActiveTab('search')}
        >
          Find &amp; Book a Bed
        </button>
      </div>
    );
  }

  // Filter branches excluding current branch for transfer options
  const transferOptions = mockBranches.filter(b => b.id !== booking.branch.id);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      <div className="section-header">
        <h2 className="text-gold">Your Digital Humsafar Wallet</h2>
        <p>Show this pass at check-in or manage your flexible bookings dynamically below.</p>
      </div>

      <div className="dashboard-container">
        {/* Boarding pass card */}
        <div className="pass-card">
          <div className="pass-header">
            <div>
              <span className="text-gold" style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.1rem' }}>
                HUMSAFAR PASS
              </span>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                ID: {booking.id}
              </div>
            </div>
            
            <div className={`pass-status-pill ${isExpiringSoon ? 'warning' : ''}`}>
              <span style={{ display: 'inline-block', width: '6px', height: '6px', backgroundColor: isExpiringSoon ? 'var(--color-red)' : 'var(--color-green)', borderRadius: '50%' }} />
              <span>{isExpiringSoon ? 'Expiring Soon' : 'Active Pass'}</span>
            </div>
          </div>

          <div className="pass-body">
            <div className="pass-info-grid">
              <div className="pass-info-block">
                <span className="pass-info-label">Guest Name</span>
                <span className="pass-info-val">{booking.guestName}</span>
              </div>
              <div className="pass-info-block">
                <span className="pass-info-label">Stay Tier</span>
                <span className="pass-info-val text-gold">{booking.room.name}</span>
              </div>
              <div className="pass-info-block">
                <span className="pass-info-label">Active Branch</span>
                <span className="pass-info-val" style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                  <MapPin size={12} className="text-gold" />
                  {booking.branch.name} ({booking.branch.city})
                </span>
              </div>
              <div className="pass-info-block">
                <span className="pass-info-label">Expires In</span>
                <span className="pass-info-val" style={{ fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: '0.3rem', color: isExpiringSoon ? 'var(--color-red)' : 'var(--color-green)' }}>
                  <Clock size={14} />
                  {timeLeft}
                </span>
              </div>
              <div className="pass-info-block" style={{ gridColumn: 'span 2' }}>
                <span className="pass-info-label">Check-In Location Details</span>
                <span className="pass-info-val" style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
                  {booking.branch.address}
                </span>
              </div>
            </div>

            {/* Stylized QR Code with scanner line */}
            <div className="qr-container">
              <div className="qr-box">
                <div className="qr-scan-line"></div>
                <svg className="qr-svg" viewBox="0 0 100 100">
                  {/* Outer border boxes */}
                  <rect x="10" y="10" width="25" height="25" fill="none" stroke="#000" strokeWidth="6" />
                  <rect x="15" y="15" width="15" height="15" fill="#000" />
                  
                  <rect x="65" y="10" width="25" height="25" fill="none" stroke="#000" strokeWidth="6" />
                  <rect x="70" y="15" width="15" height="15" fill="#000" />
                  
                  <rect x="10" y="65" width="25" height="25" fill="none" stroke="#000" strokeWidth="6" />
                  <rect x="15" y="65" width="15" height="15" fill="#000" />

                  {/* Tiny mock QR pixels path */}
                  <path d="M 45,10 H 55 V 20 H 45 Z M 45,25 H 50 V 35 H 45 Z M 55,25 H 60 V 30 H 55 Z M 10,45 H 20 V 50 H 10 Z M 25,45 H 35 V 55 H 25 Z M 30,55 H 40 V 60 H 30 Z M 45,45 H 55 V 55 H 45 Z M 55,45 H 65 V 50 H 55 Z M 65,45 H 70 V 55 H 65 Z M 75,45 H 85 V 55 H 75 Z M 45,60 H 50 V 70 H 45 Z M 55,60 H 65 V 70 H 55 Z M 70,60 H 80 V 65 H 70 Z M 80,65 H 90 V 75 H 80 Z M 45,75 H 55 V 85 H 45 Z M 55,75 H 60 V 90 H 55 Z M 65,75 H 75 V 80 H 65 Z M 65,85 H 75 V 90 H 65 Z M 80,85 H 90 V 90 H 80 Z" fill="#000" />
                </svg>
              </div>
              <span className="qr-id">PASS-QRG-{booking.id.split('-')[0].toUpperCase()}</span>
            </div>
          </div>

          <div className="pass-actions">
            <button className="action-btn" onClick={() => setShowTransferModal(true)}>
              <RefreshCw size={14} className="text-gold" />
              <span>Change Branch</span>
            </button>
            <button className="action-btn primary-action" onClick={() => setShowExtendModal(true)}>
              <PlusCircle size={14} />
              <span>Extend Stay (+₹49)</span>
            </button>
          </div>
        </div>

        {/* Dynamic Pass controls and instructions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="branches-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <h3 style={{ fontSize: '1.2rem', color: '#fff', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>
              Checked-In Guest Guidelines
            </h3>

            <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
              <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '0.5rem', borderRadius: '50%', color: 'var(--color-gold)' }}>
                <Clock size={16} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.9rem', color: '#fff' }}>24-Hour Stay Policy</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  Your bed/room is allocated for 24 hours. You can extend your check-in period anytime before it expires.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '0.5rem', borderRadius: '50%', color: 'var(--color-green)' }}>
                <ShieldCheck size={16} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.9rem', color: '#fff' }}>Locker &amp; Key Allocation</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  Locker key {booking.id.split('-')[1]?.toUpperCase() || 'L-42'} has been allocated to you. Show your QR to the manager to fetch it.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '0.5rem', borderRadius: '50%', color: 'var(--text-secondary)' }}>
                <Coffee size={16} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.9rem', color: '#fff' }}>WiFi &amp; Counter Access</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  Network SSID: <span style={{ fontFamily: 'monospace', color: 'var(--color-gold)' }}>Humsafar_Branch_WiFi</span>. Password provided at check-in counter.
                </p>
              </div>
            </div>

            <button 
              className="action-btn" 
              style={{ border: '1px solid rgba(239, 68, 68, 0.3)', color: 'var(--color-red)', background: 'rgba(239, 68, 68, 0.03)', marginTop: '1rem' }}
              onClick={onClearBooking}
            >
              Cancel Stay / Check-Out
            </button>
          </div>
        </div>
      </div>

      {/* EXTEND STAY MODAL */}
      {showExtendModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '420px' }}>
            <h3 style={{ color: 'var(--color-gold)', fontSize: '1.4rem', marginBottom: '0.5rem' }}>Extend Stay period</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Extend your Humsafar Pass validity by another 24 hours at the nominal rate of ₹49.
            </p>
            
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-light)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                <span>Extension duration:</span>
                <span style={{ fontWeight: 700 }}>+24 Hours</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }} className="text-gold">
                <span>Extension Charge:</span>
                <span style={{ fontWeight: 800 }}>₹49</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                className="action-btn" 
                style={{ flex: 1 }}
                onClick={() => setShowExtendModal(false)}
              >
                Go Back
              </button>
              <button 
                className="action-btn primary-action" 
                style={{ flex: 1 }}
                onClick={() => {
                  onExtendStay();
                  setShowExtendModal(false);
                }}
              >
                Pay &amp; Extend
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TRANSFER BRANCH MODAL */}
      {showTransferModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '460px' }}>
            <h3 style={{ color: 'var(--color-gold)', fontSize: '1.4rem', marginBottom: '0.5rem' }}>Transfer Check-In Branch</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.2rem' }}>
              Traveling to another city? Transfer your check-in instantly to any active branch below. No extra charge!
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', maxHeight: '220px', overflowY: 'auto', marginBottom: '1.5rem', paddingRight: '0.2rem' }}>
              {transferOptions.map(branch => (
                <div 
                  key={branch.id} 
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.8rem',
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid var(--border-light)',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    onChangeBranch(branch);
                    setShowTransferModal(false);
                  }}
                  className="branch-transfer-item"
                >
                  <div>
                    <h5 style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 600 }}>{branch.name}</h5>
                    <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{branch.city} - {branch.availableBeds} beds available</p>
                  </div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--color-green)', fontWeight: 600 }}>Transfer</span>
                </div>
              ))}
            </div>

            <button 
              className="action-btn" 
              style={{ width: '100%' }}
              onClick={() => setShowTransferModal(false)}
            >
              Cancel Transfer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
