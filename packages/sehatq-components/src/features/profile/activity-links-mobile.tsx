import React from "react";
import { useNavigation, NavigationValue } from "@sehatq/utils";
import { Box, Link, Slider } from "../../user-interfaces";
import { LINKS } from "./activity-links-constants";

export interface ActivityLinksMobileProps {
  userId?: string;
  links: {
    id: string;
    label: string;
    navigationName: NavigationValue["name"];
  }[];
  activeLink: keyof typeof LINKS;
}

export function ActivityLinksMobile({
  userId,
  links,
  activeLink,
}: ActivityLinksMobileProps) {
  const { Navigate } = useNavigation();
  return (
    <Slider
      slideGap={0}
      slides={links}
      hideArrowButton
      startSlideIndex={links.findIndex(
        (link) => link.navigationName === activeLink
      )}
      renderSlide={({ slide: link, clickAllowed }) => (
        <Box
          onClickCapture={(event) => {
            if (clickAllowed && clickAllowed()) return;
            event.stopPropagation();
          }}
        >
          <Navigate name={link.navigationName} query={userId ? { userId } : {}}>
            <Link
              variant="tab"
              colorScheme="sea"
              isActive={activeLink === link.navigationName}
              fontSize="sm"
              whiteSpace="nowrap"
              justifyContent="center"
            >
              {link.label}
            </Link>
          </Navigate>
        </Box>
      )}
    />
  );
}
