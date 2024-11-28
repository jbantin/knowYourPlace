import React, { useContext, useEffect, useState } from "react";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import DraggableMarker from "./DraggableMarker";
import { useMap, useMapEvents } from "react-leaflet";
import { LocationContext } from "./context/locationContext";
import mapArray from "./Skins";
import buttonImg from "../assets/button.svg";

function LocationMarker() {
  console.log(mapArray);
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
  const [map, setMap] = useState(0);
  const [dropDown, setDropDown] = useState(false);
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
            attribution={mapArray[map].attribution}
            url={mapArray[map].url}
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
        <button
          className="absolute z-[1000] top-[144px] right-[30px]  p-1 rounded-lg w-[42px] drop-shadow-xl hover:hue-rotate-180 hover:rotate-180"
          onClick={() => setDropDown(!dropDown)}
        >
          <img src={buttonImg} alt="" />
        </button>
        {dropDown ? (
          <div className="absolute z-[1000] top-[190px] right-[30px] flex flex-col ">
            {mapArray.map((map, i) => (
              <button
                key={i}
                onClick={() => {
                  setMap(i);
                  setDropDown(false);
                }}
                className="bg-slate-500 p-1 mb-2 rounded-lg dark:text-white"
              >
                {map.name}
              </button>
            ))}
          </div>
        ) : (
          <p></p>
        )}
      </div>
    </>
  );
};

export default Map;
