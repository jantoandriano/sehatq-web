import React, { ReactElement } from "react";
import { Box, Flex, Text, IconButton, ArrowBackIcon } from "@sehatq/components";
import { useNavigation, NavigationValue } from "@sehatq/utils";

type SehatQHeaderProps = {
  variant: "text";
  text: string;
  leftElement?: ReactElement;
  rightElement?: ReactElement;
  backNavigate?: {
    name: NavigationValue["name"];
    query?: NavigationValue["query"];
  };
  onBack?: () => void;
};

export function PaymentQHeader(props: SehatQHeaderProps) {
  const {
    leftElement = null,
    backNavigate = null,
    rightElement = null,
    onBack,
  } = props;
  const containerProps = {
    height: "56px",
    position: "sticky",
    top: 0,
    p: 2,
    align: "center",
    bgColor: "white",
    zIndex: "sticky",
    boxShadow: "lg",
  } as const;
  const { goBack, navigate } = useNavigation();

  function onBackIcon() {
    if (onBack) {
      return onBack();
    } else {
      if (backNavigate) {
        return () => {
          navigate(backNavigate.name, {
            ...backNavigate.query,
          });
        };
      } else {
        return goBack;
      }
    }
  }

  const backButton = (
    <IconButton
      aria-label="back button"
      onClick={onBackIcon}
      variant="fit"
      colorScheme="sea"
      autoFocus={false}
      marginRight={2}
      icon={<ArrowBackIcon boxSize="28px" color="main.600" />}
    />
  );
  return (
    <>
      <Flex {...containerProps}>
        {backButton}
        <Box flex="1">
          <Text
            as="h1"
            maxWidth="90%"
            fontFamily="poppins"
            fontWeight="semibold"
            isTruncated
          >
            {props.text}
          </Text>
        </Box>
        {leftElement ? <Box marginLeft={2}>{leftElement}</Box> : null}
        {rightElement ? <Box>{rightElement}</Box> : null}
      </Flex>
    </>
  );
}
