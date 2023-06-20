export interface ForumCommentInputResponse {
  meta: { message: string };
}

export interface ForumDoctorReplies {
  id: number;
  comments: string;
  createdAt: string;
  doctor: {
    id: number;
    name: string;
  };
}

export interface ForumCommentData {
  id: number;
  comments: string;
  createdAt: string;
  user: {
    id: number;
    nameInitial: string;
    gender: string;
    isDoctor: number;
    name: string;
  };
  doctorReplies: ForumDoctorReplies[];
}
export interface ForumCommentsResponse {
  data: ForumCommentData[];
  meta: {
    pagination: {
      total: number;
      current: number;
      perPage: number;
      maxPage: number;
      next: string;
      prev: string;
    };
  };
}

export function modelForumComments(data: ForumCommentsResponse["data"]) {
  return data;
}

export type ForumComments = ReturnType<typeof modelForumComments>;

export function modelMetaForumComments(meta: ForumCommentsResponse["meta"]) {
  return {
    total: meta.pagination.total ?? 0,
    current: meta.pagination.current ?? 1,
    perPage: meta.pagination.perPage ?? 5,
    next: meta.pagination.next,
    prev: meta.pagination.prev,
    maxPage: meta.pagination.maxPage,
  };
}

export type MetaForumComments = ReturnType<typeof modelMetaForumComments>;
