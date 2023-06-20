import React from "react";
import { useNavigation, priceFormat } from "@sehatq/utils";
import {
  HStack,
  VStack,
  Box,
  Text,
  LinkBox,
  LinkOverlay,
  Center,
  useImage,
} from "../../user-interfaces";

type PrescriptionItemProps = {
  name: string;
  slug: string;
  priceFrom: number;
  icon: string;
};

export type PrescriptionBubbleMobileProps = {
  prescriptions: PrescriptionItemProps[];
};

export function PrescriptionBubbleMobile(props: PrescriptionBubbleMobileProps) {
  const { prescriptions } = props;

  return (
    <>
      <Text fontSize="sm" fontFamily="poppins" fontWeight="semibold">
        Rekomendasi Resep
      </Text>
      <VStack spacing="2" align="normal" my={2}>
        {prescriptions?.map((data) => (
          <Box key={data.slug}>
            <PrescriptionItem {...data} />
          </Box>
        ))}
      </VStack>
      <Box
        background="iceBlue.500"
        borderRadius="lg"
        p={2}
        textAlign="center"
        minW="260px"
        width="full"
      >
        <Text fontSize="xs">Resep dapat ditebus setelah chat selesai.</Text>
      </Box>
    </>
  );
}

export function PrescriptionItem(props: PrescriptionItemProps) {
  const { Navigate } = useNavigation();
  const Image = useImage();
  const { name, slug, priceFrom, icon } = props;

  return (
    <LinkBox width="100%">
      <HStack spacing={2.5} boxShadow="base" borderRadius="lg" p={3}>
        <Image
          src={icon}
          alt={name}
          layout="fill"
          objectFit="contain"
          wrapperProps={{
            width: "40px",
            height: "40px",
            overflow: "hidden",
          }}
        />
        <VStack spacing={0.5} align="flex-start" width="full">
          <Navigate name="EXTERNAL_PRODUCT" query={{ slug }}>
            <LinkOverlay
              noOfLines={2}
              fontSize="xs"
              lineHeight="base"
              fontWeight="semibold"
              fontFamily="poppins"
              pr={2}
            >
              {name}
            </LinkOverlay>
          </Navigate>
          <Center alignItems="baseline">
            <Text fontSize="xxs" color="brownGrey.500" pr={1.5}>
              Mulai dari
            </Text>
            {priceFrom && (
              <Text fontSize="xs" color="sea.500" fontWeight="bold">
                {priceFormat(priceFrom)}
              </Text>
            )}
          </Center>
        </VStack>
      </HStack>
    </LinkBox>
  );
}
