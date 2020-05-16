<template lang="pug">
  notifications(
    v-if="content.group === 'fixed'",
    v-bind='content'
  )
    template(slot='body', slot-scope='props')
      template(slot='body', slot-scope='props')
      .alert.fade.show.shadow-sm(
        role='alert',
        :class="[`alert-${props.item.type}`]",
        @click="props.close"
      )
        strong {{ props.item.title }}
        |  {{ props.item.text }}
  
  notifications(
    v-else-if="content.group === 'static'",
    v-bind='content'
  )
    template(slot='body', slot-scope='props')
      .alert.alert-dismissible.fade.show(
        role='alert',
        :class="[`alert-${props.item.type}`]"
      )
        strong {{ props.item.title }}
        p.mb-0 {{ props.item.text }}
        button.close(
          type="button",
          aria-label="Close",
          @click="props.close"
        )
          span(aria-hidden="true") &times;
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      required: true
    }
  }
}
</script>
