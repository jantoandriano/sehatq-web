import React, { useState } from "react";
import {
  useGetHealthToolDetail,
  FamilySelectedData,
  useGetProfile,
  ProfileCache,
} from "@sehatq/components";
import { HealthToolDetailCache } from "../health-tool/health-tool-queries";

import { StartHealthToolSurveyMobile } from "./start-health-tool-survey-mobile";
import { StartHealthToolSurveyDesktop } from "./start-health-tool-survey-desktop";

function selectUser(user: ProfileCache) {
  return { id: user.id, uuid: user.uuid };
}

export type StartHealthToolProps = {
  isMobile: boolean;
  slug: string;
  onStartSurvey: (
    surveyId: string,
    familyMember: FamilySelectedData | undefined,
    uuidUser: string
  ) => void;
};

function selectStartSurvey(data: HealthToolDetailCache) {
  return {
    formCode: data.data.formCode,
    detailPageButtonText: data.data.typeform?.detailPageButtonText,
  };
}

export function StartHealthToolSurvey(props: StartHealthToolProps) {
  const { isMobile, slug, onStartSurvey } = props;
  const [state, setState] = useState<FamilySelectedData | undefined>(undefined);
  const [isNext, setIsNext] = useState<boolean>(false);
  const { data: userData } = useGetProfile({ select: selectUser });
  const { data } = useGetHealthToolDetail(
    {
      idOrSlugOrFormcode: slug,
    },
    { select: selectStartSurvey }
  );

  function onSurvey() {
    onStartSurvey(data?.formCode ?? "", state, userData?.uuid ?? "");
  }

  const newProps = {
    isNext: !!userData || isNext,
    isLogin: !!userData,
    state,
    setState,
    setIsNext,
    detailPageButtonText: data?.detailPageButtonText ?? "",
    onSurvey,
  };

  if (isMobile) {
    return <StartHealthToolSurveyMobile {...newProps} />;
  }

  return <StartHealthToolSurveyDesktop {...newProps} />;
}
