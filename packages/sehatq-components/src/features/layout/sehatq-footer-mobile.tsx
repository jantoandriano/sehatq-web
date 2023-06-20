import React from "react";
import { UseMutationResult } from "react-query";
import { useAssets, useNavigation, NavigationValue } from "@sehatq/utils";
import {
  MENU_FEATURES,
  MENU_COMPANIES,
  MENU_SUPPORTS,
  MENU_PARTNERS,
  MENU_SOCIAL_MEDIA,
} from "@sehatq/constants";
import {
  useImage,
  Divider,
  Box,
  Text,
  List,
  ListItem,
  Link,
  Flex,
  HStack,
  InputGroup,
  Input,
  InputRightElement,
  SendIcon,
  RadioGroup,
  RadioGroupProps,
  FormControl,
  FormErrorMessage,
} from "../../user-interfaces";
import { SubmitNewsLetterVariables } from "./news-letter-queries";

export type SehatQFooterMobileProps = {
  newsletterRadio: RadioGroupProps;
  onSubmit: React.FormEventHandler<HTMLDivElement>;
  onChangeEmail: React.ChangeEventHandler<HTMLInputElement>;
  submitNewsLetter: UseMutationResult<
    {
      message: string;
    },
    {
      url: string | undefined;
      message: string;
      status: number | null;
      clientId: string;
    },
    SubmitNewsLetterVariables,
    unknown
  >;
  stateErrorNewsLetter: string;
  contactPhone: string;
};

export function SehatQFooterMobile(props: SehatQFooterMobileProps) {
  const Image = useImage();
  const ASSETS = useAssets([
    "SEHATQ_WITH_TEXT",
    "DOWNLOAD_APPLE_ICON",
    "DOWNLOAD_GOOGLE_ICON",
    "BANK_BCA_ICON",
    "BANK_BNI_ICON",
    "BANK_MANDIRI_ICON",
    "BANK_PERMATA_ICON",
    "CC_AMERICAN_EXPRESS_ICON",
    "CC_JCB_ICON",
    "CC_MASTER_CARD_ICON",
    "CC_VISA_ICON",
    "GOPAY_ICON",
    "CONTACT_PHONE_ICON",
  ]);
  const { Navigate } = useNavigation();
  const {
    onSubmit,
    newsletterRadio,
    onChangeEmail,
    submitNewsLetter,
    stateErrorNewsLetter,
    contactPhone,
  } = props;

  function renderLinkItem(props: {
    item: {
      id: number;
      label: string;
      navigationName: NavigationValue["name"];
    };
  }) {
    const { item } = props;
    return (
      <ListItem key={item.id}>
        <Navigate name={item.navigationName}>
          <Link
            minW="auto"
            color="charcoalGrey"
            fontSize="xs"
            _hover={{
              textDecoration: "none",
              color: "main.500",
            }}
          >
            {item.label}
          </Link>
        </Navigate>
      </ListItem>
    );
  }

  return (
    <Box bg="white" pt={3}>
      <HStack mb={1} spacing={1}>
        <Text as="h4" fontFamily="poppins" fontWeight="semibold" fontSize="xs">
          Butuh Bantuan?
        </Text>
        <Navigate name="CONTACT">
          <Link
            as="h4"
            fontFamily="poppins"
            fontWeight="semibold"
            color="sea.500"
            fontSize="xs"
          >
            Hubungi Kami
          </Link>
        </Navigate>
      </HStack>
      <Text fontSize="xs" mb={2}>
        Jam operasional: 07.00 - 20.00
      </Text>
      <HStack spacing={2} mb={5}>
        <Image
          src={ASSETS.CONTACT_PHONE_ICON}
          alt="Hubungi Kami"
          width={16}
          height={16}
        />
        <Link href={`tel:${contactPhone}`} color="charcoalGrey" fontSize="xs">
          {contactPhone}
        </Link>
      </HStack>
      <Flex mb={5}>
        <Box flexGrow="1">
          <Text
            as="h4"
            fontFamily="poppins"
            fontWeight="semibold"
            fontSize="xs"
            mb={2}
          >
            Fitur
          </Text>
          <List spacing={1} mb={5}>
            {MENU_FEATURES.map((item) => renderLinkItem({ item }))}
          </List>
          <Text
            as="h4"
            fontFamily="poppins"
            fontWeight="semibold"
            fontSize="xs"
            mb={2}
          >
            Perusahaan
          </Text>
          <List spacing={1}>
            {MENU_COMPANIES.map((item) => renderLinkItem({ item }))}
          </List>
        </Box>
        <Box flexGrow="1">
          <Text
            as="h4"
            fontFamily="poppins"
            fontWeight="semibold"
            fontSize="xs"
            mb={2}
          >
            Dukungan
          </Text>
          <List spacing={1} mb={5}>
            {MENU_SUPPORTS.map((item) => renderLinkItem({ item }))}
          </List>
          <Text
            as="h4"
            fontFamily="poppins"
            fontWeight="semibold"
            fontSize="xs"
            mb={2}
          >
            Daftar Menjadi Mitra
          </Text>
          <List spacing={1}>
            {MENU_PARTNERS.map((item) => renderLinkItem({ item }))}
          </List>
        </Box>
      </Flex>
      <Box pb={3}>
        <Text
          as="h4"
          fontFamily="poppins"
          fontWeight="semibold"
          fontSize="xs"
          mb={2}
        >
          Langganan Newsletter
        </Text>
        <Text fontSize="xs" mb={3}>
          Jadi orang yang pertama tahu info &amp; promosi kesehatan terbaru dari
          SehatQ. Gratis.
        </Text>
        <Box as="form" onSubmit={onSubmit} mb={6}>
          <Box mb={3.5}>
            <RadioGroup {...newsletterRadio} isRadioInline={true} spacing={6} />
          </Box>
          <FormControl isInvalid={!!stateErrorNewsLetter}>
            <InputGroup variant="outline" background="white">
              <Input
                isDisabled={submitNewsLetter.isLoading}
                name="newsletterEmail"
                placeholder="Email"
                type="email"
                pr="10"
                autoComplete="off"
                borderColor="veryLightPink"
                onChange={onChangeEmail}
                _placeholder={{ color: "veryLightPink" }}
                _hover={{ borderColor: "veryLightPink" }}
              />
              <InputRightElement cursor="pointer" as="button" type="submit">
                {submitNewsLetter.isLoading ? (
                  <Text fontSize="xs" fontWeight="semibold">
                    Loading
                  </Text>
                ) : (
                  <SendIcon w="23px" h="23px" />
                )}
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{stateErrorNewsLetter}</FormErrorMessage>
          </FormControl>
        </Box>
        <HStack spacing={1} mb={4}>
          {MENU_SOCIAL_MEDIA.map((item) => (
            <Navigate name={item.navigationName} key={item.id}>
              <Link
                color="charcoalGrey"
                fontSize="xs"
                _hover={{
                  textDecoration: "none",
                }}
              >
                <Image
                  src={item.iconUrl.mobile}
                  alt={item.label}
                  width={24}
                  height={24}
                />
              </Link>
            </Navigate>
          ))}
        </HStack>
        <Divider borderColor="veryLightPink" mb={3} />
        <Text
          as="h4"
          fontFamily="poppins"
          fontWeight="semibold"
          fontSize="xs"
          mb={3}
        >
          Metode Pembayaran
        </Text>
        <HStack spacing={0} flexWrap="wrap" mb={4}>
          <Image
            src={ASSETS.BANK_BCA_ICON}
            alt="Bank BCA"
            width={59}
            height={25}
          />
          <Image
            src={ASSETS.BANK_MANDIRI_ICON}
            alt="Bank Mandiri"
            width={59}
            height={25}
          />
          <Image
            src={ASSETS.BANK_BNI_ICON}
            alt="Bank BNI"
            width={59}
            height={25}
          />
          <Image
            src={ASSETS.BANK_PERMATA_ICON}
            alt="Bank Permata"
            width={59}
            height={25}
          />
        </HStack>
        <HStack spacing={0} flexWrap="wrap">
          <Image
            src={ASSETS.CC_VISA_ICON}
            alt="Credit Card Visa"
            width={66}
            height={25}
          />
          <Image
            src={ASSETS.CC_MASTER_CARD_ICON}
            alt="Credit Card Master Card"
            width={39}
            height={25}
          />
          <Image
            src={ASSETS.CC_AMERICAN_EXPRESS_ICON}
            alt="Credit Card American Express"
            width={39}
            height={25}
          />
          <Image
            src={ASSETS.CC_JCB_ICON}
            alt="Credit Card JCB"
            width={39}
            height={25}
          />
          <Image src={ASSETS.GOPAY_ICON} alt="Gopay" width={59} height={25} />
        </HStack>
        <Divider borderColor="veryLightPink" mb={3} mt={3} />
        <Text fontSize="xxs" color="brownGrey.500">
          &copy; SehatQ, {new Date().getFullYear()}. All Rights Reserved
        </Text>
      </Box>
    </Box>
  );
}
