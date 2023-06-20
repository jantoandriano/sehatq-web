import React from "react";

import {
  HStack,
  VStack,
  Link,
  Text,
  Button,
  AddIcon,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
} from "../../user-interfaces";

export interface SocialShareMobileProps {
  socialIcons: {
    id: number;
    label: string;
    link: string;
    iconSrc: React.ReactElement;
  }[];
  sizeIcon: string;
  hideTitleSocial?: boolean;
  hideTitleShare?: boolean;
  spacing?: number;
  px: number;
  py: number;
  url: string;
  title?: string;
  onCopy: () => void;
}

export function SocialShareMobile(props: SocialShareMobileProps) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    socialIcons,
    hideTitleShare,
    hideTitleSocial,
    spacing,
    px,
    py,
    onCopy,
  } = props;
  return (
    <HStack
      spacing={spacing}
      justify="center"
      px={px}
      py={py}
      backgroundColor="iceBlue.500"
      borderRadius="10"
      width="100%"
    >
      {socialIcons.length &&
        socialIcons.map(
          (socialIcon, key) =>
            hideTitleShare &&
            key < 3 && (
              <Link
                key={socialIcon.id}
                href={socialIcon.link}
                flexDirection="column"
                rel="nofollow"
                size="md"
              >
                <IconButton
                  aria-label="social-icon"
                  variant="fit"
                  icon={socialIcon.iconSrc}
                />
                {!hideTitleSocial && (
                  <Text color="#4a4a4a" fontSize="xxs" mt={1}>
                    {socialIcon.label}
                  </Text>
                )}
              </Link>
            )
        )}
      <Button
        flex="1"
        borderRadius="17px"
        height="34px"
        fontSize="xs"
        fontWeight="semibold"
        onClick={onCopy}
      >
        Salin Link
      </Button>
      {hideTitleShare && (
        <IconButton
          isRound
          p={1}
          aria-label="add button"
          onClick={onOpen}
          variant="fit"
          background="white"
          borderColor="main.500"
          icon={<AddIcon boxSize={6} color="sea.500" />}
        />
      )}
      <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent borderTopRadius="lg" maxHeight="calc(100vh - 45px)">
          <DrawerBody>
            <VStack
              spacing={4}
              px={px}
              py={py}
              backgroundColor="white"
              width="100%"
              align="flex-start"
            >
              <Text fontSize="15px" fontWeight="semibold" fontFamily="poppins">
                Bagikan
              </Text>
              <HStack spacing="auto" width="100%" justify="center">
                {socialIcons.length &&
                  socialIcons.map((socialIcon) => (
                    <Link
                      key={socialIcon.id}
                      href={socialIcon.link}
                      flexDirection="column"
                      rel="nofollow"
                      size="md"
                    >
                      <IconButton
                        aria-label="social-icon"
                        variant="fit"
                        icon={socialIcon.iconSrc}
                      />
                      <Text color="#4a4a4a" fontSize="xxs" mt={1}>
                        {socialIcon.label}
                      </Text>
                    </Link>
                  ))}
              </HStack>
              <Button
                borderRadius="base"
                fontSize="sm"
                isFullWidth
                fontWeight="semibold"
                onClick={onCopy}
              >
                Salin Link
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </HStack>
  );
}
