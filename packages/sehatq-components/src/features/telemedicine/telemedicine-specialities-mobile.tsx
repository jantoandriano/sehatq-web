import React, { ChangeEvent } from "react";
import { useAssets, useNavigation } from "@sehatq/utils";
import {
  SimpleGrid,
  VStack,
  Text,
  useImage,
  LinkBox,
  LinkOverlay,
  Box,
  Flex,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Skeleton,
  SkeletonCircle,
  IconButton,
  ArrowBackIcon,
  InputGroup,
  Input,
  InputLeftElement,
  Search2Icon,
} from "../../user-interfaces";

export type TelemedicineSpecialitiesMobileProps = {
  telemedicineSpecialities?: {
    id: number;
    name: string;
    slug: string;
    iconUrl: string;
  }[];
  keyword: string;
  setKeyword: (event: ChangeEvent<HTMLInputElement>) => void;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export function TelemedicineSpecialitiesMobile(
  props: TelemedicineSpecialitiesMobileProps
) {
  const {
    telemedicineSpecialities,
    isOpen,
    onOpen,
    onClose,
    keyword,
    setKeyword,
  } = props;

  const ASSETS = useAssets(["ALL_MENU"]);
  const { Navigate } = useNavigation();
  const Image = useImage();

  if (!telemedicineSpecialities) return null;

  return (
    <>
      <Text fontFamily="poppins" fontWeight="semibold">
        Cari Dokter Umum atau Spesialis
      </Text>
      <SimpleGrid columns={3} gap={2} marginTop={3} marginBottom={4}>
        {telemedicineSpecialities
          ? telemedicineSpecialities
              .slice(0, 6)
              .map((telemedicineSpeciality) => (
                <LinkBox key={telemedicineSpeciality.id}>
                  <VStack
                    width="full"
                    borderRadius="base"
                    boxShadow="base"
                    background="white"
                    paddingY={4}
                    paddingX={1}
                    spacing={1.5}
                    height="100%"
                  >
                    <Image
                      src={telemedicineSpeciality.iconUrl}
                      alt={telemedicineSpeciality.name}
                      width={48}
                      height={48}
                      layout="fixed"
                      priority
                    />
                    <Navigate
                      name="TELEMED_HCPS"
                      query={{
                        slugs: [telemedicineSpeciality.slug],
                      }}
                    >
                      <LinkOverlay
                        fontSize="xs"
                        textAlign="center"
                        wordBreak="break-word"
                      >
                        {telemedicineSpeciality.name}
                      </LinkOverlay>
                    </Navigate>
                  </VStack>
                </LinkBox>
              ))
          : Array.from(Array(6)).map((value) => (
              <Flex
                key={value}
                width="full"
                borderRadius="base"
                boxShadow="base"
                background="white"
                padding={1.5}
                height="104px"
                direction="column"
                align="center"
                justify="center"
              >
                <SkeletonCircle width="48px" height="48px" />
                <Skeleton width="60px" height="12px" marginTop={3} />
              </Flex>
            ))}
      </SimpleGrid>
      <Button
        onClick={onOpen}
        variant="outline"
        borderColor="main.500"
        width="full"
      >
        Lihat Semua
      </Button>
      {telemedicineSpecialities ? (
        <Modal size="full" isOpen={isOpen} onClose={onClose} trapFocus={false}>
          <ModalOverlay />
          <ModalContent borderRadius="none">
            <ModalBody p={0}>
              <Box
                position="sticky"
                zIndex="docked"
                top={0}
                left={0}
                paddingX={4}
                paddingBottom={2}
                paddingTop={0}
                background="white"
              >
                <Flex align="center" background="white" height="56px">
                  <IconButton
                    variant="fit"
                    onClick={onClose}
                    aria-label="Back"
                    icon={
                      <ArrowBackIcon
                        width="28px"
                        height="28px"
                        colot="sea.500"
                      />
                    }
                  />
                  <Text
                    marginLeft={2}
                    fontFamily="poppins"
                    fontSize="md"
                    fontWeight="semibold"
                  >
                    Cari Spesialisasi
                  </Text>
                </Flex>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Search2Icon color="brownGrey.500" />
                  </InputLeftElement>
                  <Input
                    pl={10}
                    value={keyword}
                    onChange={setKeyword}
                    boxShadow="base"
                    placeholder="Cari dokter umum atau spesialisasi lain"
                    borderRadius="lg"
                    borderColor="transparent"
                    _focus={{
                      borderColor: "main.500",
                      boxShadow: "base",
                    }}
                  />
                </InputGroup>
              </Box>
              <SimpleGrid
                gap={2}
                columns={3}
                paddingX={4}
                paddingTop={2}
                paddingBottom={6}
              >
                <LinkBox>
                  <VStack
                    width="full"
                    borderRadius="base"
                    boxShadow="base"
                    background="white"
                    paddingY={4}
                    paddingX={1}
                    spacing={1.5}
                    height="100%"
                  >
                    <Image
                      src={ASSETS.ALL_MENU}
                      alt="All Specialities"
                      width={48}
                      height={48}
                      layout="fixed"
                    />
                    <Navigate name="TELEMED_HCPS">
                      <LinkOverlay fontSize="xxs" textAlign="center">
                        Semua
                      </LinkOverlay>
                    </Navigate>
                  </VStack>
                </LinkBox>
                {(keyword
                  ? telemedicineSpecialities.filter((telemedicineSpeciality) =>
                      telemedicineSpeciality.name
                        .toLocaleLowerCase()
                        .includes(keyword.toLocaleLowerCase())
                    )
                  : telemedicineSpecialities
                ).map((telemedicineSpeciality) => (
                  <LinkBox key={telemedicineSpeciality.id}>
                    <VStack
                      width="full"
                      borderRadius="base"
                      boxShadow="base"
                      background="white"
                      paddingY={4}
                      paddingX={1}
                      spacing={1.5}
                      height="100%"
                    >
                      <Image
                        src={telemedicineSpeciality.iconUrl}
                        alt={telemedicineSpeciality.name}
                        width={48}
                        height={48}
                        layout="fixed"
                      />
                      <Navigate
                        name="TELEMED_HCPS"
                        query={{
                          slugs: [telemedicineSpeciality.slug],
                        }}
                      >
                        <LinkOverlay
                          fontSize="xs"
                          textAlign="center"
                          wordBreak="break-word"
                        >
                          {telemedicineSpeciality.name}
                        </LinkOverlay>
                      </Navigate>
                    </VStack>
                  </LinkBox>
                ))}
              </SimpleGrid>
            </ModalBody>
          </ModalContent>
        </Modal>
      ) : null}
    </>
  );
}
