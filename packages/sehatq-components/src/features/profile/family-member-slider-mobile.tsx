import React, { useState } from "react";
import { useAssets } from "@sehatq/utils";

import {
  VStack,
  Box,
  Text,
  Flex,
  LinkBox,
  LinkOverlay,
  Skeleton,
  SkeletonCircle,
  HStack,
  useImage,
} from "../../user-interfaces";

interface ListGroupProps {
  id: string;
  label: string;
  photoUrl: string;
  gender: "m" | "f" | "";
  uuid: string;
}

const FamilyMemberItem = (props: {
  familyMember: ListGroupProps[][0];
  onFamilyMemberClick: (familyMember: ListGroupProps[][0]) => void;
  userId?: string;
}) => {
  const [isBrokenAvatar, setIsBrokenAvatar] = useState(false);
  const Image = useImage();
  const { familyMember, onFamilyMemberClick, userId } = props;
  const ASSETS = useAssets([
    "PROFILE_PLACEHOLDER_MAN",
    "PROFILE_PLACEHOLDER_WOMAN",
  ]);

  const placeholderImage =
    familyMember.gender === "f"
      ? ASSETS.PROFILE_PLACEHOLDER_WOMAN
      : ASSETS.PROFILE_PLACEHOLDER_MAN;

  function onAvatarError() {
    setIsBrokenAvatar(true);
  }

  return (
    <LinkBox width="80px" cursor="pointer">
      <VStack spacing={1.5}>
        <Box p={1}>
          <Image
            src={
              !isBrokenAvatar && familyMember.photoUrl
                ? familyMember.photoUrl
                : placeholderImage
            }
            onError={onAvatarError}
            alt={familyMember.label}
            layout="fill"
            objectFit="cover"
            wrapperProps={{
              width: "66px",
              height: "66px",
              position: "relative",
              borderRadius: "full",
              ...(familyMember.id === userId && {
                border: "2px solid",
                color: "main.500",
              }),
              overflow: "hidden",
            }}
          />
        </Box>
        <LinkOverlay
          textAlign="center"
          onClick={() => onFamilyMemberClick(familyMember)}
          width="100%"
        >
          <Text
            color={familyMember.id === userId ? "sea.500" : "charcoalGrey"}
            fontFamily="poppins"
            fontWeight={familyMember.id === userId ? "semibold" : "normal"}
            fontSize="sm"
            lineHeight={3}
            d="block"
            noOfLines={2}
            width="100%"
          >
            {familyMember.label}
          </Text>
        </LinkOverlay>
      </VStack>
    </LinkBox>
  );
};

export interface FamilyMemberSliderMobileProps {
  familyMembers: ListGroupProps[];
  onFamilyMemberClick: (familyMember: ListGroupProps[][0]) => void;
  userId?: string;
}

export function FamilyMemberSliderMobile({
  familyMembers,
  userId,
  onFamilyMemberClick,
}: FamilyMemberSliderMobileProps) {
  return (
    <>
      <Flex width="100%" pb={4} overflowX="auto">
        {familyMembers?.length
          ? familyMembers.map((familyMember, index) => (
              <Box
                minW="80px"
                key={familyMember.id}
                marginRight={2}
                marginLeft={index === 0 ? 3 : 0}
              >
                <FamilyMemberItem
                  familyMember={familyMember}
                  userId={userId}
                  onFamilyMemberClick={onFamilyMemberClick}
                />
              </Box>
            ))
          : null}
      </Flex>
    </>
  );
}

export function FamilyMemberSliderMobileSkeleton() {
  return (
    <HStack spacing={2.5} width="100%">
      {Array.from(Array(4).keys()).map((id) => (
        <VStack key={id} spacing={1.5} width="80px">
          <Box p={1}>
            <SkeletonCircle boxSize="66px" />
          </Box>
          <Skeleton width="52px" height="16px" />
        </VStack>
      ))}
    </HStack>
  );
}
