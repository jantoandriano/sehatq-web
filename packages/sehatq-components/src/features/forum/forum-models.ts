import { formatDate, parseToDate } from "@sehatq/utils";

export interface ForumsResponse {
  data: {
    id: number;
    title: string;
    slug: string;
    answeredBy: string;
    category: {
      id: number;
      slug: string;
      name: string;
    };
    createdAt: string;
  }[];
  meta: {
    pagination: {
      total: number;
      page: number;
      current: number;
      perPage: number;
      maxPage: number;
      next: string;
      prev: string;
    };
    filter: {
      categories: {
        id: number;
        name: string;
        slug: string;
        imageUrl: string[];
      }[];
    };
    sortBy: {
      id: string;
      name: string;
    }[];
  };
}

export function modelForums(data: ForumsResponse["data"]) {
  return data.map(({ createdAt, ...rest }) => ({
    ...rest,
    date: formatDate(
      parseToDate(createdAt, "yyyy-MM-dd HH:mm:ss"),
      "d MMM yyyy"
    ),
  }));
}

export interface ForumInputResponse {
  meta: { message: string };
}

export interface ForumTag {
  id: number;
  name: string;
  slug: string;
}

export interface ForumResponse {
  data: {
    category: {
      id: number;
      name: string;
      slug: string;
    };
    path: string;
    id: number;
    title: string;
    slug: string;
    shareUrl: string;
    question: string;
    answer: string;
    user: {
      id: number;
      email: string;
      nameInitial?: string;
      gender?: string;
      age?: number;
    };
    viewsCount: number;
    commentsCount: number;
    createdAt: string;
    answeredBy: string;
    tags: ForumTag[];
    doctorAuthorSlug?: string;
  };
}

export function modelForum(data: ForumResponse["data"]) {
  const { createdAt, user } = data;
  let genderNameBg = "";
  let genderName = "";

  switch (user.gender) {
    case "f":
      genderName = "Wanita";
      genderNameBg = "squash.500";
      break;
    case "m":
      genderName = "Pria";
      genderNameBg = "main.500";
      break;
    default:
      genderNameBg = "brownGrey.500";
      break;
  }

  return {
    ...data,
    user: {
      ...user,
      genderName,
      genderNameBg,
    },
    date: formatDate(
      parseToDate(createdAt, "yyyy-MM-dd HH:mm:ss"),
      "d MMM yyyy, HH:mm"
    ),
  };
}

export function modelForumCategories(filter: ForumsResponse["meta"]["filter"]) {
  return filter.categories;
}

export type ForumCategories = ReturnType<typeof modelForumCategories>[0];
