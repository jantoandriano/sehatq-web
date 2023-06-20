import React, { useEffect, useState } from "react";
import { AppProps } from "next/app";
import Script from "next/script";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { ReactQueryDevtools } from "react-query/devtools";
import { UIProvider } from "@sehatq/components";
import { SehatQNavigationProvider, SehatQImageProvider } from "@components";
import { SelectedPaymentProvider } from "src/contexts/selected-payment";
import { CheckLimitContextProvider } from "src/contexts/check-limit";
import { registerNetCore, sendNetCore, getParseToken } from "src/utils";

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
    const { id } = getParseToken();
    sendNetCore({
      type: "identify",
      value: id ?? "",
    });
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps?.dehydratedState}>
          <UIProvider>
            <SehatQNavigationProvider>
              <SehatQImageProvider>
                <SelectedPaymentProvider>
                  <CheckLimitContextProvider>
                    <Component {...pageProps} />
                  </CheckLimitContextProvider>
                </SelectedPaymentProvider>
              </SehatQImageProvider>
            </SehatQNavigationProvider>
          </UIProvider>
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
      <Script
        strategy="afterInteractive"
        src="//cdnt.netcoresmartech.com/smartechclient.js"
        onLoad={registerNetCore}
      />
    </>
  );
}
