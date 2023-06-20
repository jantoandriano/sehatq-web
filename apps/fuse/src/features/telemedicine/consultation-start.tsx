import React, { useState } from "react";
import { Box, Flex, Text, Button, Image } from "@sehatq/components";
import { ConsultationForm } from "./consultation-form";

export function ConsultationStart() {
  const [isShowForm, setShowForm] = useState(false);

  function handleShowForm() {
    setShowForm(true);
  }

  if (isShowForm) {
    return <ConsultationForm />;
  }

  return (
    <Box padding={3}>
      <Flex justifyContent="center" marginTop={2} marginBottom={6}>
        <Image
          alt="SehatQ"
          src="/images/logo-sehatq-with-text.svg"
          width={160}
          height={35}
        />
      </Flex>
      <Flex justifyContent="center" marginBottom={6}>
        <Image
          alt="Mulai Konsultasi"
          src="/images/illustration-chat-start.svg"
          width={250}
          height={250}
        />
      </Flex>
      <Text
        fontFamily="poppins"
        fontWeight="semibold"
        textAlign="center"
        textTransform="capitalize"
        marginBottom={6}
      >
        Konsultasi ini akan dilayani SehatQ
      </Text>
      <Text fontSize="md" marginBottom={6} textAlign="center">
        Kamu bisa konsultasikan kesehatanmu dengan dokter dan juga tebus resep
        obat yang dicover oleh asuransi.
      </Text>
      <Text marginBottom={12} textAlign="center">
        Sebelum mulai, isi form dulu, yuk!
      </Text>
      <Button width="100%" onClick={handleShowForm}>
        Isi Form Konsultasi
      </Button>
    </Box>
  );
}
