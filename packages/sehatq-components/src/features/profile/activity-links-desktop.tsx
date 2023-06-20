import React from "react";
import { useNavigation, NavigationValue } from "@sehatq/utils";
import { Flex, Link, Slider } from "../../user-interfaces";
import { LINKS } from "./activity-links-constants";

export interface ActivityLinksDesktopProps {
  userId?: string;
  links: {
    id: string;
    label: string;
    navigationName: NavigationValue["name"];
  }[];
  activeLink: keyof typeof LINKS;
}

export function ActivityLinksDesktop({
  userId,
  links,
  activeLink,
}: ActivityLinksDesktopProps) {
  const { Navigate } = useNavigation();
  return (
    <Slider
      slideGap={7}
      slides={links}
      hideArrowButton
      renderSlide={({ slide: link, clickAllowed }) => (
        <Flex
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
              fontSize="md"
              whiteSpace="nowrap"
              justifyContent="center"
              height="60px"
              paddingX={5}
            >
              {link.label}
            </Link>
          </Navigate>
        </Flex>
      )}
    />
  );
}
