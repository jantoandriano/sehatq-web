import React, { ReactElement, useState } from "react";
import { VStackProps } from "../../user-interfaces";
import { NavigationBlockDesktop } from "./navigation-block-desktop";
import { NavigationBlockMobile } from "./navigation-block-mobile";

export interface NavigationBlockProps {
  isMobile?: boolean;
  logoHeight?: string;
  assetUrl: string;
  sections: ReactElement[];
  initialFontColor?: string;
  navigations: [number, string][];
  stackProps?: VStackProps;
  logoAlt: string;
  tailElement?: ReactElement;
}

export function NavigationBlock(props: NavigationBlockProps) {
  const {
    isMobile,
    assetUrl,
    initialFontColor,
    navigations,
    sections,
    stackProps,
    logoAlt,
    tailElement,
    logoHeight,
  } = props;
  const [inViewNavigations, setInViewNavigations] = useState(
    navigations.map(() => false)
  );
  const [onTop, setOnTop] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function navigate(index: number) {
    document
      .getElementById(`nav-${index}`)
      ?.scrollIntoView({ behavior: "smooth" });
  }

  function setInViewNavigation(index: number, isInView: boolean) {
    setInViewNavigations((oldInViewNavigations) => [
      ...oldInViewNavigations.slice(0, index),
      isInView,
      ...oldInViewNavigations.slice(index + 1),
    ]);
  }

  const childProps = {
    onTop,
    setOnTop,
    navigate,
    logoAlt,
    sections,
    assetUrl,
    logoHeight,
    isMenuOpen,
    stackProps,
    navigations,
    setIsMenuOpen,
    initialFontColor,
    setInViewNavigation,
    activeNavigationIndex: inViewNavigations.findIndex(Boolean),
    tailElement,
  };
  if (isMobile) {
    return <NavigationBlockMobile {...childProps} />;
  }
  return <NavigationBlockDesktop {...childProps} />;
}
