import React, { FunctionComponent, ReactElement } from "react";
import { Parameters } from "@storybook/react";
import { DocsContainer, DocsContainerProps } from "@storybook/addon-docs";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { initialize, mswDecorator } from "msw-storybook-addon";
import { AssetsProvider } from "@sehatq/utils";
import { UIProvider, ImageProvider, Img } from "../user-interfaces";
import { withNavigation } from "./component";

// Initialize MSW
const paths = window.location.pathname.split("/");
const rootPaths = paths.slice(0, paths.length - 1);
initialize({
  onUnhandledRequest: "bypass",
  serviceWorker: {
    url: `${rootPaths.join("/")}/mockServiceWorker.js`,
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      cacheTime: 0,
      retry: false,
    },
  },
});

export const parameters: Parameters = {
  layout: "centered",
  options: {
    storySort: {
      order: ["How to Code", "Features", "UI Docs", "UI"],
    },
  },
  backgrounds: {
    default: "light",
  },
  docs: {
    container: ({
      children,
      context,
    }: DocsContainerProps & { children: ReactElement }) => (
      <DocsContainer context={context}>
        <UIProvider>{children}</UIProvider>
      </DocsContainer>
    ),
  },
};

function sehatQDecorator(StoryFn: FunctionComponent) {
  return (
    <QueryClientProvider client={queryClient}>
      <UIProvider>
        <AssetsProvider value=".">
          <ImageProvider value={Img}>
            <StoryFn />
          </ImageProvider>
        </AssetsProvider>
      </UIProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export const decorators = [mswDecorator, withNavigation, sehatQDecorator];
