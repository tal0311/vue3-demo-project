export default {
  name: 'activities',
  props: ['activities','open'],
  template: `
       <Teleport to="#teleport" class="">
         <div className="activities-container">
          <section v-if="activities.length>0" v-for="({desc},idx) in activities">
            <article>
             <h4>{{desc}}</h4>
             <p>{{setTime[idx]}}</p>
            </article>
          </section>
          <section v-else>
             <h2>No activities yet</h2>
          </section>
         </div>
       </Teleport>
        `,
  
  computed: {
    setTime() {
      return this.activities.map((act) => new Date(act.cratedAt).toDateString())
    },
  },
}
