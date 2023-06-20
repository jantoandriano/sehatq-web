import React from "react";
import {
  Box,
  Text,
  ChevronDownIcon,
  ChevronUpIcon,
  Collapse,
  SkeletonText,
} from "../../user-interfaces";
import { Content } from "../layout";
export type ArticleReferencesMobileProps = {
  references: string;
  onCollapse: () => void;
  open: boolean;
};

export function ArticleReferencesMobile(props: ArticleReferencesMobileProps) {
  const { references, open, onCollapse } = props;

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
          <Content isMobile>{references}</Content>
        </Box>
      </Collapse>
    </Box>
  ) : (
    <></>
  );
}

export function ArticleReferencesMobileSkeleton() {
  return (
    <Box>
      <SkeletonText />
    </Box>
  );
}
