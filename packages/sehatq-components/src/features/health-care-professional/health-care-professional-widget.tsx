import React from "react";
import { useNavigation } from "@sehatq/utils";
import {
  Box,
  Flex,
  VStack,
  LinkBox,
  LinkOverlay,
  Link,
  StackDivider,
  Text,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  useImage,
} from "../../user-interfaces";
import { useGetHCPList } from "./health-care-professional-queries";

export type HealthCareProfessionalWidgetProps = {
  specialitySlug: string;
};

export function HealthCareProfessionalWidget(
  props: HealthCareProfessionalWidgetProps
) {
  const { specialitySlug } = props;
  const { data: response } = useGetHCPList({
    specialitySlug,
    perPage: "3",
    page: "",
    userLat: "",
    userLong: "",
    query: "",
    procedureId: "",
    scheduleDayId: "",
    citySlug: "",
    gender: "",
    sortBy: "",
    hcfId: "",
  });
  const Image = useImage();
  const { Navigate } = useNavigation();

  if (!response) {
    return (
      <Box padding={4} boxShadow="base" borderRadius="xl" background="white">
        <VStack
          spacing={4}
          divider={<StackDivider borderColor="veryLightPink" />}
          alignItems="flex-start"
          marginBottom={4}
        >
          <Skeleton width="60%" height="20px" />
          {[1, 2, 3].map((id) => (
            <Flex key={id} align="center" width="full">
              <SkeletonCircle minWidth="60px" height="60px" />
              <SkeletonText
                width="70%"
                marginLeft={4}
                skeletonHeight={3}
                spacing={3}
                noOfLines={2}
              />
            </Flex>
          ))}
        </VStack>
        <Skeleton borderRadius="md" width="full" height="32px" />
      </Box>
    );
  }

  if (response.data.length === 0) {
    return null;
  }

  const specialityName =
    response.meta.specialities.find(
      (speciality) => speciality.slug === specialitySlug
    )?.name ?? "";

  return (
    <Box padding={4} boxShadow="base" borderRadius="xl" background="white">
      <VStack
        spacing={4}
        divider={<StackDivider borderColor="veryLightPink" />}
        marginBottom={4}
      >
        <Navigate
          name="HEALTH_CARE_PROFESIONAL"
          query={{ slugs: [specialitySlug] }}
        >
          <Text fontFamily="poppins" fontWeight="semibold" width="full">
            Dokter {specialityName}
          </Text>
        </Navigate>
        {response.data.map((hcp) => (
          <LinkBox key={hcp.id} display="flex" alignItems="center" width="full">
            <Image
              sizes="60px"
              src={hcp.imageUrl}
              alt={hcp.imageAlt}
              layout="fill"
              objectFit="cover"
              wrapperProps={{
                overflow: "hidden",
                minWidth: "60px",
                height: "60px",
                borderRadius: "30px",
              }}
            />
            <Navigate
              name="HEALTH_CARE_PROFESIONAL"
              query={{ slugs: [hcp.slug] }}
            >
              <LinkOverlay
                marginLeft={4}
                fontFamily="poppins"
                fontWeight="semibold"
                fontSize="sm"
              >
                {hcp.name}
              </LinkOverlay>
            </Navigate>
          </LinkBox>
        ))}
      </VStack>
      <Navigate
        name="HEALTH_CARE_PROFESIONAL"
        query={{ slugs: [specialitySlug] }}
      >
        <Link variant="solid" colorScheme="main" width="full" size="sm">
          Lihat Semua Dokter {specialityName}
        </Link>
      </Navigate>
    </Box>
  );
}
