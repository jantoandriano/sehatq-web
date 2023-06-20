import React from "react";
import { Flex, Spinner } from "@sehatq/components";

export function FullpageLoader() {
  return (
    <Flex height="100vh" justifyContent="center" alignItems="center">
      <Spinner />
    </Flex>
  );
}
