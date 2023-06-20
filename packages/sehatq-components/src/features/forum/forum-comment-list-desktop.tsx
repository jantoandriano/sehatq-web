import React from "react";
import { Box, Center, PaginationLink } from "../../user-interfaces";
import { ForumComment } from "./forum-comment";
import {
  ForumCommentData,
  ForumComments,
  ForumDoctorReplies,
} from "./forum-comment-model";
import { ForumCommentReply } from "./forum-comment-reply";

export type ForumCommentListDesktopProps = {
  data: ForumComments;
  forumId: number;
  page: number;
  maxPage: number;
  isShowActions: boolean;
};

export function ForumCommentListDesktop(props: ForumCommentListDesktopProps) {
  const { data, page, maxPage, forumId, isShowActions } = props;
  return (
    <>
      {data.map((comment: ForumCommentData) => (
        <Box key={comment.id} mb={6}>
          <ForumComment
            isMobile={false}
            commentId={comment.id}
            createdBy={comment.user.nameInitial}
            createdAt={comment.createdAt}
            comment={comment.comments}
            showActions={isShowActions}
            gender={comment.user.gender}
            forumId={forumId}
          />
          {comment.doctorReplies.map((reply: ForumDoctorReplies) => (
            <Box key={reply.id} mt={6}>
              <ForumCommentReply
                isMobile={false}
                commentId={comment.id}
                createdBy={reply.doctor.name}
                createdAt={reply.createdAt}
                comment={reply.comments}
              />
            </Box>
          ))}
        </Box>
      ))}
      <Center mt="24px">
        <PaginationLink
          size="normal"
          page={page}
          maxPage={maxPage}
          navigateName="FORUM_DETAIL"
          navigateOptions={{
            scroll: true,
            shallow: true,
            alias: { name: "FORUM" },
          }}
        />
      </Center>
    </>
  );
}
