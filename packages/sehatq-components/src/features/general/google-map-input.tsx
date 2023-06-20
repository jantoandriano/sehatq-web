import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { ENV } from "@sehatq/constants";
import React, { useEffect, useState } from "react";
import { Box } from "../../user-interfaces";
import { useGetMyLocation } from "../profile";
import {
  GoogleMapInputDesktop,
  GoogleMapInputDesktopSkeleton,
} from "./google-map-input-desktop";
import {
  GoogleMapInputMobile,
  GoogleMapInputMobileSkeleton,
} from "./google-map-input-mobile";
import { PlaceDetailCache, useGetPlaceDetail } from "./google-map-query";

export type GoogleMapInputProps = {
  isMobile?: boolean;
  placeId?: string;
  coverageArea?: string;
  onChange: (location: {
    placeId: string;
    latitude: number;
    longitude: number;
    subdistrict?: string;
    district?: string;
    city?: string;
    province?: string;
    zipCode?: string;
  }) => void;
};

function render(status: string, isMobile: boolean) {
  if (status == Status.FAILURE) return <Box></Box>;
  if (isMobile) return <GoogleMapInputMobileSkeleton />;
  return <GoogleMapInputDesktopSkeleton />;
}

function selectPlace(cache: PlaceDetailCache) {
  return cache.data;
}

const mapErrorMsg =
  "Aktifkan layanan lokasi, geser peta, atau tulis manual alamatmu";

export function GoogleMapInput(props: GoogleMapInputProps) {
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [placeId, setPlaceId] = useState(props.placeId ?? "");
  const { data: location, isLoading } = useGetMyLocation();

  const currentLocation = {
    lat: location?.lat,
    lng: location?.long,
  };

  const [map, setMap] = useState<google.maps.Map>();
  const [center, setCenter] = useState<google.maps.LatLngLiteral | undefined>();

  useEffect(() => {
    if (location && (!props.placeId || props.placeId != "")) {
      map?.setCenter({
        lat: Number(location?.lat),
        lng: Number(location?.long),
      });
    }
  }, [location, map, props.placeId]);

  let error = errorMessage;
  const { data: place, isLoading: loadingPlace } = useGetPlaceDetail(
    { placeId },
    {
      select: selectPlace,
      onSuccess(data) {
        map?.setCenter({ lat: data.latitude, lng: data.longitude });
        setCenter({ lat: data.latitude, lng: data.longitude });
        setErrorMessage("");
      },
      enabled: Boolean(placeId),
    }
  );

  function onSelectAddresss(value: string) {
    setPlaceId(value);
  }

  function onFinishDrag(value: string) {
    if (value) {
      setPlaceId(value);
    } else {
      setErrorMessage(mapErrorMsg);
    }
  }
  function onClickCurrentLocation() {
    map?.setCenter({
      lat: Number(currentLocation.lat),
      lng: Number(currentLocation.lng),
    });
  }

  function onSubmit() {
    if (placeId) {
      if (
        props.coverageArea &&
        place &&
        props.coverageArea != place?.subDistrict
      ) {
        setErrorMessage(
          "Pin lokasi (peta) dan alamat yang kamu isi tidak sesuai"
        );
      } else {
        const finalMap = map?.getCenter()?.toJSON();
        if (finalMap) {
          props.onChange({
            placeId,
            latitude: finalMap.lat,
            longitude: finalMap.lng,
            subdistrict: place?.subDistrict,
            district: place?.district,
            city: place?.city,
            province: place?.province,
            zipCode: place?.zipCode,
          });
        }
        if (map) {
          google.maps.event.clearListeners(map, "idle");
        }
      }
    } else {
      setErrorMessage(mapErrorMsg);
    }
  }

  if (isLoading) {
    if (props.isMobile) return <GoogleMapInputMobileSkeleton />;
    return <GoogleMapInputDesktopSkeleton />;
  }

  const disableSubmit = !currentLocation.lat && !placeId;
  if (disableSubmit) {
    error = mapErrorMsg;
  }

  const otherProps = {
    center,
    zoom: 17,
    map,
    setMap,
    place,
    onFinishDrag,
    loadingPlace,
    errorMessage: error,
    onSelectAddresss,
    onSubmit,
    onClickCurrentLocation,
    disableSubmit,
  };

  if (props.isMobile) {
    return (
      <Wrapper
        apiKey={ENV.GMAPS_API_KEY}
        render={(status: string) => render(status, !!props.isMobile)}
      >
        <GoogleMapInputMobile {...otherProps} />
      </Wrapper>
    );
  }

  return (
    <Wrapper
      apiKey={ENV.GMAPS_API_KEY}
      render={(status: string) => render(status, !!props.isMobile)}
    >
      <GoogleMapInputDesktop {...otherProps} />
    </Wrapper>
  );
}
