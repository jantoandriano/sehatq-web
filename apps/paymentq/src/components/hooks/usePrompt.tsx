import { useEffect } from "react";

export function usePrompt() {
  const onWindowOrTabClose = (event: BeforeUnloadEvent) => {
    if (typeof event == "undefined") {
      event = window.event as BeforeUnloadEvent;
    }

    if (event) {
      event.returnValue = "";
    }

    return "";
  };

  useEffect(() => {
    window.addEventListener("beforeunload", onWindowOrTabClose);

    return () => {
      window.removeEventListener("beforeunload", onWindowOrTabClose);
    };
  }, []);
}
