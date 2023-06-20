import React from "react";
import {
  HStack,
  VStack,
  Box,
  Text,
  LinkBox,
  LinkOverlay,
  useImage,
} from "../../user-interfaces";

export type MetaDataProps = {
  link?: string;
  image: {
    url: string;
    alt: string;
  };
  title: string;
  description: string;
  additionalText?: string;
};

export type LinkBubbleMobileProps = {
  metaData?: MetaDataProps;
  type: "sender" | "receiver";
};

export function LinkBubbleMobile(props: LinkBubbleMobileProps) {
  const Image = useImage();
  const { metaData, type } = props;

  return (
    <LinkBox width="100%">
      {metaData && (
        <>
          <HStack
            align="normal"
            spacing={2}
            background={type === "sender" ? "#F1F1F1" : "iceBlue.500"}
            px={3}
            py={2}
            borderTopLeftRadius="xl"
            borderTopRightRadius="xl"
          >
            <Box>
              <Image
                src={metaData.image.url}
                alt={metaData.image.alt || metaData.title}
                layout="fill"
                objectFit="cover"
                wrapperProps={{
                  boxSize: "52px",
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: "base",
                }}
              />
            </Box>
            <Box>
              <Text
                fontSize="sm"
                fontFamily="poppins"
                fontWeight="semibold"
                color="charcoalGrey"
                noOfLines={2}
              >
                {metaData.title}
              </Text>
              <Text fontSize="xxs" fontWeight="semibold" color="sea.500" mt={1}>
                {metaData.description}
              </Text>
            </Box>
          </HStack>
          <VStack align="normal" spacing={1} px={3} pt={1}>
            {metaData.link && (
              <LinkOverlay
                href={metaData.link}
                fontSize="sm"
                color={
                  metaData.additionalText === metaData.link
                    ? type === "sender"
                      ? "sea.500"
                      : "paleBlue.500"
                    : type === "sender"
                    ? "charcoalGrey"
                    : "white"
                }
                {...(metaData.additionalText === metaData.link && {
                  textDecoration: "underline",
                })}
              >
                {metaData.additionalText}
              </LinkOverlay>
            )}
          </VStack>
        </>
      )}
    </LinkBox>
  );
}
