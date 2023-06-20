import React from "react";
import { GetStaticPaths, GetStaticPropsContext } from "next";
import { ProductDetailParams, getProductDetailProps } from "@get-props";
import { ProductDetail } from "@components/pages/product";

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: "blocking" };
};

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<ProductDetailParams>) => {
  const { slug = "" } = params ?? {};

  return { props: await getProductDetailProps({ slug, isMobile: true }) };
};

export default function ProductDetailMobilePage() {
  return <ProductDetail isMobile />;
}
