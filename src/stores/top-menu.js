import { defineStore } from "pinia";

export const useTopMenuStore = defineStore("topMenu", {
  state: () => ({
    menu: [
      {
        icon: "UserIcon",
        pageName: "customer",
        title: "Home",
      }
    ]
  }),
});
