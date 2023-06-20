import React from "react";

import {
  Button,
  Box,
  Text,
  Drawer,
  ListGroup,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  ListGroupProps,
  ChevronDownIcon,
} from "../../user-interfaces";

export interface FamilyMemberMenuMobileProps {
  familyMembers: ListGroupProps["list"];
  onFamilyMemberClick: (familyMember: ListGroupProps["list"][0]) => void;
  getFirstName: (label: string) => string;
  activeFamily: string;
  onClose: () => void;
  onOpen: () => void;
  isOpen: boolean;
  popUpTitle: string;
}

export function FamilyMemberMenuMobile({
  familyMembers,
  activeFamily,
  onFamilyMemberClick,
  onClose,
  onOpen,
  getFirstName,
  isOpen,
  popUpTitle,
}: FamilyMemberMenuMobileProps) {
  const labelActiveFamily =
    activeFamily && familyMembers.find((family) => family.id === activeFamily);
  return (
    <>
      <Button
        variant="fit"
        colorScheme="sea"
        rightIcon={<ChevronDownIcon color="charcoalGrey" />}
        onClick={onOpen}
        fontSize="sm"
        maxW="150px"
      >
        <Text isTruncated>
          {labelActiveFamily
            ? getFirstName(labelActiveFamily.label)
            : "Semua Keluarga"}
        </Text>
      </Button>
      <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent borderTopRadius="lg" maxHeight="calc(100vh - 45px)">
          <DrawerBody>
            <Box pt={3} pb={2}>
              <Text
                fontFamily="poppins"
                fontWeight="semibold"
                fontSize="md"
                mb={2.5}
              >
                {popUpTitle}
              </Text>
              <ListGroup
                list={familyMembers}
                activeItems={[activeFamily]}
                onClick={onFamilyMemberClick}
              />
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
