import { ENV } from "./env";

export const SCHEMA_URL_MICRODATA = "https://schema.org";
export const SEO_DESC_DEFAULT =
  "Cek risiko COVID-19. Tanya dokter online. Cari RS rujukan. Buat janji periksa dokter dan rumah sakit terdekat dengan harga promo khusus di SehatQ.";

export const SEO = {
  SEHATQ: {
    microdataGlobal: {
      "@context": "https://schema.org",
      "@type": "Organization",
      logo: `https://www.sehatq.com/public/assets/img/logo.png`,
      name: "SehatQ – Asisten Kesehatan Keluarga Anda",
      sameAs: [
        "https://www.facebook.com/SehatQIndonesia/",
        "https://twitter.com/sehatq",
        "https://www.instagram.com/sehatq_id/",
        "https://www.linkedin.com/company/sehatq/",
      ],
      url: `${ENV.SEHATQ_DOMAIN}`,
    },
    SEO_DEFAULT: {
      author: "",
      canonicalUrl: ENV.SEHATQ_DOMAIN,
      desc: SEO_DESC_DEFAULT,
      keywords:
        "tanya dokter online, dokter online tanya jawab, cek kesehatan, solusi kesehatan, jadwal praktek dokter, rumah sakit terdekat, praktek dokter terdekat, kesehatan keluarga, jaga kesehatan, aplikasi kesehatan",
      modifiedTime: "",
      next: "",
      ogDesc: SEO_DESC_DEFAULT,
      ogImage:
        "https://sehatqcontent.s3.amazonaws.com/content/og-image-promo.jpg",
      ogImageAlt: "SehatQ sebagai asisten kesehatan keluarga Anda",
      ogImageHeight: "628",
      ogImageType: "jpg",
      ogImageUrl:
        "https://sehatqcontent.s3.amazonaws.com/content/og-image-promo.jpg",
      ogImageWidth: "1200",
      ogLocale: "Id_ID",
      ogSiteName: "SehatQ",
      ogTitle: "SehatQ | Asisten Kesehatan Keluarga Anda",
      ogTwitterCard: "Summary",
      ogTwitterDesc: SEO_DESC_DEFAULT,
      ogTwitterSite: "@sehatq",
      ogTwitterTitle: "SehatQ | Portal Informasi Terbaru Seputar Coronavirus",
      ogType: "Website",
      ogUrl: ENV.SEHATQ_DOMAIN,
      prev: "",
      publishedTime: "",
      reviewer: "",
      robotFollow: true,
      robotIndex: true,
      title: "SehatQ | Portal Informasi Terbaru Seputar Coronavirus",
    },
  },
};
