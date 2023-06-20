import React from "react";
import Cookies from "js-cookie";
import {
  useImage,
  Divider,
  SehatqSearchBox,
  SehatqSearchBoxProps,
  Box,
  Link,
  LinkBox,
  LinkOverlay,
  InboxNavbarMenu,
  ProfileNavbarMenu,
  CartNavbarMenu,
  Stack,
  SimpleBlock,
  Spacer,
  Flex,
  Button,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalHeader,
  SimpleGrid,
  useDisclosure,
  LoginPopup,
  useGetProfile,
  IconButton,
  CartIcon,
  InboxIcon,
  SehatqUserIcon,
} from "@sehatq/components";
import { SEHATQ_MENUS } from "@sehatq/constants";
import { useAssets, useNavigation } from "@sehatq/utils";

export type SehatqNavbarProps = {
  withCompanyPartner?: boolean;
  withMenu?: boolean;
} & Partial<SehatqSearchBoxProps>;

export function SehatqNavbar(props: SehatqNavbarProps) {
  const {
    placeholderSearch = "Covid SOS Sehatq",
    searchNavigation = { name: "SEARCH" },
    withCompanyPartner = false,
    withMenu = true,
  } = props;
  const { isSuccess } = useGetProfile();
  const Image = useImage();
  const ASSETS = useAssets(["MINISTRY_OF_HEALTH", "SEHATQ_WITH_TEXT"]);
  const { Navigate, navigate } = useNavigation();
  function goToLogin() {
    Cookies.set("fromProfileIcon", "true", {
      path: "/",
      domain: ".sehatq.com",
      expires: 0.3,
    });
    navigate("EXTERNAL_LOGIN");
  }
  const displayedMenuKeys = [
    "EXTERNAL_HOMEPAGE",
    "DRUGS",
    "ARTICLE",
    "MEDICAL_PROCEDURES",
    "HEALTH_CARE_PROFESIONALS",
    "HEALTH_CARE_FACILITIES",
    "DISEASES",
    "TELEMEDICINES",
    "PROMOS",
  ] as const;
  return (
    <>
      <LoginPopup />
      <style jsx global>{`
        html {
          scroll-padding-top: ${withMenu ? 132 : 92}px;
        }
      `}</style>
      <Box bg="white" boxShadow="lg" position="sticky" zIndex="sticky" top="0">
        <SimpleBlock
          display="flex"
          justifyContent="space-evenly"
          alignItems="center"
          height="80px"
        >
          <Stack direction="row" align="center">
            <Navigate name="HOME">
              <Link>
                <Image
                  src={ASSETS.SEHATQ_WITH_TEXT}
                  alt="logo-sehatq"
                  height={31}
                  width={142}
                  layout="fixed"
                  priority
                />
              </Link>
            </Navigate>
            <Divider
              orientation="vertical"
              height="42px"
              borderColor="veryLightPink"
            />
            <Image
              src={ASSETS.MINISTRY_OF_HEALTH}
              alt="logo-kementerian-kesehatan"
              height={54}
              width={110}
              layout="fixed"
              priority
            />
          </Stack>
          <Spacer />
          <Box width="378px">
            <SehatqSearchBox
              isMobile={false}
              placeholderSearch={placeholderSearch}
              searchNavigation={searchNavigation}
            />
          </Box>
          <Spacer />
          <Stack direction="row" spacing="5">
            {isSuccess ? (
              <CartNavbarMenu />
            ) : (
              <IconButton
                onClick={goToLogin}
                aria-label="cart"
                variant="fit"
                icon={<CartIcon w="30px" h="30px" />}
              />
            )}
            {isSuccess ? (
              <InboxNavbarMenu />
            ) : (
              <IconButton
                onClick={() => {
                  navigate("INBOX");
                }}
                aria-label="cart"
                variant="fit"
                icon={<InboxIcon w="30px" h="30px" />}
              />
            )}
            {isSuccess ? (
              <ProfileNavbarMenu />
            ) : (
              <IconButton
                onClick={goToLogin}
                aria-label="cart"
                variant="fit"
                icon={<SehatqUserIcon w="30px" h="30px" />}
              />
            )}
          </Stack>
          {withCompanyPartner ? (
            <>
              <Spacer />
              <Navigate name="COMPANY_PARTNER">
                <Link variant="solid" colorScheme="sea" size="xs">
                  SehatQ for Corporate
                </Link>
              </Navigate>
            </>
          ) : null}
        </SimpleBlock>
        {withMenu ? (
          <SimpleBlock>
            <Flex justify="space-between">
              {displayedMenuKeys.map((name) => (
                <Navigate key={name} name={name}>
                  <Link
                    variant="unstyled"
                    fontSize="sm"
                    fontWeight="medium"
                    fontFamily="poppins"
                    borderBottom="3px solid"
                    borderColor="white"
                    borderRadius={0}
                    _hover={{
                      borderColor: "main.500",
                      color: "main.500",
                    }}
                  >
                    {SEHATQ_MENUS[name].title}
                  </Link>
                </Navigate>
              ))}
              <AllMenu />
            </Flex>
          </SimpleBlock>
        ) : null}
      </Box>
    </>
  );
}

function AllMenu() {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { Navigate } = useNavigation();
  const Image = useImage();
  return (
    <>
      <Button
        variant="unstyled"
        fontSize="sm"
        fontWeight="medium"
        fontFamily="poppins"
        borderBottom="3px solid"
        borderColor="white"
        borderRadius={0}
        _hover={{
          borderColor: "main.500",
          color: "main.500",
        }}
        onClick={onOpen}
      >
        Semua
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent maxWidth="fit-content">
          <ModalHeader fontFamily="poppins" fontWeight="semibold" fontSize="lg">
            Semua Layanan
          </ModalHeader>
          <ModalBody paddingBottom={6}>
            <SimpleGrid columns={5} spacing={3}>
              {Object.values(SEHATQ_MENUS).map((menu) => (
                <LinkBox
                  key={menu.navigationName}
                  width="108px"
                  height="88px"
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Image
                    alt={menu.title}
                    src={menu.iconSrc}
                    width={54}
                    height={54}
                    layout="fixed"
                  />
                  <Navigate name={menu.navigationName}>
                    <LinkOverlay
                      fontSize="sm"
                      fontWeight="medium"
                      fontFamily="poppins"
                      textAlign="center"
                    >
                      {menu.title}
                    </LinkOverlay>
                  </Navigate>
                </LinkBox>
              ))}
            </SimpleGrid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
