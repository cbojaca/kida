import Vue from "vue";
import Router from "vue-router";
import AppLayout from "../components/admin/AppLayout";
import AuthLayout from "../components/auth/AuthLayout";
import firebase from "firebase";
import { Role } from "../_helpers/role";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "*",
      redirect: { name: "login" }
    },
    {
      path: "/auth",
      component: AuthLayout,
      children: [
        {
          name: "login",
          path: "login",
          component: () =>
            import(/* webpackChunkName: "group-foo" */ "../components/auth/login/Login.vue")
        },
        {
          name: "signup",
          path: "signup"
          //component: lazyLoading('auth/signup/Signup'),
        },
        {
          path: "",
          redirect: { name: "login" }
        }
      ]
    },
    {
      name: "Admin",
      path: "/admin",
      component: AppLayout,
      meta: {
        authorize: [Role.Admin, Role.Parent, Role.Teacher],
        requiresAuth: true
      },
      children: [
        {
          name: "dashboard",
          path: "dashboard",
          meta: {
            authorize: [Role.Admin, Role.Parent, Role.Teacher],
            requiresAuth: true
          },
          component: () =>
            import(/* webpackChunkName: "group-foo" */ "../components/admin/dashboard/Dashboard.vue"),
          default: true
        },
        {
          name: "users",
          path: "users",
          meta: {
            authorize: [Role.Admin, Role.Parent, Role.Teacher],
            requiresAuth: true
          },
          component: () =>
            import(/* webpackChunkName: "group-foo" */ "../components/admin/users/Users.vue")
        },
        {
          name: "userprofile",
          path: "userprofile",
          meta: {
            authorize: [Role.Admin, Role.Parent, Role.Teacher],
            requiresAuth: true
          },
          component: () =>
            import(/* webpackChunkName: "group-foo" */ "../components/admin/userprofile/UserProfile.vue")
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  const currentUser = firebase.auth().currentUser;

  if (requiresAuth && !currentUser) {
    next("/login");
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next();
  }
});

export default router;
