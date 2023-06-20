import { ASSETS } from "@sehatq/constants";
import React from "react";
import {
  Box,
  Button,
  ChevronRightIcon,
  DocumentIcon,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  Text,
  useImage,
  VStack,
} from "../../user-interfaces";
import { PrescriptionImageExampleGeneralProps } from "./prescription-image-example-desktop";

export type PrescriptionImageExampleMobileProps =
  PrescriptionImageExampleGeneralProps & {
    onShowHideExample: () => void;
    isShowExample: boolean;
  };
export function PrescriptionImageExampleMobile(
  props: PrescriptionImageExampleMobileProps
) {
  const Image = useImage();
  return (
    <>
      <VStack align="start" width="full" spacing={3}>
        <Text
          fontSize="md"
          fontFamily="poppins"
          fontWeight="semibold"
          color="charcoalGrey"
        >
          Cara Upload Resep
        </Text>
        <VStack
          align="start"
          border="0.5px solid"
          borderColor="veryLightPink"
          borderRadius="base"
          p={3}
        >
          {props.tutorials.map((tutorial) => (
            <HStack align="start" key={tutorial}>
              <Box
                background="sea.500"
                borderRadius="full"
                boxSize="5px"
                minW="5px"
                minH="5px"
                mt="7px"
              ></Box>
              <Text color="charcoalGrey" fontSize="xs">
                {tutorial}
              </Text>
            </HStack>
          ))}
        </VStack>
        <Flex
          height="52px"
          cursor="pointer"
          direction="row"
          justify="space-between"
          onClick={props.onShowHideExample}
          width="full"
          borderRadius="xl"
          backgroundImage={ASSETS.BG_JADWAL_CHAT}
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
          backgroundPosition="center center"
          alignItems="center"
          px={3}
        >
          <HStack>
            <Box
              background="sea.500"
              borderRadius="full"
              boxSize="24px"
              textAlign="center"
              align="center"
            >
              <DocumentIcon width="12px" height="14px" mb={1} />
            </Box>
            <Text color="charcoalGrey" fontSize="sm">
              Lihat Contoh Resep
            </Text>
          </HStack>
          <ChevronRightIcon boxSize="24px" color="sea.500" />
        </Flex>
      </VStack>
      <Drawer
        isOpen={props.isShowExample}
        onClose={props.onShowHideExample}
        placement="bottom"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody>
            <Image
              alt="prescription-example"
              src={ASSETS.PRESCRIPTION_EXAMPLE}
              layout="fixed"
              width={314}
              height={398}
              wrapperProps={{
                alignSelf: "center",
                textAlign: "center",
                my: 4,
              }}
            />
            <Button
              variant="outline"
              colorScheme="main"
              width="full"
              borderRadius="base"
              color="sea.500"
              fontSize="md"
              fontWeight="semibold"
              borderColor="main.500"
              onClick={props.onShowHideExample}
            >
              Tutup
            </Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
