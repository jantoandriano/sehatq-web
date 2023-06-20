import React, { Component, ReactNode } from "react";
import { Button, Flex, Fallback, Image, Text } from "@sehatq/components";

export type ChatErrorBoundaryProps = {
  children?: ReactNode;
};

export type ChatErrorBoundaryState = {
  hasError: boolean;
};

export class ChatErrorBoundary extends Component<
  ChatErrorBoundaryProps,
  ChatErrorBoundaryState
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Flex
          flexDirection="column"
          justify="space-between"
          align="center"
          height="100%"
          width="100%"
          padding={4}
        >
          <Image
            src="/images/sehatq-logo.svg"
            alt="SehatQ"
            width={160}
            height={132}
          />
          <Fallback
            image={{
              src: "/images/illustration-failed.svg",
              width: 238,
              height: 210,
            }}
            layout="vertical"
            title="Maaf, Terjadi Kesalahan"
            description={
              <Text fontSize="sm" textAlign="center">
                Silakan periksa koneksi Internet atau <br /> muat ulang halaman
                ini.
              </Text>
            }
            isMobile
            isFullWidth
          />
          <Button
            onClick={() => location.reload()}
            variant="solid"
            fontWeight="semibold"
            colorScheme="main"
            width="full"
          >
            Refresh
          </Button>
        </Flex>
      );
    }

    return this.props.children;
  }
}
