import { useNavigation } from "@sehatq/utils";
import React from "react";
import { Text, Link } from "../../user-interfaces";
import { SearchAutoCompleteCache } from "./search-auto-complete-queries";

export type SearchAutoCompleteMobileProps = {
  searchAutoComplete: SearchAutoCompleteCache;
};
export function SearchAutoCompleteMobile(props: SearchAutoCompleteMobileProps) {
  const { searchAutoComplete = [] } = props;
  const { Navigate } = useNavigation();
  return (
    <>
      {searchAutoComplete.length ? (
        <>
          {searchAutoComplete.map((autoComplete) => {
            return (
              <Navigate
                key={autoComplete.query}
                name="SEARCH"
                query={{
                  q: autoComplete.query,
                  filter: autoComplete.filter || "",
                }}
              >
                <Link
                  fontSize="xs"
                  my="1"
                  cursor="pointer"
                  display="block"
                  color="charcoalGrey"
                >
                  {autoComplete.query}{" "}
                  <Text as="span" color="main.500">
                    {autoComplete.contextLabel}
                  </Text>
                </Link>
              </Navigate>
            );
          })}
        </>
      ) : null}
    </>
  );
}
