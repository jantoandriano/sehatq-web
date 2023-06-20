import { CLIENT_TYPES } from "@constants";
import { sendNetCore } from "./smartech";
import { getParseToken } from "./parseJWT";

function trackWebviewEventNetcore({ eventName = "", eventData = {} }) {
  if (!window) return;
  // data
  const eventDataStringify = JSON.stringify(eventData);
  // tracking
  // Android tracking
  if (
    window.AnalyticsWebInterface &&
    typeof window.AnalyticsWebInterface.logNetcore !== "undefined"
  ) {
    // call Android interface
    window.AnalyticsWebInterface.logNetcore(eventName, eventDataStringify);
  } else if (
    // IOS tracking
    window.webkit &&
    window.webkit.messageHandlers &&
    window.webkit.messageHandlers.firebase &&
    window.webkit.messageHandlers.firebase.postMessage
  ) {
    // call IOS interface
    const message = {
      // Validate the logEvent
      command: "logNetcore",
      // Event Trigger
      name: eventName,
      // Array of product items
      parameters1: eventDataStringify,
    };
    window.webkit.messageHandlers.firebase.postMessage(message);
  }
}

export const sendNetCoreData = (eventAttribute: object, eventName: string) => {
  const { clientId } = getParseToken();
  if (clientId !== CLIENT_TYPES.IOS && clientId !== CLIENT_TYPES.ANDROID) {
    sendNetCore({
      type: "dispatch",
      eventName: eventName,
      attribute: {
        ...(eventAttribute || {}),
      },
    });
  }

  trackWebviewEventNetcore({
    eventName: eventName,
    eventData: {
      transaction: eventAttribute,
    },
  });
};
