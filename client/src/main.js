import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import axios from 'axios'

axios.defaults.baseURL = 'https://hotel-app-tpbp.herokuapp.com'
// eslint-disable-next-line no-unused-vars,no-undef
createApp(App).use(router).mount('#app')
