import { ASSETS } from "@sehatq/constants";
import { useNavigation } from "@sehatq/utils";
import React from "react";
import {
  Flex,
  HStack,
  Link,
  LinkBox,
  LinkOverlay,
  Skeleton,
  Text,
  useImage,
  VStack,
} from "../../user-interfaces";
export type HealthCareFacilityServicesGeneralProps = {
  hcfSlug: string;
  procedures: {
    id: number;
    slug: string;
    name: string;
    imageUrl: string;
  }[];
};

export type HealthCareFacilityServicesDesktopProps =
  HealthCareFacilityServicesGeneralProps;

export function HealthCareFacilityServicesDesktop(
  props: HealthCareFacilityServicesDesktopProps
) {
  const Image = useImage();
  const { Navigate } = useNavigation();
  return (
    <VStack spacing={4} align="start" width="full">
      <Flex direction="row" justify="space-between" width="full">
        <Text
          color="charcoalGrey"
          fontSize="md"
          fontWeight="semibold"
          fontFamily="poppins"
        >
          Layanan Pemeriksaan
        </Text>
        <Navigate name="HEALTH_SERVICE" query={{ hcfSlug: props.hcfSlug }}>
          <Link color="sea.500" fontSize="xs" fontWeight="semibold">
            Lainnya
          </Link>
        </Navigate>
      </Flex>
      <HStack spacing={4} width="full">
        {props.procedures.map((procedure) => (
          <LinkBox key={procedure.id} boxSize="178px" borderRadius="xl">
            <Image
              alt={procedure.slug}
              src={procedure.imageUrl || ASSETS.NO_IMAGE}
              layout="fill"
              priority={true}
              objectFit="cover"
              sizes="178px"
              wrapperProps={{
                width: "178px",
                paddingBottom: "100%",
                borderRadius: "xl",
                overflow: "hidden",
              }}
            />
            <Flex
              direction="column"
              justify="start"
              width="full"
              height="full"
              pt="112px"
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
      </HStack>
    </VStack>
  );
}

export function HealthCareFacilityServicesDesktopSkeleton() {
  return (
    <VStack spacing={4} align="start" width="full">
      <Flex direction="row" justify="space-between" width="full">
        <Skeleton width="183px" height="24px" />
        <Skeleton width="46px" height="16px" />
      </Flex>
      <HStack spacing={4} width="full">
        {Array.from(Array(4).keys()).map((id) => (
          <Skeleton key={id} boxSize="178px" borderRadius="xl" />
        ))}
      </HStack>
    </VStack>
  );
}
