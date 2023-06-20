import { formatDate, parseToDate, mappingSpeciality } from "@sehatq/utils";
import { ASSETS } from "@sehatq/constants";
import { SendbirdMessage } from "./sendbird-queries";

export type UserMessageType =
  | "text_message"
  | "sick_letter"
  | "video_call_started"
  | "video_call_ended"
  | "recommend_medicine"
  | "recommend_specialist"
  | "image"
  | "health_tools"
  | "link"
  | "suggested_docs"
  | "chat_ended"
  | "consultation_duration_remaining"
  | "recipe_covid";

function getMessageType(message: SendbirdMessage) {
  const { data } = message;
  let messageType = data
    ? (JSON.parse(data).user_message_type?.toLowerCase() as
        | UserMessageType
        | undefined) ?? "text_message"
    : "text_message";

  if ("url" in message && messageType !== "recipe_covid") {
    messageType = "image";
  }

  if (message.ogMetaData && message.ogMetaData.url) {
    messageType = "link";
  }
  return messageType;
}

export function getTypeDesc(type: UserMessageType) {
  switch (type) {
    case "image":
      return "Gambar";
    case "sick_letter":
      return "Catatan Dokter";
    case "recipe_covid":
      return "Resep Covid";
    case "recommend_medicine":
      return "Rekomendasi Resep";
    case "health_tools":
      return "Tes Kesehatan";
    case "suggested_docs":
      return "Rekomendasi Janji Temu Dokter";
    case "recommend_specialist":
      return "Rekomendasi Chat Dokter";
    default:
      return "";
  }
}

type RepliedMessage = {
  id: number;
  name: string;
  message: string;
  type?: string;
  timeStamp?: string;
};

function modelTextBubble(message: SendbirdMessage) {
  const { data, messageId: id, sender } = message;
  const repliedMessage = data
    ? (JSON.parse(data).replied_message as RepliedMessage | undefined)
    : undefined;
  return {
    id,
    messageType: "text" as const,
    messageText: "message" in message ? message.message : "",
    messageReplier: sender.nickname || "",
    replied: repliedMessage
      ? {
          messageId: repliedMessage.id,
          messageSender: repliedMessage.name,
          messageText: repliedMessage.message,
          messageType: repliedMessage.type ?? "text_message",
        }
      : undefined,
  };
}

type RecommendMedicines = {
  product_id_slug: string;
  medicine_name: string;
  medicine_price_from: number;
  medicine_icon: string;
}[];

function modelPrescriptionBubble(message: SendbirdMessage) {
  const { data, messageId: id } = message;
  const recommendMedicines = data
    ? (JSON.parse(data).recommend_medicines as RecommendMedicines | undefined)
    : undefined;
  return {
    id,
    messageType: "prescription" as const,
    prescriptions:
      recommendMedicines?.map((recommendMedicine) => ({
        slug: recommendMedicine.product_id_slug,
        name: recommendMedicine.medicine_name,
        priceFrom: recommendMedicine.medicine_price_from,
        icon: recommendMedicine.medicine_icon,
      })) ?? [],
  };
}

type RecommendTelemedicines = {
  id: string;
  name: string;
  indicator: string;
  rating: {
    count: number;
    average: number;
  };
  displayPrice: number;
  consultationFee: number;
  title: string;
  experienceStartOn: string;
  speciality: {
    id: number;
    name: string;
  };
  slug: string;
  hospital: {
    id: number;
    name: string;
    identityNumberRequired: boolean;
  };
  photoUrl: string;
  experience: string;
  doctorRecommendationId: number;
}[];

function modelTelemedicinesBubble(message: SendbirdMessage) {
  const { data, messageId: id } = message;
  const recommendTelemedicines = data
    ? (JSON.parse(data).recommend_specialist as
        | RecommendTelemedicines
        | undefined)
    : undefined;
  return {
    id,
    messageType: "recommended-telemedicines" as const,
    recommendTelemedicines:
      recommendTelemedicines?.map((recommendTelemedicine) => ({
        doctorImgSrc: recommendTelemedicine.photoUrl,
        doctorName: recommendTelemedicine.title
          ? `${recommendTelemedicine.title} ${recommendTelemedicine.name}`
          : recommendTelemedicine.name,
        doctorSlug: recommendTelemedicine.slug,
        specialityName: recommendTelemedicine.speciality.name,
        hospitalName: recommendTelemedicine.hospital.name,
        ratingAverage: recommendTelemedicine.rating.average,
        ratingTotal: recommendTelemedicine.rating.count,
        experience: recommendTelemedicine.experience,
        doctorRecommendationId:
          `${recommendTelemedicine.doctorRecommendationId}` || "",
      })) ?? [],
  };
}

type RecommendDoctors = {
  doctorNameWithSpeciality: string;
  doctorName: string;
  avatarUrl: string;
  scheduleDay: string;
  bookingRecommendation_id: number;
  bookingDate: string;
  scheduleTime: string;
  key_doc_id: number;
  specialityName: string;
  experience: string;
}[];

function modelRecommendDoctorsBubble(message: SendbirdMessage) {
  const { data, messageId: id } = message;

  const recommendDoctors = data
    ? (JSON.parse(data).key_suggested_docs as RecommendDoctors | undefined)
    : undefined;

  return {
    id,
    messageType: "recommended-doctor" as const,
    recommendDoctors:
      recommendDoctors?.map((recommendDoctor) => ({
        doctorImgSrc: recommendDoctor.avatarUrl,
        doctorName: recommendDoctor.doctorNameWithSpeciality,
        doctorId: recommendDoctor.key_doc_id,
        specialityName:
          recommendDoctor.specialityName &&
          mappingSpeciality(recommendDoctor.specialityName),
        experience: recommendDoctor.experience
          ? `${recommendDoctor.experience} tahun`
          : "-",
        hospitalName: recommendDoctor.doctorName,
        scheduleDay:
          recommendDoctor.bookingDate &&
          formatDate(
            parseToDate(recommendDoctor.bookingDate, "yyyy-MM-dd", true),
            "dd MMM yyyy"
          ),
        scheduleTime: recommendDoctor.scheduleTime,
      })) ?? [],
  };
}

type RecommendHealthTools = {
  sequence: number;
  icon: string;
  url: string;
  service: string;
}[];

function modelRecommendHealthToolsBubble(message: SendbirdMessage) {
  const { data, messageId: id } = message;

  const recommendHealthTools = data
    ? (JSON.parse(data).health_tools as RecommendHealthTools | undefined)
    : undefined;

  return {
    id,
    messageType: "recommended-health-tools" as const,
    recommendHealthTools:
      recommendHealthTools?.map((recommendHealthTool) => ({
        id: recommendHealthTool.sequence,
        iconSrc: recommendHealthTool.icon,
        iconUrl: recommendHealthTool.url,
        title: recommendHealthTool.service,
      })) ?? [],
  };
}

function modelImageBubble(message: SendbirdMessage) {
  const { messageId: id } = message;
  let thumbnail;
  if ("thumbnails" in message) {
    const { thumbnails } = message;
    thumbnail = message.thumbnails[thumbnails.length - 1];
  }
  if (thumbnail) {
    return {
      id,
      messageType: "image",
      imageUrl: thumbnail.url ?? "",
      width: thumbnail.realWidth,
      height: thumbnail.realHeight,
      imageName: "name" in message ? message.name : "",
      plainImageUrl: "plainUrl" in message ? message.plainUrl : "",
    } as const;
  }
  return {
    id,
    messageType: "image",
    plainImageUrl: "plainUrl" in message ? message.plainUrl : "",
    imageUrl: "plainUrl" in message ? message.plainUrl : "",
    imageName: "name" in message ? message.name : "",
  } as const;
}

function modelLinkBubble(message: SendbirdMessage) {
  const { ogMetaData, messageId: id, message: textResponse } = message;

  const metaData = ogMetaData || undefined;

  return {
    id,
    messageType: "link" as const,
    metaData: metaData
      ? {
          title: metaData.title,
          description: "Lihat Selengkapnya",
          additionalText: textResponse ?? "",
          link: metaData?.url,
          image: {
            url: metaData.defaultImage?.url || ASSETS.NO_IMAGE,
            alt: metaData.defaultImage?.alt || metaData.title,
          },
        }
      : undefined,
  };
}

function modelEndedBubble(message: SendbirdMessage) {
  const { data, messageId: id } = message;
  return {
    id,
    messageType: "chat-ended",
    endedBy: data ? JSON.parse(data).ended_by : undefined,
  } as const;
}

function modelDurationRemaining(message: SendbirdMessage) {
  const { messageId: id } = message;
  return {
    id,
    messageType: "duration-remaining",
    messageText: "message" in message ? message.message : "",
  } as const;
}

// eslint-disable-next-line sonarjs/cognitive-complexity
export function modelSendbirdBubble(message: SendbirdMessage) {
  const { data, messageId: id } = message;
  const messageType = getMessageType(message);
  if (messageType === "text_message") {
    return modelTextBubble(message);
  }
  if (messageType === "sick_letter") {
    const doctorNote = data
      ? (JSON.parse(data).consultationId as string)
      : undefined;
    return {
      id,
      messageType: "doctor-note",
      consultationId: doctorNote,
    } as const;
  }
  if (
    messageType === "video_call_ended" ||
    messageType === "video_call_started"
  ) {
    return {
      id,
      messageType: "video-call",
      status: messageType === "video_call_started" ? "start" : "end",
    } as const;
  }
  if (messageType === "recommend_medicine") {
    return modelPrescriptionBubble(message);
  }
  if (messageType === "recommend_specialist") {
    return modelTelemedicinesBubble(message);
  }
  if (messageType === "suggested_docs") {
    return modelRecommendDoctorsBubble(message);
  }
  if (messageType === "health_tools") {
    return modelRecommendHealthToolsBubble(message);
  }
  if (messageType === "image") {
    return modelImageBubble(message);
  }
  if (messageType === "link") {
    return modelLinkBubble(message);
  }
  if (messageType === "chat_ended") {
    return modelEndedBubble(message);
  }
  if (messageType === "consultation_duration_remaining") {
    return modelDurationRemaining(message);
  }
  if (messageType === "recipe_covid") {
    const consultationId = data
      ? (JSON.parse(data).consultationId as string)
      : undefined;
    return {
      id,
      messageType: "recipe-covid",
      consultationId,
      plainImageUrl: "plainUrl" in message ? message.plainUrl : "",
    } as const;
  }
  return {
    id,
    messageType: "not-support",
  } as const;
}

export function getCustomeMessage(message: SendbirdMessage) {
  const { data } = message;
  let msg = "";
  if (data) {
    const messageData = JSON.parse(data);
    msg = getTypeDesc(
      messageData.user_message_type?.toLowerCase() as UserMessageType
    );
  }

  if (!msg && "message" in message) {
    msg = message.message ?? "";
  }
  return msg;
}

export type BubbleMessageType =
  | "text"
  | "video-call"
  | "image"
  | "prescription"
  | "doctor-note"
  | "recommended-telemedicines"
  | "recommended-doctor"
  | "recommended-health-tools"
  | "deleted"
  | "link"
  | "recipe-covid";
