import React from "react";
import { Button, Flex, Fallback, Image, Text } from "@sehatq/components";

export function DoctorUnavailable() {
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
          src: "/images/consultation-unavailable.svg",
          width: 238,
          height: 210,
        }}
        layout="vertical"
        title="Dokternya Belum Ketemu, Nih"
        description={
          <Text fontSize="sm" textAlign="center">
            Tenang, kamu bisa klik tombol <strong>Refresh</strong> dan kami akan
            bantu carikan dokter lainnya.
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
        marginTop="100px"
      >
        Refresh
      </Button>
    </Flex>
  );
}
