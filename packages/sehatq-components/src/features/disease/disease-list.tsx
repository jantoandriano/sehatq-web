import React, { useState, useEffect, useRef } from "react";
import { AdSlot } from "../google-publisher-tag";
import { useGetDiseaseList } from "./disease-list-queries";
import {
  DiseaseListDesktop,
  DiseaseListSkeletonDesktop,
} from "./disease-list-desktop";
import {
  DiseaseListMobile,
  DiseaseListSkeletonMobile,
} from "./disease-list-mobile";

import { useGetDiseaseCategories } from "./disease-category-filter-queries";

export type DiseaseListProps = {
  isMobile: boolean;
  slug: string;
  categorySlug: string;
  alphabetSlug: string;
  adsTop?: ReturnType<typeof AdSlot>;
  adsMiddle?: ReturnType<typeof AdSlot>;
  adsBottom?: ReturnType<typeof AdSlot>;
};

export type DiseaseListSkeletonProps = {
  isMobile: boolean;
};

export function DiseaseList(props: DiseaseListProps) {
  const { isMobile, categorySlug, alphabetSlug, adsTop, adsMiddle, adsBottom } =
    props;
  const refInput = useRef<HTMLInputElement | null>(null);
  const [search, setSearch] = useState("");
  const { data: categoryList } = useGetDiseaseCategories({
    slug: categorySlug,
  });
  const { data: diseases, isLoading } = useGetDiseaseList({
    categoryId: categoryList?.data[0]?.id
      ? categoryList?.data[0]?.id.toString()
      : "",
    firstChar: alphabetSlug,
    tagSlug: "",
    random: "",
    perPage: "",
    page: "",
  });

  useEffect(() => {
    if (refInput.current) {
      refInput.current.value = "";
    }
    setSearch("");
  }, [diseases?.data.data]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      search: { value: string };
    };
    setSearch(formElements.search.value);
  }

  if (isLoading) {
    if (isMobile) return <DiseaseListSkeleton isMobile />;
    return <DiseaseListSkeleton isMobile={false} />;
  }

  const newProps = {
    isLoading,
    diseaseCategorySlug: categorySlug,
    alphabetSlug: alphabetSlug,
    diseases:
      diseases?.data.data.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      ) ?? [],
    featured: diseases?.data.meta?.featured ?? [],
    h1: diseases?.data.meta.h1 ?? "",
    onSubmit,
    search,
    adsTop,
    adsMiddle,
    adsBottom,
    refInput,
  };

  if (isMobile) {
    return <DiseaseListMobile {...newProps} />;
  }
  return <DiseaseListDesktop {...newProps} />;
}

export function DiseaseListSkeleton(props: DiseaseListSkeletonProps) {
  const { isMobile } = props;
  if (isMobile) {
    return <DiseaseListSkeletonMobile />;
  }
  return <DiseaseListSkeletonDesktop />;
}
