import React from "react";
import { useAssets, useNavigation } from "@sehatq/utils";
import {
  SimpleGrid,
  VStack,
  Text,
  useImage,
  LinkBox,
  LinkOverlay,
  Flex,
  Link,
  Modal,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  Skeleton,
  SkeletonCircle,
} from "../../user-interfaces";

export type TelemedicineSpecialitiesDesktopProps = {
  telemedicineSpecialities?: {
    id: number;
    name: string;
    slug: string;
    iconUrl: string;
  }[];
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export function TelemedicineSpecialitiesDesktop(
  props: TelemedicineSpecialitiesDesktopProps
) {
  const { telemedicineSpecialities, isOpen, onOpen, onClose } = props;

  const ASSETS = useAssets(["ALL_MENU", "OTHER_MENU"]);
  const { Navigate } = useNavigation();
  const Image = useImage();

  if (!telemedicineSpecialities) return null;

  return (
    <>
      <Flex align="start" justify="space-between">
        <Text fontFamily="poppins" fontSize="lg" fontWeight="semibold">
          Cari Dokter Umum atau Spesialis
        </Text>
        <Link variant="outline" onClick={onOpen} borderColor="main.500">
          Lihat Semua Spesialisasi
        </Link>
      </Flex>
      {telemedicineSpecialities ? (
        <>
          <SimpleGrid columns={6} gap={4} marginTop={7}>
            {telemedicineSpecialities
              .slice(0, 12)
              .map((telemedicineSpeciality) => (
                <LinkBox key={telemedicineSpeciality.id}>
                  <VStack
                    width="full"
                    borderRadius="base"
                    boxShadow="xl"
                    background="white"
                    paddingX={1.5}
                    paddingY={6}
                    spacing={2}
                    height="100%"
                  >
                    <Image
                      src={telemedicineSpeciality.iconUrl}
                      alt={telemedicineSpeciality.name}
                      width={69}
                      height={69}
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
                        fontSize="sm"
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
          <Modal size="3xl" isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton h={6} w={6} top="3" color="brownGrey.500" />
              <ModalHeader
                fontFamily="poppins"
                paddingBottom={0}
                paddingTop={9}
              >
                Cari Spesialisasi
              </ModalHeader>
              <ModalBody paddingY={6}>
                <SimpleGrid columns={8} columnGap={4} rowGap={6}>
                  <LinkBox>
                    <VStack
                      width="full"
                      borderRadius="lg"
                      background="white"
                      padding={1.5}
                      spacing={1.5}
                      height="100%"
                    >
                      <Image
                        src={ASSETS.ALL_MENU}
                        alt="All Specialities"
                        width={40}
                        height={40}
                        layout="fixed"
                      />
                      <Navigate name="TELEMED_HCPS">
                        <LinkOverlay fontSize="xs" textAlign="center">
                          Semua
                        </LinkOverlay>
                      </Navigate>
                    </VStack>
                  </LinkBox>
                  {telemedicineSpecialities.map((telemedicineSpeciality) => (
                    <LinkBox key={telemedicineSpeciality.id}>
                      <VStack
                        width="full"
                        borderRadius="lg"
                        background="white"
                        padding={1.5}
                        spacing={1.5}
                        height="100%"
                      >
                        <Image
                          src={telemedicineSpeciality.iconUrl}
                          alt={telemedicineSpeciality.name}
                          width={40}
                          height={40}
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
        </>
      ) : (
        <SimpleGrid columns={6} gap={4} marginTop={7}>
          {Array.from(Array(12)).map((value) => (
            <Flex
              key={value}
              width="full"
              borderRadius="lg"
              boxShadow="base"
              background="white"
              paddingX={1.5}
              paddingY={6}
              height="88px"
              direction="column"
              align="center"
              justify="center"
            >
              <SkeletonCircle width="69px" height="69px" />
              <Skeleton width="50px" height="12px" marginTop={4} />
            </Flex>
          ))}
        </SimpleGrid>
      )}
    </>
  );
}
