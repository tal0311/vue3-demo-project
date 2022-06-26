import about from '../cmps/about.js'
import itemDetails from '../cmps/itemDetails.js'

const routes = [
  { path: '/about', component: about },
  { path: '/item/:_id', name: 'details', component: itemDetails },
]


export const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
})
