import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { ArticleContent, ArticleContentProps } from "../article-content";
import { GPTProvider } from "../../google-publisher-tag";

export default {
  title: "Features / Article / Content",
  component: ArticleContent,
} as Meta;

type ArticleTagsStory = StoryObj<ArticleContentProps>;
export const Mobile: ArticleTagsStory = {
  render: (args) => (
    <GPTProvider
      ads={[
        {
          divId: "div-gpt-ad-mr1",
          unitPath: `SehatQ_Mobile/Article`,
          size: [[300, 250]],
          targets: [
            ["pos", "MR1"],
            ["page", "article"],
          ],
        },
        {
          divId: "div-gpt-ad-mr2",
          unitPath: `SehatQ_Mobile/Article`,
          size: [[300, 250]],
          targets: [
            ["pos", "MR2"],
            ["page", "article"],
          ],
        },
        {
          divId: "div-gpt-ad-flyingcarpet",
          unitPath: `SehatQ_Mobile/Article`,
          size: [[300, 600]],
          targets: [["pos", "Parallax"]],
        },
      ]}
      enabled={false}
      onRouteChangeComplete={console.log}
      onRouteChangeStart={console.log}
      offRouteChangeComplete={console.log}
      offRouteChangeStart={console.log}
    >
      <Box width="328px">
        <ArticleContent {...args} isMobile />
      </Box>
    </GPTProvider>
  ),
  args: {
    articleSlug: "cara-diet-idol-kpop",
  },
};

export const Desktop: ArticleTagsStory = {
  render: (args) => (
    <GPTProvider
      ads={[
        {
          divId: "div-gpt-ad-middleleaderboard",
          unitPath: `SehatQ_Desktop/Article`,
          size: [[728, 90]],
          targets: [
            ["pos", "Middle_Leaderboard"],
            ["page", "article"],
          ],
        },
      ]}
      enabled={false}
      onRouteChangeComplete={console.log}
      onRouteChangeStart={console.log}
      offRouteChangeComplete={console.log}
      offRouteChangeStart={console.log}
    >
      <Box width="760px">
        <ArticleContent {...args} />
      </Box>
    </GPTProvider>
  ),
  args: {
    articleSlug: "cara-diet-idol-kpop",
  },
};
