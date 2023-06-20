import { useClipboard as useChakraClipboard } from "@chakra-ui/react";

export const useClipboard = (title: string) => {
  const { value, hasCopied, onCopy } = useChakraClipboard(title);
  return { value, hasCopied, onCopy };
};
