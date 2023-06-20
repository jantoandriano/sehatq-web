import React, { ReactElement } from "react";
import { InView } from "react-intersection-observer";
import {
  Box,
  useImage,
  Flex,
  Button,
  VStack,
  VStackProps,
  IconButton,
  HamburgerIcon,
} from "../../user-interfaces";

interface NavigationBlockMobileProps {
  assetUrl: string;
  logoHeight?: string;
  initialFontColor?: string;
  logoAlt: string;
  activeNavigationIndex: number;
  navigate: (navigationIndex: number) => void;
  sections: ReactElement[];
  navigations: [number, string][];
  setInViewNavigation: (index: number, isInView: boolean) => void;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
  setOnTop: (isOntop: boolean) => void;
  onTop: boolean;
  isMenuOpen: boolean;
  stackProps?: VStackProps;
  tailElement?: ReactElement;
}

export function NavigationBlockMobile(props: NavigationBlockMobileProps) {
  const {
    onTop,
    setOnTop,
    assetUrl,
    sections,
    navigate,
    isMenuOpen,
    navigations,
    setIsMenuOpen,
    setInViewNavigation,
    activeNavigationIndex,
    logoAlt,
    initialFontColor = "charcoalGrey",
    stackProps,
    tailElement,
    logoHeight,
  } = props;
  const Image = useImage();

  function onSelectMenu(index: number) {
    setIsMenuOpen(!isMenuOpen);
    navigate(index);
  }

  return (
    <>
      <Box
        position="fixed"
        zIndex="docked"
        top={4}
        left={4}
        paddingY={2}
        width="calc(100% - 32px)"
        {...(!onTop || isMenuOpen
          ? {
              background: "white",
              left: 2,
              paddingX: 4,
              borderRadius: "2xl",
              width: "calc(100% - 16px)",
              boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.08)",
            }
          : null)}
      >
        <Flex align="center" justify="space-between" width="full">
          <Image
            src={assetUrl}
            alt={logoAlt}
            layout="fill"
            objectFit="contain"
            objectPosition="left"
            wrapperProps={{
              height: logoHeight || "45px",
              width: "100%",
            }}
          />
          <IconButton
            aria-label="Menus"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            icon={
              <HamburgerIcon
                width="24px"
                height="24px"
                fontWeight="bold"
                color={onTop && !isMenuOpen ? initialFontColor : "charcoalGrey"}
              />
            }
            variant="fit"
          />
        </Flex>
        {isMenuOpen ? (
          <VStack
            width="full"
            spacing={5}
            marginTop={8}
            paddingBottom={2}
            maxHeight="calc(100vh - 100px)"
          >
            {navigations.map(([, name], index) => {
              const isActiveNavigation = index === activeNavigationIndex;
              return (
                <Button
                  variant="fit"
                  display="inline-block"
                  key={name}
                  onClick={() => onSelectMenu(index)}
                  color="charcoalGrey"
                  fontFamily="poppins"
                  fontWeight="medium"
                  width="full"
                  textAlign="left"
                  fontSize="sm"
                  sx={
                    isActiveNavigation
                      ? {
                          fontWeight: "semibold",
                          color: "sea.500",
                          ":after": {
                            display: "block",
                            content: '""',
                            width: 6,
                            height: 1,
                            borderRadius: "full",
                            background: "sea.500",
                          },
                        }
                      : undefined
                  }
                >
                  {name}
                </Button>
              );
            })}
            {tailElement}
          </VStack>
        ) : null}
      </Box>
      <InView as="div" onChange={setOnTop} />
      <VStack width="full" {...stackProps}>
        {sections.map((section, index) => {
          const foundNavigationIndex = navigations.findIndex(
            ([navIndex]) => navIndex === index
          );
          return foundNavigationIndex !== -1 ? (
            <NavigationBlockItem
              key={navigations[foundNavigationIndex][1]}
              navigationIndex={foundNavigationIndex}
              setInViewNavigation={(isInView: boolean) =>
                setInViewNavigation(foundNavigationIndex, isInView)
              }
            >
              {section}
            </NavigationBlockItem>
          ) : (
            section
          );
        })}
      </VStack>
    </>
  );
}

interface NavigationBlockItemProps {
  navigationIndex: number;
  setInViewNavigation: (isInView: boolean) => void;
  children: ReactElement;
}

function NavigationBlockItem(props: NavigationBlockItemProps) {
  const { children, navigationIndex, setInViewNavigation } = props;
  return (
    <>
      <InView
        as="div"
        id={`nav-${navigationIndex}`}
        onChange={(inView, entry) =>
          setInViewNavigation(
            inView &&
              (entry.boundingClientRect.top < 300 ||
                entry.boundingClientRect.bottom <
                  entry.boundingClientRect.height - 300)
          )
        }
        threshold={[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]}
        rootMargin="-300px 0px"
        style={{ width: "100%" }}
      >
        {children}
      </InView>
    </>
  );
}
