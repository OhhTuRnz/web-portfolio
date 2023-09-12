// main.js
import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router'; // Import the router configuration
import VueClickAwayPlugin from 'vue3-click-away';

const app = createApp(App);

app.use(router);

app.use(VueClickAwayPlugin)

app.mount('#app');
