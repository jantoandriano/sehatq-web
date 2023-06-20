import React from "react";
import { SehatQFooter, Flex, Spacer } from "@sehatq/components";
import { SehatqNavbar } from "@components/ui/sehatq-navbar";

export default function HealthCheck() {
  return (
    <Flex direction="column" height="100vh">
      <SehatqNavbar />
      <Spacer />
      <SehatQFooter isMobile={false} />
    </Flex>
  );
}
