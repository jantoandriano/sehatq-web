import React from "react";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { isMobileDevice } from "@sehatq/utils";
import {
  ProductDetailParams,
  ProductDetailQuery,
  getProductDetailProps,
} from "@get-props";
import { ProductDetail } from "@components/pages/product";

export const getServerSideProps = async ({
  params,
  req,
}: GetServerSidePropsContext<ProductDetailParams, ProductDetailQuery>) => {
  const { slug = "" } = params ?? {};
  const isMobile = isMobileDevice(req.headers["user-agent"]);
  return { props: await getProductDetailProps({ slug, isMobile }) };
};

export default function ProductDetailPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { isMobile } = props;
  return (
    <>
      <h1>SSR Page</h1>
      <ProductDetail isMobile={isMobile} />
    </>
  );
}
