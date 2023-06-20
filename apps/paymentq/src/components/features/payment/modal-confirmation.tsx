import React from "react";

import {
  Text,
  Flex,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  Button,
} from "@sehatq/components";

type ModalConfirmationMobileProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfrim: () => void;
};

export function ModalConfirmationMobile(props: ModalConfirmationMobileProps) {
  const { isOpen, onClose, onConfrim } = props;
  return (
    <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent roundedTop="xl" pt={5} pb={10}>
        <DrawerBody>
          <Text>Cancel payment using this method?</Text>
          <Text>If cancelled, all filled information will not be saved.</Text>
          <Flex justifyContent="space-between" mt={3}>
            <Button onClick={onClose} bgColor="iceBlue.900">
              No
            </Button>
            <Button onClick={onConfrim} bgColor="cherry.300">
              Yes, cancel
            </Button>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
