import React from "react";
import { VStack, useImage, Text, HStack, Box } from "../../user-interfaces";

export interface FallbackProps {
  title: string | React.ReactElement;
  image: {
    src: string;
    width: number;
    height: number;
  };
  description: string | React.ReactElement;
  isMobile?: boolean;
  layout?: "vertical" | "horizontal";
  isFullWidth?: boolean;
}

export function Fallback(props: FallbackProps) {
  const { layout } = props;
  if (layout === "horizontal") return <HorizontalFallback {...props} />;

  return <VerticalFallback {...props} />;
}

function HorizontalFallback(props: FallbackProps) {
  const Image = useImage();
  const { isMobile = false, image, title, description } = props;
  return (
    <HStack width={isMobile ? "75%" : "100%"} spacing={9}>
      <Image
        {...image}
        alt="fallback image"
        layout={isMobile ? "responsive" : "fixed"}
        wrapperProps={
          isMobile
            ? {
                width: "75%",
              }
            : undefined
        }
      />
      <Box>
        <Text
          width="100%"
          fontFamily="poppins"
          fontWeight="semibold"
          fontSize={isMobile ? "md" : "2xl"}
        >
          {title}
        </Text>
        {typeof description === "string" ? (
          <Text fontSize={isMobile ? "sm" : "lg"} textAlign="center">
            {description}
          </Text>
        ) : (
          description
        )}
      </Box>
    </HStack>
  );
}

function VerticalFallback(props: FallbackProps) {
  const Image = useImage();
  const { isMobile = false, image, title, description, isFullWidth } = props;
  return (
    <VStack
      marginX="auto"
      width={isMobile || isFullWidth ? "100%" : "500px"}
      justify="center"
      spacing={5}
      {...(isMobile && {
        height: "full",
      })}
    >
      <Image
        {...image}
        alt="fallback image"
        layout={isMobile ? "responsive" : "fixed"}
        wrapperProps={
          isMobile
            ? {
                width: "75%",
              }
            : undefined
        }
      />
      <VStack width="100%">
        <Text
          fontFamily="poppins"
          fontWeight="semibold"
          textAlign="center"
          fontSize={isMobile ? "md" : "3xl"}
        >
          {title}
        </Text>
        {typeof description === "string" ? (
          <Text fontSize={isMobile ? "sm" : "lg"} textAlign="center">
            {description}
          </Text>
        ) : (
          description
        )}
      </VStack>
    </VStack>
  );
}
