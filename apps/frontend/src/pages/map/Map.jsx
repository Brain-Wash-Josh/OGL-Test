import React from "react";
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, useMap, Popup, Marker } from 'react-leaflet'
import { iconPerson } from './icon.js';

export default function Map({positions}) {

  function renderMarkers() {

    return positions.map((pos, idx) => (
      <Marker key={idx} position={[pos.lat, pos.lng]} icon={iconPerson}>
        <Popup>
          {pos.name} <br /> {pos.details}
        </Popup>
      </Marker>
    ));
  }


  return (
   <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
        {renderMarkers()}
  </MapContainer>

  );
}