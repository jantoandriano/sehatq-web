import React from "react";
import { MainMenuDesktop } from "./main-menu-desktop";
import { MainMenuMobile } from "./main-menu-mobile";

export type MainMenuProps = {
  isMobile?: boolean;
};

export function MainMenu(props: MainMenuProps) {
  if (props.isMobile) {
    return <MainMenuMobile />;
  }

  return <MainMenuDesktop />;
}
