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

export type DiseaseHeadlineMobileProps = DiseaseDetailProps;

export function DiseaseHeadlineMobile(props: DiseaseHeadlineMobileProps) {
  const { Navigate } = useNavigation();
  const Image = useImage();
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
            fontSize="xs"
            lineHeight="normal"
            fontWeight="semibold"
            pb={2}
            _hover={{
              color: "sea.500",
            }}
          >
            {category.name}
          </Link>
        </Navigate>
      )}
      <Text
        marginBottom={2}
        fontFamily="poppins"
        fontSize="4xl"
        lineHeight="short"
        fontWeight="semibold"
        as="h1"
      >
        {title}
      </Text>

      <Flex justify="space-between">
        <Box>
          <HStack spacing={1} pb={1}>
            <Text fontSize="xxs" lineHeight="tall" color="brownGrey.500">
              {date}
            </Text>
            {author && (
              <Text fontSize="xxs" lineHeight="tall" color="brownGrey.500">
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
                    fontSize="xxs"
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
            <Text pb={2} fontSize="xxs" lineHeight="tall" color="brownGrey.500">
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
                  fontSize="xxs"
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
      </Flex>
      <SocialShare
        isMobile={true}
        px={4}
        py={3}
        spacing={3}
        sizeIcon="38"
        url={shareUrl}
        hideTitleShare={true}
        hideTitleSocial={true}
      />

      {!!images.length && (
        <Box marginTop="3">
          <Image
            alt={images[0].alt}
            src={images[0].url}
            layout="fill"
            objectFit="cover"
            priority={true}
            sizes="480px"
            wrapperProps={{
              width: "100%",
              paddingBottom: "50%",
              borderRadius: "xl",
              overflow: "hidden",
            }}
          />
          <Text pt="1.5" fontSize="xxs" align="center" fontStyle="italic">
            {images[0].caption}
          </Text>
        </Box>
      )}
    </Box>
  );
}

export function DiseaseHeadlineSkeletonMobile() {
  const Image = useImage();
  return (
    <Box>
      <Skeleton width={50} height="3" marginBottom="3" />
      <SkeletonText noOfLines={2} skeletonHeight="5" marginBottom="3" />
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
