import React, { useEffect, useState } from "react";
import {
  Box,
  Center,
  VStack,
  NewArticles,
  PopularForums,
  Empty,
  RecommendedHealthCareProfessionals,
  RecommendedHealthCareFacilities,
} from "@sehatq/components";
import { useRouter } from "next/router";
import { isMobileDevice, validatePrefixString } from "@sehatq/utils";
import { ENV, PREFIX_DOCTOR, SEO } from "@sehatq/constants";
import { generateSEO } from "@utils";
import { HeadContent } from "@components/head/head-content";

function checkIsHcpPage(path: string) {
  if (path.lastIndexOf("/dokter/", 0) === 0) {
    const hcpSlug = path.split("/")[2];
    return (
      validatePrefixString(hcpSlug as string, PREFIX_DOCTOR.FIRST, "FIRST") ||
      validatePrefixString(hcpSlug as string, PREFIX_DOCTOR.LAST, "LAST")
    );
  }
  return false;
}

export default function NotFoundPage() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const { asPath } = useRouter();
  const contentUrl = `${ENV.SEHATQ_DOMAIN}${asPath}`;
  const { SEO_DEFAULT } = SEO.SEHATQ;

  useEffect(() => {
    setIsMobile(isMobileDevice(window?.navigator?.userAgent));
  }, []);
  const isHcpPage = checkIsHcpPage(asPath);

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
      {isMobile === null ? null : isMobile ? (
        <VStack width="100%" spacing={8} paddingX={3} paddingY={8}>
          <Empty isMobile />
          <Box width="100%">
            {isHcpPage ? (
              <RecommendedHealthCareProfessionals isMobile />
            ) : (
              <NewArticles isMobile />
            )}
          </Box>
          <Box width="100%">
            {isHcpPage ? (
              <RecommendedHealthCareFacilities isMobile />
            ) : (
              <PopularForums isMobile />
            )}
          </Box>
        </VStack>
      ) : (
        <Center width="100vw">
          <VStack width="800px" spacing={8} paddingX={3} paddingY={8}>
            <Empty isMobile={false} />
            <Box width="100%">
              {isHcpPage ? (
                <RecommendedHealthCareProfessionals />
              ) : (
                <NewArticles isMobile={false} />
              )}
            </Box>
            <Box width="100%">
              {isHcpPage ? (
                <RecommendedHealthCareFacilities />
              ) : (
                <PopularForums isMobile={false} />
              )}
            </Box>
          </VStack>
        </Center>
      )}
    </>
  );
}
