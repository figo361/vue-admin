import { $t } from "@/plugins/i18n";
import { error } from "@/router/enums";

export default {
  path: "/error",
  redirect: "/error/403",
  meta: {
    icon: "informationLine",
    // showLink: false,
    title: $t("menus.hsabnormal"),
    rank: error,
    showLink: false
  },
  children: [
    {
      path: "/error/403",
      name: "403",
      component: () => import("@/views/error/403.vue"),
      meta: {
        title: $t("menus.hsfourZeroOne"),
        showLink: false
      }
    },
    {
      path: "/error/404",
      name: "404",
      component: () => import("@/views/error/404.vue"),
      meta: {
        title: $t("menus.hsfourZeroFour"),
        showLink: false
      }
    },
    {
      path: "/error/500",
      name: "500",
      component: () => import("@/views/error/500.vue"),
      meta: {
        title: $t("menus.hsFive"),
        showLink: false
      }
    }
  ]
} as RouteConfigsTable;
