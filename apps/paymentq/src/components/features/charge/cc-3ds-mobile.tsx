import React from "react";
import { type ModalIFrameProps } from "./cc-3ds";

export function CC3dsMobile(props: ModalIFrameProps) {
  const { iframeUrl } = props;

  return (
    <>
      {Boolean(iframeUrl) && (
        <iframe
          src={iframeUrl as string}
          allow="fullscreen"
          style={{
            display: "block",
            position: "fixed",
            top: "0px",
            left: "0px",
            width: "100%",
            height: "100%",
            zIndex: "999999",
            border: "opx",
          }}
        />
      )}
    </>
  );
}
