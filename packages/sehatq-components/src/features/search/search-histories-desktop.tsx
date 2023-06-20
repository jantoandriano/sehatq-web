import { useNavigation } from "@sehatq/utils";
import React from "react";
import {
  Text,
  CloseIcon,
  Link,
  Stack,
  HStack,
  IconButton,
  TimeIcon,
} from "../../user-interfaces";
import { SearchHistoriesAtom } from "./search-histories-atoms";

export type SearchHistoriesDesktopProps = {
  searchHistories: SearchHistoriesAtom;
  clearSearchHistories: () => void;
  removeSearchHistories: (id: string) => void;
};
export function SearchHistoriesDesktop(props: SearchHistoriesDesktopProps) {
  const {
    searchHistories = [],
    clearSearchHistories,
    removeSearchHistories,
  } = props;
  const { Navigate } = useNavigation();

  return (
    <>
      {searchHistories.length ? (
        <>
          <HStack spacing={2} mb="2.5">
            <IconButton
              aria-label="time icon"
              variant="fit"
              colorScheme="main"
              icon={<TimeIcon w={5} h={5} color="main.500" />}
            />
            <Text
              flex={1}
              fontFamily="poppins"
              fontWeight="semibold"
              fontSize="sm"
            >
              Pencarian Terakhir
            </Text>
            <Text
              color="brownGrey.500"
              fontSize="xs"
              fontWeight="semibold"
              cursor="pointer"
              onClick={clearSearchHistories}
            >
              Hapus Semua
            </Text>
          </HStack>
          <Stack spacing="3" ml={7}>
            {searchHistories.map((searchHistory) => {
              return (
                <HStack
                  spacing={3}
                  justify="space-between"
                  key={searchHistory.id}
                >
                  <Navigate name="SEARCH" query={{ q: searchHistory.name }}>
                    <Link
                      fontWeight="semibold"
                      fontSize="xs"
                      cursor="pointer"
                      color="charcoalGrey"
                      justifyContent="normal"
                    >
                      {searchHistory.name}
                    </Link>
                  </Navigate>
                  <CloseIcon
                    color="gray"
                    w="3"
                    h="3"
                    cursor="pointer"
                    onClick={() => removeSearchHistories(searchHistory.id)}
                  />
                </HStack>
              );
            })}
          </Stack>
        </>
      ) : null}
    </>
  );
}
