export const GOOD_MY_DOCTOR_APPOINTMENT_REVIEW_TAGS = [
  "Pelayanan cepat",
  "Dokter responsif",
  "Rumah sakit responsif",
];

export const BAD_MY_DOCTOR_APPOINTMENT_REVIEW_TAGS = [
  "Pelayanan lambat",
  "Dokter kurang responsif",
  "Rumah sakit kurang responsif",
];

export const MY_DOCTOR_APPOINTMENT_REVIEW_OPTIONS = {
  1: {
    value: 1,
    id: "veryBad",
    color: "#df1420",
    tags: BAD_MY_DOCTOR_APPOINTMENT_REVIEW_TAGS,
  },
  2: {
    value: 2,
    id: "bad",
    color: "#E84119",
    tags: BAD_MY_DOCTOR_APPOINTMENT_REVIEW_TAGS,
  },
  3: {
    value: 3,
    id: "good",
    color: "#f06f12",
    tags: BAD_MY_DOCTOR_APPOINTMENT_REVIEW_TAGS,
  },
  4: {
    value: 4,
    id: "satisfied",
    color: "#f79e06",
    tags: GOOD_MY_DOCTOR_APPOINTMENT_REVIEW_TAGS,
  },
  5: {
    value: 5,
    id: "verySatisfied",
    color: "#ffcc00",
    tags: GOOD_MY_DOCTOR_APPOINTMENT_REVIEW_TAGS,
  },
} as const;

export type MyDoctorAppointmentReviewOptionKey =
  keyof typeof MY_DOCTOR_APPOINTMENT_REVIEW_OPTIONS;

export const MY_DOCTOR_APPOINTMENT_REVIEW_STATUS = {
  "give-rating": "give-rating",
  done: "done",
  expired: "expired",
};

export type MyDoctorAppointmentReviewStatusKey =
  keyof typeof MY_DOCTOR_APPOINTMENT_REVIEW_STATUS;

export const MY_DOCTOR_APPOINTMENT_REVIEW_STEP = {
  "time-of-filled": "time-of-filled",
  "half-filled": "half-filled",
  done: "done",
  "full-filled": "full-filled",
};

export type MyDoctorAppointmentReviewStepKey =
  keyof typeof MY_DOCTOR_APPOINTMENT_REVIEW_STEP;
