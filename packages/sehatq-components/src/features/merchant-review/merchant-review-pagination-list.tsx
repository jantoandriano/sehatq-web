import React from "react";
import {
  ArrowBackIcon,
  ArrowForwardIcon,
  Button,
  Flex,
  IconButton,
  Text,
} from "../../user-interfaces";

export type GeneratePaginationProps = {
  page: number;
  maxPage: number;
  onChangePage?: (value: number) => void;
};

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

export function GeneratePagination(props: GeneratePaginationProps) {
  const { page, maxPage, onChangePage } = props;
  const showPage = generatePageNumber(page, maxPage);
  return maxPage > 1 ? (
    <Flex justify="space-between" width="fit-content" marginLeft="auto">
      <IconButton
        key="prev-page"
        hidden={page > 3 && maxPage > 7 ? false : true}
        aria-label="back button"
        colorScheme="main"
        background="white"
        size="sm"
        marginRight={3}
        isRound={true}
        variant="outline"
        onClick={() => onChangePage && onChangePage(page - 1)}
        icon={<ArrowBackIcon w={4} h={4} color="#70CBCF" />}
      />
      {showPage.map((pages: { value: number; text: string }) => (
        <Button
          key={`${pages.text}-${pages.value}`}
          variant={pages.value == page ? "chip" : "tab"}
          colorScheme="main"
          size="xs"
          width="30px"
          height="30px"
          background={pages.value == page ? "white" : undefined}
          isActive={pages.value == page}
          borderRadius={100}
          onClick={() => onChangePage && onChangePage(pages.value)}
        >
          <Text key={`text-${pages.value}-${pages.text}`} p={0.5}>
            {pages.text}
          </Text>
        </Button>
      ))}
      <IconButton
        key="next-page"
        marginLeft={3}
        hidden={maxPage <= 7 || maxPage == page}
        aria-label="next button"
        colorScheme="main"
        background="white"
        variant="outline"
        size="sm"
        isRound={true}
        onClick={() => onChangePage && onChangePage(page + 1)}
        icon={<ArrowForwardIcon w={4} h={4} color="#70CBCF" />}
      />
    </Flex>
  ) : null;
}
