import React from "react";
import { useNavigation, useAssets, saveFile } from "@sehatq/utils";
import {
  Box,
  Button,
  Divider,
  DownloadIcon,
  Flex,
  HStack,
  Link,
  Skeleton,
  SkeletonText,
  StarIcon,
  Text,
  useImage,
} from "../../user-interfaces";
import { SocialShare } from "../general";

export interface ArticleImage {
  url: string;
  caption: string;
  alt: string;
  width: number;
  height: number;
}

export interface ArticleAuthor {
  name: string;
  slug: string;
}

export interface ArticleReviewer {
  name: string;
  slug: string;
}

export interface ArticleCategory {
  name: string;
  slug: string;
}

export type ArticleHeadlineMobileProps = {
  title: string;
  reviewedBy?: ArticleReviewer;
  author?: ArticleAuthor;
  category?: ArticleCategory;
  date: string;
  image?: ArticleImage;
  summary: string;
  shareUrl: string;
  sponsorUrl: string | null;
  hasSponsored: boolean;
  sponsorImageUrl: string | null;
};

export function ArticleHeadlineMobile(props: ArticleHeadlineMobileProps) {
  const { Navigate } = useNavigation();
  const Image = useImage();
  const {
    category,
    title,
    summary,
    author,
    date,
    reviewedBy,
    image,
    shareUrl,
    sponsorUrl,
    hasSponsored,
    sponsorImageUrl,
  } = props;
  const ASSETS = useAssets(["QUOTE_ICON_OPEN", "QUOTE_ICON_CLOSE"]);
  return (
    <Box>
      {hasSponsored ? (
        <Text
          paddingX={2}
          paddingY={1}
          fontSize="xxs"
          borderRadius="base"
          background="#f3f3f3"
          marginBottom={2}
        >
          Artikel Bersponsor
        </Text>
      ) : null}
      {category && (
        <Navigate
          name="ARTICLE"
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

      {sponsorImageUrl ? (
        <HStack spacing={2} marginTop={2} marginBottom={2}>
          <Text fontSize="xxs">DISPONSORI OLEH</Text>
          {sponsorUrl ? (
            <Link href={sponsorUrl} target="_blank">
              <Image
                src={sponsorImageUrl}
                alt="sponsor"
                sizes="120px"
                layout="fill"
                objectFit="contain"
                objectPosition="left"
                priority={true}
                wrapperProps={{
                  width: "200px",
                  height: "24px",
                }}
              />
            </Link>
          ) : (
            <Image
              src={sponsorImageUrl}
              alt="sponsor"
              sizes="120px"
              layout="fill"
              objectFit="contain"
              priority={true}
              wrapperProps={{
                width: "200px",
                height: "24px",
              }}
            />
          )}
        </HStack>
      ) : null}

      {summary && (
        <>
          <HStack>
            <Image
              src={ASSETS.QUOTE_ICON_OPEN}
              alt="open-summary"
              width={28}
              height={20}
              layout="fixed"
              priority={true}
            />
            <Divider borderColor="veryLightPink" border="solid 1px" />
          </HStack>
          <Text
            pt={2}
            pb={2}
            color="charcoalGrey"
            fontSize="md"
            fontWeight="semibold"
            lineHeight="base"
          >
            {summary}
          </Text>
          <HStack>
            <Divider borderColor="veryLightPink" border="solid 1px" />
            <Image
              src={ASSETS.QUOTE_ICON_CLOSE}
              alt="close-summary"
              width={28}
              height={20}
              layout="fixed"
              priority={true}
            />
          </HStack>
        </>
      )}

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
        {image && category?.slug == "infografik" && (
          <Button
            size="xs"
            variant="solid"
            colorScheme="iceBlue"
            color="sea.500"
            height="32px"
            borderRadius="base"
            fontWeight="semibold"
            rightIcon={<DownloadIcon />}
            onClick={() => saveFile(image.url, image.caption ?? "infografik")}
          >
            Download
          </Button>
        )}
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

      {image && (
        <Box marginTop="3">
          {image.width && image.height ? (
            <Image
              alt={image.alt}
              src={image.url}
              layout="responsive"
              priority={true}
              width={image.width}
              height={image.height}
              sizes="480px"
              wrapperProps={{
                borderRadius: "xl",
                overflow: "hidden",
              }}
            />
          ) : (
            <Image
              alt={image.alt}
              src={image.url}
              layout="fill"
              objectFit="cover"
              priority={true}
              sizes="480px"
              wrapperProps={{
                width: "100%",
                paddingBottom:
                  category?.slug == "infografik" ? "177.74%" : "50%",
                borderRadius: "xl",
                overflow: "hidden",
              }}
            />
          )}
          <Text pt="1.5" fontSize="xxs" align="center" fontStyle="italic">
            {image.caption}
          </Text>
        </Box>
      )}
    </Box>
  );
}

export function ArticleHeadlineMobileSkeleton() {
  const ASSETS = useAssets(["QUOTE_ICON_OPEN", "QUOTE_ICON_CLOSE"]);
  const Image = useImage();
  return (
    <Box>
      <Skeleton width={50} height="3" marginBottom="3" />
      <SkeletonText noOfLines={2} skeletonHeight="5" marginBottom="3" />
      <HStack marginBottom="3">
        <Image
          src={ASSETS.QUOTE_ICON_OPEN}
          alt="open-summary"
          width={28}
          height={20}
          layout="fixed"
          priority={true}
        />
        <Divider borderColor="veryLightPink" border="solid 1px" />
      </HStack>
      <SkeletonText noOfLines={3} skeletonHeight="3.5" marginBottom="3" />
      <HStack marginBottom="3">
        <Divider borderColor="veryLightPink" border="solid 1px" />
        <Image
          src={ASSETS.QUOTE_ICON_CLOSE}
          alt="close-summary"
          width={28}
          height={20}
          layout="fixed"
          priority={true}
        />
      </HStack>
      <HStack spacing="1" marginBottom="2">
        <StarIcon color="brownGrey.500" height={3} />
        <Skeleton width={100} height={3} />
      </HStack>
      <Skeleton marginBottom="2" width={100} height={3} />
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
