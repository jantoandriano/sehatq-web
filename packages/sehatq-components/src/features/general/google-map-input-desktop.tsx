import React, { useEffect, useRef } from "react";
import {
  Box,
  Button,
  Flex,
  VStack,
  Text,
  Skeleton,
  Center,
  MapMarkerIcon,
  Alert,
} from "../../user-interfaces";
import { PlaceDetail } from "./google-map-model";
import { GooglePlaceSuggestion } from "./google-place-suggestion";

export type GoogleMapInputGeneralProps = {
  center: google.maps.LatLngLiteral | undefined;
  zoom: number;
  map: google.maps.Map | undefined;
  setMap: (value: React.SetStateAction<google.maps.Map | undefined>) => void;
  place: PlaceDetail | undefined;
  onFinishDrag: (value: string) => void;
  loadingPlace: boolean;
  errorMessage: string | undefined;
  onSelectAddresss: (value: string) => void;
  onSubmit: () => void;
  onClickCurrentLocation: () => void;
  disableSubmit: boolean;
};

export const defaultLatLong = { lat: -6.1753924, lng: 106.8271528 };

export function GoogleMapInputDesktop(props: GoogleMapInputGeneralProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dtLatLng = props.place
      ? {
          lat: props.place?.latitude,
          lng: props.place?.longitude,
        }
      : undefined;

    if (ref.current && !props.map) {
      const newMap = new window.google.maps.Map(ref.current, {
        center: dtLatLng ? dtLatLng : props.center ?? defaultLatLong,
        zoom: props.zoom,
        mapTypeControl: false,
        zoomControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      });

      props.setMap(newMap);
    }

    if (props.map) {
      google.maps.event.clearListeners(props.map, "idle");
      props.map.addListener("idle", () => {
        const latlng = props.map?.getCenter()?.toJSON();
        const isNewCenter =
          latlng?.lat != dtLatLng?.lat || latlng?.lng != dtLatLng?.lng;

        if (isNewCenter) {
          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ location: latlng }).then(async (response) => {
            props.onFinishDrag(response.results[0]?.place_id ?? "");
          });
        }
      });
    }
  }, [ref, props]);

  return (
    <VStack width="full" align="start" position="relative" spacing={3}>
      {props.errorMessage ? (
        <Alert
          status="error"
          borderRadius="base"
          background="#fbe5e8"
          border="1px solid"
          borderColor="#d9001b"
        >
          <Text
            fontSize="sm"
            color="charcoalGrey"
            textAlign="center"
            width="full"
          >
            {props.errorMessage}
          </Text>
        </Alert>
      ) : null}
      <Flex
        width="full"
        direction="column"
        border="1px solid"
        borderColor="veryLightPink"
        borderRadius="xl"
        position="relative"
      >
        <Box
          borderTopRadius="xl"
          fontSize="xs"
          color="charcoalGrey"
          background="iceBlue.500"
          p={3}
          textAlign="center"
        >
          Pastikan lokasi yang kamu tandai di peta sesuai dengan alamat yang
          kamu isi
        </Box>
        <Box
          zIndex="base"
          width="full"
          height="400px"
          ref={ref}
          id="map"
          borderBottomRadius="xl"
        />
        <Center
          position="absolute"
          top="calc(50% - 14px)"
          left="calc(50% - 18px)"
          zIndex="docked"
        >
          <MapMarkerIcon boxSize={37} />
        </Center>
        <VStack width="full" p={3} zIndex="docked" position="absolute" top={9}>
          <GooglePlaceSuggestion
            onSelectPlace={props.onSelectAddresss}
            onClickCurrentLocation={props.onClickCurrentLocation}
          />
        </VStack>
      </Flex>
      {props.loadingPlace ? (
        <>
          <Skeleton width="30%" height="23px" />
          <Skeleton width="full" height="23px" />
          <Skeleton width="40%" height="23px" />
          <Skeleton width="full" height="50px" borderRadius="base" />
        </>
      ) : props.place ? (
        <>
          <Text
            pt={3}
            fontSize="md"
            fontFamily="poppins"
            fontWeight="semibold"
            color="charcoalGrey"
          >
            {props.place.address}
          </Text>
          <Text pb={3} fontSize="sm" color="charcoalGrey">
            {props.place.description}
          </Text>
          <Button
            width="full"
            fontSize="md"
            fontWeight="semibold"
            variant={props.disableSubmit ? "unstyled" : "solid"}
            boxShadow={
              !props.disableSubmit
                ? "0px 20px 10px -17px rgb(112 203 207)"
                : undefined
            }
            colorScheme="main"
            borderRadius="base"
            color="white"
            onClick={props.onSubmit}
            {...(props.disableSubmit
              ? {
                  disabled: true,
                  cursor: "not-allowed",
                  background: "veryLightPink",
                  _hover: {
                    background: "veryLightPink",
                  },
                }
              : null)}
          >
            Konfirmasi Alamat
          </Button>
        </>
      ) : null}
    </VStack>
  );
}

export function GoogleMapInputDesktopSkeleton() {
  return (
    <VStack width="full" align="start" position="relative" spacing={4}>
      <Skeleton width="full" height="438px" borderRadius="xl" />
      <VStack width="full" p={3} zIndex="docked" position="absolute" top={8}>
        <Skeleton width="full" height="40px" borderRadius="xl" boxShadow="lg" />
        <Skeleton width="full" height="40px" borderRadius="xl" />
      </VStack>
      <Skeleton width="30%" height="23px" />
      <Skeleton width="full" height="23px" />
      <Skeleton width="40%" height="23px" />
      <Skeleton width="full" height="50px" borderRadius="base" />
    </VStack>
  );
}
