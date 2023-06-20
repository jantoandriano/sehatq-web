import React from "react";
import {
  Badge,
  BasicLocationIconActive,
  BasicLocationIconInActive,
  Button,
  ChangeIcon,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  Skeleton,
  SkeletonText,
  Text,
  TrashIcon,
  VStack,
} from "../../user-interfaces";
import { AddressCardGeneralProps } from "./address-card-desktop";

export type AddressCardMobileProps = AddressCardGeneralProps & {
  onDelete: () => void;
  onOkConfirmation: (value: string) => void;
  showConfirmation: boolean;
};

export function AddressCardMobile(props: AddressCardMobileProps) {
  return (
    <>
      <VStack
        width="full"
        spacing={0}
        background={props.isSelected ? "iceBlue.500" : "white"}
        border="1px solid"
        borderColor={props.isSelected ? "main.500" : "veryLightPink"}
        borderRadius="xl"
        align="start"
        divider={<Divider border="0.5px solid" borderColor="veryLightPink" />}
      >
        <Flex p={4} direction="row" justify="space-between" width="full">
          <HStack>
            <Text color="charcoalGrey" fontSize="xs" fontWeight="semibold">
              {props.label}
            </Text>
            {props.isDefault ? (
              <Badge
                variant="solid"
                colorScheme="main"
                textTransform="capitalize"
                fontSize="9px"
                px={2}
              >
                Alamat Utama
              </Badge>
            ) : null}
          </HStack>
          <HStack>
            {props.isDefault ? null : (
              <TrashIcon
                boxSize="18px"
                onClick={props.onDelete}
                cursor="pointer"
              />
            )}
            {props.onEditAddress ? (
              <ChangeIcon
                boxSize="18px"
                onClick={() =>
                  props.onEditAddress
                    ? props.onEditAddress(props.id)
                    : undefined
                }
                cursor="pointer"
              />
            ) : null}
          </HStack>
        </Flex>
        <Flex
          direction="column"
          p={4}
          width="full"
          onClick={() =>
            props.onSelect ? props.onSelect(props.id) : undefined
          }
          cursor={props.onSelect ? "pointer" : undefined}
        >
          <Text
            color="charcoalGrey"
            fontSize="xs"
            fontWeight="semibold"
            fontFamily="poppins"
          >
            {props.receiverName}
          </Text>
          <Text color="charcoalGrey" fontSize="xs">
            {props.address}
          </Text>
          <Text color="charcoalGrey" fontSize="xs" fontWeight="semibold">
            {props.phone}
          </Text>
          <Flex
            mt={3}
            direction="column"
            background={props.isSelected ? "paleBlue.500" : "gray.500"}
            borderRadius="base"
            py={3}
            px={4}
          >
            {props.note ? (
              <Text fontSize="xs" color="brownGrey.500">
                Catatan:
              </Text>
            ) : null}
            <Flex direction="column" justify="space-between">
              {props.note ? (
                <Text fontSize="xs" color="charcoalGrey">
                  {props.note}
                </Text>
              ) : null}
              <Text
                color={props.googlePlaceId ? "sea.500" : "brownGrey.500"}
                fontSize="xs"
                fontWeight="semibold"
              >
                {props.googlePlaceId ? (
                  <BasicLocationIconActive width="16px" height="20px" />
                ) : (
                  <BasicLocationIconInActive width="16px" height="20px" />
                )}{" "}
                {props.googlePlaceId ? "Sudah Pinpoint" : "Belum Pinpoint"}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </VStack>
      <Drawer
        placement="bottom"
        onClose={props.onDelete}
        isOpen={props.showConfirmation}
      >
        <DrawerOverlay zIndex="modal" />
        <DrawerContent zIndex="popover" borderTopRadius="lg">
          <DrawerBody p={6}>
            <VStack width="full" spacing={2}>
              <Text
                textAlign="center"
                width="full"
                fontSize="sm"
                fontWeight="semibold"
                pb={6}
              >
                Hapus Alamat dari Daftar ?
              </Text>
              <Button
                width="full"
                variant="solid"
                colorScheme="main"
                onClick={() => props.onOkConfirmation(props.id)}
              >
                Hapus
              </Button>
              <Button
                width="full"
                variant="ghost"
                colorScheme="sea"
                onClick={props.onDelete}
              >
                Batal
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export function AddressCardMobileSkeleton() {
  return (
    <VStack
      width="full"
      spacing={0}
      background="white"
      border="1px solid"
      borderColor="veryLightPink"
      borderRadius="xl"
      align="start"
      divider={<Divider border="0.5px solid" borderColor="veryLightPink" />}
    >
      <HStack px={5} py={4} justify="space-between" width="full">
        <Skeleton width="137px" height="21px" />
        <Skeleton width="50px" height="21px" />
      </HStack>
      <Flex direction="column" p={5} width="full">
        <Skeleton width="94px" height="17px" mb={2} />
        <SkeletonText
          width="full"
          height="61px"
          noOfLines={3}
          skeletonHeight={4}
        />
        <Flex
          mt={5}
          direction="column"
          background="gray.500"
          borderRadius="base"
          py={3}
          px={4}
        >
          <Text fontSize="xs" color="brownGrey.500">
            Catatan:
          </Text>
          <Flex direction="row" justify="space-between">
            <Skeleton width="186px" height="17px" />
            <Skeleton width="89px" height="17px" />
          </Flex>
        </Flex>
      </Flex>
    </VStack>
  );
}
