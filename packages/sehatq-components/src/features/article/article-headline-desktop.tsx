import React from "react";
import { useNavigation, useAssets, saveFile } from "@sehatq/utils";
import {
  Box,
  Link,
  Text,
  Divider,
  HStack,
  Skeleton,
  SkeletonText,
  StarIcon,
  Flex,
  useImage,
  Button,
  DownloadIcon,
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

export interface ArticleRating {
  average: number;
  totalReview: number;
}

export type ArticleHeadlineDesktopProps = {
  title: string;
  image?: ArticleImage;
  reviewedBy?: ArticleReviewer;
  category?: ArticleCategory;
  author?: ArticleAuthor;
  date: string;
  summary: string;
  shareUrl: string;
  sponsorUrl: string | null;
  hasSponsored: boolean;
  sponsorImageUrl: string | null;
};

export function ArticleHeadlineDesktop(props: ArticleHeadlineDesktopProps) {
  const Image = useImage();
  const { Navigate } = useNavigation();
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
          paddingX={3}
          paddingY={2}
          fontSize="sm"
          borderRadius="base"
          background="#f3f3f3"
          marginBottom={4}
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
      {summary && (
        <>
          <HStack marginTop={2}>
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
            fontSize="md"
            fontWeight="semibold"
            color="charcoalGrey"
            lineHeight="9"
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

      {sponsorImageUrl ? (
        <HStack spacing={3} marginTop={2} marginBottom={4}>
          <Text fontSize="sm">DISPONSORI OLEH</Text>
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
                  height: "40px",
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
                height: "40px",
              }}
            />
          )}
        </HStack>
      ) : null}

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
          {image && category?.slug == "infografik" && (
            <Button
              variant="solid"
              colorScheme="iceBlue"
              color="sea.500"
              height="54px"
              size="lg"
              fontSize="sm"
              borderRadius="xl"
              lineHeight={26}
              fontWeight="semibold"
              rightIcon={<DownloadIcon />}
              onClick={() => saveFile(image.url, image.caption ?? "infografik")}
            >
              Download
            </Button>
          )}
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
              sizes="760px"
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
              priority={true}
              objectFit="cover"
              sizes="760px"
              wrapperProps={{
                width: "100%",
                paddingBottom:
                  category?.slug == "infografik" ? "177.74%" : "50%",
                borderRadius: "xl",
                overflow: "hidden",
              }}
            />
          )}
          <Text
            pt="1.5"
            fontSize="sm"
            color="charcoalGrey"
            align="center"
            fontStyle="italic"
          >
            {image.caption}
          </Text>
        </Box>
      )}
    </Box>
  );
}

export function ArticleHeadlineDesktopSkeleton() {
  const ASSETS = useAssets(["QUOTE_ICON_OPEN", "QUOTE_ICON_CLOSE"]);
  const Image = useImage();
  return (
    <Box>
      <Skeleton width={50} height={3} marginBottom="3" />
      <Skeleton noOfLines={2} height={5} marginBottom="3" />
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
