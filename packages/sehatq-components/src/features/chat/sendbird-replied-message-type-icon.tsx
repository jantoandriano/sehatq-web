import React from "react";
import {
  ReplyDoctorNoteIcon,
  ReplyRecipeCovidIcon,
  ReplyRecipeRecomendationIcon,
  ReplyHealthToolIcon,
  ReplySpecialistRecomendationIcon,
  TelemedDateIcon,
} from "../../user-interfaces";

export function ReplyMessageTypeIcon(props: {
  type: string;
  isMobile: boolean;
}) {
  const { type, isMobile } = props;
  const boxSize = isMobile ? "28px" : "34px";
  if (type == "sick_letter") {
    return <ReplyDoctorNoteIcon boxSize={boxSize} />;
  }
  if (type == "recipe_covid") {
    return <ReplyRecipeCovidIcon boxSize={boxSize} />;
  }
  if (type == "recommend_medicine") {
    return <ReplyRecipeRecomendationIcon boxSize={boxSize} />;
  }
  if (type == "health_tools") {
    return <ReplyHealthToolIcon boxSize={boxSize} />;
  }
  if (type == "suggested_docs") {
    return <TelemedDateIcon boxSize={boxSize} />;
  }
  if (type == "recommend_specialist") {
    return <ReplySpecialistRecomendationIcon boxSize={boxSize} />;
  }
  return null;
}
