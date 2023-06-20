const generateIconSrc = (iconName: string) =>
  `https://cms.sehatq.com/cdn-cgi/image/f=auto,width=54,height=54,fit=pad,quality=100/public/img/revamp_icon/${iconName}?v=6`;
export const SEHATQ_MENUS = {
  ARTICLE: {
    iconSrc: generateIconSrc("feature_icon_article_active.png"),
    navigationName: "ARTICLE",
    title: "Artikel",
  },
  DISEASES: {
    iconSrc: generateIconSrc("feature_icon_disease_active.png"),
    navigationName: "DISEASES",
    title: "Penyakit",
  },
  DRUGS: {
    iconSrc: generateIconSrc("feature_icon_drug_active.png"),
    navigationName: "DRUGS",
    title: "Obat",
  },
  EXTERNAL_HOMEPAGE: {
    iconSrc: generateIconSrc("feature_icon_toko_active.png"),
    navigationName: "EXTERNAL_HOMEPAGE",
    title: "Toko",
  },
  FORUMS: {
    iconSrc: generateIconSrc("feature_icon_forum_active.png"),
    navigationName: "FORUMS",
    title: "Forum",
  },
  HEALTH_CARE_FACILITIES: {
    iconSrc: generateIconSrc("feature_icon_hcf_active.png"),
    navigationName: "HEALTH_CARE_FACILITIES",
    title: "Rumah Sakit",
  },
  HEALTH_CARE_PROFESIONALS: {
    iconSrc: generateIconSrc("feature_icon_hcp_active.png"),
    navigationName: "HEALTH_CARE_PROFESIONAL",
    title: "Dokter",
  },
  HEALTH_SERVICES: {
    iconSrc: generateIconSrc("feature_icon_booking_hcs_active.png"),
    navigationName: "HEALTH_SERVICES",
    title: "Layanan Pemeriksaan",
  },
  HEALTH_SERVICES_APPOINTMENT: {
    iconSrc: generateIconSrc("feature_icon_booking_active.png"),
    navigationName: "HEALTH_SERVICES_APPOINTMENT",
    title: "Booking",
  },
  HEALTH_TOOLS: {
    iconSrc: generateIconSrc("feature_icon_health_tools_active.png"),
    navigationName: "HEALTH_TOOLS",
    title: "Tes Kesehatan",
  },
  MEDICAL_PROCEDURES: {
    iconSrc: generateIconSrc("feature_icon_procedure_active.png"),
    navigationName: "MEDICAL_PROCEDURES",
    title: "Tindakan Medis",
  },
  PROMOS: {
    iconSrc: generateIconSrc("feature_icon_promo_active.png"),
    navigationName: "PROMOS",
    title: "Promo",
  },
  REVIEWS: {
    iconSrc: generateIconSrc("feature_icon_review_active.png"),
    navigationName: "REVIEWS",
    title: "Review",
  },
  TELEMEDICINES: {
    iconSrc: generateIconSrc("feature_icon_telemed_active.png"),
    navigationName: "TELEMEDICINES",
    title: "Chat Dokter",
  },
} as const;
