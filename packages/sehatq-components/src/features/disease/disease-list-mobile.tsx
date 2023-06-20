import React, { LegacyRef } from "react";
import { useNavigation, useAssets } from "@sehatq/utils";
import { AdSlot } from "../google-publisher-tag";
import {
  Box,
  InputGroup,
  InputLeftElement,
  SearchIcon,
  Input,
  InputRightAddon,
  Flex,
  Link,
  Skeleton,
  Text,
  useImage,
  Button,
  Grid,
  GridItem,
} from "../../user-interfaces";
import { DiseaseBanner, DiseaseBannerSkeleton } from "./disease-banner";
import {
  DiseaseAlphabetFilter,
  DiseaseAlphabetFilterSkeleton,
} from "./disease-alphabet-filter";
import {
  SimpleDiseaseCard,
  SimpleDiseaseCardSkeleton,
} from "./simple-disease-card";

export type DiseaseListMobileProps = {
  featured: {
    id: number;
    path: string;
    slug: string;
    title: string;
    imageUrl: string;
    imageAlt: string;
    reviewedBy: {
      id: number;
      slug: string;
      name: string;
    };
  }[];
  h1: string;
  diseases: {
    id: number;
    path: string;
    slug: string;
    title: string;
    imageUrl: string;
    imageAlt: string;
  }[];
  diseaseCategorySlug: string;
  alphabetSlug: string;
  onSubmit: (value: React.FormEvent<HTMLFormElement>) => void;
  search: string;
  adsTop?: ReturnType<typeof AdSlot>;
  adsBottom?: ReturnType<typeof AdSlot>;
  refInput: LegacyRef<HTMLInputElement> | undefined;
};

export function DiseaseListMobile(props: DiseaseListMobileProps) {
  const {
    diseaseCategorySlug,
    alphabetSlug,
    featured,
    diseases,
    onSubmit,
    search,
    adsTop,
    adsBottom,
    refInput,
  } = props;
  const { Navigate } = useNavigation();

  return (
    <Box>
      {!!featured.length && (
        <Box mb="10px">
          <DiseaseBanner
            isMobile
            slug={featured[0].slug}
            title={featured[0].title}
            reviewer={featured[0].reviewedBy}
            imageUrl={featured[0].imageUrl}
            imageAlt={featured[0].imageAlt}
          />
        </Box>
      )}
      {adsTop && <Box py={2}>{adsTop}</Box>}
      <Text
        fontFamily="poppins"
        fontWeight="semibold"
        fontSize="md"
        mb={2}
        mx={4}
      >
        Daftar Penyakit
      </Text>
      <form onSubmit={onSubmit} style={{ margin: "0 15px" }}>
        <InputGroup mb="20px">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="brownGrey.500" />
          </InputLeftElement>
          <Input
            id="search"
            px={10}
            fontSize="xs"
            borderRight="none"
            borderEndRadius="none"
            ref={refInput}
            _hover={{ borderColor: "none" }}
            _focus={{ borderColor: "none" }}
          />
          <Button
            variant="link"
            color="white"
            fontSize="sm"
            fontWeight="semibold"
            type="submit"
          >
            <InputRightAddon bg="sea.500" w="81px" justifyContent="center">
              Cari
            </InputRightAddon>
          </Button>
        </InputGroup>
      </form>

      <Flex flexDirection="row" mb={4}>
        {diseases.length ? (
          <>
            <Flex flexWrap="wrap" mt={2} mx={5} alignSelf="flex-start" w="full">
              <Grid templateColumns="repeat(2, 1fr)" gap={4} w="full">
                {diseases.slice(0, 8).map((item) => (
                  <GridItem key={item.id}>
                    <SimpleDiseaseCard
                      isMobile
                      name={item.title}
                      imageUrl={item.imageUrl}
                      imageAlt={item.imageAlt}
                      slug={item.slug}
                    />
                  </GridItem>
                ))}
              </Grid>
              <Grid templateColumns="repeat(2, 1fr)" gap={4} mt={5} w="full">
                {diseases.slice(8).map((item) => (
                  <GridItem key={item.id} minh={14}>
                    <Navigate
                      name="DISEASE"
                      query={{
                        slugs: [item.slug],
                      }}
                    >
                      <Link
                        color="charcoalGrey"
                        fontWeight="semibold"
                        fontFamily="poppins"
                        fontSize="sm"
                        wordBreak="break-all"
                      >
                        {item.title}
                      </Link>
                    </Navigate>
                  </GridItem>
                ))}
              </Grid>
            </Flex>
          </>
        ) : (
          <EmptyState disease={search} />
        )}
        <Box
          position="sticky"
          top={14}
          right={3}
          height="full"
          w="20px"
          zIndex="2"
        >
          <DiseaseAlphabetFilter
            isMobile
            alphabetSlug={alphabetSlug}
            diseaseCategorySlug={diseaseCategorySlug}
          />
        </Box>
      </Flex>
      {adsBottom}
    </Box>
  );
}

function EmptyState({ disease }: { disease: string }) {
  const { Navigate } = useNavigation();
  const ASSETS = useAssets(["EMPTY_HCP_LIST"]);
  const Image = useImage();
  return (
    <>
      <Flex alignItems="center" flexDirection="column" w="full">
        <Image
          alt="Empty Penyakit"
          src={ASSETS.EMPTY_HCP_LIST}
          width={213}
          height={220}
          layout="fixed"
          wrapperProps={{
            mb: "20px",
          }}
        />
        <Box w="auto">
          <Text
            fontFamily="poppins"
            fontWeight="semibold"
            fontSize="md"
            textAlign="center"
          >
            Penyakit {`"${disease}"`} Tidak Ditemukan
          </Text>
          <Text fontSize="sm" textAlign="center">
            Coba kata kunci lain atau lihat
          </Text>
          <Navigate name="DISEASES">
            <Link
              colorScheme="sea"
              minW={0}
              padding={0}
              fontSize="sm"
              height="10px"
              justifyContent="center"
              w="full"
              _hover={{ bg: "none" }}
            >
              {" "}
              Daftar Penyakit.
            </Link>
          </Navigate>
        </Box>
      </Flex>
    </>
  );
}

export function DiseaseListSkeletonMobile() {
  return (
    <>
      <DiseaseBannerSkeleton isMobile />
      <Skeleton width="30%" height="15px" my={5} />
      <Flex>
        <Flex
          flexWrap="wrap"
          justifyContent="space-between"
          alignItems="flex-start"
          mr={14}
        >
          {Array.from(Array(4).keys()).map((index) => (
            <Box w="130px" mb="20px" key={index}>
              <SimpleDiseaseCardSkeleton isMobile />
            </Box>
          ))}
        </Flex>
        <Box w="20px" mr={3}>
          <DiseaseAlphabetFilterSkeleton isMobile />
        </Box>
      </Flex>
    </>
  );
}
