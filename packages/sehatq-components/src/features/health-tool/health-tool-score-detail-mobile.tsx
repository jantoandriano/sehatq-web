import { useAssets, useNavigation } from "@sehatq/utils";
import React from "react";
import htmlParser from "html-react-parser";
import {
  Box,
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

export function HealthToolScoreDetailMobile({ content }: Props) {
  const Image = useImage();
  const ASSETS = useAssets(["NO_IMAGE"]);
  const { Navigate } = useNavigation();
  return (
    <VStack spacing={4}>
      <Image
        src={content.iconUrl || ASSETS.NO_IMAGE}
        alt="Health Tool Score Detail"
        layout="fill"
        objectFit="contain"
        wrapperProps={{
          boxSize: "130px",
        }}
      />
      <VStack>
        <Text fontSize="sm" noOfLines={1} textAlign="center">
          {content.diagnosisTitle}
        </Text>
        <Text
          fontSize="3xl"
          fontFamily="Poppins"
          fontWeight="semibold"
          textAlign="center"
          noOfLines={4}
          color={`#${content.descriptionColor}`}
        >
          {content.diagnosisName}
        </Text>
        <Text fontWeight="semibold" textAlign="center" fontSize="sm">
          {htmlParser(content.description || "")}
        </Text>
      </VStack>
      <VStack
        alignItems="flex-start"
        bg="paleBlue.500"
        p={4}
        borderRadius="lg"
        w="full"
      >
        <Text fontWeight="semibold" fontFamily="Poppins" fontSize="sm">
          Rekomendasi:
        </Text>
        <Box sx={{ "& li": { ml: 4 } }} textAlign="justify">
          {htmlParser(content.recommendation || "")}
        </Box>
      </VStack>
      <LinkBox
        bg="main.500"
        w="full"
        p={3}
        textAlign="center"
        borderRadius="md"
      >
        <Navigate
          name="TELEMED_HCPS"
          query={{
            slugs: [content.recommendationSlug],
          }}
        >
          <LinkOverlay
            fontWeight="semibold"
            fontSize="sm"
            w="full"
            color="white"
            noOfLines={1}
          >
            {content.recommendationButtonText}
          </LinkOverlay>
        </Navigate>
      </LinkBox>
    </VStack>
  );
}
