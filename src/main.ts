/* eslint-disable vue/multi-word-component-names */
import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import "primevue/resources/primevue.min.css"; /* Deprecated */
import "primevue/resources/themes/lara-light-indigo/theme.css";
import 'survey-core/defaultV2.min.css';

import router from './router'
import store from './store'
import PrimeVue from 'primevue/config';
import { surveyPlugin } from 'survey-vue3-ui'
import ConfirmationService from 'primevue/confirmationservice';

import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import TreeTable from 'primevue/treetable'
import Dialog from 'primevue/dialog';
import FileUpload from 'primevue/fileupload';
import ConfirmDialog from 'primevue/confirmdialog';


const app = createApp(App)

app.use(router)
app.use(PrimeVue)
app.use(store)
app.use(surveyPlugin)
app.use(ConfirmationService)

app.component('Column', Column)
app.component('DataTable', DataTable)
app.component('TreeTable', TreeTable)
app.component('Dialog', Dialog)
app.component('FileUpload', FileUpload)
app.component('ConfirmDialog', ConfirmDialog)


app.mount('#app')