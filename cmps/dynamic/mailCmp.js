export default {
  name: 'mailCmp',
  props: [],
  template: `
        <section className="connect-mail flex">
         <p>Use <span>Email </span>to send message</p>
         <label htmlFor="to">
          To:
           <input type="text" name="to" />
         </label>
         <label htmlFor="subject">
          Subject:
           <input type="text" name="subject" />
         </label>
         <textarea name="mail-body" cols="30" rows="5"></textarea>
         <div className="actions-container flex">
          <button>Cancel</button>
          <button>Send</button>
         </div>
        </section>
        `,
  components: {},
  created() {},
  data() {
    return {}
  },
  methods: {},
  computed: {},
}
