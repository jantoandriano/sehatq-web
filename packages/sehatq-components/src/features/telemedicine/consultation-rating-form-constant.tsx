export const GOOD_CONSULTATION_RATING_TAGS = [
  "Jawaban dokter membantu",
  "Respon Cepat",
];

export const BAD_CONSULTATION_RATING_TAGS = [
  "Koneksi tidak stabil",
  "Respon lambat",
  "Jawaban tidak memuaskan",
];

export const MIDDLE_CONSULTATION_RATING_TAGS = [
  "Respon Cepat",
  "Jawaban dokter membantu",
  "Respon lambat",
  "Jawaban dokter tidak memuaskan",
  "Koneksi tidak stabil",
];

export const CONSULTATION_RATING_TAGS_OPTIONS = {
  "1": {
    value: 1,
    tags: BAD_CONSULTATION_RATING_TAGS,
  },
  "2": {
    value: 2,
    tags: MIDDLE_CONSULTATION_RATING_TAGS,
  },
  "3": {
    value: 3,
    tags: MIDDLE_CONSULTATION_RATING_TAGS,
  },
  "4": {
    value: 4,
    tags: MIDDLE_CONSULTATION_RATING_TAGS,
  },
  "5": {
    value: 5,
    tags: GOOD_CONSULTATION_RATING_TAGS,
  },
};

export type ConsultationRatingTagsOptionKey =
  keyof typeof CONSULTATION_RATING_TAGS_OPTIONS;
