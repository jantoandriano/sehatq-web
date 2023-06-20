import React from "react";
import { Divider } from "./divider";
import { Button } from "./button";
import { Flex } from "./flex";
import { IconButton } from "./icon-button";
import { ChevronLeftIcon, ChevronRightIcon } from "./icons";

export type PaginationButtonProps = {
  page: number;
  maxPage: number;
  onChangePage?: (value: number) => void;
  background?: string;
};

function generatePageNumber(
  page: number,
  maxPage: number,
  onChangePage?: (value: number) => void
) {
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

  return showPage.map((pages: { value: number; text: string }) => (
    <Button
      key={`${pages.text}-${pages.value}`}
      variant={pages.value == page ? "chip" : "tab"}
      colorScheme="main"
      size="xs"
      width="32px"
      height="47px"
      background={pages.value == page ? "sea.500" : undefined}
      isActive={pages.value == page}
      borderRadius="base"
      onClick={() => onChangePage && onChangePage(pages.value)}
      fontSize="md"
      fontWeight="semibold"
      color={pages.value == page ? "white" : "charcoalGrey"}
    >
      {pages.text}
    </Button>
  ));
}

export function PaginationButton(props: PaginationButtonProps) {
  const { page, maxPage, onChangePage, background } = props;
  return maxPage > 1 ? (
    <Flex
      justify="space-between"
      width="fit-content"
      border="1px solid"
      borderColor="veryLightPink"
      p={1}
      height="54px"
      background={background}
    >
      <IconButton
        key="prev-page"
        hidden={page > 3 && maxPage > 7 ? false : true}
        aria-label="back button"
        colorScheme="main"
        variant="fit"
        size="sm"
        marginRight={2}
        onClick={() => onChangePage && onChangePage(page - 1)}
        icon={<ChevronLeftIcon boxSize="9" color="charcoalGrey" />}
      />
      <Divider
        hidden={page > 3 && maxPage > 7 ? false : true}
        marginRight={3}
        orientation="vertical"
        borderColor="veryLightPink"
        border="solid 1px"
      />
      {generatePageNumber(page, maxPage, onChangePage)}
      <Divider
        hidden={maxPage <= 7 || maxPage == page}
        marginLeft={3}
        orientation="vertical"
        borderColor="veryLightPink"
        border="solid 1px"
      />
      <IconButton
        key="next-page"
        marginLeft={2}
        hidden={maxPage <= 7 || maxPage == page}
        aria-label="next button"
        colorScheme="main"
        variant="fit"
        size="sm"
        onClick={() => onChangePage && onChangePage(page + 1)}
        icon={<ChevronRightIcon boxSize="9" color="charcoalGrey" />}
      />
    </Flex>
  ) : null;
}
