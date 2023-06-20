import {
  Box,
  Checkbox,
  FamilyMemberList,
  GridBlock,
  GridBlockItem,
  HStack,
  Link,
  MyBookedTelemedicineList,
  SehatQFooter,
  Text,
  VStack,
} from "@sehatq/components";
import React from "react";
import { useNavigation } from "@sehatq/utils";
import { MyBookedTelemedicineListHead } from "@components/head";
import { SehatqNavbar } from "@components/ui/sehatq-navbar";
export type MyBookedTelemedicineListPageDesktopProps = {
  page: string;
  perPage: string;
  userId: string;
};

export function MyBookedTelemedicineListPageDesktop(
  props: MyBookedTelemedicineListPageDesktopProps
) {
  const { Navigate } = useNavigation();
  return (
    <>
      <MyBookedTelemedicineListHead />
      <SehatqNavbar
        withCompanyPartner
        placeholderSearch="Swab PCR hasil 1 hari"
      />
      <GridBlock my={6}>
        <GridBlockItem>
          <VStack
            alignItems="flex-start"
            borderRadius="2xl"
            boxShadow="base"
            p={4}
            spacing={4}
          >
            <HStack justify="space-between" width="full">
              <Text
                color="charcoalGrey"
                fontSize="lg"
                fontFamily="poppins"
                fontWeight="semibold"
              >
                Pilih Keluarga
              </Text>

              <Navigate name="TELEMED_SCHEDULE" query={{ page: "1" }}>
                <Link fontSize="md" color="charcoalGrey">
                  Semua
                  <Checkbox
                    ml={3}
                    border="0.5px solid"
                    borderColor="main.500"
                    borderRadius="base"
                    isChecked={!props.userId}
                    colorScheme="main"
                  />
                </Link>
              </Navigate>
            </HStack>
            <FamilyMemberList
              navigationValue={{ name: "TELEMED_SCHEDULE" }}
              selectedValue={props.userId}
            />
          </VStack>
        </GridBlockItem>
        <GridBlockItem>
          <Text
            as="h1"
            fontSize="4xl"
            fontWeight="semibold"
            fontFamily="poppins"
          >
            Konsultasi Saya
          </Text>
          <HStack
            mt={4}
            width="full"
            justify="space-between"
            border="0.5px solid"
            borderColor="veryLightPink"
            top="56px"
            background="white"
            borderTopRadius="xl"
          >
            <Text
              width="full"
              borderBottom="3px solid"
              color="main.500"
              borderBottomColor="main.500"
              textAlign="center"
              py={3}
              fontWeight="semibold"
              fontSize="lg"
            >
              Mendatang
            </Text>
            <Navigate name="TELEMED_HISTORIES">
              <Link
                width="full"
                textAlign="center"
                py={3}
                fontSize="lg"
                color="charcoalGrey"
              >
                Selesai
              </Link>
            </Navigate>
          </HStack>
          <MyBookedTelemedicineList
            {...props}
            p={6}
            background="linear-gradient(to bottom, #f0f9fa 0%, rgba(240, 249, 250, 0))"
            border="0.5px solid"
            borderColor="veryLightPink"
            borderBottomRadius="xl"
          />
        </GridBlockItem>
      </GridBlock>
      <Box marginY={8}>
        <SehatQFooter />
      </Box>
    </>
  );
}
