import socialMedia from './social-media.js'

export default {
  name: 'about',
  props: [],
  template: `
     <section class="about open flex">
       
         <h2 class="about-title center">About me</h2>
         <!-- back btn -->
         <button class="close-btn"
         @click="closeSideBar"
         > &#x3C</button>
         <section className="info-container">
          <div className="img-container">
           <img src="./../assets/tal-profile.jpg" alt="" />
          </div>
          <h4 class="info dev-name">Tal Amit</h4>
          <p class="info dev-exp">
           Coding Academy Teaching assistant,
           web & mobile developer.
          </p>
          <p class="info dev-stack">
           FrontEnd: Vue.js, React.js, Angular 12. <br />
           Mobile: React Native. <br />
           State management: Vuex, Redux. <br />
           BackEnd: Node.js, web sockets. <br />
           Data Bases: SQL, MongoDB
          </p>
         </section>
         <section>
          <social-media></social-media>
         </section>
       
     </section>
        `,
  created() {
    console.log(this.$route.params)
  },
  components: {
    socialMedia,
  },
  created() {},
  data() {
    return {}
  },
  methods: {
    closeSideBar() {
      this.$router.push('/')
    },
  },
  computed: {},
}
