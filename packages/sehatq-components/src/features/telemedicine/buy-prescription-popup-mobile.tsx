import React from "react";
import { useNavigation } from "@sehatq/utils";
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  Box,
  Text,
  Link,
  ListItem,
  UnorderedList,
  VStack,
  Skeleton,
} from "../../user-interfaces";

type BuyPrescriptionPopupMobileProps = {
  prescriptionNo: string;
  productNames: string[];
  isLoading: boolean;
  isOpen: boolean;
  onClose: () => void;
};

export function BuyPrescriptionPopupMobile(
  props: BuyPrescriptionPopupMobileProps
) {
  const { prescriptionNo, productNames, isLoading, isOpen, onClose } = props;
  const { Navigate } = useNavigation();
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="bottom">
      <DrawerOverlay />
      <DrawerContent borderTopLeftRadius="lg" borderTopRightRadius="lg">
        <DrawerHeader
          fontFamily="poppins"
          paddingBottom={0}
          paddingTop={6}
          fontSize="md"
        >
          Tebus Obat Sekarang
        </DrawerHeader>
        <DrawerBody>
          <Text fontSize="sm">
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
                  <Skeleton key={value} height="12px" width="80%" />
                ))}
              </VStack>
            ) : (
              <UnorderedList>
                {productNames.map((productName) => (
                  <ListItem key={productName} fontSize="sm">
                    {productName}
                  </ListItem>
                ))}
              </UnorderedList>
            )}
          </Box>
        </DrawerBody>
        <DrawerFooter>
          {isLoading ? (
            <Skeleton height="40px" width="100%" />
          ) : (
            <Navigate name="PRESCRIPTION" query={{ prescriptionNo }}>
              <Link variant="solid" colorScheme="main" width="full">
                Tebus Obat
              </Link>
            </Navigate>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
