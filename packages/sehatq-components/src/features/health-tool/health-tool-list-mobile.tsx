import React from "react";
import { useNavigation } from "@sehatq/utils";
import {
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

export type HealthToolListMobileProps = {
  healthTools: HealthToolsResponse["data"];
};

export function HealthToolListMobile(props: HealthToolListMobileProps) {
  const { healthTools } = props;
  const { Navigate } = useNavigation();
  const Image = useImage();
  return (
    <>
      <VStack spacing={8} align="flex-start" width="full">
        {healthTools?.length > 0 &&
          healthTools.map((healthTool) => (
            <LinkBox key={healthTool.slug}>
              <HStack spacing={4} align="flex-start">
                <Image
                  src={healthTool.iconUrl}
                  alt={healthTool.title}
                  layout="fixed"
                  width={55}
                  height={55}
                />
                <VStack spacing={1} align="flex-start">
                  <Navigate
                    name="HEALTH_TOOL_DETAIL"
                    query={{ slug: healthTool.slug }}
                  >
                    <LinkOverlay
                      fontSize="md"
                      lineHeight="7"
                      fontFamily="poppins"
                      fontWeight="semibold"
                      color="charcoalGrey"
                    >
                      {healthTool.title}
                    </LinkOverlay>
                  </Navigate>
                  <Text fontSize="xs" lineHeight="5" color="charcoalGrey">
                    {healthTool.description}
                  </Text>
                </VStack>
              </HStack>
            </LinkBox>
          ))}
      </VStack>
    </>
  );
}

export function HealthToolListMobileSkeleton() {
  return (
    <VStack spacing={8} align="flex-start" width="full">
      {Array.from(Array(7).keys()).map((index) => (
        <HStack key={index} spacing={4} align="flex-start">
          <SkeletonCircle width="53px" height="53px" />
          <VStack spacing={1} align="flex-start">
            <Skeleton height="24px" width="240px" />
            <Skeleton height="20px" width="242px" />
          </VStack>
        </HStack>
      ))}
    </VStack>
  );
}
