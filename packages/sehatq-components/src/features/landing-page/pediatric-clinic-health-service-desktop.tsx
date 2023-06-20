import React from "react";
import { useNavigation, NavigationValue } from "@sehatq/utils";
import {
  Box,
  useImage,
  Text,
  Flex,
  Skeleton,
  SkeletonText,
  Icon,
  IconButton,
  ArrowForwardIcon,
  HStack,
  LinkBox,
  LinkOverlay,
} from "../../user-interfaces";

export type PediatricClinicHealthServiceDesktopProps = {
  contents: {
    id: number;
    image: string;
    title: string;
    description: string;
    navigationValue: NavigationValue;
  }[];
};

export function PediatricClinicHealthServiceDesktop(
  props: PediatricClinicHealthServiceDesktopProps
) {
  const { contents } = props;
  const Image = useImage();
  const { Navigate } = useNavigation();

  return (
    <Box w="full">
      <Text
        fontSize="20px"
        color="sea.500"
        fontFamily="poppins"
        fontWeight="medium"
        mb="12px"
      >
        LAYANAN KESEHATAN
      </Text>
      <Text
        fontSize="32px"
        fontFamily="poppins"
        fontWeight="bold"
        mb="20px"
        maxW="570px"
      >
        Pantau Selalu Tumbuh Kembang Si Kecil Sejak Dini
      </Text>
      <Text maxW="570px" mb="34px">
        Temukan berbagai layanan kesehatan untuk menunjang tumbuh kembang &
        kesehatan Si Kecil di sini.
      </Text>

      <HStack spacing={5}>
        {contents.map((content) => (
          <LinkBox
            key={content.id}
            display="flex"
            flexDirection="column"
            bgColor="white"
            w="373px"
            h="212px"
            borderRadius="8px"
            justifyContent="space-between"
            px="21px"
            py="25px"
            shadow="base"
            cursor="pointer"
            zIndex={2}
          >
            <Flex alignItems="center">
              <Image
                priority
                src={content.image}
                alt="Klinik Online Spesialis Anak"
                height={60}
                width={60}
                layout="fixed"
              />
              <Navigate {...content.navigationValue}>
                <LinkOverlay
                  fontFamily="poppins"
                  fontWeight="bold"
                  marginLeft={6}
                >
                  {content.title}
                </LinkOverlay>
              </Navigate>
            </Flex>
            <Text color="#728797" fontSize="sm">
              {content.description}
            </Text>
            <Flex w="full" justifyContent="space-between" alignItems="center">
              <Text
                color="#269090"
                fontSize="xs"
                fontFamily="poppins"
                fontWeight="semibold"
              >
                Selengkapnya
              </Text>
              <IconButton
                h="42px"
                w="48px"
                aria-label="views"
                borderRadius="full"
                icon={<Icon as={ArrowForwardIcon} w="25px" h="25px" />}
              />
            </Flex>
          </LinkBox>
        ))}
      </HStack>
    </Box>
  );
}

export function PediatricClinicHealthServiceSkeletonDesktop() {
  return (
    <>
      <Skeleton backgroundColor="gray.500" h="30px" w="230px" mb="12px" />
      <SkeletonText w="500px" mb="20px" />
      <SkeletonText w="500px" mb="34px" />
      <HStack>
        {Array.from(Array(3).keys()).map((id) => (
          <Skeleton
            key={id}
            backgroundColor="gray.500"
            w="373px"
            h="212px"
            borderRadius="8px"
          />
        ))}
      </HStack>
    </>
  );
}
