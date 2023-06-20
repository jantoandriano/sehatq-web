import { useNavigation } from "@sehatq/utils";
import React from "react";
import {
  Box,
  Flex,
  HStack,
  Link,
  Skeleton,
  Slider,
  Text,
  useImage,
} from "../../user-interfaces";
import {
  SimpleTelemedicineHCPCard,
  SimpleTelemedicineHCPCardProps,
  SimpleTelemedicineHCPCardSkeleton,
} from "./simple-telemedicine-hcp-card";

export type TelemedicineLandingCampaignDesktopProps = {
  title: string;
  subTitle: string;
  slug: string;
  banner: string;
  hcps: SimpleTelemedicineHCPCardProps[] | undefined;
};

export function TelemedicineLandingCampaignDesktop(
  props: TelemedicineLandingCampaignDesktopProps
) {
  const Image = useImage();
  const { Navigate } = useNavigation();
  return (
    <Flex direction="column" justify="space-between" width="full">
      <Flex direction="row" justify="space-between" mb={5}>
        <Box maxW="80%">
          <Text
            color="charcoalGrey"
            fontFamily="poppins"
            fontWeight="semibold"
            fontSize="lg"
            marginBottom={1.5}
          >
            {props.title}
          </Text>
          <Text color="#4d555b" fontSize="md">
            {props.subTitle}
          </Text>
        </Box>
        <Navigate name="TELEMED_CAMPAIGN" query={{ slug: props.slug }}>
          <Link
            variant="outline"
            fontSize="base"
            fontWeight="semibold"
            color="sea.500"
            borderColor="main.500"
            borderRadius="base"
            height="40px"
          >
            Lihat Semua Dokter
          </Link>
        </Navigate>
      </Flex>
      <Flex
        direction="column"
        justify="space-between"
        borderRadius="xl"
        background="paleBlue.100"
      >
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
                paddingBottom: "25%",
                overflow: "hidden",
                borderTopRadius: "xl",
              }}
            />
          </Link>
        </Navigate>

        {props.hcps && (
          <Box p={4}>
            <Slider
              slides={props.hcps.map((dt, index) => ({
                ...dt,
                id: index,
              }))}
              slideGap={0}
              renderSlide={({ slide: hcp }) => (
                <Box key={hcp.doctorId} p={2} height="100%" width="176px">
                  <SimpleTelemedicineHCPCard {...hcp} isMobile={false} />
                </Box>
              )}
            />
          </Box>
        )}
      </Flex>
    </Flex>
  );
}

export function TelemedicineLandingCampaignDesktopSkeleton() {
  return (
    <Flex direction="column" justify="space-between">
      <Flex direction="row" justify="space-between" mb={5}>
        <Box maxW="80%">
          <Skeleton width="242px" height="25px" marginBottom={2} />
          <Skeleton width="349px" height="20px" marginBottom={1} />
        </Box>
        <Skeleton width="187px" height="40px" borderRadius="base" />
      </Flex>
      <Box width="full" paddingTop="25%" position="relative">
        <Skeleton
          borderTopRadius="xl"
          width="full"
          height="100%"
          position="absolute"
          top="0"
          left="0"
        />
      </Box>
      <HStack p={6} spacing={2} overflowX="hidden" background="paleBlue.100">
        {Array.from(Array(5).keys()).map((id) => (
          <Box key={id} p={1}>
            <SimpleTelemedicineHCPCardSkeleton isMobile={false} />
          </Box>
        ))}
      </HStack>
    </Flex>
  );
}
