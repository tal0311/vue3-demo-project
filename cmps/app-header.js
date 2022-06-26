export default {
  name: 'appHeader',
  emits: ['open-modal'],
  props: [],
  template: `
         <header class="app-header flex space-around align-center">
          <button class="menu-icon">
            <router-link to="/about">
              <object class="icon" data="'./../assets/Hamburger_icon.svg.png"  type=""></object>
            </router-link>
          </button>
             <h1>Contacts</h1>
             <button @click="$emit('open-activities')">Activities</button>
             <button @click="$emit('open-modal')">add+</button>
         </header>
        `,
  components: {},
  created() {},
  data() {
    return {}
  },
  methods: {},
  computed: {},
}
