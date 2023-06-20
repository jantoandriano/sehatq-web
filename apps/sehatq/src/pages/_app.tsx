import React, { useState, useEffect } from "react";
import { AppProps } from "next/app";
import Script from "next/script";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { ReactQueryDevtools } from "react-query/devtools";
import { UIProvider, InsiderObjectUser } from "@sehatq/components";
import { ENV } from "@sehatq/constants";
import {
  SehatQNavigationProvider,
  SehatQImageProvider,
  PubMaticScript,
  FirebaseCloudMessaging,
} from "@components";
import { initTopbar } from "@libs/topbar";

export default function MyApp({
  Component,
  pageProps,
}: AppProps<{ dehydratedState: unknown }>) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
            retry: false,
          },
        },
      })
  );
  useEffect(() => {
    initTopbar();
  }, []);
  return (
    <>
      <Script
        id="google-tag-manager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w, d, s, l, i) {
              w[l] = w[l] || [];
              w[l].push({
                'gtm.start': new Date().getTime(),
                event: 'gtm.js',
              });
              var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s),
                dl = l != 'dataLayer' ? '&l=' + l : '';
              j.async = true;
              j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl + '&gtm_auth=${ENV.GTM_AUTH}&gtm_preview=${ENV.GTM_PREVIEW}&gtm_cookies_win=x';
              f.parentNode.insertBefore(j, f);
            })(window, document, 'script', 'dataLayer', '${ENV.GTM_ID}');
          `,
        }}
      />
      <PubMaticScript />
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <UIProvider>
            <SehatQNavigationProvider>
              <SehatQImageProvider>
                <>
                  <InsiderObjectUser />
                  <FirebaseCloudMessaging />
                  <Component {...pageProps} />
                </>
              </SehatQImageProvider>
            </SehatQNavigationProvider>
          </UIProvider>
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}
