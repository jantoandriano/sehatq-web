import { useNavigation } from "@sehatq/utils";
import React from "react";
import {
  Box,
  Flex,
  HStack,
  Link,
  Skeleton,
  Text,
  useImage,
} from "../../user-interfaces";
import {
  SimpleTelemedicineHCPCard,
  SimpleTelemedicineHCPCardProps,
  SimpleTelemedicineHCPCardSkeleton,
} from "./simple-telemedicine-hcp-card";

export type TelemedicineLandingCampaignMobileProps = {
  title: string;
  subTitle: string;
  slug: string;
  banner: string;
  hcps: SimpleTelemedicineHCPCardProps[] | undefined;
};

export function TelemedicineLandingCampaignMobile(
  props: TelemedicineLandingCampaignMobileProps
) {
  const Image = useImage();
  const { Navigate } = useNavigation();
  return (
    <Box width="full">
      <Box px={4}>
        <Text
          color="charcoalGrey"
          fontFamily="poppins"
          fontWeight="semibold"
          fontSize="md"
        >
          {props.title}
        </Text>
        <Text color="#4d555b" fontSize="sm" mb={3}>
          {props.subTitle}
        </Text>
        <Navigate name="TELEMED_CAMPAIGN" query={{ slug: props.slug }}>
          <Link width="full">
            <Image
              priority
              src={props.banner}
              alt={props.title}
              layout="fill"
              objectFit="cover"
              wrapperProps={{
                width: "100%",
                paddingBottom: "39.65%",
                overflow: "hidden",
                borderRadius: "xl",
              }}
            />
          </Link>
        </Navigate>
      </Box>
      {props.hcps && (
        <HStack py={3} px={4} spacing={2} overflowX="auto" alignItems="stretch">
          {props.hcps.map((hcp) => {
            return (
              <Box key={hcp.doctorId}>
                <SimpleTelemedicineHCPCard {...hcp} isMobile={true} />
              </Box>
            );
          })}
        </HStack>
      )}
      <Box px={4}>
        <Navigate name="TELEMED_CAMPAIGN" query={{ slug: props.slug }}>
          <Link
            mt={2}
            variant="outline"
            fontSize="sm"
            fontWeight="semibold"
            color="sea.500"
            borderColor="main.500"
            borderRadius="base"
            width="full"
            height="36px"
          >
            Lihat Semua Dokter
          </Link>
        </Navigate>
      </Box>
    </Box>
  );
}

export function TelemedicineLandingCampaignMobileSkeleton() {
  return (
    <Flex direction="column" justify="space-between">
      <Skeleton width="219px" height="24px" />
      <Skeleton width="300px" height="18px" my={1} />
      <Skeleton borderRadius="xl" width="328px" height="130px" mt={2} />
      <HStack py={3} px={1} spacing={2} overflowX="hidden">
        {Array.from(Array(3).keys()).map((id) => (
          <SimpleTelemedicineHCPCardSkeleton isMobile={true} key={id} />
        ))}
      </HStack>
      <Skeleton width="full" height="40px" borderRadius="base" />
    </Flex>
  );
}
