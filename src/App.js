Geolocation

import React, { useState } from 'react';

const GeolocationApp = () => {
  const [locations, setLocations] = useState([]);
  const [watchId, setWatchId] = useState(null);

  const appendLocation = (location, verb = 'updated') => {
    const newLocation = (
      <p key={locations.length}>
        Location {verb}: {location.coords.latitude}, {location.coords.longitude}
      </p>
    );
    setLocations((prevLocations) => [...prevLocations, newLocation]);
  };

  const handleAskButtonClick = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((location) => {
        appendLocation(location, 'fetched');
      });
      const newWatchId = navigator.geolocation.watchPosition(appendLocation);
      setWatchId(newWatchId);
    } else {
      setLocations(['Geolocation API not supported.']);
    }
  };

  return (
    <div>
      <button id="askButton" onClick={handleAskButtonClick}>
        Ask for Geolocation
      </button>
      <div id="target">{locations}</div>
    </div>
  );
};

export default GeolocationApp;