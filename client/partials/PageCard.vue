<template lang="pug">
  .card
    .spinner-container(:class='{ active: spinner }')
      spinner
    .card-header
      slot(name='header')
    .card-body
      slot(name='body')
</template>

<script>
import Spinner from '@components/Spinner.vue'

export default {
  components: { Spinner },
  props: {
    spinner: Boolean
  }
}
</script>
