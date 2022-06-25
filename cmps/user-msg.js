export default {
  name: 'user-msg',
  emits: ['reset-msg'],
  props: [],
  template: `

       <section class="user-msg scale-in-hor-right">
        <slot></slot>
       </section>

        `,
  created() {
    setTimeout(this.restMsg, 3000)
  },

  methods: {
    restMsg() {
      this.$emit('reset-msg')
    },
  },
}
