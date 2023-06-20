import React from "react";
import { ChatErrorBoundaryDesktop } from "./chat-error-boundary-desktop";
import { ChatErrorBoundaryMobile } from "./chat-error-boundary-mobile";

export type ChatErrorBoundaryProps = {
  isMobile?: boolean;
};

export type ChatErrorBoundaryState = {
  hasError: boolean;
};

export class ChatErrorBoundary extends React.Component<
  ChatErrorBoundaryProps,
  ChatErrorBoundaryState
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      if (this.props.isMobile) {
        return <ChatErrorBoundaryMobile />;
      }
      return <ChatErrorBoundaryDesktop />;
    }

    return this.props.children;
  }
}
