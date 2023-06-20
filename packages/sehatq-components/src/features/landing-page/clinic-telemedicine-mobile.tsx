import React from "react";
import { useNavigation, priceFormat } from "@sehatq/utils";
import {
  Box,
  useImage,
  Text,
  Skeleton,
  SkeletonText,
  LinkOverlay,
  LinkBox,
  HStack,
  Flex,
  StarRating,
  DoctorExperienceIcon,
} from "../../user-interfaces";

type ClinicTelemedicineMobileProps = {
  title: string;
  telemed: {
    id: number;
    slug: string;
    name: string;
    photoUrl: string;
    specialityName: string;
    rating: {
      average: number;
      count: number;
    };
    experience: string;
    consultationFee: number;
    indicator: string;
    isBookingChannel: boolean;
    isPrivateChannel: boolean;
  }[];
};

export function ClinicTelemedicineMobile(props: ClinicTelemedicineMobileProps) {
  const { title, telemed } = props;
  const Image = useImage();
  const { Navigate } = useNavigation();

  return (
    <Box>
      <Text fontWeight="bold" fontFamily="poppins" mb={3} mx={4}>
        {title}
      </Text>

      <HStack
        spacing={3}
        overflowX="auto"
        py={2}
        px={4}
        alignItems="self-start"
      >
        {telemed.map((item) => (
          <LinkBox
            key={item.id}
            minW="150px"
            w="150px"
            h="260px"
            bgColor="white"
            boxShadow="base"
            borderRadius="xl"
            px={3}
            py={4}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Box mb={3} position="relative">
              <Image
                src={item.photoUrl}
                alt={item.name}
                layout="fill"
                objectFit="cover"
                sizes="56px"
                wrapperProps={{
                  boxSize: 14,
                  position: "relative",
                  borderRadius: "full",
                  overflow: "hidden",
                }}
              />
              <Box
                border="solid 2px"
                borderColor="white"
                borderRadius="full"
                background={`indicator.${item.indicator}`}
                boxSize={4}
                bottom={0}
                left={10}
                position="absolute"
              />
            </Box>
            <Text
              fontSize="xs"
              fontFamily="poppins"
              fontWeight="semibold"
              noOfLines={2}
              mb={1}
            >
              {item.name}
            </Text>
            <Text fontSize="xxs" mb={1} color="sea.500">
              {item.specialityName}
            </Text>
            <Flex alignItems="center">
              <HStack spacing={1} mr={2}>
                <StarRating
                  rating={
                    item.rating.average
                      ? Math.round(item.rating.average * 10) / 10
                      : 0
                  }
                  useSingleStar
                  iconWidth="10.5px"
                  iconHeight="10.5px"
                  fontSize="10px"
                />
                {item.rating.count && (
                  <Text
                    fontSize="xxs"
                    color="brownGrey.500"
                    whiteSpace="nowrap"
                  >
                    ({item.rating.count})
                  </Text>
                )}
              </HStack>
              {item.experience.toLowerCase() !== "0 tahun" ? (
                <HStack spacing={1}>
                  <DoctorExperienceIcon boxSize={2.5} />
                  <Text fontSize="xxs" color="#A7A7A7" fontWeight="semibold">
                    {item.experience}
                  </Text>
                </HStack>
              ) : null}
            </Flex>
            <Box>
              <Text fontSize="xxs" color="#94A4B0" mb={0.5}>
                Mulai dari
              </Text>
              <Text color="#269090" fontWeight="bold" mb={2}>
                {item.consultationFee ? priceFormat(item.consultationFee) : ""}
              </Text>
              <Navigate name="TELEMED_DOCTOR" query={{ slug: item.slug }}>
                <LinkOverlay
                  display="block"
                  textAlign="center"
                  color="white"
                  fontSize="xs"
                  fontFamily="poppins"
                  fontWeight="semibold"
                  padding={2}
                  width="full"
                  background="main.500"
                  borderRadius="md"
                >
                  Lihat Profil
                </LinkOverlay>
              </Navigate>
            </Box>
          </LinkBox>
        ))}
      </HStack>
    </Box>
  );
}

export function ClinicTelemedicineSkeletonMobile() {
  return (
    <Box>
      <SkeletonText mb={8} />
      <HStack alignItems="flex-start" spacing={3}>
        <Box w="150px">
          <Skeleton w={14} h={14} mb={3} borderRadius="full" />
          <SkeletonText mb={3} />
          <SkeletonText mb={5} />
          <Skeleton w="full" borderRadius="base" h={8} />
        </Box>
        <Box w="150px">
          <Skeleton w={14} h={14} mb={3} borderRadius="full" />
          <SkeletonText mb={3} />
          <SkeletonText mb={5} />
          <Skeleton w="full" borderRadius="base" h={8} />
        </Box>
      </HStack>
    </Box>
  );
}
