import React from "react";
import { useNavigation, NavigationValue } from "@sehatq/utils";
import {
  AddIcon,
  Avatar,
  Box,
  HStack,
  Link,
  LinkBox,
  LinkOverlay,
  Text,
} from "../../user-interfaces";

export interface FamilyMembersCardDesktopProps {
  title: string;
  desc: string;
  profileId: number;
  familyMembers?: Array<Omit<MemberCardProps, "activeId">>;
}
export interface MemberCardProps {
  id: number;
  activeId: number;
  imgSrc?: string;
  name: string;
  isActive: boolean;
  profileNavigation: NavigationValue;
}

const MemberCard = (props: MemberCardProps) => {
  const { id, imgSrc, name, profileNavigation, activeId } = props;
  const { Navigate } = useNavigation();
  let { isActive } = props;
  isActive = activeId ? activeId === id : isActive;

  return (
    <LinkBox
      boxShadow="base"
      borderRadius={25}
      background={isActive ? "iceBlue.500" : "white"}
      border="1px"
      borderColor={isActive ? "main.500" : "white"}
    >
      <HStack spacing={0}>
        <Box m={1}>
          <Avatar src={imgSrc} size="sm" name={name} />
        </Box>
        <Navigate name={profileNavigation.name} query={profileNavigation.query}>
          <LinkOverlay>
            <Text
              color={isActive ? "sea.500" : "charcoalGrey"}
              fontFamily="poppins"
              fontWeight="semibold"
              fontSize="sm"
              pl={3}
              pr={4}
              d="block"
              whiteSpace="nowrap"
            >
              {name}
            </Text>
          </LinkOverlay>
        </Navigate>
      </HStack>
    </LinkBox>
  );
};

export function FamilyMembersCardDesktop(props: FamilyMembersCardDesktopProps) {
  const { title, desc, familyMembers, profileId } = props;
  const { Navigate } = useNavigation();

  return (
    <Box background="white" borderRadius={10} boxShadow="base">
      <Box px={4} pt={2} pb={2}>
        <Text fontFamily="poppins" fontWeight="semibold">
          {title}
        </Text>
        <Text fontSize="xs">{desc}</Text>
      </Box>
      <Box pb={4}>
        <HStack spacing={2} px={4} overflow="auto hidden">
          <Box background="paleBlue.500" borderRadius={40}>
            <Navigate name="PROFILE_FAMILY_ADD" query={{ userId: profileId }}>
              <Link p={3}>
                <AddIcon w={5} h={5} color="main.500" />
              </Link>
            </Navigate>
          </Box>
          {familyMembers
            ? familyMembers.map((item) => (
                <MemberCard key={item.id} {...item} activeId={profileId} />
              ))
            : null}
        </HStack>
      </Box>
    </Box>
  );
}
