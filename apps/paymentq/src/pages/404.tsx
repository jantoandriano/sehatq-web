import React from "react";
import Link from "next/link";
import { Box, Flex, Text } from "@sehatq/components";
import { useRouter } from "next/router";
import { ENV, SEO } from "@sehatq/constants";
import { HeadContent } from "@components/head/head-content";
import { generateSEO } from "@utils";

export default function NotFoundPage() {
  const { asPath } = useRouter();
  const contentUrl = `${ENV.SEHATQ_DOMAIN}${asPath}`;
  const { SEO_DEFAULT } = SEO.SEHATQ;

  return (
    <>
      <HeadContent
        {...generateSEO({
          content: {
            title: "Halaman Tidak Ditemukan | SehatQ",
            description: SEO_DEFAULT.desc,
            keywords: SEO_DEFAULT.keywords,
          },
          ogUrl: contentUrl,
          canonicalUrl: contentUrl,
        })}
      />
      <Flex
        h="100vh"
        bgImage="/images/error-404.jpg"
        bgRepeat="no-repeat"
        bgSize="cover"
        bgPosition="center"
        alignItems="center"
        justifyContent="flex-end"
        w="full"
        paddingRight={4}
      >
        <Box textAlign="right" w="44%">
          <Text
            fontSize="7vw"
            color="white"
            lineHeight="1"
            fontWeight="bold"
            marginBottom={3}
          >
            ERROR 404
          </Text>
          <Text as="span" fontSize="1rem" color="#000" fontWeight="semibold">
            You are almost there! Harap bersabar kembali ke{" "}
          </Text>
          <Link href="/">
            <Text
              as="span"
              fontWeight="bold"
              fontSize="1rem"
              color="#3d9b9b"
              cursor="pointer"
            >
              Beranda
            </Text>
          </Link>
        </Box>
      </Flex>
    </>
  );
}
