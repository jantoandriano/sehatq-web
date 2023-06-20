import { useNavigation } from "@sehatq/utils";
import React from "react";
import { Link, Skeleton, Flex, Button, Text } from "../../user-interfaces";
import { ArticleOtherCategoriesMobile } from "./article-other-categories-mobile";
import { ArticlesCategoryData } from "./articles-model";
export type ArticleCategoryNavbarMobileProps = {
  categories: ArticlesCategoryData[];
  currentCategorySlug: string;
  isOther: boolean;
  onClickOtherCategories: () => void;
};

export function ArticleCategoryNavbarMobile(
  props: ArticleCategoryNavbarMobileProps
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
      <ArticleOtherCategoriesMobile
        isOpen={isOther}
        onCloseOtherCategories={onClickOtherCategories}
        categories={categories}
      />
      <Flex p="2" overflowX="auto" width="full" justify="space-between">
        <Navigate key="all" name="ARTICLE" options={{ shallow: true }}>
          <Link
            minW="fit-content"
            marginRight={3}
            size="sm"
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
            key={category.id}
            name="ARTICLE"
            query={{
              slugs: [category.slug],
            }}
            options={{ shallow: true }}
          >
            <Link
              marginLeft={3}
              marginRight={3}
              minW="fit-content"
              size="sm"
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
          minW="fit-content"
          marginLeft={3}
          size="sm"
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
      </Flex>
    </>
  ) : null;
}

export function ArticleCategoryNavbarMobileSkeleton() {
  return (
    <Flex align="start" justify="flex-start">
      <Skeleton width={100} marginRight={1.5} height={5} />
      <Skeleton width={100} marginRight={1.5} height={5} />
      <Skeleton width={100} marginRight={1.5} height={5} />
      <Skeleton width={100} height={5} />
    </Flex>
  );
}
