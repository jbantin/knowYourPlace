import React, { useContext, useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import "leaflet/dist/leaflet.css";

import { useMap, useMapEvent, useMapEvents } from "react-leaflet/hooks";
import { LocationContext } from "./context/locationContext";

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
          center={[contextData.locationData.lat, contextData.locationData.lon]}
          zoom={15}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={[contextData.locationData.lat, contextData.locationData.lon]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
          <ChangeMapView coords={[contextData.locationData.lat, contextData.locationData.lon]} />
        </MapContainer>
      </div>
    </>
  );
};

export default Map;
