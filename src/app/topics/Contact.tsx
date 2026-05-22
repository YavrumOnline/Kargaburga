import { useNavigation } from '@/app/navigation/NavigationController';
import { DARK_MODE, LIGHT_MODE } from '@/constants/colors';
import { SlideContainer } from '@/app/components/SlideContainer';
import { getHeadingStyle, TRANSITIONS } from '@/constants/styles';
import { HorizontalPicker } from '@/app/components/HorizontalPicker';
import { GoogleMap } from '@/app/components/GoogleMap';
import { useState, useMemo } from 'react';

const istanbulLocations = [
  'Kadıköy',
  'Beşiktaş',
  'Taksim',
  'Sultanahmet',
  'Karaköy'
];

const locationCoordinates: Record<string, { lat: number; lng: number }> = {
  'Kadıköy': { lat: 40.9903, lng: 29.0256 },
  'Beşiktaş': { lat: 41.0422, lng: 29.0086 },
  'Taksim': { lat: 41.0369, lng: 28.9850 },
  'Sultanahmet': { lat: 41.0086, lng: 28.9802 },
  'Karaköy': { lat: 41.0244, lng: 28.9744 }
};

export function Contact({ darkMode }: { darkMode?: boolean }) {
  const { contactView } = useNavigation();
  const [selectedLocation, setSelectedLocation] = useState('Kadıköy');

  const textColor = darkMode ? DARK_MODE.TEXT : LIGHT_MODE.TEXT;

  // Convert location data to array format for GoogleMap component
  const locationData = useMemo(() => istanbulLocations.map(name => ({
    name,
    lat: locationCoordinates[name].lat,
    lng: locationCoordinates[name].lng,
  })), []);

  return (
    <>
      <SlideContainer justifyContent="center">
        {contactView === 'info' ? (
          // Info View
          <div style={{ maxWidth: '42rem', width: '100%' }}>
            <h2 style={getHeadingStyle(textColor)}>
              İletişim Bilgileri
            </h2>
            <div
              className="selectable-text"
              style={{
                fontSize: '14px',
                lineHeight: 1.8,
                color: textColor,
                textAlign: 'center',
                maxWidth: '38rem',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                transition: TRANSITIONS.COLOR,
              }}
            >
              <p style={{ margin: 0 }}>
                <strong>Adres:</strong><br />
                Kargaburga Eğitim Merkezi<br />
                Örnek Mahalle, Örnek Sokak No: 123<br />
                Kadıköy / İstanbul
              </p>
              <p style={{ margin: 0 }}>
                <strong>Telefon:</strong><br />
                +90 (216) 555 12 34
              </p>
              <p style={{ margin: 0 }}>
                <strong>E-posta:</strong><br />
                info@kargaburga.com
              </p>
              <p style={{ margin: 0 }}>
                <strong>Çalışma Saatleri:</strong><br />
                Pazartesi - Cuma: 09:00 - 18:00<br />
                Cumartesi: 10:00 - 16:00
              </p>
            </div>
          </div>
        ) : (
          // Map View
          <div 
            style={{ 
              maxWidth: '90vh', 
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2px',
            }}
          >
            <div
              style={{
                width: '100%',
                height: 'min(400px, 50vh)',
                maxHeight: 'calc(70vh - 240px)',
                minHeight: '280px',
                backgroundColor: darkMode ? DARK_MODE.SECONDARY_BG : LIGHT_MODE.SECONDARY_BG,
                borderRadius: '1rem',
                overflow: 'hidden',
                border: `2px solid ${darkMode ? DARK_MODE.SECONDARY_BORDER : LIGHT_MODE.SECONDARY_BORDER}`,
                position: 'relative',
                transition: TRANSITIONS.BACKGROUND,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ flex: '1 1 auto', position: 'relative', overflow: 'hidden' }}>
                <GoogleMap
                  locations={locationData}
                  selectedLocation={selectedLocation}
                  darkMode={darkMode}
                />
              </div>
              
              {/* White space for location names */}
              <div 
                data-gesture-exclude 
                style={{ 
                  flex: '0 0 auto',
                  height: '40px',
                  width: '100%',
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  touchAction: 'pan-x',
                  borderRadius: '0 0 1rem 1rem',
                }}
              >
                <div style={{ width: '100%', maxWidth: '600px' }}>
                  <HorizontalPicker 
                    items={istanbulLocations}
                    height={40}
                    darkMode={false}
                    onSelect={(index, location) => setSelectedLocation(location)}
                  />
                </div>
              </div>
            </div>
            
            {/* Indicator dots */}
            <div 
              style={{ 
                display: 'flex',
                gap: '8px',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '8px',
              }}
            >
              {istanbulLocations.map((location, index) => {
                const isActive = selectedLocation === location;
                return (
                  <div
                    key={location}
                    style={{
                      width: '7.2px',
                      height: '7.2px',
                      borderRadius: '50%',
                      backgroundColor: isActive
                        ? (darkMode ? DARK_MODE.TEXT : LIGHT_MODE.TEXT)
                        : `${darkMode ? DARK_MODE.TEXT : LIGHT_MODE.TEXT}40`,
                      transition: 'background-color 0.5s ease-in-out',
                      animation: isActive ? 'dotPulse 0.8s ease-in-out infinite' : 'none',
                    }}
                  />
                );
              })}
            </div>
          </div>
        )}
      </SlideContainer>
    </>
  );
}