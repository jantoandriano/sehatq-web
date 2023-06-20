import React, { useState } from "react";
import { useNavigation } from "@sehatq/utils";
import { useGetProfile } from "../profile";
import { MarkForumAsSpamDesktop } from "./mark-forum-as-spam-desktop";
import { MarkForumAsSpamMobile } from "./mark-forum-as-spam-mobile";
import { useMarkForumAsSpam } from "./forum-queries";

export type MarkForumAsSpamProps = {
  isMobile?: boolean;
  forumId: number;
};

export function MarkForumAsSpam(props: MarkForumAsSpamProps) {
  const { isMobile, forumId } = props;
  const { navigate } = useNavigation();
  const [isModalShow, setIsModalShow] = useState(false);
  const [isReported, setIsReported] = useState(false);
  const [stateResultText, setStateResultText] = useState("");
  const reportForum = useMarkForumAsSpam();
  const { isSuccess } = useGetProfile();

  const MODAL_TEXT = {
    confirmText: `Apakah Anda yakin melaporkan pertanyaan ini sebagai spam?`,
    cancelText: `Tidak`,
    proceedText: `Ya, Laporkan`,
  };

  function onModalShow() {
    if (isModalShow) {
      setIsModalShow(false);
      setIsReported(false);
      setStateResultText("");
    } else {
      setIsModalShow(true);
    }
  }

  function onReportSpam() {
    if (isSuccess) {
      reportForum.mutate(
        {
          forumId,
        },
        {
          onSuccess: () => {
            setIsReported(true);
            setStateResultText(`Terima kasih atas laporan Anda!`);
          },
          onError: () => {
            setIsReported(true);
            setStateResultText(
              `Oops, Gagal melaporkan spam. Silahkan coba lagi`
            );
          },
        }
      );
    } else {
      navigate("EXTERNAL_LOGIN");
    }
  }

  const otherProps = {
    onProceed: onReportSpam,
    MODAL_TEXT,
    isReported,
    isLoading: reportForum.isLoading,
    stateResultText,
    onModalShow,
    isModalShow,
    isLogin: isSuccess,
  };

  if (isMobile) return <MarkForumAsSpamMobile {...otherProps} />;

  return <MarkForumAsSpamDesktop {...otherProps} />;
}
