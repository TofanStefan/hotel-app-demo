import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AvailableRooms from '../views/AvailableRooms.vue'
import DashBoard from '../views/DashBoard.vue'
import Profile from '../views/Profile.vue'
import Rooms from '../views/Rooms.vue'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/available-rooms',
    component: AvailableRooms
  },
  {
    path: '/dash-board',
    component: DashBoard,
    children: [{
      name: 'profile',
      component: Profile,
      path: 'profile'

    },
    {
      name: 'rooms',
      component: Rooms,
      path: 'rooms'
    }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active', // active class for non-exact links.
  linkExactActiveClass: 'active'
})

export default router
