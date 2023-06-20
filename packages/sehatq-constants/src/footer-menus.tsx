export const MENU_FEATURES = [
  { id: 0, label: "Toko", navigationName: "EXTERNAL_HOMEPAGE" },
  { id: 1, label: "Produk Toko", navigationName: "EXTERNAL_PRODUCTS" },
  { id: 2, label: "Kategori Toko", navigationName: "EXTERNAL_CATEGORIES" },
  { id: 3, label: "Toko Merchant", navigationName: "EXTERNAL_MERCHANT" },
  { id: 4, label: "Booking", navigationName: "HEALTH_SERVICES_APPOINTMENT" },
  { id: 5, label: "Promo", navigationName: "PROMOS" },
  { id: 6, label: "Artikel", navigationName: "ARTICLE" },
  { id: 7, label: "Chat Dokter", navigationName: "TELEMEDICINES" },
  { id: 8, label: "Penyakit", navigationName: "DISEASES" },
  { id: 9, label: "Forum", navigationName: "FORUMS" },
  { id: 10, label: "Review", navigationName: "REVIEWS" },
  { id: 11, label: "Tes Kesehatan", navigationName: "HEALTH_TOOLS" },
] as const;

export const MENU_COMPANIES = [
  { id: 12, label: "Tentang Kami", navigationName: "ABOUT_US" },
  { id: 13, label: "Karir", navigationName: "CAREERS" },
  { id: 14, label: "Kontak Kami", navigationName: "CONTACT" },
] as const;

export const MENU_SOCIAL_MEDIA = [
  {
    iconUrl: {
      desktop: "/images/footer/social_fb_grey.svg",
      mobile: "/images/footer/social_fb.svg",
    },
    id: 15,
    label: "Facebook",
    navigationName: "EXTERNAL_SEHATQ_FACEBOOK",
  },
  {
    iconUrl: {
      desktop: "/images/footer/social_twitter_grey.svg",
      mobile: "/images/footer/social_twitter.svg",
    },
    id: 16,
    label: "Twitter",
    navigationName: "EXTERNAL_SEHATQ_TWITTER",
  },
  {
    iconUrl: {
      desktop: "/images/footer/social_ig_grey.svg",
      mobile: "/images/footer/social_ig.svg",
    },
    id: 17,
    label: "Instagram",
    navigationName: "EXTERNAL_SEHATQ_INSTAGRAM",
  },
  {
    iconUrl: {
      desktop: "/images/footer/social_youtube_grey.svg",
      mobile: "/images/footer/social_youtube.svg",
    },
    id: 18,
    label: "Youtube",
    navigationName: "EXTERNAL_SEHATQ_YOUTUBE",
  },
  {
    iconUrl: {
      desktop: "/images/footer/social_linkedin_grey.svg",
      mobile: "/images/footer/social_linkedin.svg",
    },
    id: 19,
    label: "Linkedin",
    navigationName: "EXTERNAL_SEHATQ_LINKEDIN",
  },
] as const;

export const MENU_SUPPORTS = [
  { id: 20, label: "Syarat dan Ketentuan", navigationName: "TNC" },
  { id: 21, label: "Privacy Policy", navigationName: "PRIVACY" },
  { id: 22, label: "Kebijakan Editorial", navigationName: "EDITORIAL" },
  { id: 23, label: "Direktori Tag", navigationName: "TAGS" },
  { id: 24, label: "Pusat Bantuan", navigationName: "EXTERNAL_HELP" },
] as const;

export const MENU_PARTNERS = [
  { id: 25, label: "Merchant", navigationName: "EXTERNAL_MERCHANT_REGISTER" },
  { id: 26, label: "Mitra Faskes", navigationName: "PARTNER_HCF" },
  {
    id: 27,
    label: "SehatQ for Corporates",
    navigationName: "PARTNER_CORPORATE",
  },
] as const;

export const MENU_COLLECTIONS = [
  { id: 0, label: "Artikel", slug: "artikel" },
  { id: 1, label: "Forum", slug: "forum" },
  { id: 2, label: "Obat", slug: "obat" },
  { id: 3, label: "Penyakit", slug: "penyakit" },
  { id: 4, label: "Review", slug: "review" },
] as const;
