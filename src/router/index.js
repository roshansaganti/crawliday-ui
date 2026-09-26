import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/Home.vue";
import CalendarsView from "../views/Calendars.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/calendars",
    name: "calendars",
    component: CalendarsView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
