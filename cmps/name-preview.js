export default {
  name: 'name-preview',
  props: ['name'],
  emits: ['remove-item'],
  template: `
          <article class="name-preview">
            <router-link :to="{name:'details', params:{_id:name._id}}">
              <h4>{{name.name}}</h4>
            </router-link>
            <p>{{name.email|| 'Add email address'}}</p>
            <p>{{name.cellNum || 'Add cell number'}}</p>
            
            <button @click="remove(name._id)">
              X
            </button>
          </article>
        `,

  methods: {
    remove(itemId) {
      console.log(itemId)
      this.$emit('remove-item', itemId)
    },
  },
}
