import React, { useContext, useEffect, useState } from "react";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import DraggableMarker from "./DraggableMarker";
import { useMap, useMapEvents } from "react-leaflet";
import { LocationContext } from "./context/locationContext";

function LocationMarker() {
  const [position, setPosition] = useState(null);
  const { setLocationData } = useContext(LocationContext);
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
      setLocationData({ geometry: { lat: e.latlng.lat, lng: e.latlng.lng } });
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

const ChangeMapView = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(coords, 15);
  }, [coords, map]);
  return null;
};

const Map = () => {
  const contextData = useContext(LocationContext);

  return (
    <>
      <div id="map" className="my-3 w-full h-[40vh] overflow-hidden ">
        <MapContainer
          className="w-full h-[60vh]"
          center={[
            contextData.locationData.geometry.lat,
            contextData.locationData.geometry.lng,
          ]}
          zoom={15}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <DraggableMarker />
          <ChangeMapView
            coords={[
              contextData.locationData.geometry.lat,
              contextData.locationData.geometry.lng,
            ]}
          />
          <LocationMarker />
        </MapContainer>
      </div>
    </>
  );
};

export default Map;
