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
  if (contextData.locationData) {
    console.log(contextData.locationData.lat);
    location.latitude = contextData.locationData.lat;
    location.longitude = contextData.locationData.lon;
   }
  const position = [53.55, 10];
  
  useEffect(() => {
    if (contextData.locationData.coord)
      console.log("huhu" + contextData.locationData.coord.lon);
  }, [contextData.locationData]);
  return (
    <>
      <div id="map" className="w-full h-[50vh] overflow-hidden">
        <MapContainer
          className="w-full h-[60vh]"
          center={position}
          zoom={15}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
          <ChangeMapView coords={[location.latitude, location.longitude]} />
        </MapContainer>
      </div>
    </>
  );
};

export default Map;
