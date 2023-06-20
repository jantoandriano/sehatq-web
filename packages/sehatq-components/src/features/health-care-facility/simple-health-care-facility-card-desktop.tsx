import React from "react";
import { useNavigation } from "@sehatq/utils";

import {
  Text,
  StarIcon,
  VStack,
  HStack,
  LinkBox,
  LinkOverlay,
  OfficialStoreIcon,
  Skeleton,
  useImage,
} from "../../user-interfaces";

export interface SimpleHealthCareFacilityCardDesktopProps {
  hcfName: string;
  imageUrl: string;
  slug: string;
  partner: number | null;
  hcfType: string;
  district: string;
  city: string;
}

export function SimpleHealthCareFacilityCardDesktop(
  props: SimpleHealthCareFacilityCardDesktopProps
) {
  const { Navigate } = useNavigation();
  const Image = useImage();
  const { hcfName, imageUrl, slug, partner, hcfType, district, city } = props;
  return (
    <LinkBox>
      <VStack
        spacing={1.5}
        height="260px"
        align="flex-start"
        background="white"
        borderRadius="base"
        boxShadow="base"
      >
        <Image
          src={imageUrl}
          alt={hcfName}
          layout="fill"
          objectFit="cover"
          wrapperProps={{
            cursor: "pointer",
            width: "144px",
            height: "104px",
            position: "relative",
            overflow: "hidden",
          }}
        />
        <VStack spacing={1} px={2} align="flex-start">
          <Navigate name="HEALTH_CARE_FACILITY" query={{ hcfSlug: slug }}>
            <LinkOverlay
              fontSize="xs"
              fontFamily="poppins"
              fontWeight="medium"
              variant="unstyled"
              lineHeight="1.33"
              height="auto"
              noOfLines={3}
              width="100%"
            >
              {hcfName}
            </LinkOverlay>
          </Navigate>
          {partner ? (
            <Text fontSize="xxs" fontWeight="semibold" color="sea.500">
              <OfficialStoreIcon boxSize="16px" /> Partner
            </Text>
          ) : null}
        </VStack>
        <VStack spacing={1} px={2} pb={1.5} align="flex-start">
          <Text fontSize="xxs" fontWeight="semibold" color="sea.500">
            {hcfType}
          </Text>
          <Text fontSize="xxs" color="brownGrey.500">
            {district}, {city}
          </Text>
          <HStack spacing={0.5}>
            {Array.from(Array(5).keys()).map((id) => (
              <StarIcon key={id} w={2} h={2} color="sunflowerYellow.500" />
            ))}
            <Text fontSize="xxs" color="brownGrey.500">
              (Google Review)
            </Text>
          </HStack>
        </VStack>
      </VStack>
    </LinkBox>
  );
}

export function SimpleHealthCareFacilityCardSkeletonDesktop() {
  const Image = useImage();
  return (
    <VStack
      spacing={1.5}
      height="260px"
      align="flex-start"
      background="white"
      borderRadius="base"
      boxShadow="base"
    >
      <Image
        src="https://www.sehatq.com/public/assets/img/no-image.jpg"
        alt="no image"
        layout="fill"
        objectFit="cover"
        wrapperProps={{
          cursor: "pointer",
          width: "144px",
          height: "104px",
          position: "relative",
          overflow: "hidden",
        }}
      />
      <VStack spacing={1} px={2} align="flex-start">
        <Skeleton width="120px" height="16px" />
        <Skeleton width="70px" height="16px" />
        <Skeleton width="90px" height="16px" />
      </VStack>
      <VStack spacing={1} px={2} pb={1.5} align="flex-start">
        <Skeleton width="119px" height="14px" />
        <Skeleton width="126px" height="14px" />
        <Skeleton width="126px" height="14px" />
      </VStack>
    </VStack>
  );
}
