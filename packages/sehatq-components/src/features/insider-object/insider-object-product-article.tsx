import { pushInsiderObject, NOT_AVAILABLE } from "@sehatq/utils";
import { useEffect } from "react";
import { ArticleCache, useGetArticle } from "../article";

export type InsiderObjectProductProps = {
  articleSlug: string;
};

function selectArticle(cache: ArticleCache) {
  return {
    id: cache.data.id,
    name: cache.data.title,
    taxonomy: cache.data.category.name ? [cache.data.category.name] : [],
    currency: "IDR",
    unit_price: NOT_AVAILABLE,
    unit_sale_price: NOT_AVAILABLE,
    url: cache.data.image.url,
    custom: {
      article_category: cache.data.category.name,
      article_tags: cache.data.tags.map((tag) => tag.name),
    },
  };
}

export function InsiderObjectProductArticle(props: InsiderObjectProductProps) {
  const { articleSlug } = props;
  const { data: article } = useGetArticle(
    { articleSlug },
    { select: selectArticle }
  );

  useEffect(() => {
    if (article) {
      pushInsiderObject({
        product: article,
      });
    }
  }, [article]);

  return null;
}
