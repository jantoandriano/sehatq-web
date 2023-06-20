import React from "react";
import {
  Text,
  Box,
  SkeletonText,
  ChevronDownIcon,
  ChevronUpIcon,
  Collapse,
} from "../../user-interfaces";
import { Content } from "../layout";
export type ArticleReferencesDesktopProps = {
  references: string;
  onCollapse: () => void;
  open: boolean;
};

export function ArticleReferencesDesktop(props: ArticleReferencesDesktopProps) {
  const { references, onCollapse, open } = props;
  return references ? (
    <Box>
      <Text onClick={onCollapse} fontWeight="semibold" cursor="pointer">
        Referensi
        {open ? (
          <ChevronUpIcon marginLeft={2} w={4} h={4} />
        ) : (
          <ChevronDownIcon marginLeft={2} w={4} h={4} />
        )}
      </Text>

      <Collapse in={open}>
        <Box marginTop={1}>
          <Content>{references}</Content>
        </Box>
      </Collapse>
    </Box>
  ) : (
    <></>
  );
}

export function ArticleReferencesDesktopSkeleton() {
  return (
    <Box>
      <SkeletonText />
    </Box>
  );
}
