import React from "react";
import { useNavigation } from "@sehatq/utils";
import { HStack, Link, Text, Button } from "../../user-interfaces";

import { DiseaseOtherCategoryDesktop } from "./disease-other-category-desktop";

export interface CategoryList {
  id: number;
  slug: string;
  name: string;
  imageUrl: string[];
}

export type DiseaseCategoryFilterDesktopProps = {
  currentCategorySlug: string;
  categoryList: CategoryList[];
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};

const afterStyle = {
  display: "block",
  content: '""',
  borderBottom: "solid 3px #70cbcf",
  transform: "scaleX(0)",
  transition: "transform 250ms ease-in-out",
  marginTop: "1",
};

const hoverStyle = {
  color: "#70cbcf",
  _after: { transform: "scaleX(1)" },
};

export function DiseaseCategoryFilterDesktop(
  props: DiseaseCategoryFilterDesktopProps
) {
  const { currentCategorySlug, categoryList, isOpen, onClose, onOpen } = props;
  const { Navigate } = useNavigation();

  return (
    <>
      <DiseaseOtherCategoryDesktop
        isOpen={isOpen}
        onCloseOther={onClose}
        category={categoryList}
        currentCategorySlug={currentCategorySlug}
      />
      <HStack justify="space-between">
        {categoryList.slice(0, 6).map((category: CategoryList) => (
          <Navigate
            key={category.slug}
            name="DISEASE"
            query={{
              slugs: [category.slug],
            }}
            options={{ shallow: true }}
          >
            <Link
              size="xs"
              color={
                currentCategorySlug == category.slug
                  ? "main.500"
                  : "charcoalGrey"
              }
              display="inline-block"
              variant="link"
              textAlign="center"
              borderRadius="0"
              _hover={hoverStyle}
              _focus={{ outline: "none" }}
              _active={{ outline: "none" }}
              _after={{
                ...afterStyle,
                transform:
                  currentCategorySlug == category.slug
                    ? "scaleX(1)"
                    : afterStyle.transform,
              }}
            >
              <Text paddingLeft="2" paddingRight="2">
                {category.name}
              </Text>
            </Link>
          </Navigate>
        ))}

        <Button
          size="xs"
          color="charcoalGrey"
          isActive={false}
          display="inline-block"
          variant="link"
          textAlign="center"
          borderRadius="0"
          onClick={onOpen}
          _hover={hoverStyle}
          _after={afterStyle}
        >
          <Text paddingLeft="2" paddingRight="2">
            Lainnya
          </Text>
        </Button>
      </HStack>
    </>
  );
}
