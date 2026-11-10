import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import type { Place } from "../types";

function MapLayoutFix() {
  const map = useMap();
  useEffect(() => {
    requestAnimationFrame(() => map.invalidateSize());
  }, [map]);
  return null;
}

function FlyToPlace({ place }: { place: Place | null }) {
  const map = useMap();
  useEffect(() => {
    if (place) map.flyTo([place.lat, place.lng], 15, { duration: 0.8 });
  }, [map, place]);
  return null;
}

export function MapView({
  selectedPlace,
  places,
  onOpenDetails,
}: {
  selectedPlace: Place | null;
  places: Place[];
  onOpenDetails: (place: Place) => void;
}) {
  const mapTilerKey = import.meta.env.VITE_MAPTILER_KEY;
  const tileUrl = mapTilerKey
    ? `https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${mapTilerKey}`
    : "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}";
  const tileAttribution = mapTilerKey
    ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a>'
    : 'Tiles &copy; <a href="https://www.esri.com/">Esri</a> | Sources: Esri, HERE, Garmin, USGS, Intermap, INCREMENT P, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri Korea, Esri (Thailand), NGCC, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>, and the GIS User Community';

  return (
    <MapContainer center={[-23.6677, -46.4615]} zoom={13} maxZoom={19} scrollWheelZoom className="map">
      <TileLayer
        attribution={tileAttribution}
        url={tileUrl}
        maxZoom={mapTilerKey ? 20 : 19}
      />
      <MapLayoutFix />
      <FlyToPlace place={selectedPlace} />
      {places.map((place) => (
        <Marker key={place.id} position={[place.lat, place.lng]} eventHandlers={{ click: () => onOpenDetails(place) }}>
          <Popup><strong>{place.name}</strong><br />{place.sport} · ⭐ {place.rating}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}