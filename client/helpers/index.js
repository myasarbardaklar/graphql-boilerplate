import Vue from 'vue'

export function redirectNotify(path, obj, { app, redirect }) {
  if (process.client) Vue.notify(obj)
  else app.$cookies.set('notifyObject', JSON.stringify(obj))
  if (path && path !== '') return redirect(path)
}
