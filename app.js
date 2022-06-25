import { appService } from './services/app.service.js'
import { router } from './router/index.js'
import appPortal from './cmps/poratlCmp.js'
import namesList from './cmps/names-list.js'
import appHeader from './cmps/app-header.js'
import appModal from './cmps/app-modal.js'
import userMsg from './cmps/user-msg.js'

const options = {
  template: `
        
        <user-msg v-if="userMsg"
        @reset-msg="setUserMsg"
        >{{userMsg}}</user-msg>

        <app-header @open-modal="ToggleModal"></app-header>
        <!-- <app-portal></app-portal> -->
        <names-List v-if="items"
          :names="items"
          @remove="onRemoveItem"
          ></names-List>

        <app-modal v-if="isModalOpen" 
        :isModalOpen="isModalOpen"
        @toggle-modal="ToggleModal($event)"
        ></app-modal>
        <!-- nested route about page -->
        <router-view></router-view>
 `,

  created() {
    console.log('created')
    this.loadItems()
    console.log()
  },

  data() {
    return {
      items: [],
      isModalOpen: false,
      userMsg: '',
      currItem: null,
      activities: [],
    }
  },
  watch: {
    items: {
      handler(newval, oldval) {
        if (newval.length < oldval.length) {
          const desc = `item removed from list`
          this.onNewActivity(desc)
        }
      },
    },
    // items(newvalue, oldvalue) {
    //   if (newvalue.length < oldvalue.length) {
    //     const desc = `item removed from list`
    //     this.onNewActivity(desc)
    //   }
    // },
    $route({ path, name, params: { _id } }) {
      if (name === 'details') {
        this.setCurrIte(_id)
        const desc = `item with id:${_id} was viewed`
        this.onNewActivity(desc)
      }
      if (path === '/') this.setCurrIte(null)
      console.log(this.currItem)
    },
  },
  methods: {
    loadItems() {
      this.items = appService.getItems()
      this.setUserMsg('items loaded')
    },
    ToggleModal(item) {
      this.isModalOpen = !this.isModalOpen
      if (item) this.onAddItem(item)
    },
    setUserMsg(val) {
      this.userMsg = val
    },
    onAddItem(item) {
      const addedItem = appService.save(item)
      this.setUserMsg('New item added')
      this.items = [...this.items, addedItem]
      const desc = `item added to list`
      this.onNewActivity(desc)
      // this.loadItems()
    },
    onRemoveItem(itemId) {
      appService.removeItem(itemId)
      this.items = this.items.filter((item) => item._id !== itemId)
      // this.loadItems()
      this.setUserMsg('Item removed')
    },
    setCurrIte(itemId) {
      this.currItem = this.items.find((item) => item._id === itemId)
    },
    onNewActivity(desc) {
      const activity = appService.createActivity(desc)
      this.activities = [...this.activities, activity]
      console.log(this.activities)
    },
  },
  updated() {
    appService.logActivities(this.activities)
  },
  unmounted() {
    // appService.logActivities(this.activities)
  },
  components: {
    appPortal,
    namesList,
    appModal,
    userMsg,
  },
}

const app = Vue.createApp(options)
app.component('app-portal', appPortal)
app.component('app-header', appHeader)
app.component('app-modal', appModal)
app.component('names-list', namesList)
app.component('user-msg', userMsg)

app.use(router)
app.mount('#app')
