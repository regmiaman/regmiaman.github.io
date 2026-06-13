import React from 'react';
import './LocationMap.css';

const LocationMap = () => {
  // Kathmandu coordinates
  const latitude = 27.7172;
  const longitude = 85.3240;
  const locationName = 'Kathmandu, Nepal';

  // Using Google Maps Embed API (free, no key required for embedded maps)
  const embedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.5207253499957!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae21d7b594cbc6d%3A0x57a4ecf5763b0c8c!2sKathmandu%2C%20Nepal!5e0!3m2!1sen!2sus!4v1686573844523`;

  return (
    <div className="location-map-container">
      <iframe
        className="location-map-iframe"
        src={embedUrl}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="My location in Kathmandu, Nepal"
      />
    </div>
  );
};

export default LocationMap;
