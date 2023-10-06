import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router/index.js'

import '@/assets/bootstrap.bundle.min.js';
import '@/assets/bootstrap.min.css';

const app = createApp(App)
app.use(createPinia())
app.use(router)

router.isReady().then(() => {
    app.mount('#app');
   });
