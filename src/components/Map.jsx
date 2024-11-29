import React, { useContext, useEffect, useState } from "react";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import DraggableMarker from "./DraggableMarker";
import { useMap, useMapEvents } from "react-leaflet";
import { LocationContext } from "./context/locationContext";
import mapArray from "./Skins";


function LocationMarker() {
  
  const [position, setPosition] = useState(null);
  const { setLocationData,zoom ,setZoom} = useContext(LocationContext);

  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
      setZoom(map.getZoom());
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
  const { zoom } = useContext(LocationContext);
  console.log(zoom);
  
  const map = useMap();
  useEffect(() => {
    
    map.setView(coords, zoom);
  }, [coords, map]);
  return null;
};

const Map = () => {
  const contextData = useContext(LocationContext);
  const { map, setMap,zoom } = contextData;
  
  return (
    <>
      <div id="map" className="my-3 w-full h-[40vh] overflow-hidden ">
        <MapContainer
          className="w-full h-[60vh]"
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
          {/* <DraggableMarker /> */}
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
