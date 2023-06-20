import React from "react";
import {
  ArrowBackIcon,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Text,
  Textarea,
  VStack,
} from "../../user-interfaces";
import { ImagesInput } from "../general";
import { ShippingAddressInput } from "../profile";
import { ConsultationProductsInfo } from "./consultation-products-info";
import { PrescriptionFormGeneralProps } from "./prescription-form-desktop";
import { PrescriptionImageExample } from "./prescription-image-example";

export type PrescriptionFormMobileProps = PrescriptionFormGeneralProps & {
  isShowAddreesInput: boolean;
  onShowAddressInput: () => void;
  onHideAddressInput: () => void;
};
export function PrescriptionFormMobile(props: PrescriptionFormMobileProps) {
  return (
    <>
      <VStack width="full" align="start" spacing={3} p={4} mb={14}>
        {props.consultationId ? (
          <ConsultationProductsInfo
            isMobile
            consultationId={props.consultationId}
          />
        ) : (
          <Text fontSize="sm" fontWeight="semibold" fontFamily="poppins">
            Upload Foto Resep
          </Text>
        )}
        <VStack
          width="full"
          align="start"
          spacing={4}
          background="white"
          borderRadius="xl"
          boxShadow="base"
          p={3}
        >
          {props.consultationId ? (
            <Text fontSize="xs" fontWeight="semibold" fontFamily="poppins">
              Catatan Penebusan Resep
            </Text>
          ) : (
            <>
              <Text fontSize="xs" fontWeight="semibold" fontFamily="poppins">
                Foto Resep (Maks. 5 Foto)
              </Text>
              <ImagesInput
                isMobile
                maxFile={5}
                onChange={(value) =>
                  props.onChangeInput({
                    name: "images",
                    value: value.map((item, index) => ({
                      id: index + 1,
                      base64: item.preview,
                    })),
                  })
                }
              />
            </>
          )}
          <FormControl variant="floating" position="relative">
            <Textarea
              value={props.values.notes ?? ""}
              border="1px solid"
              borderRadius="base"
              maxLength={255}
              height="120px"
              fontSize="sm"
              onChange={(e) => {
                e.preventDefault();
                props.onChangeInput({ name: "notes", value: e.target.value });
              }}
              background="white"
              placeholder="Catatan Penebusan Resep (opsional)"
            />
            <FormLabel fontSize="sm">Catatan</FormLabel>
            <Text
              zIndex="docked"
              position="absolute"
              right={3}
              bottom={2}
              fontSize="xs"
              color="brownGrey.500"
            >{`${props.values.notes?.length ?? 0}/255`}</Text>
          </FormControl>
        </VStack>

        {props.consultationId ? null : <PrescriptionImageExample isMobile />}
      </VStack>
      <Box
        position="fixed"
        left={0}
        bottom={0}
        p={4}
        width="full"
        background="white"
        boxShadow="lg"
      >
        <Button
          variant="solid"
          height="40px"
          borderRadius="base"
          fontSize="md"
          fontWeight="semibold"
          width="full"
          onClick={props.onShowAddressInput}
        >
          Lanjut Pilih Alamat
        </Button>
      </Box>
      <Drawer
        isOpen={props.isShowAddreesInput}
        onClose={props.onHideAddressInput}
        size="full"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader boxShadow="lg">
            <HStack width="full">
              <IconButton
                aria-label="back button"
                onClick={props.onHideAddressInput}
                variant="fit"
                colorScheme="sea"
                autoFocus={false}
                marginRight={2}
                icon={<ArrowBackIcon boxSize="28px" color="main.600" />}
                disabled={props.isLoading}
              />
              <Text
                fontSize="sm"
                fontWeight="semibold"
                color="charcoalGrey"
                fontFamily="poppins"
              >
                Upload Resep
              </Text>
            </HStack>
          </DrawerHeader>
          <DrawerBody pt={6}>
            <ShippingAddressInput
              value={props.values.userAddressId}
              onChange={(value) =>
                props.onChangeInput({ name: "userAddressId", value })
              }
              isMobile
            />
          </DrawerBody>
          <DrawerFooter boxShadow="lg">
            <Button
              variant="solid"
              height="40px"
              borderRadius="base"
              fontSize="md"
              fontWeight="semibold"
              width="full"
              onClick={props.onSubmit}
              disabled={props.isLoading}
              isLoading={props.isLoading}
            >
              Tebus Resep
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
