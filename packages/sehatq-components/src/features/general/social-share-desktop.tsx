import React from "react";

import { HStack, Link, Text, Button, IconButton } from "../../user-interfaces";

export interface SocialShareDesktopProps {
  socialIcons: {
    id: number;
    label: string;
    link: string;
    iconSrc: React.ReactElement;
  }[];
  sizeIcon: string;
  hideTitleShare?: boolean;
  hideTitleSocial?: boolean;
  spacing?: number;
  px: number;
  py: number;
  url: string;
  title?: string;
  onCopy: () => void;
}

export function SocialShareDesktop(props: SocialShareDesktopProps) {
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
      spacing={8}
      px={px}
      py={py}
      backgroundColor="iceBlue.500"
      borderRadius="10"
      width="100%"
    >
      {!hideTitleShare && (
        <Text fontSize="md" fontWeight="semibold" fontFamily="poppins">
          Bagikan
        </Text>
      )}
      <HStack spacing={spacing}>
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
              {!hideTitleSocial && (
                <Text color="#4a4a4a" fontSize="xxs">
                  {socialIcon.label}
                </Text>
              )}
            </Link>
          ))}
        <Button
          borderRadius="19px"
          fontSize={hideTitleShare ? "xs" : "sm"}
          fontWeight="semibold"
          height="38px"
          py={2.5}
          onClick={onCopy}
        >
          Salin Link
        </Button>
      </HStack>
    </HStack>
  );
}
