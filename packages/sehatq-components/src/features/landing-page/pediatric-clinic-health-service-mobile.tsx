import React from "react";
import { useNavigation, NavigationValue } from "@sehatq/utils";
import {
  Box,
  useImage,
  Text,
  Flex,
  Skeleton,
  SkeletonText,
  HStack,
  Icon,
  ArrowForwardIcon,
  IconButton,
  LinkBox,
  LinkOverlay,
} from "../../user-interfaces";

export type PediatricClinicHealthServiceMobileProps = {
  contents: {
    id: number;
    image: string;
    title: string;
    description: string;
    navigationValue: NavigationValue;
  }[];
};

export function PediatricClinicHealthServiceMobile(
  props: PediatricClinicHealthServiceMobileProps
) {
  const { contents } = props;
  const Image = useImage();
  const { Navigate } = useNavigation();

  return (
    <Box w="full">
      <Box px="16px">
        <Text
          fontSize="xs"
          color="sea.500"
          fontFamily="poppins"
          fontWeight="medium"
          mb="8px"
        >
          LAYANAN KESEHATAN
        </Text>
        <Text fontSize="24px" fontFamily="poppins" fontWeight="bold" mb="12px">
          Pantau Selalu Tumbuh Kembang Si Kecil Sejak Dini
        </Text>
        <Text fontSize="sm" mb="28px">
          Temukan berbagai layanan kesehatan untuk menunjang tumbuh kembang &
          kesehatan Si Kecil di sini.
        </Text>
      </Box>

      <HStack spacing={5} overflowX="auto" py={3} px="16px">
        {contents.map((content) => (
          <LinkBox
            key={content.id}
            display="flex"
            flexDirection="column"
            bgColor="white"
            minW="260px"
            h="230px"
            borderRadius="8px"
            justifyContent="space-between"
            px="16px"
            py="20px"
            shadow="base"
            cursor="pointer"
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
                  fontSize="20px"
                  fontFamily="poppins"
                  fontWeight="semibold"
                  marginLeft={3}
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
                fontWeight="bold"
                fontFamily="poppins"
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

export function PediatricClinicHealthServiceSkeletonMobile() {
  return (
    <>
      <Skeleton backgroundColor="gray.500" h="30px" w="150px" mb="12px" />
      <SkeletonText w="360px" mb="12px" />
      <SkeletonText w="360px" mb="28px" />
      <HStack overflowX="auto">
        {Array.from(Array(3).keys()).map((id) => (
          <Skeleton
            key={id}
            backgroundColor="gray.500"
            minW="235px"
            h="230px"
            borderRadius="8px"
          />
        ))}
      </HStack>
    </>
  );
}
