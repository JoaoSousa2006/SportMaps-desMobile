import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

function Map() {
  const position: [number, number] = [-23.6678, -46.4614];

  return (
    <MapContainer
      center={position}
      zoom={14}
      className="map"
    >

      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={position}>
        <Popup>
          Você está aqui!
        </Popup>
      </Marker>

    </MapContainer>
  );
}

export default Map;
