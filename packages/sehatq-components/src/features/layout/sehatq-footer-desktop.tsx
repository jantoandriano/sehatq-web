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
  Box,
  Text,
  List,
  ListItem,
  Link,
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
import { SimpleBlock } from "./simple-block";
import { SubmitNewsLetterVariables } from "./news-letter-queries";

export type SehatQFooterDesktopProps = {
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

export function SehatQFooterDesktop(props: SehatQFooterDesktopProps) {
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
      iconUrl?: {
        desktop?: string;
        mobile?: string;
      };
    };
    noHover?: boolean;
  }) {
    const { item, noHover = false } = props;
    return (
      <ListItem key={item.id}>
        <Navigate name={item.navigationName}>
          <Link
            minW="auto"
            color="charcoalGrey"
            fontSize="sm"
            display="inline-flex"
            alignItems="center"
            _hover={{
              textDecoration: "none",
              ...(!noHover && { color: "main.500" }),
            }}
          >
            {item.iconUrl && item.iconUrl.desktop ? (
              <Image
                src={item.iconUrl.desktop}
                alt={item.label}
                width={14}
                height={14}
                layout="fixed"
                wrapperProps={{
                  mr: 3,
                }}
              />
            ) : null}
            {item.label}
          </Link>
        </Navigate>
      </ListItem>
    );
  }

  return (
    <Box bg="white">
      <SimpleBlock>
        <Image
          src={ASSETS.SEHATQ_WITH_TEXT}
          alt="logo-sehatq"
          width={164}
          height={36}
        />
        <HStack my={6} spacing={5} align="flex-start">
          <Box flexGrow="1" flexBasis="0px">
            <Text as="h4" fontFamily="poppins" fontWeight="semibold" mb={3.5}>
              Langganan Newsletter
            </Text>
            <Text fontSize="sm" mb={3.5}>
              Jadi orang yang pertama tahu info &amp; promosi kesehatan terbaru
              dari SehatQ. Gratis.
            </Text>
            <Box as="form" onSubmit={onSubmit} mb="30px">
              <Box mb={3.5}>
                <RadioGroup
                  {...newsletterRadio}
                  isRadioInline={true}
                  spacing={6}
                />
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
            <Text as="h4" fontFamily="poppins" fontWeight="semibold" mb={3.5}>
              Metode Pembayaran
            </Text>
            <HStack spacing={0} flexWrap="wrap" mb={4}>
              <Image
                src={ASSETS.BANK_BCA_ICON}
                alt="Bank BCA"
                height={31}
                width={74}
              />
              <Image
                src={ASSETS.BANK_MANDIRI_ICON}
                alt="Bank Mandiri"
                height={31}
                width={74}
              />
              <Image
                src={ASSETS.BANK_BNI_ICON}
                alt="Bank BNI"
                height={31}
                width={74}
              />
              <Image
                src={ASSETS.BANK_PERMATA_ICON}
                alt="Bank Permata"
                height={31}
                width={74}
              />
            </HStack>
            <HStack spacing={0} flexWrap="wrap">
              <Image
                src={ASSETS.CC_VISA_ICON}
                alt="Credit Card Visa"
                height={28}
                width={74}
              />
              <Image
                src={ASSETS.CC_MASTER_CARD_ICON}
                alt="Credit Card Master Card"
                height={28}
                width={44}
              />
              <Image
                src={ASSETS.CC_AMERICAN_EXPRESS_ICON}
                alt="Credit Card American Express"
                height={28}
                width={44}
              />
              <Image
                src={ASSETS.CC_JCB_ICON}
                alt="Credit Card JCB"
                height={28}
                width={44}
              />
              <Image
                src={ASSETS.GOPAY_ICON}
                alt="Gopay"
                height={31}
                width={74}
              />
            </HStack>
          </Box>
          <Box flexBasis="16%">
            <Text as="h4" fontFamily="poppins" fontWeight="semibold" mb={3.5}>
              Fitur
            </Text>
            <List spacing={1}>
              {MENU_FEATURES.map((item) => renderLinkItem({ item }))}
            </List>
          </Box>
          <Box flexBasis="16%">
            <Text as="h4" fontFamily="poppins" fontWeight="semibold" mb={3.5}>
              Perusahaan
            </Text>
            <List spacing={1} mb={6}>
              {MENU_COMPANIES.map((item) => renderLinkItem({ item }))}
            </List>
            <Text as="h4" fontFamily="poppins" fontWeight="semibold" mb={3.5}>
              Follow us on
            </Text>
            <List spacing={1}>
              {MENU_SOCIAL_MEDIA.map((item) =>
                renderLinkItem({ item, noHover: true })
              )}
            </List>
          </Box>
          <Box flexBasis="auto">
            <Text as="h4" fontFamily="poppins" fontWeight="semibold" mb={3.5}>
              Dukungan
            </Text>
            <List spacing={1} mb={6}>
              {MENU_SUPPORTS.map((item) => renderLinkItem({ item }))}
            </List>
            <Text as="h4" fontFamily="poppins" fontWeight="semibold" mb={3.5}>
              Daftar Menjadi Mitra
            </Text>
            <List spacing={1}>
              {MENU_PARTNERS.map((item) => renderLinkItem({ item }))}
            </List>
          </Box>
          <Box flexBasis="auto">
            <Text as="h4" fontFamily="poppins" fontWeight="semibold" mb={3.5}>
              Download SehatQ App
            </Text>
            <Image
              src={ASSETS.DOWNLOAD_APPLE_ICON}
              alt="Temukan di APP Store"
              height={47}
              width={150}
              wrapperProps={{ mb: 2.5 }}
            />
            <Image
              src={ASSETS.DOWNLOAD_GOOGLE_ICON}
              alt="Temukan di Play Store"
              height={45}
              width={150}
            />
            <Box mb={2.5} mt={12}>
              <Text as="h4" fontFamily="poppins" fontWeight="semibold">
                Butuh Bantuan?
              </Text>
              <Navigate name="CONTACT">
                <Link
                  as="h4"
                  fontFamily="poppins"
                  fontWeight="semibold"
                  color="sea.500"
                  _hover={{
                    textDecoration: "normal",
                  }}
                >
                  Hubungi Kami
                </Link>
              </Navigate>
            </Box>
            <Text fontSize="sm" mb={1}>
              Jam operasional: 07.00 - 20.00
            </Text>
            <HStack spacing={2}>
              <Image
                src={ASSETS.CONTACT_PHONE_ICON}
                alt="Hubungi Kami"
                width={16}
                height={16}
              />
              <Link
                href={`tel:${contactPhone}`}
                color="charcoalGrey"
                fontSize="sm"
                _hover={{
                  textDecoration: "normal",
                }}
              >
                {contactPhone}
              </Link>
            </HStack>
          </Box>
        </HStack>
      </SimpleBlock>
      <Box background="gray.500" py={4} mt={9}>
        <SimpleBlock>
          <Text fontSize="sm">
            &copy; SehatQ, {new Date().getFullYear()}. All Rights Reserved
          </Text>
        </SimpleBlock>
      </Box>
    </Box>
  );
}
