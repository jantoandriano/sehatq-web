import React, { ReactElement } from "react";
import { useDropzone, DropzoneProps } from "react-dropzone";
import { Box, BoxProps } from "./box";

type FileInputProps = {
  dropzoneProps: DropzoneProps;
  boxProps?: BoxProps;
  children?: ReactElement;
};

export function FileInput(props: FileInputProps) {
  const { getRootProps, getInputProps } = useDropzone(props.dropzoneProps);
  return (
    <div {...getRootProps()}>
      <Box {...props.boxProps}>
        <input {...getInputProps()} />
        {props.children ?? null}
      </Box>
    </div>
  );
}
