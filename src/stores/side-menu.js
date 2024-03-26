import { defineStore } from "pinia";

export const useSideMenuStore = defineStore("sideMenu", {
  state: () => ({
    menu: [
      {
        icon: "HomeIcon",
        pageName: "base-menu",
        title: "Dashboard"
      },
      {
        icon: "FolderIcon",
        pageName: "Order",
        title: "Orders"
      },
      {
        icon: "LayersIcon",
        pageName: "Product",
        title: "Products"
      },
      {
        icon: "ListIcon",
        pageName: "Category",
        title: "Categories"
      },
    ],
  }),
});
