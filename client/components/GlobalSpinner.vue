<template lang="pug">
  .spinner-container.fixed(:class="{ active: loading }")
    .spinner
      .double-bounce1
      .double-bounce2
</template>

<script>
export default {
  data() {
    return {
      loading: false
    }
  },
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    }
  }
}
</script>
