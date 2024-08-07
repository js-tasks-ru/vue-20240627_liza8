import { defineComponent, createApp } from 'vue/dist/vue.esm-bundler.js'

const App = defineComponent({
  name:"App",

  setup() {

    function formatAsLocalDate(time) {
      return new Date().toLocaleString(navigator.language, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    }

    const dateNow = formatAsLocalDate (new Date())

    return {
      formatAsLocalDate,
      dateNow
    }
  },

  template: `
    <div class="container">Сегодня {{ dateNow }} </div>
   `,
})

const app = createApp(App)

const vm = app.mount('#app')
