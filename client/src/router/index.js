import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AvailableRooms from '../views/AvailableRooms.vue'
import DashBoard from '../views/DashBoard.vue'
import Profile from '../views/Profile.vue'
import Rooms from '../views/Rooms.vue'
import Accounts from '../views/Accounts.vue'
import Reservations from '../views/Reservations.vue'
import myReservations from '../views/MyReservations'

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
    },
    {
      name: 'accounts',
      component: Accounts,
      path: 'accounts'
    },
    {
      name: 'reservations',
      component: Reservations,
      path: 'reservations'
    },
    {
      name: 'my-reservations',
      component: myReservations,
      path: 'my-reservations'
    },
    {
      name: 'available-rooms',
      component: AvailableRooms,
      path: 'available-rooms'
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
