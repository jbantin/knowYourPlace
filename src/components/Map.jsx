import React, { useContext, useEffect, useState } from "react";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { Marker, Popup } from "react-leaflet"; 
import "leaflet/dist/leaflet.css";
import DraggableMarker from "./DraggableMarker";
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
          <DraggableMarker />
          {/* <Marker
            draggable={draggable}
            eventHandlers={eventHandlers}
            // position={position}
            ref={markerRef}
            position={[
              contextData.locationData.lat,
              contextData.locationData.lon,
            ]}
          >
            <Popup minWidth={90}>
              <span onClick={toggleDraggable}>
                {draggable
                  ? "Marker is draggable"
                  : "Click here to make marker draggable"}
              </span>
            </Popup>
          </Marker> */}
          <ChangeMapView
            coords={[
              contextData.locationData.lat,
              contextData.locationData.lon,
            ]}
          />
        </MapContainer>
      </div>
    </>
  );
};

export default Map;
