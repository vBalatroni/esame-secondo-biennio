import './assets/main.css'
import './js/script.js'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueLazyLoad from 'vue3-lazyload'
import loadimage from './assets/images/loading.gif'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(VueLazyLoad, {
    preLoad: 1.3,
    loading: loadimage,
    attempt: 1
})
app.use(router)

app.mount('#app')
