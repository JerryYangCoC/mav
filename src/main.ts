/* eslint-disable vue/multi-word-component-names */
import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import "primevue/resources/primevue.min.css"; /* Deprecated */
import "primevue/resources/themes/lara-light-indigo/theme.css";
import 'survey-core/defaultV2.min.css';
import "jquery-ui";
import 'jquery-ui-css';

import router from './router'
import store from './store'
import PrimeVue from 'primevue/config';
import { surveyPlugin } from 'survey-vue3-ui'
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
import BadgeDirective from 'primevue/badgedirective';

import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import TreeTable from 'primevue/treetable'
import Dialog from 'primevue/dialog';
import FileUpload from 'primevue/fileupload';
import ConfirmDialog from 'primevue/confirmdialog';
import Toast from 'primevue/toast';
import Badge from 'primevue/badge';
import InputMask from 'primevue/inputmask';

import JourneyTmp101 from './components/JourneyTmp101.vue'
import JourneyTmp102 from './components/JourneyTmp102.vue'
import JourneyTmp103 from './components/JourneyTmp103.vue'
import JourneyTmp104 from './components/JourneyTmp104.vue'
import JourneyTmp106 from './components/JourneyTmp106.vue'
import JourneyTmp107 from './components/JourneyTmp107.vue'
import JourneyTmp108 from './components/JourneyTmp108.vue'
import JourneyTmp201 from './components/JourneyTmp201.vue'
import JourneyTmp202 from './components/JourneyTmp202.vue'
import JourneyTmp203 from './components/JourneyTmp203.vue'
import JourneyTmp204 from './components/JourneyTmp204.vue'
import JourneyTmp205 from './components/JourneyTmp205.vue'
import JourneyTmp206 from './components/JourneyTmp206.vue'
import JourneyTmp207 from './components/JourneyTmp207.vue'
import JourneyTmp208 from './components/JourneyTmp208.vue'
import JourneyTmp209 from './components/JourneyTmp209.vue'
import JourneyTmp210 from './components/JourneyTmp210.vue'

import upload from './components/upload/src/upload';

const app = createApp(App)

app.use(router)
app.use(PrimeVue)
app.use(store)
app.use(surveyPlugin)
app.use(ConfirmationService)
app.use(ToastService)

app.directive('badge', BadgeDirective)

app.component('Column', Column)
app.component('DataTable', DataTable)
app.component('TreeTable', TreeTable)
app.component('Dialog', Dialog)
app.component('FileUpload', FileUpload)
app.component('ConfirmDialog', ConfirmDialog)
app.component('Toast', Toast)
app.component('Badge', Badge)
app.component('InputMask', InputMask)

app.component('JourneyTmp101', JourneyTmp101)
app.component('JourneyTmp102', JourneyTmp102)
app.component('JourneyTmp103', JourneyTmp103)
app.component('JourneyTmp104', JourneyTmp104)
app.component('JourneyTmp106', JourneyTmp106)
app.component('JourneyTmp107', JourneyTmp107)
app.component('JourneyTmp108', JourneyTmp108)
app.component('JourneyTmp201', JourneyTmp201)
app.component('JourneyTmp202', JourneyTmp202)
app.component('JourneyTmp203', JourneyTmp203)
app.component('JourneyTmp204', JourneyTmp204)
app.component('JourneyTmp205', JourneyTmp205)
app.component('JourneyTmp206', JourneyTmp206)
app.component('JourneyTmp207', JourneyTmp207)
app.component('JourneyTmp208', JourneyTmp208)
app.component('JourneyTmp209', JourneyTmp209)
app.component('JourneyTmp210', JourneyTmp210)

app.component('Upload', upload)

app.mount('#app')