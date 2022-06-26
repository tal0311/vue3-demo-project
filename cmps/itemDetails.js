import { appService } from '../services/app.service.js'
import waCmp from './dynamic/waCmp.js'
import mailCmp from './dynamic/mailCmp.js'
import fallBackCmp from './dynamic/fall-BackCmp.js'

export default {
  name: 'item-details',
  props: [],
  template: `
        
        <section v-if="item" className="item-details flex">
          <div className="info-container">
            <h1 contenteditable="true"
            @blur="onUpdateItem"
            >
              {{item.name || 'Add name'}}</h1>
            <h3 class="cell-num" contenteditable="true"
              @blur="onUpdateItem"
            >
              {{item.cellNum|| 'Add cell number'}}</h3>

            <h3 class="email" contenteditable="true"
            @blur="onUpdateItem"
            >
              {{item.email || 'Add email address'}}</h3>
            <section className="connect-action flex space-around">
              <button class="connect wa-icon" 
              @click="onChangeConnectMethod('waCmp')">whatsapp</button>
              <button class="connect mail-icon"
               @click="onChangeConnectMethod('mailCmp')">Email</button>
            </section>
            <div className="connect-options">
             <Transition name="slide-up">
              <component :is="currentCmp"></component>
             </Transition>
            </div>
          </div>
          <div className="actions-container flex space-around">
            <button>Edit</button>
            <button>Remove</button>
            <button @click="onBack">back</button>
          </div>
        </section>
        <section v-else>
         <h1>loading item</h1>
        </section>
        `,
  components: {
    waCmp,
    mailCmp,
    fallBackCmp,
  },

  created() {
    this.getCurrItem()
  },
  data() {
    return {
      item: null,
      currentCmp: 'fallBackCmp',
    }
  },
  methods: {
    getCurrItem() {
      console.log(this.$route.params._id)
      const item = appService.getItemById(this.$route.params._id)
      this.item = item
    },
    onBack() {
      this.$router.go(-1)
    },
    onChangeConnectMethod(method) {
      this.currentCmp = method
    },
    onUpdateItem({ target }) {
      console.dir(target)
      if (target.nodeName === 'H1') {
        console.log(target.innerText)
        this.$emit('update', 'title', target.innerText)
      }
      if (target.className === 'cell-num') {
        console.log(target.innerText)
        this.$emit('update', 'cellNum', target.innerText)
      }
      if (target.className === 'email') {
        console.log(target.innerText)
        this.$emit('update', 'email', target.innerText)
      }
    },
  },
  computed: {},
}
