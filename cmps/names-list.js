import namePreview from './name-preview.js'

export default {
  name: 'name-list',
  props: ['names'],
  template: `
        <section class="names-list" >
         <name-preview v-for="name in names"
          :name="name"
          @remove-item="$emit('remove', $event)"
          ></name-preview>
        </section>
        `,

  components: {
    namePreview,
  },
}
