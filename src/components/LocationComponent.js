import { useEffect } from "react";

function LocationComponent({ setUserLocation }) {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(pos => {
      const loc = `${pos.coords.latitude}, ${pos.coords.longitude}`;
      setUserLocation(loc);
    });
  }, [setUserLocation]);

  return <p>📍 Location enabled</p>;
}

export default LocationComponent;
