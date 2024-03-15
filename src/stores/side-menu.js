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
        icon: "ListIcon",
        pageName: "Category",
        title: "Categories"
      },
      {
        icon: "LayersIcon",
        pageName: "Product",
        title: "Products"
      },
      {
        icon: "FolderIcon",
        pageName: "Order",
        title: "Orders"
      },
    ],
  }),
});
