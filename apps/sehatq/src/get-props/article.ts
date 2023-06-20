import { dehydrate, QueryClient } from "react-query";
import {
  articleKeys,
  relatedArticleKeys,
  relatedForumsKeys,
  ArticleCache,
  RelatedForumsCache,
  RelatedArticlesCache,
  FetcherArgs,
} from "@sehatq/components";
import { createNodeFetch, nullify, formatDate, toSlug } from "@sehatq/utils";
import { ENV } from "@sehatq/constants";

export type ArticleParams = {
  articleSlug: string;
};

export async function getArticleProps(
  arg: ArticleParams & { isMobile: boolean }
) {
  const { articleSlug, isMobile } = arg;
  const fetch = createNodeFetch({ isMobile });
  const queryClient = new QueryClient();
  const articleQuery = {
    articleSlug,
  };
  let error = null;

  try {
    const displayDateFormat = "d MMM yyyy";
    const apiDateFormat = "yyyy-MM-dd HH:mm:ss";
    const { data: prefetchedArticle } = await prefetchArticle({
      fetch,
      query: { articleSlug },
    });
    queryClient.setQueryData<ArticleCache>(articleKeys.detail(articleQuery), {
      data: {
        id: prefetchedArticle.id,
        title: prefetchedArticle.title,
        shareUrl: `${ENV.SEHATQ_DOMAIN}/artikel/${articleSlug}`,
        reference: prefetchedArticle.reference,
        content: prefetchedArticle.content,
        tags:
          prefetchedArticle.tags.map((tag) => ({
            ...tag,
            slug: toSlug(tag.name),
          })) ?? [],
        date: formatDate(new Date(prefetchedArticle.date), displayDateFormat),
        updatedDate: formatDate(
          new Date(prefetchedArticle.updatedDate),
          displayDateFormat
        ),
        reviewedBy: prefetchedArticle.reviewedBy,
        author: prefetchedArticle.author,
        meta: prefetchedArticle.meta,
        headlineBait: prefetchedArticle.headlineBait,
        keyword: prefetchedArticle.keyword,
        category: prefetchedArticle.category,
        image: prefetchedArticle.image,
        summary: prefetchedArticle.summary,
        sponsorUrl: prefetchedArticle.sponsorUrl,
        sponsorImageUrl: prefetchedArticle.sponsorImageUrl,
        hasSponsored: Boolean(prefetchedArticle.sponsored),
        publishDate: formatDate(
          new Date(prefetchedArticle.date),
          apiDateFormat
        ),
        modifiedDate: formatDate(
          new Date(prefetchedArticle.updatedDate),
          apiDateFormat
        ),
      },
    });

    const tagId = prefetchedArticle.tags.map((tag) => tag.id).join(",");

    if (tagId) {
      const relatedForumsQuery = {
        tagId,
      };

      queryClient.setQueryData<RelatedForumsCache>(
        relatedForumsKeys.list(relatedForumsQuery),
        prefetchedArticle.forumRelates
      );

      const relatedArticlesCounter =
        (prefetchedArticle.content.match(/\[\[artikel-terkait\]\]/gi)?.length ??
          0) + 1;
      const relatedArticlesQuery = {
        tagId,
      };
      [...Array(relatedArticlesCounter)].map((_, index) => {
        if (index === 0) {
          queryClient.setQueryData<RelatedArticlesCache>(
            relatedArticleKeys.list({
              ...relatedArticlesQuery,
              quantity: "4",
              repeater: `${index + 1}`,
            }),
            {
              data: prefetchedArticle.articleRelates.map((articleRelate) => ({
                ...articleRelate,
                date: formatDate(
                  new Date(articleRelate.date),
                  displayDateFormat
                ),
              })),
            }
          );
        } else {
          const slicedContentRelates = prefetchedArticle.contentRelates.slice(
            (index - 1) * 3,
            index * 3
          );
          if (slicedContentRelates.length > 0) {
            queryClient.setQueryData<RelatedArticlesCache>(
              relatedArticleKeys.list({
                ...relatedArticlesQuery,
                quantity: "3",
                repeater: `${index + 1}`,
              }),
              {
                data: slicedContentRelates.map((contentRelate) => ({
                  ...contentRelate,
                  category: undefined,
                  imageAlt: undefined,
                  imageUrl: undefined,
                  author: undefined,
                  date: undefined,
                  meta: undefined,
                })),
              }
            );
          }
        }
      });
    }
  } catch (err) {
    error = err;
  }

  return {
    dehydratedState: nullify(dehydrate(queryClient)),
    isMobile,
    error,
  };
}

export interface PrefetchArticleResponse {
  data: {
    id: number;
    title: string;
    date: string;
    updatedDate: string;
    keyword: string;
    headlineBait: string;
    content: string;
    summary: string;
    reference: string;
    meta: string;
    bookmarked: number;
    sponsored: 0 | 1;
    sponsorUrl: string | null;
    sponsorImageUrl: string | null;
    reviewedBy: ReviewedBy;
    author: Author;
    category: Category;
    image: Image;
    rating: Rating;
    tags: Tag[];
    contentRelates: ContentRelate[];
    articleRelates: ArticleRelate[];
    forumRelates: ForumRelate[];
  };
}

export interface ReviewedBy {
  id: number;
  name: string;
  slug: string;
}

export interface Author {
  id: number;
  name: string;
  slug: string;
  imageUrl: string;
  biograph: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Image {
  url: string;
  caption: string;
  alt: string;
  width: number;
  height: number;
}

export interface Rating {
  average: number;
  total: number;
}

export interface Tag {
  id: number;
  name: string;
}

export interface ContentRelate {
  id: number;
  title: string;
  slug: string;
}

export interface ArticleRelate {
  id: number;
  title: string;
  slug: string;
  meta: string;
  date: string;
  imageUrl: string;
  imageAlt: string;
  author: Pick<Author, "id" | "name" | "slug">;
  category: Pick<Author, "id" | "name" | "slug">;
}

export interface ForumRelate {
  id: number;
  title: string;
  slug: string;
  answeredBy: string;
}

async function prefetchArticle({
  fetch,
  query,
}: FetcherArgs<{ articleSlug: string }>) {
  return await fetch.get<PrefetchArticleResponse>(
    `${ENV.API}/content-service/sehatq/articles/${query.articleSlug}?articleRelatedLimit=4`
  );
}
