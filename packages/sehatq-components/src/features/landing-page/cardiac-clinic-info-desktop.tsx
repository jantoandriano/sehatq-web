import React from "react";

import { useAssets, useNavigation } from "@sehatq/utils";
import {
  Box,
  useImage,
  Text,
  HStack,
  Link,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "../../user-interfaces";

export type CardiacClinicInfoContent = {
  id: number;
  title: string;
  description: string;
};
export type CardiacClinicInfoDesktopProps = {
  contents: CardiacClinicInfoContent[];
};

export function CardiacClinicInfoDesktop(props: CardiacClinicInfoDesktopProps) {
  const { contents } = props;
  const Image = useImage();
  const { Navigate } = useNavigation();
  const ASSETS = useAssets([
    "BANNER_CARDIAC_CLINIC_INFO",
    "ILLUSTRATION_BOTTLE_DIABETES",
    "ICON_DRINKING_BOTTLES",
    "ILLUSTRATION_DOCTOR_DIABETES",
    "ICON_HOT_STOMACH",
    "ICON_COMMENT_LIKE",
  ]);

  return (
    <HStack column={2} gap={10}>
      <Box flex="1" position="relative">
        <Box position="absolute" top="180px" zIndex={1}>
          <Box mx={8}>
            <Text
              fontFamily="Poppins"
              fontWeight="bold"
              lineHeight="60px"
              letterSpacings="0.01em"
              color="white"
              fontSize="40px"
              mb={7}
            >
              Kamu wajib tau nih!
            </Text>
            <Box
              fontFamily="Poppins"
              lineHeight="11"
              color="white"
              fontSize="md"
              mb={8}
            >
              <Text>
                Organisasi Kesehatan Dunia (WHO) mengestimasi terdapat 17,9 juta
                jiwa setiap tahunnya meninggal akibat penyakit kardiovaskular.
                Empat dari lima kematian disebabkan oleh serangan jantung dan
                stroke. Bahkan, sepertiga dari kematian tersebut terjadi di
                bawah usia 70 tahun
              </Text>
              <Text fontStyle="italic" mt={10} fontSize="sm">
                (World Health Organization)
              </Text>
            </Box>
            <Navigate name="DISEASE" query={{ slugs: ["penyakit-jantung"] }}>
              <Link
                fontWeight="semibold"
                fontSize="sm"
                color="charcoalGrey"
                bgColor="white"
                whiteSpace="nowrap"
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
          </Box>
        </Box>
        <Image
          priority
          src={ASSETS.BANNER_CARDIAC_CLINIC_INFO}
          alt="ilustrasi diabetes"
          width={570}
          height={658}
          layout="fixed"
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
                      py={6}
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
                        fontSize="xl"
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
                    <AccordionPanel px={0} py={5}>
                      <Text
                        fontSize="md"
                        lineHeight="11"
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
    </HStack>
  );
}
