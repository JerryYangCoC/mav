/* eslint-disable vue/multi-word-component-names */
import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import "primevue/resources/primevue.min.css"; /* Deprecated */


import router from './router'
import store from './store'
import PrimeVue from 'primevue/config';

import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import TreeTable from 'primevue/treetable'
import Dialog from 'primevue/dialog';


const app = createApp(App)

app.use(store)
app.use(router)
app.use(PrimeVue)

app.component('Column', Column)
app.component('DataTable', DataTable)
app.component('TreeTable', TreeTable)
app.component('Dialog', Dialog)

app.mount('#app')