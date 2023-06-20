import React from "react";
import { useNavigation } from "@sehatq/utils";
import {
  Box,
  Link,
  Text,
  HStack,
  Skeleton,
  SkeletonText,
  Flex,
  useImage,
} from "../../user-interfaces";
import { SocialShare } from "../general";
import { type DiseaseDetailProps } from "./disease-headline";

export type DiseaseHeadlineDesktopProps = DiseaseDetailProps;

export function DiseaseHeadlineDesktop(props: DiseaseHeadlineDesktopProps) {
  const Image = useImage();
  const { Navigate } = useNavigation();
  const { category, title, author, date, reviewedBy, images, shareUrl } = props;

  return (
    <Box>
      {category && (
        <Navigate
          name="DISEASE"
          query={{
            slugs: [category.slug],
          }}
        >
          <Link
            colorScheme="main"
            color="sea.500"
            variant="link"
            fontSize="md"
            lineHeight="normal"
            fontWeight="semibold"
            pb={2}
            _hover={{
              color: "main.500",
            }}
          >
            {category.name}
          </Link>
        </Navigate>
      )}
      <Text
        fontSize="6xl"
        fontFamily="poppins"
        fontWeight="semibold"
        lineHeight="base"
        as="h1"
      >
        {title}
      </Text>

      <Flex justify="space-between" marginTop={4}>
        <Box>
          <HStack pb={1} spacing="1" color="brownGrey.500">
            <Text fontSize="sm">{date}</Text>
            {author && (
              <Text fontSize="sm">
                |{" "}
                <Navigate
                  name="AUTHOR"
                  query={{
                    slug: author.slug,
                  }}
                >
                  <Link
                    colorScheme="brownGrey"
                    variant="link"
                    fontSize="sm"
                    _hover={{
                      color: "sea.500",
                    }}
                  >
                    {author.name}
                  </Link>
                </Navigate>
              </Text>
            )}
          </HStack>

          {reviewedBy && (
            <Text pb={2} fontSize="sm" color="brownGrey.500">
              Ditinjau oleh{" "}
              <Navigate
                name="REVIEWER"
                query={{
                  slug: reviewedBy.slug,
                }}
              >
                <Link
                  colorScheme="brownGrey"
                  variant="link"
                  fontSize="sm"
                  _hover={{
                    color: "sea.500",
                  }}
                >
                  {reviewedBy.name}
                </Link>
              </Navigate>
            </Text>
          )}
        </Box>
        <HStack marginTop="auto" marginBottom="auto" spacing={2}>
          <SocialShare
            isMobile={false}
            px={2}
            py={2}
            sizeIcon="38"
            url={shareUrl}
            hideTitleShare={true}
            hideTitleSocial={true}
          />
        </HStack>
      </Flex>
      {!!images.length && (
        <Box marginTop="3">
          <Image
            alt={images[0].alt}
            src={images[0].url}
            layout="fill"
            priority={true}
            objectFit="cover"
            sizes="760px"
            wrapperProps={{
              width: "100%",
              paddingBottom: "50%",
              borderRadius: "xl",
              overflow: "hidden",
            }}
          />
          <Text
            pt="1.5"
            fontSize="sm"
            color="charcoalGrey"
            align="center"
            fontStyle="italic"
          >
            {images[0].caption}
          </Text>
        </Box>
      )}
    </Box>
  );
}

export function DiseaseHeadlineSkeletonDesktop() {
  const Image = useImage();
  return (
    <Box>
      <Skeleton width={50} height={3} marginBottom="3" />
      <Skeleton noOfLines={2} height={5} marginBottom="3" />
      <Skeleton width={100} height={3} marginBottom="2" />
      <Skeleton marginBottom="2" width={100} height={3} />
      <Image
        alt="no image"
        src="https://www.sehatq.com/public/assets/img/no-image.jpg"
        layout="fill"
        priority={true}
        objectFit="cover"
        wrapperProps={{
          width: "100%",
          paddingBottom: "50%",
          borderRadius: "xl",
          overflow: "hidden",
        }}
      />
      <SkeletonText pt={2} noOfLines={1} />
    </Box>
  );
}
