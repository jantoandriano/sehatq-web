import React, { useEffect, useRef, useState } from "react";
import SendbirdCall, { DirectCall } from "sendbird-calls";
import { useDisclosure, useToast } from "../../user-interfaces";
import { useSendSendbirdMessage, GroupChannel } from "./sendbird-queries";
import { SendbirdVideoCallMobile } from "./sendbird-video-call-mobile";
import { SendbirdVideoCallDesktop } from "./sendbird-video-call-desktop";

export type SendbirdVideoCallProps = {
  isMobile?: boolean;
  channel: GroupChannel;
  appId: string;
  userId: string;
  accessToken: string;
  canVideoCall?: boolean;
  doctor: {
    name: string;
    speciality: string;
    imageUrl: string;
  };
};

export function SendbirdVideoCall(props: SendbirdVideoCallProps) {
  const {
    isMobile,
    appId,
    userId,
    accessToken,
    channel,
    doctor,
    canVideoCall,
  } = props;
  const refCalling = useRef<DirectCall | null>(null);
  const [stateRinging, setStateRinging] = useState<DirectCall | null>(null);
  const [stateIsConnected, setStateIsConnected] = useState<boolean>(false);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { mutate: sendSendbirdMessage } = useSendSendbirdMessage();
  const toast = useToast();

  const consultationId = channel?.url.split("_")[1];

  useEffect(() => {
    SendbirdCall.init(appId);
    SendbirdCall.authenticate({ userId, accessToken }, (result, error) => {
      if (!error) {
        SendbirdCall.connectWebSocket();
      }
    });
    const createdAt = new Date().getTime().toString();
    SendbirdCall.addListener(createdAt, {
      onRinging: (call) => {
        onOpen();
        setStateRinging(call);
        call.onConnected = () => {
          setStateIsConnected(true);
        };
        call.onEnded = () => {
          setStateRinging(null);
          setStateIsConnected(false);
          onClose();
        };
      },
    });
    return () => {
      SendbirdCall.removeListener(createdAt);
    };
  }, [appId, userId, accessToken, onOpen, onClose]);

  function dial() {
    if (!canVideoCall) {
      toast({
        id: "video-call",
        message: "Video call hanya tersedia untuk layanan berbayar",
        status: "error",
      });
      return;
    }
    const doctorId = channel.members.find(
      (member) => member.userId !== userId
    )?.userId;
    if (doctorId && !refCalling.current) {
      const dialParams = {
        userId: doctorId,
        isVideoCall: true,
        callOption: {
          audioEnabled: true,
          videoEnabled: true,
        },
      };
      refCalling.current = SendbirdCall.dial(dialParams, (call, err) => {
        if (!err) {
          onOpen();
          sendSendbirdMessage({
            channel,
            message: "",
            data: JSON.stringify({
              consultationId,
              user_message_type: "video_call_started",
            }),
          });
        }
      });
      refCalling.current.onConnected = () => {
        setStateIsConnected(true);
      };
      refCalling.current.onEnded = () => {
        onClose();
        setStateIsConnected(false);
        refCalling.current = null;
        sendSendbirdMessage({
          channel,
          message: "",
          data: JSON.stringify({
            consultationId,
            user_message_type: "video_call_ended",
          }),
        });
      };
    }
  }

  function accept() {
    if (stateRinging?.accept) {
      stateRinging.accept({
        callOption: {
          audioEnabled: true,
          videoEnabled: true,
        },
      });
    }
  }

  function end() {
    if (stateRinging?.end) {
      stateRinging.end();
    } else if (refCalling.current?.end) {
      refCalling.current?.end();
    }
  }

  function setLocalMediaView(node: HTMLMediaElement | null) {
    if (node) {
      if (refCalling.current?.setLocalMediaView) {
        refCalling.current.setLocalMediaView(node);
      } else if (stateRinging?.setLocalMediaView) {
        stateRinging?.setLocalMediaView(node);
      }
    }
  }

  function setRemoteMediaView(node: HTMLMediaElement | null) {
    if (node) {
      if (refCalling.current?.setRemoteMediaView) {
        refCalling.current.setRemoteMediaView(node);
      } else if (stateRinging?.setRemoteMediaView) {
        stateRinging?.setRemoteMediaView(node);
      }
    }
  }

  const otherProps = {
    end,
    dial,
    accept,
    isOpen,
    doctor,
    type: refCalling.current
      ? ("calling" as const)
      : stateRinging
      ? ("ringing" as const)
      : null,
    isConnected: stateIsConnected,
    setLocalMediaView,
    setRemoteMediaView,
    canVideoCall,
  };

  if (isMobile) {
    return <SendbirdVideoCallMobile {...otherProps} />;
  }
  return <SendbirdVideoCallDesktop {...otherProps} />;
}
