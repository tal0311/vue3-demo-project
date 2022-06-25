import about from '../cmps/about.js'
import itemDetails from '../cmps/itemDetails.js'

const routes = [
  { path: '/about', component: about },
  { path: '/item/:_id', name: 'details', component: itemDetails },
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
export const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
})
