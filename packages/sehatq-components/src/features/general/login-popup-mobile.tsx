import React from "react";

import { useNavigation } from "@sehatq/utils";
import {
  Text,
  Drawer,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  VStack,
  Flex,
  Link,
  IconButton,
  /* LoginFacebook, */
  LoginGmail,
  EmailIcon,
  Divider,
} from "../../user-interfaces";

export interface LoginPopupMobileProps {
  onClose: () => void;
  isOpen: boolean;
}

export function LoginPopupMobile(props: LoginPopupMobileProps) {
  const { Navigate } = useNavigation();
  const { onClose, isOpen } = props;

  return (
    <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent borderTopRadius="lg">
        <DrawerCloseButton />
        <DrawerHeader
          pb={2}
          pt={3}
          fontSize="3xl"
          fontFamily="poppins"
          fontWeight="semibold"
        >
          Log In
        </DrawerHeader>
        <DrawerBody px={6} pt={0} pb={6}>
          <Text mb={2} fontSize="15px" lineHeight="1.47">
            Masuk untuk melakukan berbagai aktivitas di SehatQ, termasuk
            menyimpan riwayat konsultasi, melakukan pembelian, dan membaca
            artikel sesuai keinginanmu.
          </Text>
          <VStack spacing="3">
            <Text fontSize="15px" fontWeight="semibold">
              Login dengan
            </Text>
            <Flex
              width="100%"
              boxShadow="base"
              borderRadius="base"
              align="center"
              justify="space-evenly"
            >
              <Navigate name="EXTERNAL_LOGIN_GMAIL">
                <Link size="md" flexDirection="column" width="100%">
                  <IconButton
                    aria-label="login-gmail"
                    variant="fit"
                    icon={<LoginGmail boxSize="40px" />}
                  />
                </Link>
              </Navigate>
              <Divider
                orientation="vertical"
                height="28px"
                borderColor="veryLightPink"
              />
              {/* <Navigate name="EXTERNAL_LOGIN_FACEBOOK">
                <Link size="md" flexDirection="column" width="100%">
                  <IconButton
                    aria-label="login-facebook"
                    variant="fit"
                    icon={<LoginFacebook boxSize="40px" />}
                  />
                </Link>
              </Navigate>
              <Divider
                orientation="vertical"
                height="28px"
                borderColor="veryLightPink"
              /> */}
              <Navigate name="EXTERNAL_LOGIN_EMAIL">
                <Link size="md" flexDirection="column" width="100%">
                  <IconButton
                    aria-label="login-email"
                    variant="fit"
                    icon={<EmailIcon w="30px" h="22px" color="main.500" />}
                  />
                </Link>
              </Navigate>
            </Flex>
            <Navigate name="EXTERNAL_REGISTER">
              <Link fontSize="sm" display="block" color="main">
                Belum punya akun?{" "}
                <Text d="inline" color="sea.500" fontWeight="bold">
                  Daftar
                </Text>
              </Link>
            </Navigate>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
