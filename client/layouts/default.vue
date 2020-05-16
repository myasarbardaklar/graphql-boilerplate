<template lang="pug">
  .default-layout
    Alert(:content="{ group: 'fixed', width: '480px', position: 'top left', closeOnClick: false, style: 'padding: 15px;' }")

    Navbar

    .container.mt-5
      .row
        .col-md-8
          nuxt
        .col-md-4
          PageCard
            template(v-slot:header)
              span.font-weight-bold.text-black-50 Sidebar
            template(v-slot:body)
              p.text-sm.text-gray-800.mb-0
                | Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat dolore qui excepturi ullam repudiandae est. Nulla, minus corrupti. Maiores harum temporibus dolores dicta, quo doloribus saepe nostrum cupiditate ut voluptas!
</template>

<script>
// Partials
import Navbar from '@partials/Navbar.vue'
import PageCard from '@partials/PageCard.vue'

// Components
import Alert from '@components/Alert.vue'

export default {
  components: { Alert, Navbar, PageCard },
  mounted() {
    let notifyObject = this.$cookies.get('notifyObject')
    if (notifyObject) {
      this.$notify(notifyObject)
      this.$cookies.remove('notifyObject')
    }
  }
}
</script>
