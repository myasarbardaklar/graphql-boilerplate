import { extend, localize } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'

// install rules and localization
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule])
})

localize({
  en: {
    messages: {
      required: 'This field is required.',
      email: 'This field must be email.',
      min: 'This field must have no less than {length} characters.',
      confirmed: 'Your password and confirmation password do not match.'
    }
  }
})
