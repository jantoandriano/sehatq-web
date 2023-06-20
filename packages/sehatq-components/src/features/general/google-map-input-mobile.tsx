import React, { useEffect, useRef } from "react";
import {
  Box,
  Text,
  Button,
  Flex,
  VStack,
  Skeleton,
  Center,
  MapMarkerIcon,
  Alert,
} from "../../user-interfaces";
import {
  defaultLatLong,
  GoogleMapInputGeneralProps,
} from "./google-map-input-desktop";
import { GooglePlaceSuggestion } from "./google-place-suggestion";

export function GoogleMapInputMobile(props: GoogleMapInputGeneralProps) {
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
      <GooglePlaceSuggestion
        onSelectPlace={props.onSelectAddresss}
        onClickCurrentLocation={props.onClickCurrentLocation}
        isMobile
      />
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
          p={2}
          textAlign="center"
        >
          Pastikan lokasi yang kamu tandai di peta sesuai dengan alamat yang
          kamu isi
        </Box>
        <Box
          zIndex="base"
          width="full"
          height="328px"
          ref={ref}
          id="map"
          borderBottomRadius="xl"
        />
        <Center
          position="absolute"
          top="calc(50% - 10px)"
          left="calc(50% - 18px)"
          zIndex="docked"
        >
          <MapMarkerIcon boxSize={37} />
        </Center>
      </Flex>
      {props.loadingPlace ? (
        <>
          <Skeleton width="197px" height="19px" />
          <Skeleton width="full" height="19px" />
          <Skeleton width="220px" height="19px" />
          <Skeleton width="full" height="50px" borderRadius="base" />
        </>
      ) : props.place ? (
        <>
          <Text
            pt={4}
            fontSize="md"
            fontFamily="poppins"
            fontWeight="semibold"
            color="charcoalGrey"
          >
            {props.place.address}
          </Text>
          <Text fontSize="sm" color="charcoalGrey">
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
      {props.errorMessage ? (
        <Alert
          position="absolute"
          status="error"
          borderRadius="base"
          background="#fbe5e8"
          border="1px solid"
          borderColor="#d9001b"
          bottom="50px"
        >
          <Text
            fontSize="xs"
            color="charcoalGrey"
            textAlign="center"
            width="full"
          >
            {props.errorMessage}
          </Text>
        </Alert>
      ) : null}
    </VStack>
  );
}

export function GoogleMapInputMobileSkeleton() {
  return (
    <VStack width="full" align="start" position="relative" spacing={3}>
      <Skeleton width="full" height="40px" borderRadius="xl" />
      <Skeleton width="full" height="40px" borderRadius="xl" />
      <Skeleton width="full" height="381px" borderRadius="xl" />
      <Skeleton width="197px" height="19px" />
      <Skeleton width="full" height="19px" />
      <Skeleton width="220px" height="19px" />
      <Skeleton width="full" height="50px" borderRadius="base" />
    </VStack>
  );
}
