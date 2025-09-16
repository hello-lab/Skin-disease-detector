'use client';
import { useEffect, useState } from 'react';
import { Heading } from '@radix-ui/themes';
export default function CoffeeShops() {
  const [mapUrl, setMapUrl] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          // Construct a URL to search for cafes near user's location
          const gmapsUrl = `https://www.google.com/maps?q=cafes&ll=${lat},${lng}&z=15&output=embed`;
          setMapUrl(gmapsUrl);
        },
        (err) => {
          console.error('Geolocation error:', err);
          alert('Unable to access your location.');
        }
      );
    }
  }, []);

  return (
    <div style={{ padding: 20 }} className='flex-col flex flex-1 w-full items-center justify-center'>
      <Heading level={1}>Dermatologists Near You</Heading>
      

      {mapUrl ? (
        <div className='flex flex-col items-center gap-4 w-full'>
          {/* Google Map Iframe */}
          <iframe
            src={mapUrl}
            width="70%"
            height="600"
            style={{ border: 0, borderRadius: '8px' }}
            loading="lazy"
            allowFullScreen
          ></iframe>

          {/* Radix ScrollArea Placeholder */}
         
        </div>
      ) : (
        <p>Loading map based on your location...</p>
      )}
    </div>
  );
}
