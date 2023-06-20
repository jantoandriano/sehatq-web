import HTMLReactParser from "html-react-parser";
import React from "react";
import { Text } from "../../user-interfaces";

type DurationRemainingBubbleMobileProps = {
  message?: string;
};
export function DurationRemainingBubbleDesktop(
  props: DurationRemainingBubbleMobileProps
) {
  return (
    <Text fontSize="xs" color="charcoalGrey" textAlign="center" py={2}>
      {props.message && HTMLReactParser(props.message)}
    </Text>
  );
}
