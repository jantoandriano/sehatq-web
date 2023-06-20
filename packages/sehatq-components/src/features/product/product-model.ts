import { generatePriceDisplay, ConstToUnion, priceFormat } from "@sehatq/utils";
import { PRODUCT_TYPES } from "./product-constants";

export type ProductType = ConstToUnion<typeof PRODUCT_TYPES>;

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface ProductResponse {
  data: {
    images?: {
      alt: string;
      mediumUrl: string;
      smallUrl: string;
      largeUrl: string;
      imageType: string;
      imageDimension: [number, number];
    }[];
    description: {
      title: string;
      content: string | number | null;
    }[];
    id: number;
    slug: string;
    name: string;
    brand: string;
    shortDescription: string;
    category: Category;
    priceTo: number;
    priceFrom: number;
    discountMax: number;
    rating: number;
    ratingTotal: number;
    breadcrumbs?: {
      categories: Category[];
    }[];
    metaTitle: string;
    author: string;
    authorLink: string;
    metaDescription: string;
    receiptRequired: boolean;
    keywords: string;
    productType: ProductType;
    termAndCondition: string;
    createdAt: string;
    updatedAt: string;
    golongan: string;
    attribute: string;
    mainIngredients: string;
    therapyClass: string;
    drugClassification: string;
    kemasan: string;
    produsen: string;
    newLayout: Record<string, string>;
    reference: string;
    drugClassName: string;
    telemedReceiptRequired: boolean;
    titleContent: string;
    content: string;
    productAvailability: boolean;
  };
}

export function modelProduct(data: ProductResponse["data"]) {
  const {
    images,
    description,
    id,
    slug,
    name,
    brand,
    shortDescription,
    category,
    priceTo,
    priceFrom,
    discountMax,
    rating,
    ratingTotal,
    breadcrumbs,
    metaTitle,
    author,
    authorLink,
    metaDescription,
    receiptRequired,
    keywords,
    productType,
    termAndCondition,
    createdAt,
    updatedAt,
    golongan,
    attribute,
    mainIngredients,
    therapyClass,
    drugClassification,
    kemasan,
    produsen,
    newLayout,
    reference,
    drugClassName,
    telemedReceiptRequired = false,
    titleContent,
    content,
    productAvailability,
  } = data;

  const imagesNormal = images?.map((image) => ({
    alt: image.alt,
    src: image.mediumUrl,
  }));
  const imagesSmall = images?.map((image) => ({
    alt: image.alt,
    src: image.smallUrl,
  }));
  const imagesLarge = images?.map((image) => ({
    alt: image.alt,
    src: image.largeUrl,
  }));

  const tempBreadcrumb = breadcrumbs?.filter(
    (breadcrumb) => breadcrumb.categories[0].name !== "Promo"
  );

  const image = images?.[0] ?? {
    smallUrl: "",
    alt: "no image",
    imageType: "jpg",
    imageDimension: [72, 72],
  };

  const meta = {
    title: metaTitle,
    description: metaDescription,
    author,
    articleAuthor: authorLink,
    keywords,
    imageUrl: image?.smallUrl,
    imageAlt: image?.alt,
    imageType: image?.imageType,
    imageWidth: image?.imageDimension?.[0],
    imageHeight: image?.imageDimension?.[1],
    createdAt,
    updatedAt,
  };

  const productDesc =
    description?.length > 0
      ? description.filter((item) => {
          return !(
            item.content === undefined ||
            item.content === "." ||
            item.content === "," ||
            item.content === "-" ||
            item.content === "" ||
            item.content === null ||
            item.content === 0 ||
            item.content === " " ||
            item.content === "Tidak" ||
            item.content === "<p></p>" ||
            item.content === "<p> </p>" ||
            item.content === "<p>-</p>"
          );
        })
      : [];

  let originalPriceDisplay = null;
  let sellingPriceDisplay = null;
  if (
    discountMax > 0 &&
    Math.abs((priceTo * (100 - discountMax)) / 100 - priceFrom) < 1
  ) {
    originalPriceDisplay = generatePriceDisplay(priceTo);
    sellingPriceDisplay = generatePriceDisplay(priceFrom);
  } else if (priceFrom === priceTo) {
    sellingPriceDisplay = generatePriceDisplay(priceTo);
  } else {
    sellingPriceDisplay = `${generatePriceDisplay(priceFrom)}`;
  }
  const contentnewLayout = newLayout;
  return {
    meta,
    productImages: {
      normalSize: imagesNormal,
      smallSize: imagesSmall,
      largeSize: imagesLarge,
    },
    productInfo: {
      id,
      slug,
      name,
      brand,
      desc: shortDescription,
      categoryName: category.name,
      originalPriceDisplay,
      originalPrice: priceTo,
      sellingPrice: priceFrom,
      sellingPriceDisplay,
      discountDisplay: discountMax ? `${discountMax}%` : "",
      rating,
      ratingTotal,
      receiptRequired,
      metaTitle,
      metaDescription,
      termAndCondition,
      lowPrice: priceFrom,
      priceTo,
      more: {
        section: [],
        description: productDesc,
        ...contentnewLayout,
      },
      reference,
      drugClassName,
      telemedReceiptRequired,
    },
    productDesc,
    productBreadcrumb: tempBreadcrumb,
    productCategory: {
      id: category.id,
      name: category.name,
      slug: category.slug,
    },
    productType,
    golongan,
    attribute,
    mainIngredients,
    therapyClass,
    drugClassification,
    kemasan,
    produsen,
    titleContent,
    content,
    productAvailability,
  };
}

type Categories = {
  child: [];
  display: boolean;
  icon: string;
  id: number;
  name: string;
  slug: string;
};

export interface ProductsResponse {
  meta: {
    filters: {
      data: {
        categorySorting: string;
        child: [];
        counts: number;
        iconUrl: string;
        id: number;
        name: string;
        slug: string;
      };
      id: string;
      name: string;
    }[];
    message: string;
    pagination: {
      maxPage: number;
      next: string;
      page: number;
      perPage: number;
      prev: string;
      total: number;
    };
    seo: {
      content: string;
      description: string;
      headline: string;
      keywords: string;
      metaDescription: string;
      metaTitle: string;
      title: string;
    };
    sortBy: { default: boolean; id: number; name: string }[];
  };
  data: {
    brand: string;
    brandSlug: string;
    categories: Categories[];
    discount: string | null;
    discountMax: number;
    id: number;
    merchantCounter: number;
    merchantId: string | null;
    merchantOriginalPrice: string | null;
    merchantPrice: string | null;
    name: string;
    prescriptionDrug: boolean;
    priceFrom: number;
    priceTo: number;
    priceType: string;
    productAvailability: boolean;
    productType: string;
    rating: number;
    ratingTotal: number;
    receiptRequired: boolean;
    slug: string;
    tags: { id: number; name: string; slug: string }[];
    telemedReceiptRequired: boolean;
    thumbUrl: string;
    thumbUrlOriginal: string;
  }[];
}

export function modelProducts(data: ProductsResponse["data"]) {
  return data;
}

/**
 * Related Products
 */
export interface RelatedProductsResponse {
  meta: {
    pagination: { page: number; perPage: number; total: number };
  };
  data: {
    id: number;
    name: string;
    thumbUrl: string;
    slug: string;
    rating: number;
    ratingTotal: number;
    priceFrom: number;
    priceTo: number;
    discountMax: number;
    discount: number;
  }[];
}

export function modelRelatedProducts(data: RelatedProductsResponse["data"]) {
  return data.map((modelRelatedProduct) => {
    return {
      id: modelRelatedProduct.id,
      name: modelRelatedProduct.name,
      imageUrl: modelRelatedProduct.thumbUrl,
      slug: modelRelatedProduct.slug,
      rating: modelRelatedProduct.rating,
      ratingTotal: modelRelatedProduct.ratingTotal,
      priceFrom: modelRelatedProduct.priceFrom
        ? `${priceFormat(modelRelatedProduct.priceFrom)}`
        : "",
      priceTo: modelRelatedProduct.priceTo
        ? `${priceFormat(modelRelatedProduct.priceTo)}`
        : "",
      discountMax: modelRelatedProduct.discountMax
        ? `${modelRelatedProduct.discountMax}%`
        : "",
      discount: modelRelatedProduct.discount
        ? `${modelRelatedProduct.discount}%`
        : "",
    };
  });
}
