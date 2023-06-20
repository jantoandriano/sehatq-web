import React from "react";
import { useNavigation } from "@sehatq/utils";
import {
  VStack,
  Text,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  CloseIcon,
  SearchIcon,
  IconButton,
  Skeleton,
  SimpleGrid,
  LinkBox,
  LinkOverlay,
  useImage,
} from "../../user-interfaces";

type OptionFilterMobile = {
  id: number;
  name: string;
  imageUrl: string[];
  slug: string;
};

type GeneralProps = {
  selectedValue?: string;
  options?: OptionFilterMobile[];
  isLoading?: boolean;
  onClose: () => void;
};

export type DiseaseListViewMobileProps = GeneralProps &
  GenerateSearchFilterProps;

type GenerateSearchFilterProps = {
  searchValue: string;
  clearInputSearch: () => void;
  onChangeSearchValue: React.ChangeEventHandler<HTMLInputElement>;
};

function GenerateSearchFilter(props: GenerateSearchFilterProps) {
  const { searchValue, onChangeSearchValue, clearInputSearch } = props;
  return (
    <InputGroup background="white" borderRadius="xl" boxShadow="lg">
      <InputLeftElement pointerEvents="none">
        <SearchIcon color="brownGrey.500" />
      </InputLeftElement>
      <Input
        px={10}
        value={searchValue}
        placeholder="Cari Kategori Penyakit"
        fontSize="xs"
        autoComplete="off"
        focusBorderColor="sea.500"
        borderColor="gray.500"
        onChange={onChangeSearchValue}
        _placeholder={{ color: "brownGrey.500", fontSize: "xs" }}
      />
      {searchValue ? (
        <InputRightElement pointerEvents="stroke">
          <IconButton
            variant="fit"
            aria-label="clear"
            onClick={clearInputSearch}
            icon={<CloseIcon w="3" h="3" color="gray" />}
          />
        </InputRightElement>
      ) : null}
    </InputGroup>
  );
}
export function DiseaseFilterListViewMobile(props: DiseaseListViewMobileProps) {
  const { selectedValue, options, isLoading, onClose } = props;
  const Image = useImage();
  const { Navigate } = useNavigation();
  function renderOption(option: OptionFilterMobile) {
    const slugCustom = option.slug === "all" ? "" : option.slug;
    return (
      <LinkBox
        display="flex"
        flexDirection="column"
        alignItems="center"
        onClick={onClose}
      >
        <Navigate
          name="DISEASE"
          query={(oldQuery) => ({ ...oldQuery, slugs: [slugCustom] })}
        >
          <LinkOverlay>
            <VStack
              key={option.slug}
              justifyContent="center"
              width="104px"
              height="104px"
              background={
                option.slug == selectedValue ? "iceBlue.500" : "white"
              }
              {...(option.slug == selectedValue && {
                border: "1px solid",
                borderColor: "main.500",
              })}
              borderRadius="base"
              boxShadow="md"
            >
              <Image
                alt={option.name}
                src={option.imageUrl[1]}
                width={48}
                height={48}
                layout="fixed"
              />
              <Text
                fontSize="xs"
                textAlign="center"
                lineHeight="7"
                color={
                  option.slug == selectedValue ? "sea.500" : "charcoalGrey"
                }
                fontWeight={
                  option.slug == selectedValue ? "semibold" : "normal"
                }
              >
                {option.name}
              </Text>
            </VStack>
          </LinkOverlay>
        </Navigate>
      </LinkBox>
    );
  }
  return (
    <VStack spacing={4} width="full">
      <GenerateSearchFilter
        searchValue={props.searchValue}
        clearInputSearch={props.clearInputSearch}
        onChangeSearchValue={props.onChangeSearchValue}
      />
      {isLoading ? (
        <Skeleton width="95%" height={4} m={2} />
      ) : options && options?.length > 0 ? (
        <SimpleGrid columns={3} spacing={2}>
          {options?.map((option) => renderOption(option))}
        </SimpleGrid>
      ) : (
        <Text
          textAlign="center"
          fontSize="xs"
          fontWeight="semibold"
          fontStyle="italic"
          m={2}
        >
          Hasil pencarian tidak ditemukan
        </Text>
      )}
    </VStack>
  );
}
