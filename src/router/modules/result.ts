import { $t } from "@/plugins/i18n";
import { result } from "@/router/enums";

export default {
  path: "/result",
  redirect: "/result/success",
  meta: {
    icon: "checkboxCircleLine",
    title: $t("menus.hsResult"),
    rank: result
  },
  children: [
    {
      path: "/result/success",
      name: "Success",
      component: () => import("@/views/result/success.vue"),
      meta: {
        title: $t("menus.hsSuccess"),
        showLink: false
      }
    },
    {
      path: "/result/fail",
      name: "Fail",
      component: () => import("@/views/result/fail.vue"),
      meta: {
        title: $t("menus.hsFail"),
        showLink: false
      }
    }
  ]
} as RouteConfigsTable;
