import React from "react";
import { useDisclosure } from "../../user-interfaces";
import { RecipeCovidBubbleDesktop } from "./recipe-covid-bubble-desktop";
import { RecipeCovidBubbleMobile } from "./recipe-covid-bubble-mobile";

export type RecipeCovidBubbleProps = {
  isMobile?: boolean;
  plainImageUrl: string;
};

export function RecipeCovidBubble(props: RecipeCovidBubbleProps) {
  const { isMobile, plainImageUrl } = props;
  const RecipeCovidPopup = useDisclosure();
  function onClick() {
    window.open(plainImageUrl);
  }

  const otherProps = {
    RecipeCovidPopup,
    onClick,
  };

  if (isMobile) {
    return <RecipeCovidBubbleMobile {...otherProps} />;
  }

  return <RecipeCovidBubbleDesktop {...otherProps} />;
}
