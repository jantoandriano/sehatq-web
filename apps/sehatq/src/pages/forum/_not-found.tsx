import React from "react";
import { GetServerSideProps } from "next";
import NotFoundPage from "../404";

export const getServerSideProps: GetServerSideProps<{
  gone: boolean;
}> = async ({ res }) => {
  res.statusCode = 410;
  return {
    props: {
      gone: true,
    },
  };
};

export default function NotFoundForumPage() {
  return <NotFoundPage />;
}
