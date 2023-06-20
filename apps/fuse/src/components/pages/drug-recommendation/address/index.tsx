import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { useDebounce } from "use-debounce";
import {
  Box,
  Button,
  Flex,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  SearchIcon,
  CloseIcon,
  IconButton,
  List,
  ListItem,
  useDisclosure,
  Modal,
  ModalContent,
  ModalBody,
  Collapse,
} from "@sehatq/components";
import {
  useAddresses,
  useAddress,
  Address as AddressResponse,
} from "@queries/address/address-queries";
import Header from "./header";
import FormAddress from "./form-address";
import Maps, { Location, getAddressByLatLng } from "./maps";
const defaultLocation = { lat: -6.1753924, lng: 106.8271528 };

type AddressProps = {
  referrer: "claim" | "drug-prescription";
  googlePlaceId: string;
  backToCart: () => void;
};

export function Address(props: AddressProps) {
  const { referrer, googlePlaceId, backToCart } = props;
  const router = useRouter();
  const formAddressModal = useDisclosure();
  const [currentLocation, setCurrentLocation] =
    useState<Location>(defaultLocation);
  const [isOpenInputSearch, setIsOpenInputSearch] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [placeId, setPlaceId] = useState<string>("");
  const [searchDebounced] = useDebounce(searchValue, 500);
  const [selectedAddress, setSelectedAddress] =
    useState<AddressResponse["data"]>();
  const location: Location = {
    lat: selectedAddress?.latitude || currentLocation.lat,
    lng: selectedAddress?.longitude || currentLocation.lng,
  };

  const addresses = useAddresses(
    { search: searchDebounced },
    { enabled: !!searchDebounced }
  );
  const addressesData = addresses?.data?.data;

  const address = useAddress({ placeId }, { enabled: !!placeId });
  const addressData = address?.data?.data;
  const addresssIsFetched = address.isFetched;

  useEffect(() => {
    if (addresssIsFetched && addressData) {
      setSelectedAddress(addressData);
    }
  }, [addressData, addresssIsFetched]);

  const handleCenterChange = (e: google.maps.GeocoderResult) => {
    setSelectedAddress({
      address: e.formatted_address.split(",")[0],
      description: e.formatted_address,
      latitude: e.geometry.location.lat(),
      longitude: e.geometry.location.lng(),
      placeId: e.place_id,
    });
    setPlaceId(e.place_id);
  };

  const getCurrentAddress = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (e) => {
          const pos = {
            lat: e.coords.latitude,
            lng: e.coords.longitude,
          };
          setCurrentLocation(pos);
          getAddressByLatLng(pos, handleCenterChange);
        },
        () => getAddressByLatLng(defaultLocation, handleCenterChange),
        {
          enableHighAccuracy: true,
          timeout: 2000,
          maximumAge: 0,
        }
      );
    } else {
      getAddressByLatLng(defaultLocation, handleCenterChange);
    }
  }, []);

  useEffect(() => {
    if (router.isReady) {
      if (router.query.placeId) {
        setPlaceId(router.query.placeId as string);
      } else if (googlePlaceId) {
        setPlaceId(googlePlaceId);
      } else {
        getCurrentAddress();
      }
    }
  }, [getCurrentAddress, googlePlaceId, router.isReady, router.query.placeId]);

  useEffect(() => {
    setIsOpenInputSearch(!!searchDebounced);
  }, [searchDebounced]);

  const renderInputSearch = () => (
    <Box p="12px 16px" position="absolute" top={0} width="100%" zIndex={2}>
      <InputGroup background="white" borderRadius="xl" boxShadow="lg">
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="sea.500" />
        </InputLeftElement>
        <Input
          px={10}
          value={searchValue}
          placeholder="Cari Alamat"
          fontSize="xs"
          autoComplete="off"
          focusBorderColor="sea.500"
          borderColor="gray.500"
          onChange={(e) => setSearchValue(e.target.value)}
          _placeholder={{ color: "brownGrey.500", fontSize: "xs" }}
        />
        <InputRightElement pointerEvents="stroke">
          <IconButton
            isLoading={addresses.isLoading}
            variant="unstyled"
            display={searchValue ? "block" : "none"}
            aria-label="clear"
            onClick={() => setSearchValue("")}
            icon={<CloseIcon w="3" h="3" color="gray" />}
          />
        </InputRightElement>
      </InputGroup>
      <Collapse in={isOpenInputSearch} animateOpacity>
        <List
          background="#fff"
          p={addressesData?.length ? 3 : 0}
          spacing={2}
          borderRadius="md"
          mt={1}
        >
          {(addressesData || []).map((e) => (
            <ListItem
              cursor="pointer"
              fontSize="xs"
              key={e.placeId}
              onClick={() => {
                setPlaceId(e.placeId);
                setIsOpenInputSearch(false);
              }}
            >
              {e.description}
            </ListItem>
          ))}
        </List>
      </Collapse>
    </Box>
  );

  const renderSelectedAddress = () => (
    <Box p="23px 20px">
      <Text fontWeight="semibold" color="sea.500" fontSize="sm">
        Alamat
      </Text>
      <Text
        mt="6px"
        mb="3px"
        fontFamily="poppins"
        fontSize="sm"
        fontWeight="semibold"
      >
        {selectedAddress?.address}
      </Text>
      <Text fontSize="xs" fontWeight="light">
        {selectedAddress?.description}
      </Text>
    </Box>
  );

  return (
    <Flex direction="column" justifyContent="space-between" height="100vh">
      <Box>
        <Header
          title="Cari Lokasi"
          {...(referrer === "claim" && { onClickBack: backToCart })}
        />
        <Box position="relative">
          {renderInputSearch()}
          <Maps
            id="pinpoinMap"
            draggable
            zoomable
            height="60vh"
            location={location}
            onDragEnd={handleCenterChange}
            onZoomChange={handleCenterChange}
            onCurrentLocationClick={getCurrentAddress}
          />
        </Box>
        {renderSelectedAddress()}
      </Box>
      <Box padding="20px 16px">
        <Button onClick={formAddressModal.onOpen} isFullWidth>
          Gunakan Alamat Ini
        </Button>
      </Box>
      <Modal
        onClose={formAddressModal.onClose}
        size="full"
        isOpen={formAddressModal.isOpen}
      >
        <ModalContent>
          <ModalBody p="0">
            {selectedAddress && (
              <FormAddress
                onClickBack={formAddressModal.onClose}
                selectedAddress={selectedAddress}
                referrer={referrer}
                backToCart={backToCart}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
