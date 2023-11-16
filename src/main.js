import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router/index.js'

import '@/assets/bootstrap.bundle.min.js';
import '@/assets/bootstrap.min.css';
import '@/assets/css/styles.css'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)

router.isReady().then(() => {
    app.mount('#app');
   });
