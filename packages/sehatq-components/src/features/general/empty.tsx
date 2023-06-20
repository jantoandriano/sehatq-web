import React from "react";
import { useNavigation, useAssets } from "@sehatq/utils";
import { Link, Text } from "../../user-interfaces";
import { Fallback } from "./fallback";

export interface EmptyProps {
  isMobile?: boolean;
}

export function Empty(props: EmptyProps) {
  const { isMobile = false } = props;
  const { Navigate } = useNavigation();
  const ASSETS = useAssets(["EMPTY"]);
  return (
    <Fallback
      isMobile={isMobile}
      image={{
        src: ASSETS.EMPTY,
        width: 500,
        height: 344,
      }}
      title="Halaman yang Kamu Cari Tidak Ditemukan"
      description={
        <Text fontSize={isMobile ? "sm" : "lg"} textAlign="center">
          Coba cek rekomendasi berikut ini atau kembali ke{" "}
          <Navigate name="HOME">
            <Link colorScheme="sea" fontWeight="semibold" fontSize="inherit">
              beranda
            </Link>
          </Navigate>
        </Text>
      }
    />
  );
}
