import React from "react";

import { useAssets, useNavigation } from "@sehatq/utils";
import {
  Box,
  useImage,
  Text,
  VStack,
  Link,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Flex,
} from "../../user-interfaces";

export type CardiacClinicInfoContent = {
  id: number;
  title: string;
  description: string;
};
export type CardiacClinicInfoMobileProps = {
  contents: CardiacClinicInfoContent[];
};

export function CardiacClinicInfoMobile(props: CardiacClinicInfoMobileProps) {
  const { contents } = props;
  const Image = useImage();
  const { Navigate } = useNavigation();
  const ASSETS = useAssets([
    "BANNER_CARDIAC_CLINIC_INFO_MOBILE",
    "ILLUSTRATION_BOTTLE_DIABETES",
    "ICON_DRINKING_BOTTLES",
    "ILLUSTRATION_DOCTOR_DIABETES",
    "ICON_HOT_STOMACH",
    "ICON_COMMENT_LIKE",
  ]);

  return (
    <VStack gap={10} w="full">
      <Box flex="1" position="relative" w="full">
        <Box position="absolute" top="22%" bottom={10} zIndex={1}>
          <Flex mx={8} flexDir="column" justifyContent="space-between" h="full">
            <Text
              fontFamily="Poppins"
              fontWeight="bold"
              lineHeight="40px"
              letterSpacings="0.01em"
              color="white"
              fontSize="3xl"
            >
              Kamu wajib tau nih!
            </Text>
            <Box
              fontFamily="Poppins"
              lineHeight="7"
              color="white"
              fontSize="sm"
            >
              <Text>
                Organisasi Kesehatan Dunia (WHO) mengestimasi terdapat 17,9 juta
                jiwa setiap tahunnya meninggal akibat penyakit kardiovaskular. 4
                dari 5 kematian disebabkan oleh serangan jantung dan stroke.
                Bahkan, sepertiga dari kematian tersebut terjadi di bawah usia
                70 tahun.
              </Text>
            </Box>
            <Text
              fontStyle="italic"
              fontSize="sm"
              color="white"
              fontFamily="Poppins"
            >
              (World Health Organization)
            </Text>
            <Navigate name="DISEASE" query={{ slugs: ["penyakit-jantung"] }}>
              <Link
                fontWeight="semibold"
                fontSize="sm"
                color="charcoalGrey"
                bgColor="white"
                whiteSpace="nowrap"
                py={3}
                px={10}
                textAlign="center"
                borderRadius="base"
                shadow="md"
                fontFamily="Poppins"
                variant="unstyled"
              >
                <Text py={3} px={10}>
                  Baca Info Penyakit Jantung
                </Text>
              </Link>
            </Navigate>
          </Flex>
        </Box>
        <Image
          priority
          src={ASSETS.BANNER_CARDIAC_CLINIC_INFO_MOBILE}
          alt="ilustrasi diabetes"
          width={328}
          height={529}
          layout="responsive"
          wrapperProps={{
            width: "100%",
          }}
        />
      </Box>
      <Box flex="1">
        <Box>
          <Accordion w="100%" allowMultiple>
            {contents.map(
              (content: CardiacClinicInfoContent, index: number) => {
                return (
                  <AccordionItem
                    key={content.id}
                    {...(index > 0 && { borderTopColor: "veryLightPink" })}
                  >
                    <AccordionButton
                      px={0}
                      py={4}
                      justifyContent="space-between"
                      _focus={{ boxShadow: "none" }}
                      _hover={{ bgColor: "transparent" }}
                      _expanded={{
                        borderBottom: "1px solid #DADADA",
                      }}
                    >
                      <Text
                        color="black"
                        fontWeight="semibold"
                        fontFamily="Poppins"
                        fontSize="md"
                        lineHeight="7"
                        textAlign="left"
                      >
                        {content.title}
                      </Text>
                      <AccordionIcon
                        width={6}
                        height={6}
                        marginLeft={2}
                        color="sea.500"
                      />
                    </AccordionButton>
                    <AccordionPanel px={0} py={4}>
                      <Text
                        fontSize="sm"
                        lineHeight="9"
                        color="#36454F"
                        letterSpacing="0.01em"
                      >
                        {content.description}
                      </Text>
                    </AccordionPanel>
                  </AccordionItem>
                );
              }
            )}
          </Accordion>
        </Box>
      </Box>
    </VStack>
  );
}
