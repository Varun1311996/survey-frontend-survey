import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
// lazy-loaded
const Profile = () => import("./components/Profile.vue")
const BoardAdmin = () => import("./components/BoardAdmin.vue")
const BoardModerator = () => import("./components/BoardModerator.vue")
const BoardUser = () => import("./components/BoardUser.vue")

const Survey = () => import("./components/Survey/CreateSurvey.vue")
const SurveyList = () => import("./components/Survey/SurveyList.vue")
const Mail = () => import("./components/Survey/email.vue")
const ViewSurvey = () => import("./components/Survey/ViewSurvey.vue")
const EditSurvey = () => import("./components/Survey/EditSurvey.vue")
const SubmitMsg = () => import("./components/Survey/SubmitMsg.vue")


const Users = () => import("./components/User/allusers.vue");
const NewUser = () => import("./components/User/add.vue")
// const Users = () => import("./components/User/allUsers.vue")

const SurveyResults = () => import("./components/Results/List.vue")

const routes = [
  {
    path: "/survey",
    name: "survey",
    component: SurveyList,
  },
  {
    path: "/new-survey",
    name: "newsurvey",
    component: Survey,
  },
  {
    path: "/share-survey/:id",
    name: "sharesurvey",
    component: Mail,
  },
  {
    path: "/view/:id",
    name: "viewsurvey",
    component: ViewSurvey,
    props: true
},
{
  path: "/survey/:id/edit",
  name: "editsurvey",
  component: EditSurvey,
  props: true
},

  {
    path: '/',
    redirect: '/login'
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/profile",
    name: "profile",
    // lazy-loaded
    component: Profile,
  },
  {
    path: "/admin",
    name: "admin",
    // lazy-loaded
    component: BoardAdmin,
  },
  {
    path: "/mod",
    name: "moderator",
    // lazy-loaded
    component: BoardModerator,
  },
  {
    path: "/user",
    name: "user",
    // lazy-loaded
    component: BoardUser,
  },
  {
    path: "/users/all",
    name: "all-users",
    // lazy-loaded
    component: Users,
  },
  {
    path: "/user/new",
    name: "new-user",
    component: NewUser,
  },
  {
    path: "/survey/submit",
    name: "submit-survey",
    component: SubmitMsg,
    props: true
  },
  {
    path: '/survey/:id/results', 
    name: 'survey-results', 
    component: SurveyResults,
    props: true
 }
  
];

const router = createRouter({
  base: process.env.NODE_ENV === 'development' ? '/' : '/survey-frontend/',
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/home'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;