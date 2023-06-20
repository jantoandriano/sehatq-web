import React from "react";
import { useNavigation } from "@sehatq/utils";

import { Box, Link, Skeleton } from "../../user-interfaces";

export type DiseaseAlphabetFilterMobileProps = {
  listAlphabet: { id: string; label: string; slugs: string[] }[];
  alphabetSlug: string;
};

export function DiseaseAlphabetFilterMobile(
  props: DiseaseAlphabetFilterMobileProps
) {
  const { alphabetSlug, listAlphabet } = props;
  const { Navigate } = useNavigation();

  return (
    <Box>
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
              fontSize="14px"
              fontWeight="semibold"
              minWidth="14px"
              _focus={{ outline: "none" }}
            >
              {item.label}
            </Link>
          </Navigate>
        );
      })}
    </Box>
  );
}

export function DiseaseAlphabetFilterSkeletonMobile() {
  return <Skeleton width="20px" height="300px" />;
}
