export function getRatingMessage(rating: "1" | "2" | "3" | "4" | "5") {
  switch (rating) {
    case "1":
      return "Sangat Tidak Bermanfaat";
    case "2":
      return "Tidak Bermanfaat";
    case "3":
      return "Biasa Saja";
    case "4":
      return "Bermanfaat";
    case "5":
      return "Sangat Bermanfaat";
    default:
      return "";
  }
}
