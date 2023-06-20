import React from "react";
import {
  Button,
  ChevronDownIcon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Skeleton,
  useImage,
  Text,
  Box,
  HStack,
  Badge,
  Flex,
  AddIcon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  CloseIcon,
  Divider,
} from "../../user-interfaces";
import { FamilyForm } from "../profile/family-form";

type FamilyOption = {
  userId: number;
  name: string;
  photoUrl: string;
  age: number;
  relation: string;
  height: number;
  weight: number;
  birthDate: Date | undefined;
  phone: string | null;
  address: string | null;
  identityNumber: string | null;
  gender: "m" | "f" | "";
  uuid: string;
};

export type FamilyInputDesktopProps = {
  value?: FamilyOption;
  options: FamilyOption[];
  onChange: (selectedData: FamilyOption | undefined) => void;
  isError?: boolean;
  labelButton: string;
  hasGuest: boolean;
  creatable: boolean;
  title: string;
  isOpenFamilyForm: boolean;
  onCloseFamilyForm: () => void;
  onOpenFamilyForm: () => void;
};

export function FamilyInputDesktop(props: FamilyInputDesktopProps) {
  const Image = useImage();

  function ItemGuest() {
    return (
      <React.Fragment>
        <MenuItem
          color={!props.value ? "sea.500" : "charcoalGrey"}
          fontSize="md"
          align="center"
          px={6}
          py={3}
          justifyContent="space-between"
          onClick={() => {
            if (props.onChange) {
              props.onChange(undefined);
            }
          }}
        >
          <HStack spacing={3}>
            <Box>
              <Text
                fontSize="lg"
                color="charcoalGrey"
                fontFamily="poppins"
                fontWeight="semibold"
              >
                Masuk sebagai Guest
              </Text>
              <HStack>
                <Text fontSize="sm" color="brownGrey.500">
                  Tanpa simpan profil
                </Text>
              </HStack>
            </Box>
          </HStack>
          <Badge
            variant={!props.value ? "solid" : "outline"}
            colorScheme="sea"
            width="86px"
            height="26px"
            border="1px solid"
            borderColor="sea.500"
            fontSize="md"
            textTransform="capitalize"
            borderRadius="base"
            textAlign="center"
            pb={6}
          >
            {!props.value ? "Dipilih" : "Pilih"}
          </Badge>
        </MenuItem>
      </React.Fragment>
    );
  }
  return (
    <>
      <Flex justifyContent="space-between" alignItems="center" w="full">
        {props.value ? (
          <Flex alignItems="center">
            <Image
              alt={props.value.name}
              src={props.value.photoUrl}
              layout="fill"
              objectFit="cover"
              wrapperProps={{
                boxSize: "60px",
                position: "relative",
                borderRadius: "full",
                overflow: "hidden",
                marginRight: 3,
              }}
            />
            <Box data-testid="family-input-value">
              <Text fontFamily="poppins" fontWeight="semibold" fontSize="xl">
                {props.value.name}
              </Text>
              <HStack>
                <Text color="brownGrey.500" fontSize="sm">
                  {props.value.relation}
                </Text>
                <Text color="sea.500" fontSize="sm">
                  {props.value.age} Tahun
                </Text>
              </HStack>
            </Box>
          </Flex>
        ) : (
          <Box data-testid="family-input-value">
            <Text fontFamily="poppins" fontWeight="semibold" fontSize="xl">
              Masuk sebagai Guest
            </Text>
            <HStack>
              <Text color="brownGrey.500" fontSize="sm">
                Tanpa simpan profil
              </Text>
            </HStack>
          </Box>
        )}
        <Menu>
          <MenuButton
            as={Button}
            variant="outline"
            colorScheme="sea"
            borderRadius="base"
            size="sm"
            rightIcon={
              <ChevronDownIcon color={props.isError ? "red.500" : "sea.500"} />
            }
            borderColor={props.isError ? "red.500" : "sea.500"}
            color={props.isError ? "red.500" : "sea.500"}
          >
            {props.labelButton}
          </MenuButton>
          <MenuList
            height="auto"
            overflow="auto"
            maxHeight="300px"
            width="466px"
            zIndex="modal"
          >
            {props.hasGuest && (
              <MenuItem
                align="center"
                px={6}
                py={1}
                justifyContent="space-between"
              >
                <Text fontFamily="poppins" fontSize="lg" fontWeight="semibold">
                  {props.title}
                </Text>
                {props.creatable && (
                  <Flex
                    alignItems="center"
                    bg="#f0f9fa"
                    h="30px"
                    w="160px"
                    borderRadius="8px"
                    justifyContent="space-evenly"
                    onClick={props.onOpenFamilyForm}
                  >
                    <AddIcon fontSize="xs" color="#2b8e8e" />
                    <Text fontSize="sm" fontWeight="semibold" color="#2b8e8e">
                      Tambah Keluarga
                    </Text>
                  </Flex>
                )}
              </MenuItem>
            )}

            {props.options.map((option, index) => {
              const isSelected = props.value?.userId == option.userId;
              return (
                <React.Fragment key={option.userId}>
                  <MenuItem
                    color={isSelected ? "sea.500" : "charcoalGrey"}
                    fontSize="md"
                    onClick={() => {
                      if (props.onChange) {
                        props.onChange(option);
                      }
                    }}
                    align="center"
                    px={6}
                    py={3}
                    justifyContent="space-between"
                  >
                    <HStack spacing={3}>
                      <Image
                        alt={option.name}
                        src={option.photoUrl}
                        layout="fill"
                        objectFit="cover"
                        wrapperProps={{
                          boxSize: "60px",
                          position: "relative",
                          borderRadius: "full",
                          overflow: "hidden",
                        }}
                      />
                      <Box>
                        <Text
                          fontSize="lg"
                          color="charcoalGrey"
                          fontFamily="poppins"
                          fontWeight="semibold"
                        >
                          {option.name}
                        </Text>
                        <HStack>
                          <Text fontSize="sm" color="brownGrey.500">
                            {option.relation}
                          </Text>
                          <Text
                            fontSize="sm"
                            fontWeight="medium"
                            color="sea.500"
                          >
                            {`${option.age ?? 0} Tahun`}
                          </Text>
                        </HStack>
                      </Box>
                    </HStack>
                    <Badge
                      variant={isSelected ? "solid" : "outline"}
                      colorScheme="sea"
                      width="86px"
                      height="26px"
                      border="1px solid"
                      borderColor="sea.500"
                      fontSize="md"
                      textTransform="capitalize"
                      borderRadius="base"
                      textAlign="center"
                      pb={6}
                    >
                      {isSelected ? "Dipilih" : "Pilih"}
                    </Badge>
                  </MenuItem>
                  {index < props.options.length - 1 && (
                    <MenuDivider
                      border="0.5px solid"
                      borderColor="veryLightPink"
                    />
                  )}
                </React.Fragment>
              );
            })}
            {props.hasGuest && (
              <>
                <MenuDivider border="0.5px solid" borderColor="veryLightPink" />
                <ItemGuest />
              </>
            )}
          </MenuList>
        </Menu>
      </Flex>
      <Modal
        isOpen={props.isOpenFamilyForm}
        onClose={props.onCloseFamilyForm}
        size="4xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="sm">
            <Flex alignItems="center" justifyContent="space-between">
              <Text fontSize="lg" fontWeight="semibold">
                Tambah Data Keluarga
              </Text>
              <CloseIcon
                cursor="pointer"
                boxSize="3"
                onClick={props.onCloseFamilyForm}
              />
            </Flex>
            <Divider
              orientation="horizontal"
              height="15px"
              borderColor="veryLightPink"
            />
          </ModalHeader>
          <ModalBody mb={5}>
            <FamilyForm isMobile={false} onSuccess={props.onCloseFamilyForm} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export type FamilyInputDesktopSkeletonProps = {
  isFullWidth?: boolean;
};

export function FamilyInputDesktopSkeleton(
  props: FamilyInputDesktopSkeletonProps
) {
  return (
    <Skeleton
      width={props.isFullWidth ? "full" : "86px"}
      height="26px"
      borderRadius="base"
    />
  );
}
