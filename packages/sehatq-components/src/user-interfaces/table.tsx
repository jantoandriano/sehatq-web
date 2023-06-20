import React from "react";
import {
  Table as ChakraTable,
  TableProps as ChakraTableProps,
  Thead as ChakraThead,
  TableHeadProps as ChakraTheadProps,
  Tbody as ChakraTbody,
  TableBodyProps as ChakraTbodyProps,
  Tfoot as ChakraTfoot,
  TableFooterProps as ChakraTfootProps,
  Tr as ChakraTr,
  TableRowProps as ChakraTrProps,
  Th as ChakraTh,
  TableColumnHeaderProps as ChakraThProps,
  Td as ChakraTd,
  TableCellProps as ChakraTdProps,
  TableCaption as ChakraTableCaption,
  TableCaptionProps as ChakraTableCaptionProps,
  TableContainer as ChakraTableContainer,
  TableContainerProps as ChakraTableContainerProps,
  forwardRef,
} from "@chakra-ui/react";
import { StripChakraProps } from "./utils";

export type TableProps = StripChakraProps<ChakraTableProps>;
export const Table = forwardRef<TableProps, "div">((props: TableProps, ref) => {
  return <ChakraTable {...props} ref={ref} />;
});
Table.displayName = "Table";

export type TheadProps = StripChakraProps<ChakraTheadProps>;
export const Thead = forwardRef<TheadProps, "div">((props: TheadProps, ref) => {
  return <ChakraThead {...props} ref={ref} />;
});
Thead.displayName = "Thead";

export type TbodyProps = StripChakraProps<ChakraTbodyProps>;
export const Tbody = forwardRef<TbodyProps, "button">(
  (props: TbodyProps, ref) => {
    return <ChakraTbody {...props} ref={ref} />;
  }
);
Tbody.displayName = "Tbody";

export type TfootProps = StripChakraProps<ChakraTfootProps>;
export const Tfoot = forwardRef<TfootProps, "div">((props: TfootProps, ref) => {
  return <ChakraTfoot {...props} ref={ref} />;
});
Tfoot.displayName = "Tfoot";

export type TrProps = StripChakraProps<ChakraTrProps>;
export const Tr = forwardRef<TrProps, "div">((props: TrProps, ref) => {
  return <ChakraTr {...props} ref={ref} />;
});
Tr.displayName = "Tr";

export type ThProps = StripChakraProps<ChakraThProps>;
export const Th = forwardRef<ThProps, "div">((props: ThProps, ref) => {
  return <ChakraTh {...props} ref={ref} />;
});
Th.displayName = "Th";

export type TdProps = StripChakraProps<ChakraTdProps>;
export const Td = forwardRef<TdProps, "div">((props: TdProps, ref) => {
  return <ChakraTd {...props} ref={ref} />;
});
Td.displayName = "Td";

export type TableCaptionProps = StripChakraProps<ChakraTableCaptionProps>;
export const TableCaption = forwardRef<TableCaptionProps, "div">(
  (props: TableCaptionProps, ref) => {
    return <ChakraTableCaption {...props} ref={ref} />;
  }
);
TableCaption.displayName = "TableCaption";

export type TableContainerProps = StripChakraProps<ChakraTableContainerProps>;
export const TableContainer = forwardRef<TableContainerProps, "div">(
  (props: TableContainerProps, ref) => {
    return <ChakraTableContainer {...props} ref={ref} />;
  }
);
TableContainer.displayName = "TableContainer";
