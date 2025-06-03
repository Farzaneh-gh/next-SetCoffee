"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import styles from "./Map.module.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

// 📦 Lazy load react-leaflet components to avoid SSR
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

const Map = ({
  position = [41.3851, 2.1734],
  center = [41.3851, 2.1734],
  children,
}) => {
  const [L, setL] = useState(null);
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    // ✅ Only run on client
    const leaflet = require("leaflet");
    const customIcon = new leaflet.Icon({
      iconUrl: markerIconPng.src,
      shadowUrl: markerShadowPng.src,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });
    setL(leaflet);
    setIcon(customIcon);
  }, []);

  if (!L || !icon) return null; // Don't render until Leaflet is loaded

  return (
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
      

        <Marker position={position} icon={icon}>
          <Popup>Barcelona, Spain 🌍</Popup>
        </Marker>
      </MapContainer>
      <div className={styles.details}>{children}</div>
    </div>
  );
};

export default Map;
