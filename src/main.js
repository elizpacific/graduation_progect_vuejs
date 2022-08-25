import { createApp } from 'vue'

import './assets/main.css'
import BaseApp from "./BaseApp.vue";
import router from "./router";

createApp(BaseApp).use(router).mount('#app')
