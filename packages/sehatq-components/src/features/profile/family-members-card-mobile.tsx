import React from "react";
import { useNavigation } from "@sehatq/utils";
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

export interface FamilyMembersCardMobileProps {
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
}

const MemberCard = (props: MemberCardProps) => {
  const { id, imgSrc, name, activeId } = props;
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
        <Navigate name="PROFILE_DETAIL" query={{ userId: id }}>
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

export function FamilyMembersCardMobile(props: FamilyMembersCardMobileProps) {
  const { title, desc, familyMembers, profileId } = props;
  const { Navigate } = useNavigation();

  return (
    <Box position="relative">
      <Box
        background="white"
        borderRadius={10}
        boxShadow="base"
        px={4}
        pt={2}
        pb="58px"
        marginX={4}
      >
        <Text fontFamily="poppins" fontWeight="semibold">
          {title}
        </Text>
        <Text fontSize="xs" marginBottom={2}>
          {desc}
        </Text>
      </Box>
      <HStack
        position="absolute"
        width="100vw"
        bottom="5px"
        left={0}
        spacing={2}
        py={2}
        overflowX="auto"
      >
        <Navigate name="PROFILE_FAMILY_ADD" query={{ userId: profileId }}>
          <Link p={3} background="paleBlue.500" borderRadius="20px" ml={8}>
            <AddIcon boxSize={4} color="main.500" />
          </Link>
        </Navigate>
        {familyMembers
          ? familyMembers.map((item, index) => (
              <Box
                key={item.id}
                pr={index === familyMembers.length - 1 ? 8 : 0}
              >
                <MemberCard activeId={profileId} {...item} />
              </Box>
            ))
          : null}
      </HStack>
    </Box>
  );
}
