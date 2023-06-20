import Router from "next/router";

export async function initTopbar() {
  // eslint-disable-next-line global-require
  const topbar = await require("topbar");

  Router.events.on("routeChangeStart", () => {
    topbar.config({
      barThickness: 5,
      barColors: {
        0: "#70cbcf",
        1: "#f39e1e",
      },
      shadowBlur: 5,
      shadowColor: "rgba(0, 0, 0, .5)",
      className: "topbar",
    });
    topbar.show();
  });
  Router.events.on("routeChangeComplete", () => topbar.hide());
  Router.events.on("routeChangeError", () => topbar.hide());
}
