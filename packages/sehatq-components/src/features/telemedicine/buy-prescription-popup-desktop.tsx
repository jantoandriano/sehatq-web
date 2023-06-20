import React from "react";
import { useNavigation } from "@sehatq/utils";
import {
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  Box,
  Link,
  Text,
  ListItem,
  UnorderedList,
  VStack,
  Skeleton,
} from "../../user-interfaces";

type BuyPrescriptionPopupDesktopProps = {
  prescriptionNo: string;
  productNames: string[];
  isLoading: boolean;
  isOpen: boolean;
  onClose: () => void;
};

export function BuyPrescriptionPopupDesktop(
  props: BuyPrescriptionPopupDesktopProps
) {
  const { prescriptionNo, productNames, isLoading, isOpen, onClose } = props;
  const { Navigate } = useNavigation();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton h={6} w={6} top="3" color="brownGrey.500" />
        <ModalHeader fontFamily="poppins" paddingBottom={0} paddingTop={9}>
          Tebus Obat Sekarang
        </ModalHeader>
        <ModalBody>
          <Text>
            Kamu bisa tebus obat dari Toko SehatQ atau Apotek yang bekerjasama
            dengan SehatQ
          </Text>
          <Box
            background="iceBlue.500"
            padding={4}
            borderRadius="lg"
            marginTop={5}
          >
            {isLoading ? (
              <VStack width="100%" align="start">
                {Array.from(Array(4).keys()).map((value) => (
                  <Skeleton key={value} height="14px" width="80%" />
                ))}
              </VStack>
            ) : (
              <UnorderedList>
                {productNames.map((productName) => (
                  <ListItem key={productName}>{productName}</ListItem>
                ))}
              </UnorderedList>
            )}
          </Box>
        </ModalBody>
        <ModalFooter>
          {isLoading ? (
            <Skeleton height="40px" width="100%" />
          ) : (
            <Navigate name="PRESCRIPTION" query={{ prescriptionNo }}>
              <Link variant="solid" colorScheme="main" width="full">
                Tebus Obat
              </Link>
            </Navigate>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
