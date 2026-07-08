import { useState } from 'react';
import { MapPin, Shield, CheckCircle, Search, Phone } from 'lucide-react';

export interface BranchType {
  id: string;
  name: string;
  city: string;
  address: string;
  availableBeds: number;
  rating: number;
  phone: string;
  // coordinates on our 200x300 mock map
  mapX: number;
  mapY: number;
}

export const mockBranches: BranchType[] = [
  { id: 'delhi-cp', name: 'Connaught Place Branch', city: 'Delhi', address: 'Block H, Connaught Place, near Rajiv Chowk Metro, New Delhi - 110001', availableBeds: 12, rating: 4.8, phone: '+91 99999 11111', mapX: 95, mapY: 90 },
  { id: 'delhi-kb', name: 'Karol Bagh Branch', city: 'Delhi', address: 'Pusa Road, Karol Bagh, New Delhi - 110005', availableBeds: 8, rating: 4.7, phone: '+91 99999 22222', mapX: 90, mapY: 95 },
  { id: 'mumbai-andheri', name: 'Andheri West Branch', city: 'Mumbai', address: 'Link Road, Andheri West, near Metro Station, Mumbai - 400053', availableBeds: 15, rating: 4.9, phone: '+91 88888 11111', mapX: 50, mapY: 200 },
  { id: 'mumbai-bandra', name: 'Bandra Reclamation Branch', city: 'Mumbai', address: 'Carter Road, Bandra West, Mumbai - 400050', availableBeds: 5, rating: 4.6, phone: '+91 88888 22222', mapX: 52, mapY: 205 },
  { id: 'bangalore-koramangala', name: 'Koramangala 5th Block Branch', city: 'Bangalore', address: '100 Feet Road, Koramangala, Bengaluru - 560095', availableBeds: 22, rating: 4.9, phone: '+91 77777 11111', mapX: 105, mapY: 260 },
  { id: 'bangalore-indiranagar', name: 'Indiranagar Double Road Branch', city: 'Bangalore', address: '12th Main, Indiranagar, Bengaluru - 560038', availableBeds: 14, rating: 4.8, phone: '+91 77777 22222', mapX: 107, mapY: 255 },
  { id: 'jaipur-pinkcity', name: 'Pink City Palace Branch', city: 'Jaipur', address: 'MI Road, opposite Raj Mandir Cinema, Jaipur - 302001', availableBeds: 18, rating: 4.7, phone: '+91 66666 11111', mapX: 80, mapY: 110 },
  { id: 'pune-hinjewadi', name: 'Hinjewadi IT Park Branch', city: 'Pune', address: 'Phase 1, Hinjewadi IT Park, Pune - 411057', availableBeds: 11, rating: 4.5, phone: '+91 55555 11111', mapX: 58, mapY: 215 },
  { id: 'patna-dakbungalow', name: 'Dak Bungalow Chowk Branch', city: 'Patna', address: 'Dak Bungalow Road, near Railway Station, Patna - 800001', availableBeds: 7, rating: 4.8, phone: '+91 44444 11111', mapX: 160, mapY: 130 }
];

export default function BranchExplorer() {
  const [selectedBranch, setSelectedBranch] = useState<BranchType>(mockBranches[0]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBranches = mockBranches.filter(b => 
    b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      <div className="section-header" style={{ textAlign: 'center' }}>
        <h2 className="text-gold" style={{ fontSize: '2.2rem' }}>Humsafar Network Map</h2>
        <p>Across India, stay in any branch with a single active booking pass!</p>
      </div>

      <div className="dashboard-container">
        {/* Branch listing & Search */}
        <div className="branches-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="input-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Search size={14} className="text-gold" />
              Search branch location
            </label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="e.g. Delhi, Bangalore, Koramangala..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="branch-list">
            {filteredBranches.map(branch => (
              <div 
                key={branch.id} 
                className={`branch-item ${selectedBranch.id === branch.id ? 'active' : ''}`}
                onClick={() => setSelectedBranch(branch)}
              >
                <div className="branch-item-info">
                  <h4 style={{ color: selectedBranch.id === branch.id ? 'var(--color-gold)' : '#fff' }}>
                    {branch.name}
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem' }}>
                    <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.05)', padding: '0.1rem 0.4rem', borderRadius: '4px', color: 'var(--text-secondary)' }}>
                      {branch.city}
                    </span>
                    <span className="stat-tag">
                      {branch.availableBeds} beds available
                    </span>
                  </div>
                </div>
                <div style={{ color: 'var(--text-muted)' }}>
                  <MapPin size={18} className={selectedBranch.id === branch.id ? 'text-gold' : ''} />
                </div>
              </div>
            ))}
            {filteredBranches.length === 0 && (
              <p style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem 0' }}>
                No branches found matching your search.
              </p>
            )}
          </div>
        </div>

        {/* Interactive Map & Branch Card details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="branches-panel" style={{ background: 'linear-gradient(135deg, #131b2e 0%, #0b0f19 100%)' }}>
            <h3 style={{ marginBottom: '1rem', color: '#fff', fontSize: '1.25rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>
              Selected Location Details
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <h4 style={{ color: 'var(--color-gold)', fontSize: '1.2rem', fontWeight: 700 }}>
                  {selectedBranch.name}
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.2rem' }}>
                  <MapPin size={14} className="text-gold" />
                  {selectedBranch.city}
                </p>
              </div>

              <p style={{ fontSize: '0.85rem', lineHeight: '1.4', background: 'rgba(255,255,255,0.02)', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                {selectedBranch.address}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  <Shield size={16} className="text-green" />
                  <span>CCTV Secure</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  <CheckCircle size={16} className="text-gold" />
                  <span>24x7 Cleaning</span>
                </div>
              </div>

              <a 
                href={`tel:${selectedBranch.phone}`} 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid var(--border-light)',
                  padding: '0.7rem',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  transition: 'border-color 0.2s, background 0.2s'
                }}
                className="branch-contact-link"
              >
                <Phone size={14} className="text-gold" />
                <span>Contact: {selectedBranch.phone}</span>
              </a>
            </div>
          </div>

          {/* Interactive Map Visual */}
          <div className="map-placeholder">
            {/* Outline map of India simulation with dots */}
            <div style={{ position: 'absolute', top: '10px', left: '10px', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              Interactive India Network Coverage
            </div>

            {/* Render coordinates of all branches on our layout */}
            {mockBranches.map(branch => (
              <div 
                key={branch.id}
                className="map-dot"
                style={{
                  left: `${branch.mapX}px`,
                  top: `${branch.mapY}px`,
                  backgroundColor: selectedBranch.id === branch.id ? 'var(--color-red)' : 'var(--color-gold)',
                  boxShadow: selectedBranch.id === branch.id ? '0 0 12px var(--color-red)' : '0 0 8px var(--color-gold)',
                  transform: selectedBranch.id === branch.id ? 'scale(1.4)' : 'scale(1)'
                }}
                onClick={() => setSelectedBranch(branch)}
                title={branch.name}
              />
            ))}

            <div className="map-tooltip" style={{ bottom: '12px', right: '12px' }}>
              📍 Active: {selectedBranch.city} Branch
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
