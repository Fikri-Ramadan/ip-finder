'use client';

import { MapContainer, Marker, Popup, TileLayer, useMap, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

import L from "leaflet";
import { useEffect, useRef } from "react";
import { useIpDetails } from "@/stores/IpDetailsStore";
import useIpData from "@/hooks/useIpData";

const customIcon = typeof window !== "undefined" ? new L.Icon({
  iconUrl: "/images/icon-location.svg",
  iconSize: [35, 45],
  iconAnchor: [17, 50],
  popupAnchor: [0, -50],
}) : null;

const MOBILE_BREAKPOINT = 768;
const TARGET_ZOOM = 12;

function MapFlyController({
  lat,
  lng,
  markerRef,
}: {
  lat: number;
  lng: number;
  markerRef: React.RefObject<L.Marker | null>;
}) {
  const map = useMap();
  const isFirstLoad = useRef(true);

  useEffect(() => {
    const isMobile = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`).matches;
    const offsetY = isMobile ? 110 : 70;

    const projected = map.project([lat, lng], TARGET_ZOOM).subtract([0, offsetY]);
    const target = map.unproject(projected, TARGET_ZOOM);

    const openPopup = () => markerRef.current?.openPopup();

    if (isFirstLoad.current) {
      map.setView(target, TARGET_ZOOM, { animate: false });
      isFirstLoad.current = false;
      openPopup();
    } else {
      map.closePopup();
      map.once("moveend", openPopup);
      map.flyTo(target, TARGET_ZOOM, { duration: 1.5 });
    }

    return () => {
      map.off("moveend", openPopup);
    };
  }, [lat, lng, map, markerRef]);

  return null;
}

export default function Map() {
  const details = useIpDetails(state => state.details);
  const { isValidating } = useIpData();
  const markerRef = useRef<L.Marker | null>(null);

  const lat = details?.latitude;
  const lng = details?.longitude;

  if (lat == null || lng == null) {
    return <div className="flex-1 z-0 w-full h-[500px] bg-gray-950/30 animate-pulse" />;
  }

  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={[lat, lng]}
        zoom={TARGET_ZOOM}
        zoomControl={false}
        scrollWheelZoom={true}
        className="z-0"
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | IP data by <a href="https://ipwhois.io" target="_blank" rel="noopener noreferrer">IPWhoIs</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {customIcon && (
          <>
            <Marker position={[lat, lng]} icon={customIcon} ref={markerRef}>
              <Popup>
                <strong>{details?.ip}</strong>
                <br />
                {details?.city}, {details?.region}
              </Popup>
            </Marker>
            <MapFlyController lat={lat} lng={lng} markerRef={markerRef} />
            <ZoomControl position="bottomright" />
          </>
        )}
      </MapContainer>

      {isValidating && (
        <div className="absolute inset-0 z-[500] bg-gray-950/30 animate-pulse pointer-events-none" />
      )}
    </div>
  );
}
