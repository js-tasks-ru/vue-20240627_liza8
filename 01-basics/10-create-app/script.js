import { defineComponent, createApp } from 'vue/dist/vue.esm-bundler.js'

const App = defineComponent({
  name:"App",

  setup() {

    function formatAsIsoDate(timestamp) {
      return new Date(timestamp).toISOString()
    }

    function formatAsLocalDate(timestamp) {
      return new Date(timestamp).toLocaleString(navigator.language, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    }

    return {
      formatAsIsoDate,
      formatAsLocalDate,
    }
  },

  template: `
    <div class="container">Сегодня {{ new Date().toLocaleDateString('ru-RU') }}</div>
   `,
})

const app = createApp(App)

const vm = app.mount('#app')
