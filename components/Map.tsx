'use client';

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

import L from "leaflet";

const customIcon = typeof window !== "undefined" ? new L.Icon({
  iconUrl: "/images/icon-location.svg",
  iconSize: [35, 45],
  iconAnchor: [15, 50],
  popupAnchor: [0, -50],
}) : null;

export default function Map() {
  const position: [number, number] = [-7.9771308, 112.6340263888889];

  return <>
    <MapContainer
      center={position}
      zoom={12}
      scrollWheelZoom={true}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {customIcon && (
        <Marker position={position} icon={customIcon}>
          <Popup>
            Halo! Koordinat terdeteksi di Malang. <br /> Peta berhasil dimuat.
          </Popup>
        </Marker>
      )}
    </MapContainer>
  </>;
}