import { useAssets, useNavigation } from "@sehatq/utils";
import React from "react";
import htmlParser from "html-react-parser";
import {
  Box,
  Center,
  HStack,
  LinkBox,
  LinkOverlay,
  Text,
  useImage,
  VStack,
} from "../../user-interfaces";
import { HealthToolRecordsDetailCache } from "..";

interface Props {
  content: HealthToolRecordsDetailCache["data"];
}

export function HealthToolScoreDetailDesktop({ content }: Props) {
  const Image = useImage();
  const ASSETS = useAssets(["NO_IMAGE"]);
  const { Navigate } = useNavigation();
  return (
    <VStack
      border="1px solid"
      borderColor="veryLightPink"
      p={7}
      borderRadius="lg"
      alignItems="flex-start"
      spacing={4}
    >
      <HStack alignItems="flex-start" spacing={6}>
        <Box>
          <Image
            src={content.iconUrl || ASSETS.NO_IMAGE}
            alt="Health Tool Score Detail"
            layout="fill"
            objectFit="contain"
            wrapperProps={{
              boxSize: "130px",
            }}
          />
        </Box>
        <Box>
          <Text fontSize="sm" noOfLines={1}>
            {content.diagnosisTitle}
          </Text>
          <Text
            fontSize="3xl"
            fontFamily="Poppins"
            fontWeight="semibold"
            color={`#${content.descriptionColor}`}
          >
            {content.diagnosisName}
          </Text>
          <Text fontWeight="semibold">
            {htmlParser(content.description || "")}
          </Text>
        </Box>
      </HStack>
      <VStack
        alignItems="flex-start"
        bg="paleBlue.500"
        p={6}
        borderRadius="lg"
        w="full"
      >
        <Text fontWeight="semibold" fontFamily="Poppins">
          Rekomendasi:
        </Text>
        <Box sx={{ "& li": { ml: 4 } }} textAlign="justify">
          {htmlParser(content.recommendation || "")}
        </Box>
      </VStack>
      <Center w="full">
        <LinkBox bg="main.500" p={3} textAlign="center" borderRadius="md">
          <Navigate
            name="TELEMED_HCPS"
            query={{
              slugs: [content.recommendationSlug],
            }}
          >
            <LinkOverlay
              fontWeight="semibold"
              w="full"
              color="white"
              noOfLines={1}
            >
              {content.recommendationButtonText}
            </LinkOverlay>
          </Navigate>
        </LinkBox>
      </Center>
    </VStack>
  );
}
