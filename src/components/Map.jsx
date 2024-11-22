import React, { useContext, useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import "leaflet/dist/leaflet.css";

import { useMap, useMapEvent, useMapEvents } from "react-leaflet/hooks";
import { LocationContext } from "./context/locationContext";

const Map = () => {
  const contextData = useContext(LocationContext);

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
          zoom={13}
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
        </MapContainer>
      </div>
    </>
  );
};

export default Map;
