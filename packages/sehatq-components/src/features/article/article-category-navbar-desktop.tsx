import { useNavigation } from "@sehatq/utils";
import React from "react";
import {
  Link,
  Skeleton,
  Flex,
  Button,
  HStack,
  Text,
} from "../../user-interfaces";
import { ArticleOtherCategoriesDesktop } from "./article-other-categories-desktop";
import { ArticlesCategoryData } from "./articles-model";
export type ArticleCategoryNavbarDesktopProps = {
  categories: ArticlesCategoryData[];
  currentCategorySlug: string;
  isOther: boolean;
  onClickOtherCategories: () => void;
};

export function ArticleCategoryNavbarDesktop(
  props: ArticleCategoryNavbarDesktopProps
) {
  const { categories, currentCategorySlug, isOther, onClickOtherCategories } =
    props;
  const { Navigate } = useNavigation();
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

  const newCategories = categories.slice(0, 7);

  if (
    !newCategories.find((f) => f.slug === currentCategorySlug) &&
    currentCategorySlug
  ) {
    const current = categories.find((f) => f.slug == currentCategorySlug);
    if (current) {
      newCategories[newCategories.length - 1] = current;
    }
  }

  return newCategories.length > 0 ? (
    <>
      <ArticleOtherCategoriesDesktop
        isOpen={isOther}
        onCloseOtherCategories={onClickOtherCategories}
        categories={categories}
      />
      <HStack justify="space-between">
        <Navigate key="all" name="ARTICLE" options={{ shallow: true }}>
          <Link
            size="xs"
            color={currentCategorySlug == "" ? "main.500" : "charcoalGrey"}
            display="inline-block"
            textAlign="center"
            variant="link"
            borderRadius="0"
            _hover={hoverStyle}
            _after={{
              ...afterStyle,
              transform:
                currentCategorySlug == "" ? "scaleX(1)" : afterStyle.transform,
            }}
          >
            <Text paddingLeft="2" paddingRight="2">
              Semua
            </Text>
          </Link>
        </Navigate>
        {newCategories.map((category: ArticlesCategoryData) => (
          <Navigate
            key={category.slug}
            name="ARTICLE"
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
          onClick={onClickOtherCategories}
          _hover={hoverStyle}
          _after={afterStyle}
        >
          <Text paddingLeft="2" paddingRight="2">
            Lainnya
          </Text>
        </Button>
      </HStack>
    </>
  ) : null;
}

export function ArticleCategoryNavbarDesktopSkeleton() {
  return (
    <Flex align="start" justify="flex-start">
      <Skeleton width={100} marginRight={1.5} height={5} />
      <Skeleton width={100} marginRight={1.5} height={5} />
      <Skeleton width={100} marginRight={1.5} height={5} />
      <Skeleton width={100} marginRight={1.5} height={5} />
      <Skeleton width={100} marginRight={1.5} height={5} />
      <Skeleton width={100} marginRight={1.5} height={5} />
      <Skeleton width={100} marginRight={1.5} height={5} />
      <Skeleton width={100} marginRight={1.5} height={5} />
      <Skeleton width={100} height={5} />
    </Flex>
  );
}
