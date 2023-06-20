export function mappingSpecialityName(specialityName: string) {
  return specialityName
    ? specialityName === "Umum"
      ? `Dokter ${specialityName}`
      : specialityName === "Psikolog"
      ? specialityName
      : `Dokter Spesialis ${specialityName}`
    : "";
}
export function mappingSpeciality(specialityName: string) {
  return specialityName
    ? specialityName === "Umum" || specialityName === "Psikolog"
      ? specialityName
      : `Spesialis ${specialityName}`
    : "";
}
