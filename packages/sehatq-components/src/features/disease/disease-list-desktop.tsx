import React, { LegacyRef } from "react";
import { useNavigation, useAssets } from "@sehatq/utils";
import { AdSlot } from "../google-publisher-tag";
import {
  Box,
  Text,
  Flex,
  Link,
  InputGroup,
  InputLeftElement,
  Input,
  SearchIcon,
  InputRightAddon,
  Skeleton,
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

type DiseaseListItem = {
  id: number;
  path: string;
  slug: string;
  title: string;
  imageUrl: string;
  imageAlt: string;
};

export type DiseaseListDesktopProps = {
  adsMiddle?: ReturnType<typeof AdSlot>;
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
  diseases: DiseaseListItem[];
  diseaseCategorySlug: string;
  alphabetSlug: string;
  onSubmit: (value: React.FormEvent<HTMLFormElement>) => void;
  search: string;
  refInput: LegacyRef<HTMLInputElement> | undefined;
};

export function DiseaseListDesktop(props: DiseaseListDesktopProps) {
  const {
    adsMiddle,
    diseaseCategorySlug,
    alphabetSlug,
    featured,
    h1,
    diseases,
    onSubmit,
    search,
    refInput,
  } = props;

  return (
    <Box>
      <form onSubmit={onSubmit}>
        <InputGroup mb="20px">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="sea.500" />
          </InputLeftElement>
          <Input
            id="search"
            px={10}
            borderRight="none"
            borderEndRadius="none"
            ref={refInput}
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

      {search ? (
        diseases.length ? (
          <ListItem diseases={diseases} adsMiddle={adsMiddle} />
        ) : (
          <EmptyState disease={search} />
        )
      ) : diseases.length ? (
        <>
          {!!featured.length && (
            <DiseaseBanner
              isMobile={false}
              slug={featured[0].slug}
              title={featured[0].title}
              reviewer={featured[0].reviewedBy}
              imageUrl={featured[0].imageUrl}
              imageAlt={featured[0].imageAlt}
            />
          )}
          <Text
            fontSize="5xl"
            fontWeight="semibold"
            fontFamily="poppins"
            mt="30px"
            mb="12px"
          >
            {h1}
          </Text>
          <DiseaseAlphabetFilter
            isMobile={false}
            alphabetSlug={alphabetSlug}
            diseaseCategorySlug={diseaseCategorySlug}
          />
          <ListItem diseases={diseases} adsMiddle={adsMiddle} />
        </>
      ) : (
        <>
          <DiseaseAlphabetFilter
            isMobile={false}
            alphabetSlug={alphabetSlug}
            diseaseCategorySlug={diseaseCategorySlug}
          />
          <EmptyState disease={search} />
        </>
      )}
    </Box>
  );
}

function ListItem(props: {
  diseases: DiseaseListItem[];
  adsMiddle?: ReturnType<typeof AdSlot>;
}) {
  const { Navigate } = useNavigation();
  return (
    <>
      <Grid templateColumns="repeat(4, 1fr)" gap={4} mt={7}>
        {props.diseases.slice(0, 8).map((item) => (
          <GridItem key={item.id}>
            <SimpleDiseaseCard
              isMobile={false}
              name={item.title}
              imageUrl={item.imageUrl}
              imageAlt={item.imageAlt}
              slug={item.slug}
            />
          </GridItem>
        ))}
      </Grid>
      {props.adsMiddle && <Box py={8}>{props.adsMiddle}</Box>}
      <Grid templateColumns="repeat(4, 1fr)" gap={4} mt={7}>
        {props.diseases.slice(8).map((item) => (
          <GridItem key={item.id} h={14}>
            <Navigate
              name="DISEASE"
              query={{
                slugs: item.slug,
              }}
            >
              <Link
                color="charcoalGrey"
                w="174px"
                textAlign="left"
                padding={0}
                justifyContent="flex-start"
                fontWeight="semibold"
                fontSize="18px"
              >
                {item.title}
              </Link>
            </Navigate>
          </GridItem>
        ))}
      </Grid>
    </>
  );
}

function EmptyState({ disease }: { disease: string }) {
  const { Navigate } = useNavigation();
  const ASSETS = useAssets(["EMPTY_HCP_LIST"]);
  const Image = useImage();
  return (
    <>
      <Text fontFamily="poppins" fontWeight="semibold" fontSize="5xl" my={5}>
        Daftar Penyakit
      </Text>
      <Flex alignItems="center">
        <Image
          alt="Empty Penyakit"
          src={ASSETS.EMPTY_HCP_LIST}
          width={213}
          height={220}
          layout="fixed"
          wrapperProps={{
            mr: "20px",
          }}
        />
        <Box w="auto">
          <Text fontFamily="poppins" fontWeight="semibold" fontSize="lg">
            Pencarian Tidak Ditemukan
          </Text>
          <Text fontSize="md" display="inline">
            Hasil pencarian penyakit dengan kata kunci {`"${disease}"`} tidak
            ditemukan. Coba ulangi pencarian dengan kata kunci lain atau lihat
          </Text>
          <Navigate name="DISEASES">
            <Link
              colorScheme="sea"
              minW={0}
              padding={0}
              fontSize="md"
              height="10px"
              display="inline"
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

export function DiseaseListSkeletonDesktop() {
  return (
    <>
      <DiseaseBannerSkeleton isMobile={false} />
      <Skeleton width="30%" height="20px" my={5} />
      <DiseaseAlphabetFilterSkeleton isMobile={false} />
      <Flex justifyContent="space-between">
        {Array.from(Array(4).keys()).map((index) => (
          <Box w="174px" my={3} key={index}>
            <SimpleDiseaseCardSkeleton isMobile={false} />
          </Box>
        ))}
      </Flex>
    </>
  );
}
