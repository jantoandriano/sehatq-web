import React from "react";
import {
  Box,
  Button,
  ChevronDownIcon,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Skeleton,
  Text,
  useImage,
  VStack,
  Badge,
  Flex,
  MenuDivider,
  AddIcon,
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

export type FamilyInputMobileProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  value?: FamilyOption;
  options: FamilyOption[];
  onChange: (selectedData: FamilyOption | undefined) => void;
  selectedMemberId?: number;
  isError?: boolean;
  labelButton: string;
  hasGuest: boolean;
  creatable: boolean;
  title: string;
  isOpenFamilyForm: boolean;
  onCloseFamilyForm: () => void;
  onOpenFamilyForm: () => void;
};

export function FamilyInputMobile(props: FamilyInputMobileProps) {
  const Image = useImage();

  function ItemGuest() {
    return (
      <React.Fragment>
        <Flex
          color={!props.value ? "sea.500" : "charcoalGrey"}
          fontSize="md"
          align="center"
          py={3}
          justifyContent="space-between"
          onClick={() => {
            if (props.onChange) {
              props.onChange(undefined);
              props.onClose();
            }
          }}
          w="full"
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
        </Flex>
      </React.Fragment>
    );
  }

  return (
    <>
      <Button
        p={0}
        variant="solid"
        height="auto"
        width="full"
        fontSize="sm"
        borderRadius="xl"
        fontWeight="normal"
        colorScheme="iceBlue"
        onClick={props.onOpen}
        justifyContent="space-between"
        border={props.isError ? "1px solid" : "none"}
        borderColor={props.isError ? "red.500" : undefined}
        color={props.isError ? "red.500" : "black"}
        _hover={{
          background: "white",
        }}
        _focus={{ border: "none" }}
        bg="white"
        rightIcon={
          <ChevronDownIcon
            boxSize="20px"
            color={props.isError ? "red.500" : "#2b8e8e"}
          />
        }
      >
        {props.value ? (
          <Flex alignItems="center">
            <Image
              alt={props.value.name}
              src={props.value.photoUrl}
              layout="fill"
              objectFit="cover"
              wrapperProps={{
                boxSize: "52px",
                position: "relative",
                borderRadius: "full",
                overflow: "hidden",
                marginRight: 2,
              }}
            />
            <Box data-testid="family-input-value">
              <Text
                fontSize="sm"
                fontFamily="poppins"
                fontWeight="semibold"
                color="charcoalGrey"
                textAlign="left"
              >
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
        ) : props.hasGuest ? (
          <Box data-testid="family-input-value">
            <Text fontFamily="poppins" fontWeight="semibold" fontSize="md">
              Masuk sebagai Guest
            </Text>
            <HStack>
              <Text color="brownGrey.500" fontSize="sm">
                Tanpa simpan profil
              </Text>
            </HStack>
          </Box>
        ) : (
          "Pilih Keluarga"
        )}
      </Button>
      <Drawer placement="bottom" onClose={props.onClose} isOpen={props.isOpen}>
        <DrawerOverlay />
        <DrawerContent borderTopRadius="lg">
          <DrawerHeader
            pb={2}
            pt={3}
            borderBottom="0.5px solid"
            borderBottomColor="veryLightPink"
            fontWeight="semibold"
          >
            <Flex alignItems="center" justifyContent="space-between">
              <Text fontSize="lg" fontFamily="poppins" color="charcoalGrey">
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
                  onClick={() => {
                    if (props.onOpenFamilyForm) {
                      props.onOpenFamilyForm();
                      props.onClose();
                    }
                  }}
                >
                  <AddIcon fontSize="xs" color="#2b8e8e" />
                  <Text fontSize="xs" fontWeight="semibold" color="#2b8e8e">
                    Tambah Keluarga
                  </Text>
                </Flex>
              )}
            </Flex>
          </DrawerHeader>
          <DrawerBody px={6} py={4}>
            <VStack width="full" align="flex-start">
              {props.options.map((option, index) => {
                const isSelected = props.value?.userId == option.userId;
                return (
                  <>
                    <Flex
                      key={option.userId}
                      alignItems="center"
                      justifyContent="space-between"
                      w="full"
                      py={3}
                      role="menuitem"
                      onClick={() => {
                        if (props.onChange) {
                          props.onChange(option);
                          props.onClose();
                        }
                      }}
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
                    </Flex>
                    {index < props.options.length - 1 && (
                      <MenuDivider
                        border="0.5px solid"
                        borderColor="veryLightPink"
                        w="full"
                      />
                    )}
                  </>
                );
              })}
              {props.hasGuest && (
                <>
                  {!!props.options.length && (
                    <MenuDivider
                      border="0.5px solid"
                      borderColor="veryLightPink"
                      w="full"
                    />
                  )}
                  <ItemGuest />
                </>
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Drawer
        placement="bottom"
        onClose={props.onCloseFamilyForm}
        isOpen={props.isOpenFamilyForm}
      >
        <DrawerOverlay />
        <DrawerContent borderTopRadius="lg">
          <DrawerHeader fontWeight="semibold">
            <Text fontSize="md" color="charcoalGrey">
              Tambah Data Keluarga
            </Text>
            <Divider
              orientation="horizontal"
              height="10px"
              borderColor="veryLightPink"
            />
          </DrawerHeader>
          <DrawerBody>
            <FamilyForm isMobile onSuccess={props.onCloseFamilyForm} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export type FamilyInputMobileSkeletonProps = {
  isFullWidth?: boolean;
};

export function FamilyInputMobileSkeleton(
  props: FamilyInputMobileSkeletonProps
) {
  return (
    <Skeleton
      width={props.isFullWidth ? "full" : "199px"}
      height="46px"
      borderRadius="xl"
    />
  );
}
