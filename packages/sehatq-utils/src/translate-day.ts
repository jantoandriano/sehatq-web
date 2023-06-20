/* Translate days of the week from English to Indonesia
 * @param {String} day day in English
 * @returns {String} day in Indonesia
 */
export function translateDay(
  day:
    | "sunday"
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
) {
  const TRANSLATION = {
    sunday: "Minggu",
    monday: "Senin",
    tuesday: "Selasa",
    wednesday: "Rabu",
    thursday: "Kamis",
    friday: "Jumat",
    saturday: "Sabtu",
  };

  return TRANSLATION[day] || "";
}
