import React from "react";
import { useAssets, useNavigation } from "@sehatq/utils";

import { VStack, HStack, Link, Button, Text } from "../../user-interfaces";
import { Fallback } from "../general";

export function ChatErrorBoundaryDesktop() {
  const ASSETS = useAssets(["ILLUSTRATION_FAILED"]);
  const { Navigate } = useNavigation();
  return (
    <VStack spacing={10} width="100%" paddingX={12} paddingY={5}>
      <Fallback
        image={{
          src: ASSETS.ILLUSTRATION_FAILED,
          width: 476,
          height: 420,
        }}
        layout="vertical"
        title="Maaf, Terjadi Kesalahan"
        description={
          <Text fontSize="lg" textAlign="center">
            Silakan periksa koneksi Internet atau <br /> muat ulang halaman ini.
          </Text>
        }
      />
      <HStack spacing={6} width="100%">
        <Button
          onClick={() => location.reload()}
          variant="solid"
          fontWeight="semibold"
          colorScheme="main"
          flex="1"
        >
          Muat Ulang
        </Button>
        <Navigate name="HOME">
          <Link
            variant="outline"
            fontWeight="semibold"
            colorScheme="sea"
            flex="1"
          >
            Kembali ke Home
          </Link>
        </Navigate>
      </HStack>
    </VStack>
  );
}
