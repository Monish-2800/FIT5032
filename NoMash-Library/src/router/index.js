import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import FirebaseSignInView from '@/views/FirebaseSignInView.vue'
import FirebaseRegisterView from '@/views/FirebaseRegisterView.vue'
import AdminDashboard from '@/views/AdminDashboard.vue'
import LibrarianDashboard from '@/views/LibrarianDashboard.vue'
import UserDashboard from '@/views/UserDashboard.vue'
import AddBookView from '@/views/AddBookView.vue'
import GetBookCountView from '@/views/GetBookCountView.vue'
import WeatherView from '@/views/WeatherView.vue'
import CountBookAPI from '@/views/CountBookAPI.vue'
import BookAPI from '@/views/GetAllBookAPI.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView
  },
  {
    path: '/FireLogin',
    name: 'FireLogin',
    component: FirebaseSignInView
  },
  {
    path: '/FireRegister',
    name: 'FireRegister',
    component: FirebaseRegisterView
  },
  { path: '/admin-dashboard', component: AdminDashboard },
  { path: '/librarian-dashboard', component: LibrarianDashboard },
  { path: '/user-dashboard', component: UserDashboard },
  {
    path: '/addbook',
    name: 'AddBook',
    component: AddBookView
  },
  {
    path: '/GetBookCount',
    name: 'GetBookCount',
    component: GetBookCountView
  },
  {
    path: '/WeatherCheck',
    name: 'WeatherCheck',
    component: WeatherView
  },
  {
    path: '/CountAPI',
    name: 'CountAPI',
    component: CountBookAPI
  },
  {
    path: '/BookAPI',
    name: 'BookAPI',
    component: BookAPI
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
