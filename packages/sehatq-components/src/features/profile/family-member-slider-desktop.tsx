import React, { useState } from "react";
import { useAssets } from "@sehatq/utils";

import {
  Slider,
  VStack,
  Box,
  Text,
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

type FamilyMemberItemProps = {
  familyMember: ListGroupProps[][0];
  onFamilyMemberClick: (familyMember: ListGroupProps[][0]) => void;
  userId?: string;
};

const FamilyMemberItem = (props: FamilyMemberItemProps) => {
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

export interface FamilyMemberSliderDesktopProps {
  familyMembers: ListGroupProps[];
  onFamilyMemberClick: (familyMember: ListGroupProps[][0]) => void;
  userId?: string;
}

export function FamilyMemberSliderDesktop({
  familyMembers,
  userId,
  onFamilyMemberClick,
}: FamilyMemberSliderDesktopProps) {
  return (
    <Box p={3}>
      {familyMembers?.length ? (
        <Slider
          slides={familyMembers}
          slideGap={2.5}
          startSlideIndex={
            familyMembers &&
            familyMembers.findIndex((data) => data.id === userId)
          }
          renderSlide={({ slide: familyMember }) => (
            <FamilyMemberItem
              familyMember={familyMember}
              userId={userId}
              onFamilyMemberClick={onFamilyMemberClick}
            />
          )}
        />
      ) : null}
    </Box>
  );
}

export function FamilyMemberSliderDesktopSkeleton() {
  return (
    <HStack spacing={2.5} width="100%">
      {Array.from(Array(7).keys()).map((id) => (
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
