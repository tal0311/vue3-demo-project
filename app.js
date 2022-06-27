import { appService } from './services/app.service.js'
import { router } from './router/index.js'
import namesList from './cmps/names-list.js'
import appHeader from './cmps/app-header.js'
import appModal from './cmps/app-modal.js'
import userMsg from './cmps/user-msg.js'
import activities from './cmps/activities.js'

const options = {
  template: `
        <!-- user msg cmp -->
        <user-msg ref="tst" v-if="userMsg"
        @reset-msg="setUserMsg"
        >{{userMsg}}</user-msg>
        <!-- app header -->
        <app-header @open-modal="ToggleModal"
        @open-activities="toggleActivities"
        ></app-header>
        <!-- items-list -->
        <names-List v-if="items"
          :names="items"
          @remove="onRemoveItem"
        ></names-List>
        <!-- modal -->
        <app-modal v-if="isModalOpen" 
        :isModalOpen="isModalOpen"
        @toggle-modal="ToggleModal($event)"
        ></app-modal>
        <!-- nested route about page -->
        <router-view @update="updateItem"></router-view>
        <!--teleport cmp-->
        <activities :activities="activities" 
        v-if="isTeleportOpen"></activities>
 `,

  created() {
    this.loadItems()
  },
  mounted() {
    console.log(this.$refs.tst)
  },
  data() {
    return {
      items: [],
      isModalOpen: false,
      userMsg: '',
      currItem: null,
      activities: [],
      isTeleportOpen: false,
    }
  },
  watch: {
    items: {
      handler(newval, oldval) {
        if (newval.length < oldval.length) {
          console.log(this.items)
          const desc = `item removed from list`
          this.onNewActivity(desc)
        }
      },
    },
    $route({ path, name, params: { _id } }) {
      if (name === 'details') {
        this.setCurrIte(_id)
        const desc = `item with id: ${_id} was viewed`
        this.onNewActivity(desc)
      }
      if (path === '/') this.setCurrIte(null)
    },
  },
  methods: {
    loadItems() {
      this.items = appService.query()
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
      this.items.push(addedItem)
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
    toggleActivities() {
      this.isTeleportOpen = !this.isTeleportOpen
    },
    updateItem(type, value) {
      switch (type) {
        case 'title':
          this.setItemName(value)
          break
        case 'cellNum':
          this.setItemCellNum(value)
          break
        case 'email':
          this.setItemEmail(value)
          break

        default:
          break
      }
    },
    setItemName(value) {
      this.currItem.name = value
      appService.save(this.currItem)
    },
    setItemCellNum(value) {
      this.currItem.cellNum = value
      console.log(this.currItem)
      appService.save(this.currItem)
    },
    setItemEmail(value) {
      this.currItem.email = value
      console.log(this.currItem)
      appService.save(this.currItem)
    },
  },
  updated() {
    appService.logActivities(this.activities)
  },
  unmounted() {
    // appService.logActivities(this.activities)
  },
  components: {
    namesList,
    appModal,
    userMsg,
    activities,
  },
}

const app = Vue.createApp(options)

app.component('app-header', appHeader)
app.component('app-modal', appModal)
app.component('names-list', namesList)
app.component('user-msg', userMsg)
app.component('activities', activities)

app.use(router)
app.mount('#app')
