import React from "react";

import { useNavigation } from "@sehatq/utils";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  VStack,
  Flex,
  Link,
  IconButton,
  /* LoginFacebook, */
  LoginGmail,
  EmailIcon,
  Divider,
} from "../../user-interfaces";

export interface LoginPopupDesktopProps {
  onClose: () => void;
  isOpen: boolean;
}

export function LoginPopupDesktop(props: LoginPopupDesktopProps) {
  const { Navigate } = useNavigation();
  const { onClose, isOpen } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <ModalOverlay />
      <ModalContent px={6} pb={6} pt={3} w="360px" right="-26%" mt="65px">
        <ModalHeader
          fontSize="3xl"
          fontFamily="poppins"
          fontWeight="semibold"
          p="0"
        >
          Log In
        </ModalHeader>
        <ModalCloseButton autoFocus={false} />
        <ModalBody p="0">
          <Text my={2} fontSize="15px" lineHeight="1.47">
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
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
