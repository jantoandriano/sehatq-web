import React from "react";
import { useNavigation, NavigateProps } from "@sehatq/utils";
import { URLS } from "@sehatq/constants";
import { Link } from "@chakra-ui/react";
import { Divider } from "./divider";
import { Flex } from "./flex";
import { ChevronLeftIcon, ChevronRightIcon } from "./icons";

export type PaginationLinkProps = {
  page: number;
  maxPage: number;
  navigateName: keyof typeof URLS;
  size?: "small" | "normal";
  background?: string;
  navigateOptions?: NavigateProps["options"];
  variant?: "circle" | "rounded";
};

export function PaginationLink(props: PaginationLinkProps) {
  const {
    page,
    maxPage,
    navigateName,
    background,
    size,
    navigateOptions,
    variant,
  } = props;
  const showPage = generatePageNumber(page, maxPage);
  const otherProps = {
    page,
    maxPage,
    navigateName,
    size,
    showPage,
    navigateOptions,
    variant,
  };
  return maxPage > 1 ? (
    <Flex
      justify="space-between"
      width="fit-content"
      {...(variant !== "circle" && {
        border: "1px solid",
        borderColor: "veryLightPink",
        borderRadius: "base",
      })}
      p="0.5"
      height={size == "small" ? "41px" : "54px"}
      background={background}
      align="center"
    >
      <GeneratePrevLink {...otherProps} />
      <GeneratePagination {...otherProps} />
      <GenerateNextLink {...otherProps} />
    </Flex>
  ) : null;
}

export type GeneratePaginationProps = Pick<
  PaginationLinkProps,
  "page" | "navigateName" | "size" | "navigateOptions" | "variant"
> & {
  showPage: { value: number; text: string }[];
};

function GeneratePagination(props: GeneratePaginationProps) {
  const { page, showPage, navigateName, size, navigateOptions, variant } =
    props;
  const { Navigate } = useNavigation();
  function generateVariantStyles(value: number) {
    return {
      ...(variant === "circle"
        ? {
            ...(value == page && {
              borderRadius: "full",
              border: "0.5px solid",
              borderColor: "main",
            }),
            color: value == page ? "main.500" : "charcoalGrey",
            height: size == "small" ? "24px" : "30px",
            minW: size == "small" ? "24px" : "30px",
          }
        : {
            ...(value == page
              ? { color: "white", background: "sea.500" }
              : { color: "charcoalGrey" }),
            borderRadius: "base",
            py: "3",
            height: size == "small" ? "35px" : "47px",
            minW: size == "small" ? "24px" : "32px",
            fontWeight: "semibold",
          }),
    };
  }
  return (
    <>
      {showPage.map((pages: { value: number; text: string }) => (
        <Navigate
          name={navigateName}
          query={(oldQuery) => ({
            ...oldQuery,
            page: pages.value,
          })}
          key={`text-${pages.value}-${pages.text}`}
          options={{
            ...navigateOptions,
            ...(navigateOptions?.alias
              ? {
                  alias: {
                    ...navigateOptions.alias,
                    query: (oldQuery) => ({
                      ...oldQuery,
                      page: pages.value,
                    }),
                  },
                }
              : undefined),
          }}
        >
          <Link
            key={`${pages.text}-${pages.value}`}
            active={pages.value == page}
            textAlign="center"
            marginLeft="1"
            marginRight="1"
            fontSize={size == "small" ? "xs" : "md"}
            {...generateVariantStyles(pages.value)}
          >
            {pages.text}
          </Link>
        </Navigate>
      ))}
    </>
  );
}

function generatePageNumber(page: number, maxPage: number) {
  const showPage = Array.from(Array(maxPage < 7 ? maxPage : 7), (e, i) =>
    Object.assign({ value: i + 1, text: (i + 1).toString() })
  );
  if (maxPage > 7) {
    showPage[5] = { value: page + 1, text: "..." };
    showPage[6] = { value: maxPage, text: maxPage.toString() };

    if (page > 3) {
      showPage[1] = { value: page - 1, text: "..." };
      showPage[2] = { value: page - 1, text: (page - 1).toString() };
      showPage[3] = { value: page, text: page.toString() };
      showPage[4] = { value: page + 1, text: (page + 1).toString() };
    }

    if ([maxPage, maxPage - 1].includes(page)) {
      showPage[2] = { value: maxPage - 4, text: (maxPage - 4).toString() };
      showPage[3] = { value: maxPage - 3, text: (maxPage - 3).toString() };
      showPage[4] = { value: maxPage - 2, text: (maxPage - 2).toString() };
      showPage[5] = { value: maxPage - 1, text: (maxPage - 1).toString() };
    }
  }

  return showPage;
}

export type GeneratePrevLinkProps = Pick<
  PaginationLinkProps,
  "page" | "maxPage" | "navigateName" | "size" | "navigateOptions" | "variant"
>;

function GeneratePrevLink(props: GeneratePrevLinkProps) {
  const { page, maxPage, navigateName, size, navigateOptions, variant } = props;
  const { Navigate } = useNavigation();
  return (
    <>
      <Navigate
        name={navigateName}
        query={(oldQuery) => ({
          ...oldQuery,
          page: page - 1,
        })}
        options={{
          ...navigateOptions,
          ...(navigateOptions?.alias
            ? {
                alias: {
                  ...navigateOptions.alias,
                  query: (oldQuery) => ({
                    ...oldQuery,
                    page: page - 1,
                  }),
                },
              }
            : undefined),
        }}
      >
        <Link
          key="prev-page"
          hidden={page > 3 && maxPage > 7 ? false : true}
          {...(variant !== "circle" && { marginRight: "1" })}
          textAlign="center"
          pt="1"
          pb="1"
        >
          <ChevronLeftIcon
            {...(variant === "circle"
              ? { boxSize: size == "small" ? "3" : "5", color: "main.500" }
              : {
                  boxSize: size == "small" ? "6" : "9",
                  color: "charcoalGrey",
                })}
          />
        </Link>
      </Navigate>
      {variant !== "circle" && (
        <Divider
          hidden={page > 3 && maxPage > 7 ? false : true}
          alignSelf="center"
          height={size == "small" ? "30px" : "39px"}
          marginRight="3"
          orientation="vertical"
          borderColor="veryLightPink"
          border="solid 1px"
        />
      )}
    </>
  );
}

export type GenerateNextLinkProps = Pick<
  PaginationLinkProps,
  "page" | "maxPage" | "navigateName" | "size" | "navigateOptions" | "variant"
>;

function GenerateNextLink(props: GenerateNextLinkProps) {
  const { page, maxPage, navigateName, size, navigateOptions, variant } = props;
  const { Navigate } = useNavigation();
  return (
    <>
      {variant !== "circle" && (
        <Divider
          alignSelf="center"
          height={size == "small" ? "30px" : "39px"}
          marginLeft="3"
          orientation="vertical"
          borderColor="veryLightPink"
          border="solid 1px"
          hidden={maxPage <= 7 || maxPage == page}
        />
      )}
      <Navigate
        name={navigateName}
        query={(oldQuery) => ({
          ...oldQuery,
          page: page + 1,
        })}
        options={{
          ...navigateOptions,
          ...(navigateOptions?.alias
            ? {
                alias: {
                  ...navigateOptions.alias,
                  query: (oldQuery) => ({
                    ...oldQuery,
                    page: page + 1,
                  }),
                },
              }
            : undefined),
        }}
      >
        <Link
          key="next-page"
          {...(variant !== "circle" && {
            marginLeft: "2",
          })}
          hidden={maxPage <= 7 || maxPage == page}
          marginRight="1"
          textAlign="center"
          pt="1"
          pb="1"
        >
          <ChevronRightIcon
            {...(variant === "circle"
              ? { boxSize: size == "small" ? "3" : "5", color: "main.500" }
              : {
                  boxSize: size == "small" ? "6" : "9",
                  color: "charcoalGrey",
                })}
          />
        </Link>
      </Navigate>
    </>
  );
}
