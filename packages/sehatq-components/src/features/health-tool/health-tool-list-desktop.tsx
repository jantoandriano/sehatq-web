import React from "react";
import { useNavigation } from "@sehatq/utils";
import {
  SimpleGrid,
  Text,
  VStack,
  HStack,
  Skeleton,
  SkeletonCircle,
  LinkBox,
  LinkOverlay,
  useImage,
} from "../../user-interfaces";
import { HealthToolsResponse } from "./health-tools-model";

export type HealthToolListDesktopProps = {
  healthTools: HealthToolsResponse["data"];
};

export function HealthToolListDesktop(props: HealthToolListDesktopProps) {
  const { healthTools } = props;
  const { Navigate } = useNavigation();
  const Image = useImage();
  return (
    <>
      <SimpleGrid columns={2} spacing={10}>
        {healthTools?.length > 0 &&
          healthTools.map((healthTool) => (
            <LinkBox key={healthTool.slug} width="352px">
              <HStack spacing={4} align="flex-start">
                <Image
                  src={healthTool.iconUrl}
                  alt={healthTool.title}
                  layout="fixed"
                  width={62}
                  height={62}
                />
                <VStack spacing={1} align="flex-start">
                  <Navigate
                    name="HEALTH_TOOL_DETAIL"
                    query={{ slug: healthTool.slug }}
                  >
                    <LinkOverlay
                      fontSize="xl"
                      lineHeight="9"
                      fontFamily="poppins"
                      fontWeight="semibold"
                      color="charcoalGrey"
                    >
                      {healthTool.title}
                    </LinkOverlay>
                  </Navigate>
                  <Text fontSize="sm" lineHeight="6" color="charcoalGrey">
                    {healthTool.description}
                  </Text>
                </VStack>
              </HStack>
            </LinkBox>
          ))}
      </SimpleGrid>
    </>
  );
}

export function HealthToolListDesktopSkeleton() {
  return (
    <SimpleGrid columns={2} spacing={10}>
      {Array.from(Array(7).keys()).map((index) => (
        <HStack key={index} spacing={4} align="flex-start">
          <SkeletonCircle width="60px" height="60px" />
          <VStack spacing={1} align="flex-start">
            <Skeleton height="28px" width="260px" />
            <Skeleton height="22px" width="273px" />
          </VStack>
        </HStack>
      ))}
    </SimpleGrid>
  );
}
