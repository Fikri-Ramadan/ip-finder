'use client';

import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

import L from "leaflet";
import { useIpDetails } from "@/stores/IpDetailsStore";
import useIpData from "@/hooks/useIpData";
import { useEffect } from "react";

const customIcon = typeof window !== "undefined" ? new L.Icon({
  iconUrl: "/images/icon-location.svg",
  iconSize: [35, 45],
  iconAnchor: [15, 50],
  popupAnchor: [0, -50],
}) : null;

function MapOffsetController({ markerPosition }: { markerPosition: [number, number]; }) {
  const map = useMap();

  useEffect(() => {
    if (markerPosition) {
      map.setView(markerPosition, map.getZoom());
      map.panBy([0, -50],);
    }
  }, [markerPosition, map]);

  return null;
}

export default function Map() {
  const details = useIpDetails(state => state.details);
  const { isValidating } = useIpData();
  const position: [number, number] = [details?.latitude ?? 0, details?.longitude ?? 0];

  if (isValidating) {
    return <div className="flex-1 z-0 w-full h-[500px] bg-gray-950/30 animate-pulse" />;
  }

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
        <>
          <Marker position={[details?.latitude ?? 0, details?.longitude ?? 0]} icon={customIcon}>
            <Popup>
              Halo! Koordinat terdeteksi di {details?.city}. <br /> Peta berhasil dimuat.
            </Popup>
          </Marker>
          <MapOffsetController markerPosition={position} />
        </>
      )}
    </MapContainer>
  </>;
}