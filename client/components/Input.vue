<template lang="pug">
  ValidationProvider(
    :rules="rules",
    v-slot="{ errors }",
    :vid="vid"
  )
    .form-group
      label(
        :for="id",
        :class="{ 'text-danger': errors[0] }"
      ) {{ labelText }}
      input.form-control(
        :id="id",
        :type="type",
        v-model.trim="input",
        :placeholder="placeholder",
        :class="{ 'is-invalid': errors[0] }",
        autocomplete="differentThings"
      )
      small.invalid-feedback(v-if="errors[0]") {{ errors[0] }}
</template>

<script>
import { ValidationProvider } from 'vee-validate'

export default {
  components: { ValidationProvider },
  props: {
    value: {
      type: String,
      default: ''
    },
    rules: String,
    vid: String,
    id: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    labelText: {
      type: String,
      required: true
    }
  },
  computed: {
    input: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>
