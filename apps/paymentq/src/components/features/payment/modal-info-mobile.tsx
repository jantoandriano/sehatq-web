import React from "react";
import {
  Box,
  Center,
  Text,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  Button,
  Image,
} from "@sehatq/components";
import { type ModalInfoGeneralProps } from "./modal-info";

export function ModalInfoMobile(props: ModalInfoGeneralProps) {
  const { isOpenModalInfo, modalData, onConfrim } = props;
  return (
    <Drawer placement="bottom" onClose={onConfrim} isOpen={isOpenModalInfo}>
      <DrawerOverlay />
      <DrawerContent roundedTop="xl" pt={5} pb={10}>
        {modalData?.image && (
          <Center>
            <Image
              src={modalData?.image || ""}
              alt="icon payment"
              width="150px"
            />
          </Center>
        )}
        <DrawerBody>
          <Box mb={4}>
            <Center>
              <Text as="b">{modalData?.title || ""}</Text>
            </Center>
          </Box>
          <Box mb={4}>
            <Text align="center">{modalData?.description || ""}</Text>
          </Box>
          <Center>
            <Button onClick={onConfrim}>{modalData?.btnText || ""}</Button>
          </Center>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
