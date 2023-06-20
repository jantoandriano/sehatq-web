import { toBase64 } from "@sehatq/utils";
import React, { useEffect, useState } from "react";
import {
  HStack,
  Input,
  Box,
  UploadImageIcon,
  useImage,
  CloseRoundIcon,
  Text,
  Skeleton,
  useToast,
} from "../../user-interfaces";

export type ImagesInputProps = {
  maxFile?: number;
  values?: File[];
  onChange: (
    values: {
      key: string;
      file: File;
      preview: string;
    }[]
  ) => void;
  isMobile?: boolean;
  maxSize?: number;
};

export interface ImagesFileList {
  key: string;
  file: File;
  preview: string;
}

export function ImagesInput(props: ImagesInputProps) {
  const { values, isMobile, maxSize } = props;
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState<ImagesFileList[] | undefined>();
  const toast = useToast();

  useEffect(() => {
    if (values?.length && isLoading) {
      const newThumbnails: ImagesFileList[] = [];
      values.forEach(async (value) => {
        const fileString = (await toBase64(value)) as string;
        newThumbnails.push({
          key: `${value.name}-${newThumbnails.length + 1}`,
          file: value,
          preview: fileString,
        });
      });
      setImages([...newThumbnails]);
      setIsLoading(false);
    }

    if (values?.length == images?.length && isLoading) {
      setIsLoading(false);
    }
  }, [images, isLoading, values]);

  async function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files?.length) {
      return;
    }

    const originalFile = event.target.files[0] as File;

    // clear value input
    event.target.value = "";

    // validate file
    if (originalFile.type != "image/jpeg") {
      toast({
        status: "error",
        message: "Format foto yang dapat diupload JPEG, JPG.",
        position: isMobile ? "bottom" : "top",
        isCenterText: true,
      });
      return;
    }

    // validate size
    if (originalFile.size > (maxSize ?? 2000000)) {
      toast({
        status: "error",
        message: "Ukuran file tidak boleh melebihi 2MB",
        position: isMobile ? "bottom" : "top",
        isCenterText: true,
      });
      return;
    }

    // convert to base64
    const fileString = (await toBase64(originalFile)) as string;
    const newThumbnails = images ?? [];
    newThumbnails.push({
      key: `${originalFile.name}-${new Date().getTime()}`,
      file: originalFile,
      preview: fileString,
    });
    setImages([...newThumbnails]);

    props.onChange(newThumbnails);
  }

  function onRemoveImage(key: string) {
    const newThumbnails = (images ?? []).filter((f) => f.key != key);
    setImages([...newThumbnails]);
    props.onChange(newThumbnails);
  }

  function onAddImage() {
    fileInputRef.current?.click();
  }

  const Image = useImage();

  if (isLoading) {
    return <ImagesInputSkeleton />;
  }

  const maxFile = props.maxFile ?? 1;
  return (
    <HStack
      width="full"
      background="white"
      borderRadius="base"
      border="0.5px solid"
      borderColor="veryLightPink"
      p={3}
      pl={1}
      pt={1}
      spacing={2}
      position="relative"
      flexFlow="wrap"
    >
      <Input type="file" ref={fileInputRef} onChange={onChangeHandler} hidden />
      {images?.map((item) => (
        <Box key={item.key} position="relative" pt={2}>
          <Image
            src={item.preview}
            alt={`image-upload-${item.key}`}
            layout="fill"
            objectFit="cover"
            priority
            wrapperProps={{
              width: "66px",
              height: "66px",
              overflow: "hidden",
              borderRadius: "base",
            }}
          />
          <CloseRoundIcon
            position="absolute"
            cursor="pointer"
            top={0.5}
            right={0.5}
            onClick={() => onRemoveImage(item.key)}
          />
        </Box>
      ))}
      {(images ?? []).length >= maxFile ? null : (
        <Box pt={2} cursor="pointer">
          <Box
            background="iceBlue.500"
            borderRadius="base"
            boxSize="66px"
            onClick={onAddImage}
            py={5}
            textAlign="center"
          >
            <UploadImageIcon boxSize="28px" />
          </Box>
        </Box>
      )}
      <Text
        position="absolute"
        right={3}
        bottom={2}
        fontSize="xs"
        color="brownGrey.500"
      >{`${(images ?? []).length}/${maxFile}`}</Text>
    </HStack>
  );
}

export function ImagesInputSkeleton() {
  return (
    <HStack
      width="full"
      background="white"
      borderRadius="base"
      border="0.5px solid"
      borderColor="veryLightPink"
      p={3}
      spacing={2}
      position="relative"
      flexFlow="wrap"
    >
      <Skeleton borderRadius="base" boxSize="66px" />
      <Skeleton borderRadius="base" boxSize="66px" />
      <Skeleton
        position="absolute"
        right={3}
        bottom={2}
        width="21px"
        height="18px"
      />
    </HStack>
  );
}
