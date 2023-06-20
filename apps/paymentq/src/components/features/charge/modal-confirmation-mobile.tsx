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

type ModalConfirmationExitMobileProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfrim: () => void;
  isLoadingCancelPurchase?: boolean;
};

export function ModalConfirmationExitMobile(
  props: ModalConfirmationExitMobileProps
) {
  const { isOpen, onClose, onConfrim, isLoadingCancelPurchase } = props;

  return (
    <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent roundedTop="xl" pt={5} pb={10}>
        <DrawerBody>
          <Text>Cancel payment using this method?</Text>
          <Text>If cancelled, all filled information will not be saved.</Text>
          <Flex justifyContent="space-between" mt={3}>
            <Button
              onClick={onClose}
              bgColor="iceBlue.900"
              isDisabled={isLoadingCancelPurchase}
            >
              No
            </Button>
            <Button
              onClick={onConfrim}
              bgColor="cherry.300"
              isLoading={isLoadingCancelPurchase}
            >
              Yes, cancel
            </Button>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
