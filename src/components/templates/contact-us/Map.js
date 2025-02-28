"use client";

import dynamic from "next/dynamic";
import { Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css"; 
import L from "leaflet"; 
import markerIconPng from "leaflet/dist/images/marker-icon.png"; 
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";
import styles from "./Map.module.css";
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  {
    ssr: false,
  }
);

// ✅ Define the custom marker icon
const customIcon = new L.Icon({
  iconUrl: markerIconPng.src,
  shadowUrl: markerShadowPng.src,
  iconSize: [25, 41], 
  iconAnchor: [12, 41], 
  popupAnchor: [1, -34], 
});

const Map = ({
  position = [41.3851, 2.1734],
  center = [41.3851, 2.1734],
  children,
}) => (
  <div className={styles.container}>
    <MapContainer
      center={center}
      zoom={15}
      style={{ height: "300px", width: "100%", borderRadius: "10px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={customIcon}>
        <Popup>Barcelona, Spain 🌍</Popup>
      </Marker>
    </MapContainer>
    <div className={styles.details}>{children}</div>
  </div>
);

export default Map;
