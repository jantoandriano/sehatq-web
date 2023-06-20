import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Text,
  Textarea,
  Flex,
  VStack,
  StackDivider,
  Divider,
  Alert,
} from "@sehatq/components";
import {
  useShippingAddresses,
  ShippingAddress,
} from "@queries/address/shipping-address-queries";
import { useDrugRecommendations } from "@queries/drug-recommendation/drug-recommendation-queries";
import { useCreatePrescriptionRequests } from "@queries/prescription-request/prescription-request-queries";

type Address = ShippingAddress["data"] | null | undefined;

export function DrugRecommendation() {
  const router = useRouter();
  const [notes, setNotes] = useState("");
  const addresses = useShippingAddresses();
  const createPrescriptionRequests = useCreatePrescriptionRequests();

  const drugRecommendations = useDrugRecommendations(
    {
      consultationId: router.query.id as string,
    },
    {
      enabled: router.isReady,
    }
  );

  if (addresses.isError || drugRecommendations.isError)
    return <Box p="16px">Error!</Box>;

  if (addresses.isLoading || drugRecommendations.isLoading)
    return <Box p="16px">Loading...</Box>;

  const addressData: Address = addresses?.data?.data?.[0];

  const checkDrugRecommendation = drugRecommendations?.data?.data;

  const handleSubmit = () => {
    if (checkDrugRecommendation?.isAllCovered) {
      if (addressData) {
        const variables = {
          consultationId: router.query.id as string,
          userAddressId: addressData.id || "",
          notes,
        };
        createPrescriptionRequests.mutate(variables, {
          onSuccess: () =>
            router.push(
              `/drug-recommendation/${router.query.id}/process-prescription`
            ),
        });
      }
    } else {
      router.push(`/chat/${router.query.id}/thank-you`);
    }
  };

  const renderAddress = () => (
    <Box background="iceBlue.500" padding="16px">
      <Flex justifyContent="space-between">
        <Text fontFamily="poppins" fontSize="sm" fontWeight="semibold">
          Tujuan Pengiriman
        </Text>
        {!!addressData && (
          <Button
            onClick={() =>
              router.push(
                `/drug-recommendation/${router.query.id}/address?shippingAddressId=${addressData.id}&placeId=${addressData.googlePlaceId}`
              )
            }
            variant="link"
            fontWeight="semibold"
            size="xs"
          >
            Ubah Alamat
          </Button>
        )}
      </Flex>
      {addressData ? (
        <Box background="white" marginTop="12px" borderRadius="8px">
          <Text p="14px" fontSize="xs" fontWeight="semibold">
            {addressData.label}
          </Text>
          <Divider borderColor="veryLightPink" border="solid 0.5px" />
          <Box p="14px">
            <Text mb="2px" fontSize="xs" fontWeight="semibold">
              {addressData.receiver}
            </Text>
            <Text mb="2px" fontSize="xs" fontWeight="semibold">
              {addressData.phone}
            </Text>
            <Text fontSize="xs">{addressData.address}</Text>
          </Box>
        </Box>
      ) : (
        <Flex
          background="white"
          alignItems="center"
          justifyContent="space-between"
          padding="10px 12px"
          marginTop="12px"
          borderRadius="4px"
        >
          <Text fontSize="xs" fontWeight="semibold">
            Belum ada alamat terdaftar
          </Text>
          <Button
            onClick={() =>
              router.push(`/drug-recommendation/${router.query.id}/address`)
            }
            size="xs"
          >
            Tambah Alamat
          </Button>
        </Flex>
      )}
    </Box>
  );

  const renderListObat = () => {
    if (drugRecommendations.isLoading) return;

    return (
      <Box padding="20px 16px">
        <Text fontFamily="poppins" fontSize="sm" fontWeight="semibold">
          List Obat
        </Text>
        <VStack
          divider={<StackDivider borderColor="veryLightPink" />}
          marginTop="16px"
          alignItems="flex-start"
          w="100%"
        >
          {checkDrugRecommendation?.products?.map((drug) => (
            <Box key={drug.id} marginBottom="6px">
              <Box opacity={drug.isCovered ? 1 : 0.4}>
                <Text fontSize="sm" fontWeight="semibold">
                  {drug.name} ({drug.notes})
                </Text>
                <Text fontSize="xxs">
                  {drug.qty} barang ({drug.weight})
                </Text>
              </Box>
              {!drug.isCovered && (
                <Text pt="6px" fontSize="xxs" color="cherry.500">
                  Obat tidak dicover oleh asuransi
                </Text>
              )}
            </Box>
          ))}
        </VStack>
        {checkDrugRecommendation?.isAllCovered ? (
          <Box mt="28px" position="relative">
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              borderRadius="4px"
              size="sm"
              rows={5}
              maxLength={300}
            />
            <Text
              background="#fff"
              position="absolute"
              fontSize="xxs"
              top="-8px"
              left="8px"
              p="0 4px"
              color="brownGrey.500"
              fontFamily="openSans"
              fontWeight="400"
              zIndex="2"
            >
              Catatan Penebusan Resep
            </Text>
            <Text
              background="#fff"
              position="absolute"
              fontSize="xxs"
              bottom="1px"
              right="1px"
              borderRadius="4px"
              p="8px"
              color="brownGrey.500"
              fontFamily="openSans"
              fontWeight="400"
              zIndex="2"
            >
              {notes?.length || 0}/300
            </Text>
          </Box>
        ) : (
          <Alert
            background="#FBEBEB"
            color="#802323"
            border="1px solid #D63B3B"
            borderRadius="8px"
            m="16px 0"
            status="error"
            fontSize="xs"
          >
            <Flex alignItems="flex-start">
              <Box mr="8px" as="img" src="/images/error.svg" />
              <Box>
                Mohon maaf, karena ada obat yang tidak dicover. Jadi tidak bisa
                diklaim.
              </Box>
            </Flex>
          </Alert>
        )}
      </Box>
    );
  };

  return (
    <Flex direction="column" justifyContent="space-between" height="100vh">
      <Box>
        {checkDrugRecommendation?.isAllCovered && renderAddress()}
        {renderListObat()}
      </Box>
      <Box padding="20px 16px">
        {!addressData && (
          <Alert
            background="#FBEBEB"
            color="#802323"
            border="1px solid #D63B3B"
            borderRadius="8px"
            marginBottom="16px"
            status="error"
          >
            Kamu belum memasukkan alamat. <br />
            Tambahkan alamat pengiriman dahulu.
          </Alert>
        )}
        <Button onClick={handleSubmit} isFullWidth>
          {checkDrugRecommendation?.isAllCovered ? "Proses Resep" : "Selesai"}
        </Button>
      </Box>
    </Flex>
  );
}
