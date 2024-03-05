import { defineStore } from "pinia";

export const useSideMenuStore = defineStore("sideMenu", {
  state: () => ({
    menu: [
      {
        icon: "HomeIcon",
        pageName: "base-menu",
        title: "Dashboard",
        subMenu: [
          {
            icon: "ListIcon",
            pageName: "base-menu",
            title: "Dashboard"
          },
        ],
      },
    ],
  }),
});
