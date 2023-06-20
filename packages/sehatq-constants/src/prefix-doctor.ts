export const PREFIX_DOCTOR = {
  FIRST: ["dr-", "dra-", "drg-", "prof-"],
  LAST: [
    "-spsi",
    "-mpsi",
    "-msi",
    "-amf",
    "-sft",
    "-sstft",
    "-ftr",
    "-sgz",
    "-psi",
    "-ch",
    "-psikolog",
    "-ba",
    "-cga",
    "-bfrp",
    "-msc",
    "-cht",
    "-mpd",
    "-se",
    "-amdgz",
    "-mm",
    "-amdkeb",
    "-amdft",
  ],
};

export const PREFIX_FILTER_DOCTOR = {
  city: {
    key: "city",
    prefix: "c-",
    slugPosition: 2,
  },
  district: {
    key: "district",
    prefix: "d-",
    slugPosition: 3,
  },
  procedure: {
    key: "procedure",
    prefix: "lp-",
    slugPosition: 4,
  },
  speciality: {
    key: "speciality",
    prefix: "",
    slugPosition: 1,
  },
};
