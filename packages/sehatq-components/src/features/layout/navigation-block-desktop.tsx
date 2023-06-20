import React, { ReactElement } from "react";
import { InView } from "react-intersection-observer";
import {
  useImage,
  Flex,
  Button,
  HStack,
  VStack,
  VStackProps,
} from "../../user-interfaces";
import { SimpleBlock } from "./simple-block";

interface NavigationBlockDesktopProps {
  assetUrl: string;
  initialFontColor?: string;
  logoAlt: string;
  activeNavigationIndex: number;
  navigate: (navigationIndex: number) => void;
  sections: ReactElement[];
  navigations: [number, string][];
  setInViewNavigation: (index: number, isInView: boolean) => void;
  setOnTop: (isOntop: boolean) => void;
  onTop: boolean;
  stackProps?: VStackProps;
  tailElement?: ReactElement;
}

export function NavigationBlockDesktop(props: NavigationBlockDesktopProps) {
  const {
    onTop,
    assetUrl,
    setOnTop,
    sections,
    navigate,
    navigations,
    setInViewNavigation,
    activeNavigationIndex,
    initialFontColor = "charcoalGrey",
    logoAlt,
    stackProps,
    tailElement,
  } = props;
  const Image = useImage();
  return (
    <>
      <SimpleBlock
        position="fixed"
        top={5}
        left="50%"
        transform="translateX(-50%)"
        zIndex="docked"
      >
        <Flex
          paddingY={3}
          align="center"
          justify="space-between"
          width="full"
          {...(!onTop
            ? {
                paddingX: 5,
                marginLeft: -5,
                width: "calc(100% + 40px)",
                background: "white",
                borderRadius: "2xl",
                boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.08)",
              }
            : null)}
        >
          <Image
            src={assetUrl}
            alt={logoAlt}
            layout="fill"
            objectFit="contain"
            objectPosition="left"
            wrapperProps={{
              height: "68px",
              width: "100%",
            }}
          />
          <HStack spacing={5}>
            {navigations.map(([, name], index) => {
              const isActiveNavigation = index === activeNavigationIndex;
              return (
                <Button
                  variant="fit"
                  display="inline-block"
                  key={name}
                  onClick={() => navigate(index)}
                  color={onTop ? initialFontColor : "charcoalGrey"}
                  fontFamily="poppins"
                  fontWeight="medium"
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
          </HStack>
        </Flex>
      </SimpleBlock>
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
              (entry.boundingClientRect.top < 120 ||
                entry.boundingClientRect.bottom <
                  entry.boundingClientRect.height - 120)
          )
        }
        threshold={[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]}
        rootMargin="-160px 0px"
        style={{ width: "100%" }}
      >
        {children}
      </InView>
    </>
  );
}
