import { useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const LocationMap = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("");

  // Fetch location from backend
  const getLocation = async () => {
    if (!phoneNumber) {
      alert("Please enter a phone number.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:8080/api/location/get", {
        params: { phoneNumber },
      });

      // Update map if location exists
      if (response.status === 200) {
        const { latitude, longitude, address } = response.data;
        setLocation({ lat: latitude, lng: longitude });
        setAddress(address);
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert("Location not found!");
      setLocation(null); // Clear map if location not found
    }
  };

  // Share location on WhatsApp
  const shareOnWhatsApp = () => {
    if (!location) return;

    const googleMapsLink = `https://www.google.com/maps?q=${location.lat},${location.lng}`;
    const message = `📍 Location: ${address || "User Location"}\n${googleMapsLink}`;

    // Open WhatsApp with the message
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="location-container">
      <h2>📍 Find User Location</h2>

      <input
        type="text"
        placeholder="Enter Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button onClick={getLocation}>Get Location</button>

      {location && (
        <div className="map-container">
          <p>📌 Address: {address}</p>

          <MapContainer center={[location.lat, location.lng]} zoom={13} className="map">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[location.lat, location.lng]}>
              <Popup>{address || "User Location"}</Popup>
            </Marker>
          </MapContainer>

          <button onClick={shareOnWhatsApp}>📤 Share on WhatsApp</button>
        </div>
      )}
    </div>
  );
};

export default LocationMap;
