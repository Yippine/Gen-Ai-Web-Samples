import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

const app = createApp(App)

app.config.errorHandler = (err, vm, info) => {
    console.error("Global error:", err, info);
    // You can add error reporting logic here
};

app.mount('#app')