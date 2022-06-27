export default {
  name: 'modal',
  props: ['isModalOpen'],
  template: `

      <dialog ref="dialog" class="dialog flex space-around">
       <label htmlFor="name" class="flex align-center">Full name
        <input type="text" name="name" v-model="user.name" />
       </label>
       <label htmlFor="email" class="flex align-center">Email address
        <input type="email" name="email" v-model="user.email" />
       </label>
       <label htmlFor="cellNum" class="flex align-center">Cellular number
        <input type="number" name="cellNum" v-model="user.cellNum" />
       </label>
      
       <div className="actions-container">
       <button @click="resetModal($event)">Save</button>
       </div>
     
      </dialog>

        `,

  mounted() {
    this.openDialog()
    
  },
  created() {
    this.modalState = this.isModalOpen
  },
  data() {
    return {
      user: {
        name: '',
        cellNum: '',
        email: '',
      },
    }
  },
  methods: {
    openDialog() {
      if (this.modalState) this.$refs.dialog.showModal()
    },
    resetModal(ev) {
      // console.log('modal', ev.path[1].removeAttribute('open'))
      this.$refs.dialog.removeAttribute('open')
      console.log(this.user)
      this.$emit('toggle-modal', this.user)
    },
  },
  computed: {},
}
