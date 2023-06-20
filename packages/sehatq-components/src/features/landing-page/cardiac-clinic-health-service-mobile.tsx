import React from "react";

import { useNavigation } from "@sehatq/utils";
import {
  Box,
  useImage,
  Text,
  Flex,
  HStack,
  Icon,
  LinkBox,
  LinkOverlay,
  ArrowForwardIcon,
} from "../../user-interfaces";

export type CardiacClinicHealthServiceMobileProps = {
  contents: {
    id: number;
    title: string;
    image: unknown;
    slugs: string[];
  }[];
};

export function CardiacClinicHealthServiceMobile(
  props: CardiacClinicHealthServiceMobileProps
) {
  const { contents } = props;
  const Image = useImage();
  const { Navigate } = useNavigation();

  return (
    <Box>
      <Box px={4}>
        <Text
          fontSize="sm"
          color="sea.500"
          fontWeight="medium"
          fontFamily="poppins"
          mb={3}
        >
          LAYANAN KESEHATAN
        </Text>
        <Text
          fontSize="3xl"
          fontFamily="poppins"
          fontWeight="bold"
          lineHeight={12}
          mb={5}
        >
          Cegah Gangguan Jantung dengan Pemeriksaan Kesehatan
        </Text>
      </Box>
      <HStack spacing={2.5} overflowX="auto" px={4}>
        {contents.map((content) => (
          <LinkBox key={content.id} position="relative">
            <Image
              priority
              src={content.image as string}
              alt={content.title}
              layout="fill"
              objectFit="cover"
              wrapperProps={{
                w: "157px",
                h: "185px",
                overflow: "hidden",
              }}
            />
            <Flex
              position="absolute"
              top={0}
              bottom={0}
              left={0}
              right={0}
              p={2.5}
              flexDirection="column"
              justifyContent="flex-end"
            >
              <Navigate
                name="HEALTH_SERVICE_DETAIL"
                query={{ slugs: content.slugs }}
              >
                <LinkOverlay
                  color="white"
                  fontFamily="poppins"
                  fontWeight="semibold"
                  fontSize="xs"
                  mb={1}
                >
                  {content.title}
                </LinkOverlay>
              </Navigate>
              <Text
                fontSize="7px"
                fontFamily="poppins"
                color="white"
                fontWeight="semibold"
              >
                Lihat Detail
                <Icon as={ArrowForwardIcon} h={1.5} w={2} ml={1} />
              </Text>
            </Flex>
          </LinkBox>
        ))}
      </HStack>
    </Box>
  );
}
