import React, { useEffect } from "react";
import {
  SocialFB,
  SocialTwitter,
  SocialWA,
  SocialTelegram,
  SocialLinkedin,
  SocialEmail,
  useClipboard,
  useToast,
} from "../../user-interfaces";
import { SocialShareButtonDesktop } from "./social-share-button-desktop";
import { SocialShareButtonMobile } from "./social-share-button-mobile";

export type SocialShareButtonProps = {
  isMobile?: boolean;
  shareUrl: string;
  title?: string;
  sizeButton?: string;
  colorButton?: "white" | "sea";
};

const SOCIAL_ICONS = ({
  url = "",
  title = "",
  sizeIcon = "34px",
  mailSubject = "Artikel ini penting untuk kamu",
  mailBody = "Hai! Seseorang ingin membagi pengetahuan tentang kesehatan denganmu. %0D%0ASilahkan klik link SehatQ ini untuk membaca lebih lanjut: ",
  labelSubject = "Hai! Coba cek link SehatQ ini ",
}) => ({
  FACEBOOK_ICON: {
    id: 1,
    label: "Facebook",
    link: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    iconSrc: <SocialFB boxSize={sizeIcon} />,
  },
  TWITTER_ICON: {
    id: 2,
    label: "Twitter",
    link: `https://twitter.com/intent/tweet?text=${labelSubject}${url}`,
    iconSrc: <SocialTwitter boxSize={sizeIcon} />,
  },
  WHATSAPP_ICON: {
    id: 3,
    label: "Whatsapp",
    link: `https://wa.me/?text=${labelSubject}${url}`,
    iconSrc: <SocialWA boxSize={sizeIcon} />,
  },
  TELEGRAM_ICON: {
    id: 4,
    label: "Telegram",
    link: `https://t.me/share/url?url=${url}&text=${title}`,
    iconSrc: <SocialTelegram boxSize={sizeIcon} />,
  },
  LINKEDIN_ICON: {
    id: 5,
    label: "Linkedin",
    link: `https://www.linkedin.com/sharing/share-offsite/?mini=true&url=${url}`,
    iconSrc: <SocialLinkedin boxSize={sizeIcon} />,
  },
  MAIL_ICON: {
    id: 6,
    label: "Email",
    link: `mailto:?subject=${mailSubject} - ${title}&body=${mailBody}${url}`,
    iconSrc: <SocialEmail boxSize={sizeIcon} />,
  },
});

export function SocialShareButton(props: SocialShareButtonProps) {
  const { isMobile, shareUrl, title, sizeButton, colorButton, ...otherProps } =
    props;
  const { hasCopied, onCopy } = useClipboard(shareUrl);
  const toast = useToast();
  const sizeIcon = isMobile ? "32px" : "34px";

  const socialIcons = Object.values(
    SOCIAL_ICONS({
      url: shareUrl,
      title,
      sizeIcon,
    })
  );

  useEffect(() => {
    if (hasCopied) {
      toast({
        message: "Link berhasil dicopy",
        status: "success",
      });
    }
  }, [toast, hasCopied, isMobile]);

  const baseProps = {
    ...otherProps,
    shareUrl,
    socialIcons,
    onCopy,
    sizeIcon,
    sizeButton,
    colorButton,
  };

  if (isMobile) {
    return <SocialShareButtonMobile {...baseProps} />;
  }

  return <SocialShareButtonDesktop {...baseProps} />;
}
