import React from "react";

import {
  HStack,
  Link,
  Text,
  IconButton,
  ShareButtonIcon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
  LinkIcon,
  WhiteShareButtonIcon,
} from "../../user-interfaces";

export interface SocialShareButtonMobileProps {
  socialIcons: {
    id: number;
    label: string;
    link: string;
    iconSrc: React.ReactElement;
  }[];
  sizeIcon: string;
  spacing?: number;
  shareUrl: string;
  title?: string;
  onCopy: () => void;
  sizeButton?: string;
  colorButton?: "white" | "sea";
}

export function SocialShareButtonMobile(props: SocialShareButtonMobileProps) {
  const { socialIcons, spacing = 2, sizeIcon, onCopy } = props;
  return (
    <>
      <Popover placement="bottom-end">
        <PopoverTrigger>
          <IconButton
            minW="unset"
            h="unset"
            variant="unstyled"
            icon={
              props.colorButton == "white" ? (
                <WhiteShareButtonIcon boxSize={props.sizeButton ?? "28px"} />
              ) : (
                <ShareButtonIcon boxSize={props.sizeButton ?? "24px"} />
              )
            }
            aria-label="Forum Mark as Spam"
          />
        </PopoverTrigger>
        <PopoverContent width="auto">
          <PopoverArrow />
          <PopoverHeader textAlign="center" py={1}>
            <Text fontSize="sm">Bagikan</Text>
          </PopoverHeader>
          <PopoverBody pt={1} px={4} pb={2}>
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
                  </Link>
                ))}
              <IconButton
                background="charcoalGrey"
                borderRadius="full"
                onClick={onCopy}
                height={sizeIcon}
                minW={sizeIcon}
                icon={<LinkIcon boxSize={`calc(${sizeIcon}/1.7)`} />}
                aria-label="copy-icon"
              />
            </HStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
}
