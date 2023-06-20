import React from "react";

import {
  Button,
  ChevronDownIcon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
} from "../../user-interfaces";

interface ListGroupProps {
  id: string;
  label: string;
  photoUrl?: string;
}

export interface FamilyMemberMenuDesktopProps {
  familyMembers: ListGroupProps[];
  onFamilyMemberClick: (familyMember: ListGroupProps[][0]) => void;
  activeFamily: string;
  getFirstName: (label: string) => string;
}

export function FamilyMemberMenuDesktop({
  familyMembers,
  activeFamily,
  onFamilyMemberClick,
  getFirstName,
}: FamilyMemberMenuDesktopProps) {
  const labelActiveFamily =
    activeFamily && familyMembers.find((family) => family.id === activeFamily);

  return (
    <>
      <Menu>
        <MenuButton
          as={Button}
          variant="solid"
          colorScheme="iceBlue"
          color="sea.500"
          rightIcon={<ChevronDownIcon color="main.900" />}
          maxW="full"
          sx={{
            "& > span": {
              minW: 0,
              maxW: "full",
              overflow: "hidden",
              textOverflow: "ellipsis",
            },
          }}
          isTruncated
        >
          {labelActiveFamily
            ? getFirstName(labelActiveFamily.label)
            : "Semua Keluarga"}{" "}
        </MenuButton>
        <MenuList height="350px" overflow="auto">
          {familyMembers?.map((familyMember) => (
            <MenuItem
              key={familyMember.id}
              fontSize="sm"
              minH="48px"
              onClick={() => onFamilyMemberClick(familyMember)}
              {...(activeFamily === familyMember.id && {
                bgColor: "iceBlue.500",
              })}
              {...(activeFamily === familyMember.id && {
                color: "sea.500",
                fontWeight: "semibold",
              })}
              {...(familyMember.id !== "all" && {
                icon: (
                  <Avatar
                    name={familyMember.label}
                    src={familyMember.photoUrl}
                    width="30px"
                    height="30px"
                  />
                ),
              })}
              {...(familyMember.id === "all" && {
                justifyContent: "center",
              })}
            >
              {familyMember.label}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </>
  );
}
