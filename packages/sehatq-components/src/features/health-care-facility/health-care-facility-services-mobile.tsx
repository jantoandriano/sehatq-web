import { ASSETS } from "@sehatq/constants";
import { useNavigation } from "@sehatq/utils";
import React from "react";
import {
  Box,
  Flex,
  HStack,
  Link,
  LinkBox,
  LinkOverlay,
  Skeleton,
  Text,
  useImage,
} from "../../user-interfaces";
import { HealthCareFacilityServicesGeneralProps } from "./health-care-facility-services-desktop";

export type HealthCareFacilityServicesMobileProps =
  HealthCareFacilityServicesGeneralProps;

export function HealthCareFacilityServicesMobile(
  props: HealthCareFacilityServicesMobileProps
) {
  const Image = useImage();
  const { Navigate } = useNavigation();
  return (
    <Flex
      direction="column"
      background="iceBlue.500"
      align="start"
      width="full"
    >
      <Text
        color="charcoalGrey"
        fontSize="md"
        fontWeight="semibold"
        fontFamily="poppins"
        p={4}
      >
        Layanan Pemeriksaan
      </Text>
      <Flex overflowX="auto" width="full">
        {props.procedures.map((procedure, index) => (
          <LinkBox
            marginLeft={index === 0 ? 4 : 0}
            marginRight={4}
            key={procedure.id}
            boxSize="144px"
            borderRadius="xl"
          >
            <Image
              alt={procedure.slug}
              src={procedure.imageUrl || ASSETS.NO_IMAGE}
              layout="fill"
              priority={true}
              objectFit="cover"
              sizes="144px"
              wrapperProps={{
                width: "144px",
                paddingBottom: "100%",
                borderRadius: "xl",
                overflow: "hidden",
              }}
            />
            <Flex
              direction="column"
              justify="end"
              width="full"
              height="full"
              background="linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%)"
              borderRadius="xl"
              position="absolute"
              top={0}
            >
              <Navigate
                name="HEALTH_SERVICE"
                query={{ hcfSlug: props.hcfSlug, procedure: procedure.slug }}
              >
                <LinkOverlay
                  color="white"
                  fontSize="lg"
                  fontWeight="semibold"
                  fontFamily="poppins"
                  alignSelf="start"
                  p={2}
                  _hover={{ border: "none" }}
                  noOfLines={2}
                >
                  {procedure.name}
                </LinkOverlay>
              </Navigate>
            </Flex>
          </LinkBox>
        ))}
      </Flex>
      <Box p={4} width="full">
        <Navigate name="HEALTH_SERVICE" query={{ hcfSlug: props.hcfSlug }}>
          <Link
            variant="outline"
            color="sea.500"
            borderColor="main.500"
            fontSize="xs"
            fontWeight="semibold"
            height="30px"
            borderRadius="base"
            width="full"
            background="white"
          >
            Lihat Semua
          </Link>
        </Navigate>
      </Box>
    </Flex>
  );
}

export function HealthCareFacilityServicesMobileSkeleton() {
  return (
    <Flex
      direction="column"
      background="iceBlue.500"
      align="start"
      width="full"
    >
      <Skeleton m={4} width="183px" height="24px" />
      <HStack pl={4} spacing={4} overflowX="auto" width="full">
        {Array.from(Array(4).keys()).map((id) => (
          <Skeleton
            key={id}
            minW="144px"
            minH="144px"
            boxSize="144px"
            borderRadius="xl"
          />
        ))}
      </HStack>
      <Box p={4} width="full">
        <Skeleton width="full" borderRadius="base" height="30px" />
      </Box>
    </Flex>
  );
}
