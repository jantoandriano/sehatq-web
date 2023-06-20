import React, { ReactElement } from "react";
import {
  Box,
  Flex,
  Text,
  IconButton,
  ArrowBackIcon,
  SehatqSearchBox,
  SehatqSearchBoxProps,
  LoginPopup,
  SearchIcon,
} from "@sehatq/components";
import { useNavigation, NavigationValue } from "@sehatq/utils";

type SehatQHeaderProps = (
  | {
      variant: "logo";
      withMinistryOfHealth?: boolean;
      withSearch?: boolean;
    }
  | ({
      variant: "search";
    } & Partial<SehatqSearchBoxProps>)
  | ({
      variant: "text";
      text: string;
      withSearch?: boolean;
    } & Partial<SehatqSearchBoxProps>)
) & {
  leftElement?: ReactElement;
  rightElement?: ReactElement;
  backNavigate?: {
    name: NavigationValue["name"];
    query?: NavigationValue["query"];
  };
};

export function SehatQHeader(props: SehatQHeaderProps) {
  const {
    leftElement = null,
    variant,
    backNavigate = null,
    rightElement = null,
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
  const backButton = (
    <IconButton
      aria-label="back button"
      onClick={
        backNavigate
          ? () => {
              navigate(backNavigate.name, {
                ...backNavigate.query,
              });
            }
          : goBack
      }
      variant="fit"
      colorScheme="sea"
      autoFocus={false}
      marginRight={2}
      icon={<ArrowBackIcon boxSize="28px" color="main.600" />}
    />
  );
  if (variant === "search") {
    const {
      placeholderSearch = "Cari apapun di SehatQ",
      searchNavigation = { name: "SEARCH" },
    } = props;
    return (
      <>
        <LoginPopup isMobile={true} />
        <style jsx global>{`
          html {
            scroll-padding-top: 60px;
          }
        `}</style>
        <Flex {...containerProps} boxShadow="base">
          {backButton}
          <Box flex="1">
            <SehatqSearchBox
              isMobile
              placeholderSearch={placeholderSearch}
              searchNavigation={searchNavigation}
              leftElement={leftElement}
            />
          </Box>
          {rightElement ? <Box>{rightElement}</Box> : null}
        </Flex>
      </>
    );
  }
  if (variant === "text") {
    const {
      withSearch = false,
      placeholderSearch = "Cari apapun di SehatQ",
      searchNavigation = { name: "SEARCH" },
    } = props;
    return (
      <>
        <LoginPopup isMobile={true} />
        <style jsx global>{`
          html {
            scroll-padding-top: 60px;
          }
        `}</style>
        <Flex {...containerProps}>
          {backButton}
          <Box
            {...(rightElement
              ? {
                  maxW: "calc(100% - 200px)",
                }
              : { flex: 1 })}
          >
            <Text
              as="h1"
              fontFamily="poppins"
              fontWeight="semibold"
              noOfLines={1}
            >
              {props.text}
            </Text>
          </Box>
          {leftElement ? <Box marginLeft={2}>{leftElement}</Box> : null}
          {rightElement ? <Box ml="auto">{rightElement}</Box> : null}
        </Flex>
        {withSearch ? (
          <Box px={4} my={4}>
            <SehatqSearchBox
              isMobile
              placeholderSearch={placeholderSearch}
              searchNavigation={searchNavigation}
              leftElement={<SearchIcon color="brownGrey.500" />}
            />
          </Box>
        ) : null}
      </>
    );
  }
  return <LoginPopup isMobile={true} />;
}
