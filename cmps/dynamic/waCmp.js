export default {
 name:'whats-up',
  props: [],
  template: `
  <section class="connect-wa flex">
     <p>use whats app to send message</p>
     <textarea name="wa-txt" cols="30" rows="5"></textarea>
     <div className="action-container">
      <button>Cancel</button>
      <button>Send</button>
     </div>
  </section>
        `,
components:{},
created() {},
  data() {
    return {}
  },
  methods: {},
  computed: {},
}
