import { SCHEMA_URL_MICRODATA } from "@sehatq/constants";

export interface BreadCrumbData {
  "@type": string;
  position: number;
  item: {
    "@id": string;
    name: string;
  };
}

export function generateBreadcrumbMicrodata(
  data: { id: string; name: string }[]
) {
  const items = data;
  const breadCrumbList: BreadCrumbData[] = [];
  items.forEach((item, key) => {
    breadCrumbList.push({
      "@type": "ListItem",
      position: key + 1,
      item: {
        "@id": item.id,
        name: item.name,
      },
    });
  });

  const dataBreadCrumbList = {
    "@context": SCHEMA_URL_MICRODATA,
    "@type": "BreadcrumbList",
    itemListElement: breadCrumbList,
  };

  return [dataBreadCrumbList];
}

export interface MicrodataItem {
  "@type": string;
  position: number;
  url: string;
}

export interface MicroDataItemList {
  "@context": string;
  "@type": string;
  itemListElement: MicrodataItem[];
}

export function generateDataList(dataList: string[]) {
  const items = dataList;

  const itemList: MicrodataItem[] = [];
  items.forEach((item, key) => {
    itemList.push({
      "@type": "ListItem",
      position: key + 1,
      url: item,
    });
  });

  const dataItemList: MicroDataItemList = {
    "@context": SCHEMA_URL_MICRODATA,
    "@type": "ItemList",
    itemListElement: itemList,
  };

  return [dataItemList];
}

export function generateSeoPaggination(
  currentPage: number,
  maxPage: number,
  pathUrl: string
) {
  let pagination = {
    next: "",
    prev: "",
  };

  if (currentPage && currentPage <= maxPage - 1) {
    pagination = {
      ...pagination,
      next: `${pathUrl}?page=${currentPage + 1}`,
    };
  }
  if (currentPage) {
    if (currentPage >= 3) {
      pagination = {
        ...pagination,
        prev: `${pathUrl}?page=${currentPage - 1}`,
      };
    } else if (currentPage === 2) {
      pagination = {
        ...pagination,
        prev: `${pathUrl}`,
      };
    }
  }
  return pagination;
}
