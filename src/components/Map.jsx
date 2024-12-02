import React, { useContext, useEffect, useState, useRef } from "react";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
// import DraggableMarker from "./DraggableMarker";
import { useMap, useMapEvents } from "react-leaflet";
import { LocationContext } from "./context/locationContext";
import mapArray from "./Skins";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";

function LocationMarker() {
  const { position, setPosition } = useContext(LocationContext);
  const { setLocationData, zoom, setZoom } = useContext(LocationContext);

  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
      setZoom(map.getZoom());
      setLocationData({ geometry: { lat: e.latlng.lat, lng: e.latlng.lng } });
    },
  });

  return position === null ? null : (
    // <Marker position={position}>
    <Marker
      position={position}
      icon={
        new Icon({
          iconUrl: markerIconPng,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        })
      }
    >
      <Popup>You are here</Popup>
    </Marker>
  );
}

const ChangeMapView = ({ coords }) => {
  const { zoom } = useContext(LocationContext);

  const map = useMap();
  useEffect(() => {
    map.setView(coords, zoom);
  }, [coords, map]);
  return null;
};

const Map = () => {
  const [railRoads, setRailroads] = useState(false);
  let railRoadsCheckbox = useRef();

  const railRoadHandler = (e) => {
    setRailroads(railRoadsCheckbox.current.checked);
  };

  const contextData = useContext(LocationContext);
  const { map, setMap, zoom } = contextData;

  return (
    <>
      <div id="map" className="my-3 m-3 rounded-lg h-[50vh] overflow-hidden ">
        <MapContainer
          className="w-full h-[60vh] "
          center={[
            contextData.locationData.geometry.lat,
            contextData.locationData.geometry.lng,
          ]}
          zoom={zoom}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution={mapArray[map].attribution}
            url={mapArray[map].url}
          />
          {railRoads ? (
            <TileLayer
              attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Map style: &copy; <a href="https://www.OpenRailwayMap.org">OpenRailwayMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
              url="https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png"
            />
          ) : (
            <></>
          )}
          {/* <DraggableMarker /> */}
          <ChangeMapView
            coords={[
              contextData.locationData.geometry.lat,
              contextData.locationData.geometry.lng,
            ]}
          />
          <LocationMarker />
        </MapContainer>
        <p className="absolute z-[1600] top-[30%] left-[4vw] xl:left-[2vw] ">
          <input
            type="checkbox"
            ref={railRoadsCheckbox}
            onClick={railRoadHandler}
          />{" "}
          Railroads
        </p>
      </div>
    </>
  );
};

export default Map;
