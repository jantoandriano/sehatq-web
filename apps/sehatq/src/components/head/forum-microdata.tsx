import React from "react";
import { ENV, SCHEMA_URL_MICRODATA } from "@sehatq/constants";
import { generateBreadcrumbMicrodata } from "./microdata-helpers";

export type ForumMicrodataArgs = {
  url: string;
  question: {
    title: string;
    text: string;
    date: string;
    person: string;
  };
  answer?: {
    text: string;
    date: string;
    person: string;
  };
  comments: { url: string; text: string; date: string; person: string }[];
  category: {
    id: number;
    name: string;
    slug: string;
  };
};

export function generateForumMicrodata(args: ForumMicrodataArgs) {
  const { url, question, answer, comments, category } = args;

  let dataComments: {
    "@type": string;
    text: string;
    dateCreated: string;
    upvoteCount: number;
    url: string;
    author: {
      "@type": string;
      name: string;
    };
  }[] = [];

  if (comments.length > 0) {
    dataComments = comments.map((item) => ({
      "@type": "Answer",
      text: item.text,
      dateCreated: item.date,
      upvoteCount: 0,
      url: item.url,
      author: {
        "@type": "Person",
        name: item.person,
      },
    }));
  }

  const dataForumAnswer = {
    "@context": SCHEMA_URL_MICRODATA,
    "@type": "QAPage",
    mainentity: {
      "@type": "Question",
      name: question.title,
      text: question.text,
      answerCount: 1,
      upvoteCount: 0,
      dateCreated: `${question.date} Question sent`,
      author: {
        "@type": "Person",
        name: question.person,
      },
      ...(answer && {
        acceptedAnswer: {
          "@type": "Answer",
          text: answer.text,
          upvoteCount: 0,
          dateCreated: answer.date,
          url,
          author: {
            "@type": "Person",
            name: answer.person,
          },
        },
      }),
      ...(dataComments && {
        suggestedAnswer: dataComments,
      }),
    },
  };

  const breadCrumb = [
    { id: ENV.SEHATQ_DOMAIN, name: "SehatQ" },
    {
      id: url,
      name: category ? "Forum" : "Forum Tanya Jawab Kesehatan",
    },
    {
      id: `${ENV.SEHATQ_DOMAIN}/forum/${category.slug}`,
      name: question.title,
    },
  ];

  const microdata = [
    ...generateBreadcrumbMicrodata(breadCrumb),
    ...[dataForumAnswer],
  ];

  return microdata.map((item, idx) => (
    <script
      // no ids, static data
      // eslint-disable-next-line react/no-array-index-key
      key={idx}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(item),
      }}
    />
  ));
}
