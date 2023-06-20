import React from "react";
import {
  Badge,
  BasicLocationIconActive,
  BasicLocationIconInActive,
  Button,
  ChangeIcon,
  Divider,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  SkeletonText,
  Text,
  TrashIcon,
  VStack,
} from "../../user-interfaces";

export type AddressCardGeneralProps = {
  id: string;
  receiverName: string;
  label: string;
  address: string;
  phone: string;
  note?: string;
  isDefault: boolean;
  googlePlaceId: string | null | undefined;
  isSelected: boolean;
  onEditAddress?: (value: string) => void;
  onSelect?: (value: string) => void;
};

export type AddressCardDesktopProps = AddressCardGeneralProps & {
  onDelete: () => void;
  onOkConfirmation: (value: string) => void;
  showConfirmation: boolean;
};

export function AddressCardDesktop(props: AddressCardDesktopProps) {
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
            <Text color="charcoalGrey" fontSize="sm" fontWeight="semibold">
              {props.label}
            </Text>
            {props.isDefault ? (
              <Badge
                variant="solid"
                colorScheme="main"
                textTransform="capitalize"
                fontSize="xxs"
                px={2}
              >
                Alamat Utama
              </Badge>
            ) : null}
          </HStack>
          <HStack>
            {props.isDefault ? null : (
              <TrashIcon
                onClick={props.onDelete}
                cursor="pointer"
                boxSize="24px"
              />
            )}
            {props.onEditAddress ? (
              <ChangeIcon
                boxSize="24px"
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
            fontSize="sm"
            fontWeight="semibold"
            fontFamily="poppins"
          >
            {props.receiverName}
          </Text>
          <Text color="charcoalGrey" fontSize="sm">
            {props.address}
          </Text>
          <Text color="charcoalGrey" fontSize="sm" fontWeight="semibold">
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
            <Flex direction="row" justify="space-between">
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
      <Modal isOpen={props.showConfirmation} onClose={props.onDelete} size="xs">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="md"></ModalHeader>
          <ModalCloseButton border="none" color="main.500" size="md" />
          <ModalBody p={6} as="form">
            <Text
              textAlign="center"
              width="full"
              fontSize="md"
              fontWeight="semibold"
            >
              Hapus alamat dari daftar ?
            </Text>
            <HStack width="full" justify="space-between" mt={9}>
              <Button
                width="full"
                variant="outline"
                colorScheme="main"
                onClick={props.onDelete}
              >
                Tidak
              </Button>
              <Button
                width="full"
                variant="solid"
                colorScheme="main"
                onClick={() => props.onOkConfirmation(props.id)}
              >
                Ya
              </Button>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export function AddressCardDesktopSkeleton() {
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
      <HStack p={5} justify="space-between" width="full">
        <Skeleton width="137px" height="24px" />
        <Skeleton width="50px" height="24px" />
      </HStack>
      <Flex direction="column" p={5} width="full">
        <Skeleton width="94px" height="20px" mb={2} />
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
            <Skeleton width="186px" height="20px" />
            <Skeleton width="89px" height="20px" />
          </Flex>
        </Flex>
      </Flex>
    </VStack>
  );
}
