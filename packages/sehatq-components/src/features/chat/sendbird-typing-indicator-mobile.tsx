import React from "react";
import styled from "@emotion/styled";
import { Flex, Text } from "../../user-interfaces";

export const Spinner = styled.span`
  &,
  &:before,
  &:after {
    border-radius: 50%;
    width: 2.5em;
    height: 2.5em;
    animation-fill-mode: both;
    animation: bblFadInOut 1.8s infinite ease-in-out;
  }
  & {
    color: #2b8e8e;
    font-size: 4px;
    top: -4px;
    left: 15px;
    position: relative;
    text-indent: -9999em;
    transform: translateZ(0);
    animation-delay: -0.16s;
  }
  &:before,
  &:after {
    content: "";
    position: absolute;
    top: 0;
  }
  &:before {
    left: -3em;
    animation-delay: -0.32s;
  }
  &:after {
    left: 3em;
  }

  @keyframes bblFadInOut {
    0%,
    80%,
    100% {
      box-shadow: 0 2.5em 0 -1.3em;
    }
    40% {
      box-shadow: 0 2.5em 0 0;
    }
  }
`;

export function SendbirdTypingIndicatorMobile() {
  return (
    <Flex
      align="center"
      width="100%"
      paddingX={5}
      paddingTop={2}
      paddingBottom={3}
    >
      <Flex height="21px" width="36px">
        <Spinner />
      </Flex>
      <Text fontSize="sm" color="brownGrey.500" marginLeft={2}>
        Dokter sedang mengetik
      </Text>
    </Flex>
  );
}
