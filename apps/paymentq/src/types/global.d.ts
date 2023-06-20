export {};

declare global {
  /**
   * Now declare things that go in the global namespace,
   * or augment existing declarations in the global namespace.
   */

  interface Window {
    MidtransNew3ds: {
      redirect(redirectUrl: string, arg1: { callbackUrl: string }): unknown;
      getCardToken: (
        arg0: {
          card_number: number;
          card_exp_month: number;
          card_exp_year: number;
          card_cvv: number;
        },
        arg1: {
          onSuccess: (res: { token_id: string }) => void;
          onFailure: (err: {
            validation_messages: string[];
            status_message: string;
          }) => void;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ) => any;
      authenticate: (
        arg0: string,
        arg1: {
          performAuthentication: (url: string) => void;
          onSuccess: () => void;
          onFailure: () => void;
          onPending: () => void;
        }
      ) => void;
    };
    AnalyticsWebInterface: {
      actionEvent: (message: string) => void;
      logNetcore: (message: string, data: string) => void;
    };
    webkit: {
      messageHandlers: {
        actionEvent: {
          postMessage: (message: string | object) => void;
        };
        event: {
          postMessage: (message: string | object) => void;
        };
        firebase: {
          postMessage: (message: string | object) => void;
        };
        shippingAddress: {
          postMessage: (message: string | object) => void;
        };
      };
    };
    smartech: any;
    cmd: any;
    google_tag_manager: {
      dataLayer: {
        gtmDom: any;
      };
    };
    dataLayer: any;
    performance: any;
  }
}
