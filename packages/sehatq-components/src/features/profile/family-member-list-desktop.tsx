import { NavigationValue, useNavigation } from "@sehatq/utils";
import React from "react";
import {
  Box,
  Flex,
  LinkBox,
  LinkOverlay,
  Skeleton,
  SkeletonCircle,
  Text,
  useImage,
  VStack,
} from "../../user-interfaces";

export type FamilyMemberListDesktopProps = {
  members: {
    id: string;
    name: string;
    photoUrl: string;
    relation?: string;
  }[];
  selectedValue?: string;
  navigationValue?: NavigationValue;
};

export function FamilyMemberListDesktop(props: FamilyMemberListDesktopProps) {
  const Image = useImage();
  const { Navigate } = useNavigation();
  return (
    <VStack width="full" alignItems="flex-start">
      {props.members.map((member) => (
        <LinkBox key={member.id} width="full">
          <Flex
            p={2}
            background={
              props.selectedValue == member.id ? "iceBlue.500" : undefined
            }
            border={props.selectedValue == member.id ? "1px solid" : undefined}
            borderColor={
              props.selectedValue == member.id ? "main.500" : undefined
            }
            borderRadius="xl"
            direction="row"
            width="full"
            align="center"
          >
            <Image
              alt={member.name}
              src={member.photoUrl}
              layout="fill"
              objectFit="cover"
              sizes="64px"
              wrapperProps={{
                boxSize: "64px",
                position: "relative",
                borderRadius: "full",
                overflow: "hidden",
              }}
            />
            <Box ml={3}>
              <Navigate
                name={props.navigationValue?.name ?? "MY_TELEMEDICINES"}
                query={{
                  ...props.navigationValue?.query,
                  userId: member.id,
                }}
                options={props.navigationValue?.options}
              >
                <LinkOverlay
                  fontSize="md"
                  fontFamily="poppins"
                  fontWeight="semibold"
                  color="charcoalGrey"
                  noOfLines={1}
                >
                  {member.name}
                </LinkOverlay>
              </Navigate>
              <Text
                noOfLines={1}
                fontSize="sm"
                fontFamily="openSans"
                color="charcoalGrey"
              >
                {member.relation}
              </Text>
            </Box>
          </Flex>
        </LinkBox>
      ))}
    </VStack>
  );
}

export function FamilyMemberListDesktopSkeleton() {
  return (
    <VStack width="full" alignItems="flex-start">
      {Array.from(Array(2).keys()).map((index) => (
        <Flex key={index} direction="row" width="full">
          <SkeletonCircle boxSize="64px" />
          <Box ml={3}>
            <Skeleton width="180px" height="24px" mb={1} />
            <Skeleton width="80px" height="22px" />
          </Box>
        </Flex>
      ))}
    </VStack>
  );
}
