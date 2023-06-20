import React from "react";
import { useAssets, useNavigation } from "@sehatq/utils";

import { Flex, VStack, Link, Button, Text } from "../../user-interfaces";
import { Fallback } from "../general";

export function ChatErrorBoundaryMobile() {
  const ASSETS = useAssets(["ILLUSTRATION_FAILED"]);
  const { Navigate } = useNavigation();
  return (
    <Flex
      flexDirection="column"
      justifyContent="space-between"
      height="100%"
      width="100%"
      padding={4}
    >
      <Fallback
        image={{
          src: ASSETS.ILLUSTRATION_FAILED,
          width: 238,
          height: 210,
        }}
        layout="vertical"
        title="Maaf, Terjadi Kesalahan"
        description={
          <Text fontSize="sm" textAlign="center">
            Silakan periksa koneksi Internet atau <br /> muat ulang halaman ini.
          </Text>
        }
        isMobile
        isFullWidth
      />
      <VStack spacing={4}>
        <Button
          onClick={() => location.reload()}
          variant="solid"
          fontWeight="semibold"
          colorScheme="main"
          width="full"
        >
          Muat Ulang
        </Button>
        <Navigate name="HOME">
          <Link
            variant="outline"
            fontWeight="semibold"
            colorScheme="sea"
            width="full"
          >
            Kembali ke Home
          </Link>
        </Navigate>
      </VStack>
    </Flex>
  );
}
