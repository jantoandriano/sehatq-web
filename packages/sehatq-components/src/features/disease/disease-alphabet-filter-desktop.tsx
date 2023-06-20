import React from "react";
import { useNavigation } from "@sehatq/utils";

import { Link, Flex, Skeleton } from "../../user-interfaces";

export type DiseaseAlphabetFilterDesktopProps = {
  listAlphabet: { id: string; label: string; slugs: string[] }[];
  alphabetSlug: string;
};

export function DiseaseAlphabetFilterDesktop(
  props: DiseaseAlphabetFilterDesktopProps
) {
  const { alphabetSlug, listAlphabet } = props;
  const { Navigate } = useNavigation();

  return (
    <Flex
      bg="#f3f3f3"
      justifyContent="space-evenly"
      alignItems="center"
      borderRadius="10px"
      h="50px"
    >
      {listAlphabet.map((item) => {
        const isSelected = item.label === alphabetSlug;
        return (
          <Navigate
            name="DISEASE"
            query={{
              slugs: item.slugs,
            }}
            key={item.id}
            options={{ shallow: true, scroll: false }}
          >
            <Link
              color={isSelected ? "main.500" : "charcoalGrey"}
              _hover={{ color: "sea.500" }}
              _focus={{ outline: "none" }}
              fontSize="24px"
              fontWeight="semibold"
              minWidth={0}
            >
              {item.label}
            </Link>
          </Navigate>
        );
      })}
    </Flex>
  );
}

export function DiseaseAlphabetFilterSkeletonDesktop() {
  return <Skeleton width="full" height="50px" />;
}
