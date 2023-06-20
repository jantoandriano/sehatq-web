import React, { useEffect, useState } from "react";
import { Box, IconButton } from "@sehatq/components";

export type Location = {
  lat: number;
  lng: number;
};

type MapsProps = {
  id?: string;
  location: Location;
  width?: string;
  height?: string;
  markerIconUrl?: string;
  draggable?: boolean;
  zoomable?: boolean;
  defaultZoom?: number;
  onDragEnd?: (e: google.maps.GeocoderResult) => void;
  onZoomChange?: (e: google.maps.GeocoderResult) => void;
  onCurrentLocationClick?: () => void;
  hideCurrentLocation?: boolean;
};

export function getAddressByLatLng(
  location: Location,
  callback: (e: google.maps.GeocoderResult) => void
) {
  if (typeof google !== "undefined") {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location }, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK && results?.[0]) {
        callback(results[0]);
      }
    });
  }
}

export default function Maps({
  id = "map",
  location,
  width = "100%",
  height = "50vh",
  markerIconUrl,
  draggable,
  defaultZoom = 17,
  zoomable,
  onDragEnd,
  onZoomChange,
  onCurrentLocationClick,
  hideCurrentLocation,
}: MapsProps) {
  const { lat, lng } = location;
  const [map, setMap] = useState<google.maps.Map>();

  const initMap = () => {
    if (typeof google !== "undefined") {
      if (!map) {
        const mapElement = document.getElementById(id) as HTMLElement;
        const _map = new google.maps.Map(mapElement, {
          center: { lat, lng },
          zoom: defaultZoom,
          draggable: !!draggable,
          maxZoom: !zoomable ? defaultZoom : null,
          minZoom: !zoomable ? defaultZoom : null,
          gestureHandling: "greedy",
          disableDefaultUI: true,
        });
        setMap(_map);
      } else {
        google.maps.event.addListener(map, "dragend", () => {
          const pos = map.getCenter();
          getAddressByLatLng(
            { lat: pos?.lat() || 0, lng: pos?.lng() || 0 },
            (e) => onDragEnd?.(e)
          );
        });
        google.maps.event.addListener(map, "zoom_changed", () => {
          const pos = map.getCenter();
          getAddressByLatLng(
            { lat: pos?.lat() || 0, lng: pos?.lng() || 0 },
            (e) => onZoomChange?.(e)
          );
        });
      }
    }
  };

  useEffect(() => {
    initMap();
  }, [map]);

  useEffect(() => {
    if (map) {
      map.setCenter(location);
    }
  }, [location]);

  const renderCenterMarker = () => {
    const markerIcon = markerIconUrl
      ? markerIconUrl
      : "/images/location-marker.svg";
    return (
      <Box
        background={`url(${markerIcon}) no-repeat center;`}
        position="absolute"
        backgroundSize="contain"
        top="50%"
        left="50%"
        zIndex="1"
        marginLeft="-20px"
        marginTop="-40px"
        height="40px"
        width="40px"
      />
    );
  };

  const renderCurrentLocationButton = () => (
    <IconButton
      variant="unstyled"
      size="md"
      aria-label="location-shape"
      position="absolute"
      bottom="16px"
      right="16px"
      background="#fff"
      boxShadow="0 8px 16px #dadada"
      onClick={onCurrentLocationClick}
      icon={<Box m="auto" as="img" src="/images/location-shape.svg" />}
    />
  );

  return (
    <Box position="relative">
      <div className="map-area" id={id} style={{ width, height }} />
      {renderCenterMarker()}
      {!hideCurrentLocation && renderCurrentLocationButton()}
    </Box>
  );
}
