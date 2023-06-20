import React from "react";
import {
  ForumCache,
  ForumCommentsCache,
  ForumTag,
  useGetForum,
  useGetForumComments,
} from "@sehatq/components";
import { ENV, SEO } from "@sehatq/constants";
import { useRouter } from "next/router";
import { formatDate, parseToDate } from "@sehatq/utils";
import { generateSEO, SEOContentProps } from "@utils";
import { HeadContent } from "./head-content";

import { ForumMicrodataArgs, generateForumMicrodata } from "./forum-microdata";

function selectForumData(cache: ForumCache) {
  return cache.data;
}

function selectForumCommentData(cache: ForumCommentsCache) {
  return cache.data;
}

function stripOutHtmlTags(str: string) {
  return str.replace(/<(.|\n)*?>|\r?\n|\r/g, "").replace(/&nbsp;/g, " ");
}

const FORMAT_INPUT = "yyyy-MM-dd HH:mm:ss";
const FORMAT_OUTPUT = "yyyy-MM-dd'T'HH:mmxxx";

export function ForumHead() {
  const router = useRouter();
  const { forumSlug, page, perPage } = router.query;
  const contentUrl = `${ENV.SEHATQ_DOMAIN}/forum/${forumSlug}`;

  const { SEO_DEFAULT } = SEO.SEHATQ;

  const { data: forum, isSuccess } = useGetForum(
    { forumSlug: `${forumSlug}` },
    { select: selectForumData }
  );

  const { data: comments } = useGetForumComments(
    {
      forumId: `${forum?.id}`,
      page: page ? `${page}` : "1",
      perPage: perPage ? `${perPage}` : "5",
    },
    {
      select: selectForumCommentData,
    }
  );

  if (isSuccess && forum) {
    const keywords: string =
      forum.tags.map((tag: ForumTag) => tag.name).join(",") ??
      SEO_DEFAULT.keywords;

    const description = forum.answer
      ? `Dijawab oleh ${forum.answeredBy} - ${stripOutHtmlTags(
          forum.answer
        ).substring(0, 160)}`
      : `Tanya jawab dokter online, diskusi seputar kesehatan keluarga, tumbuh kembang anak, kehamilan, pola hidup sehat di forum SehatQ.`;

    let answers: ForumMicrodataArgs = {
      url: contentUrl,
      question: {
        title: forum.title,
        text: stripOutHtmlTags(forum.question),
        date: formatDate(
          parseToDate(forum.createdAt, FORMAT_INPUT),
          FORMAT_OUTPUT
        ),
        person: forum.user?.nameInitial ?? "",
      },
      comments:
        comments?.map((comment) => ({
          url: contentUrl,
          text: stripOutHtmlTags(comment.comments),
          date: formatDate(
            parseToDate(comment.createdAt, FORMAT_INPUT),
            FORMAT_OUTPUT
          ),
          person: comment.user.nameInitial,
        })) ?? [],
      category: forum.category,
    };

    if (forum.answer) {
      answers = {
        ...answers,
        answer: {
          text: stripOutHtmlTags(forum.answer).trim(),
          date: formatDate(
            parseToDate(forum.createdAt, FORMAT_INPUT),
            FORMAT_OUTPUT
          ),
          person: forum.answeredBy,
        },
      };
    }

    const seoContent: SEOContentProps = {
      title: `${forum.title} | Tanya Dokter`,
      ogTwitterTitle: `${forum.title} | SehatQ`,
      description: description,
      keywords: keywords,
      author: forum.answeredBy ?? "",
      modifiedTime: forum.createdAt ?? "",
      publishedTime: forum.createdAt ?? "",
      ogType: "article",
    };

    const seoData = generateSEO({
      content: seoContent,
      ogUrl: contentUrl,
      canonicalUrl: contentUrl,
      robotIndex: SEO_DEFAULT.robotIndex,
      robotFollow: SEO_DEFAULT.robotFollow,
      microdata: generateForumMicrodata(answers),
      hasAmp: false,
    });

    return <HeadContent {...seoData} />;
  } else {
    return <HeadContent {...SEO_DEFAULT} />;
  }
}
