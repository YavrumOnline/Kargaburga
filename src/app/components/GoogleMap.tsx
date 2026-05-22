import { Navigation } from 'lucide-react';

interface GoogleMapProps {
  locations: Array<{ name: string; lat: number; lng: number }>;
  selectedLocation: string;
  darkMode?: boolean;
}

export function GoogleMap({ locations, selectedLocation, darkMode }: GoogleMapProps) {
  const selectedCoords = locations.find(loc => loc.name === selectedLocation);
  
  if (!selectedCoords) return null;

  const simpleEmbedUrl = `https://maps.google.com/maps?q=${selectedCoords.lat},${selectedCoords.lng}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <iframe
        src={simpleEmbedUrl}
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          borderRadius: '1rem 1rem 0 0',
          filter: darkMode ? 'invert(0.9) hue-rotate(180deg)' : 'none',
        }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`Map showing ${selectedLocation}`}
      />
    </div>
  );
}