–<template>
  <router-view/>
  <Loading />
  <Dialog :visible="store.state.errorMessage" modal header="" :closable="false" :style="{ width: '300px' }">
    <p style="margin: 1rem 0;">
        {{ errorMessage() }}
    </p>

    <div style="display: flex; justify-content: flex-end;">
        <input type="button" class="btn-def" style="" @click="onCloseError()" value="確定" />
    </div>
</Dialog>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Loading from './components/Loading.vue';
import store from './store';

@Options({
  components: {
    Loading,
  },
})
export default class App extends Vue {
    errorVisible = false;
    store = store

  /**
   * 初始化
   */
   created(): void {
    console.log('new App')
    store.dispatch('upLoading', false)

    this.errorVisible = this.errorMessage() ? true : false
  }

  onCloseError(): void {
    store.commit('setErrorMessage', null)
  }

  errorMessage(): string {
    return store.state.errorMessage
  }
}
</script>
<style lang="scss">

/* 先隐藏原滚动条 */
// body::-webkit-scrollbar {
//   display: none;
// }
// body {
//   -ms-overflow-style: none;
// }

/* hover时显色 */
// .container:hover ::-webkit-scrollbar-thumb{
//     background: rgba(0, 0, 0, 0.1);
// }
/* 设置滚动条的样式 */
// ::-webkit-scrollbar {
//     width: 12px;
// }
/* 滚动槽 */
// ::-webkit-scrollbar-track {
//     -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.3);
//     box-shadow: inset006pxrgba(0, 0, 0, 0.3);
//     border-radius: 10px;
// }
/* 滚动条滑块 */
/* 默认时隐藏*/
// ::-webkit-scrollbar-thumb {
//     border-radius: 10px;
//     background: rgba(0, 0, 0, 0.1);
//     -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.5);
//     box-shadow: inset006pxrgba(0, 0, 0, 0.5);
//     background: transparent;
// }


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  // color: #2c3e50;

  padding: 0;
  margin: 0;
  height: 100vh;
  width: 100vw;
}

html {
  -webkit-text-size-adjust: 100%;
  // font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
  //   Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif,
  //   Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
  font-family: "微軟正黑體",Arial, Helvetica, sans-serif,"新細明體";
  line-height: 1.5;
  tab-size: 4;
  scroll-behavior: smooth;
}
body {
  font-family: inherit;
  line-height: inherit;
  padding: 0;
  margin: 0;
  /* font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif; */
  font-family: "微軟正黑體",Arial, Helvetica, sans-serif,"新細明體";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  width: 100vw;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

h1,
h2,
p,
pre {
  margin: 0;
}
*,
::before,
::after {
  box-sizing: border-box;
  border-width: 0;
  // border-style: solid;
  // border-color: currentColor;
}
h1,
h2 {
  font-size: inherit;
  font-weight: inherit;
}
a {
  color: inherit;
  text-decoration: inherit;
}

// .box-copy {
//   th {
//     background-color: rgb(0, 157, 255) !important;
//     padding: 4px !important;
//     color: white !important;
//   }
// }
.purple-tag {
  background-color: #ccbfd7;
  color: white;
  border-radius: 10px;
  padding: 13px 0px 3px 0px;
  margin: 0 auto;
  width: 60px;
  height: 60px;
  cursor: pointer;
  padding: 5px 0px;
  position: relative;
}

.orange-tag {
  background-color: #ff6600;
  color: white;
  border-radius: 10px;
  padding: 13px 19px 0 19px;
  margin: 0 auto;
  width: 60px;
  height: 60px;
  cursor: pointer;
  padding: 5px 0px;
  position: relative;
}

.grey-tag {
  background-color: #bfbfbf;
  color: white;
  border-radius: 10px;
  padding: 13px 19px 0 19px;
  margin: 0 auto;
  width: 60px;
  height: 60px;
  cursor: pointer;
  padding: 5px 0px;
  position: relative;
}

.green-tag {
  background-color: rgb(191, 230, 191);
  color: black;
  border-radius: 10px;
  padding: 13px 19px 0 19px;
  margin: 0 auto;
  width: 100px;
  height: 100px;
  cursor: pointer;
  padding: 5px 0px;
  position: relative;
}

.blue-tag {
  background-color: #98c4ff;
  color: white;
  border-radius: 10px;
  padding: 13px 19px 0 19px;
  margin: 0 auto;
  width: 60px;
  height: 60px;
  cursor: pointer;
  padding: 5px 0px;
  position: relative;
}

.default-tag {
//   background-color: white;
//   color: white;
  border-radius: 10px;
  border-width: 1.5px;
  border-style: dashed;
  padding: 13px 19px 0 19px;
  margin: 0 auto;
  width: 60px;
  height: 60px;
  cursor: pointer;
  padding: 5px 0px;
  position: relative;
}

.purple-tag::before,
.orange-tag::before,
.blue-tag::before,
.grey-tag::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-image: var(--i);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 48px;
}

.green-tag::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: -15px;
  left: 0;
  background-image: var(--i);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 48px;
}

.green-tag:hover {
    background-color: green;
    color: white;
}

.green-tag:hover::before,
.green-tag:active::before {
    background-image: var(--i2);
}

.green-tag:active {
    background-color: green;
    color: white;
}

.div-tran {
  transform: rotate(45deg);
  margin-top: 5px;
  margin-bottom: 8px;
  width: 50px;
  height: 50px;
}

.div-tran::before {
  transform: rotate(-45deg);
  background-size: 42px;
}


.row-3 {
  display: grid;
  grid-template-columns: 30% 30% 30%;
  column-gap: 5%;
}
  

.m-t-30 {
  margin-top: 30px;
}


.f-10 {
  font-size: 10px;
}
.f-12 {
  font-size: 12px;
}
.f-14 {
  font-size: 14px;
}
.f-16 {
  font-size: 16px;
}
.f-18 {
  font-size: 18px;
}
.f-20 {
  font-size: 20px;
}
.f-24 {
  font-size: 24px;
}
.f-28 {
  font-size: 28px;
}
.f-32 {
  font-size: 32px;
}
.f-36 {
  font-size: 36px;
}


.bg-orange {
  background-color: #ff6600;
}
.bg-blue {
  background-color: #98c4ff;
}
.bg-purple {
  background-color: #ccbfd7;
}
.bg-transparent {
  background-color: transparent;
}
.bg-white {
    background-color: white;
}

input {
  // border-width: 1px;
  // border-color: #b7b7b7;
  // border-style: inset;
	border: 1px solid #aaa;
  height: 32px;
  padding: 0 6px;
  margin: 6px;
  width: 14vw;
  background-repeat: no-repeat;
  background-size: 18px;

}
input#StartYMD,
input#EndYMD,
input#RStartYMD,
input#REndYMD,
input#YMD {
    background: url('../public/img/event.svg') no-repeat scroll calc(100% - 10px) 6px;
    background-size: 20px;
}

select {
  // border-width: 1px;
  // border-color: #b7b7b7;
  // border-style: inset;
	border: 1px solid #aaa;
  height: 32px;
  padding: 0 6px;
  margin: 6px;
  width: 14vw;
}

button {
  padding: 8px 12px;
  width: 40px;
  height: 40px;
  background-repeat: no-repeat;
  background-size: 18px;
}


.card {
  background: var(--surface-card);
  padding: 1rem;
  // border-radius: 10px;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;


  th {
    background-color: #74808a !important;

  }
}

.p-dropdown {
  align-items: center !important;
  border: 0 !important;
}
.p-dropdown::before {
  content:"\6bcf\9801\5217\6578\ff1a";
  font-size: 14px;
  color: black;
  padding-right: 5px;
}

.p-inputnumber {
  align-items: center;
}
.p-inputnumber-input {
  width: 40px;
}
.p-inputnumber::before {
  content:"\8df3\81f3";
  font-size: 14px;
  color: black;
  padding-right: 5px;
}
.p-inputnumber::after {
  content: "\9801";
  font-size: 14px;
  color: black;
  padding-right: 5px;
}
.p-treetable .p-treetable-tbody,
.p-treetable .p-treetable-thead {
  border: 1px solid #ccc !important;
  border-width: 0 1px 0 0 !important;
}
.p-treetable .p-treetable-tbody > tr > td {
  // padding: 8px;
  border: 1px solid #ccc !important;
  border-width: 0 0 1px 1px !important;
  font-size: 14px;
}
.p-treetable .p-treetable-thead > tr > th {
  // padding: 8px !important;
  border: 1px solid #ccc !important;
  border-width: 1px 0 1px 1px !important;
  color: white !important;
  text-align: center !important;
}

.p-treetable .p-paginator-bottom {
  border-width: 0px !important;
}

.p-paginator {
  justify-content: flex-end !important;
  padding: 0 !important;
}
.p-paginator .p-paginator-current {
  color: black !important;
}

.p-link {
  padding: 8px !important;
  font-size: 16px;
}
.p-highlight {
  background-color: rgb(0, 157, 255) !important;
  color: white !important;
}
.p-paginator .p-paginator-pages .p-paginator-page.p-highlight {
  border-radius: 6px !important;
  min-width: 1.8rem !important;
  height: 2rem !important;
}
.p-dialog .p-dialog-header {
  background-color: #7f7f7f !important;
  color: white !important;
  height: 40px;
  justify-content: center;
}

.p-fileupload .p-fileupload-buttonbar {
  padding: 0.25rem !important;
}

.p-toast {
  width: 80vw !important;
}

.p-icon {
  width: 1.25rem !important;
  height: 1.25rem !important;
}

.p-toast-detail {
  margin: 0 !important;
}

.p-toast-message-content {
  padding: 1.25rem 1.75rem !important;
  display: flex !important;
  align-items: center !important;
}

.p-toast-message-text {
  margin: 0 0 0 0.5rem !important;
}

.ask-red {
    color: red;
    // margin-left: -10px;
    position: relative;
    top: -5px;
}

.btn {
  width: 76px;
  height: 28px;
  font-size: 14px;
  border-radius: 16px;
  background-color: #c1c1c1;
  background-image: var(--i);
  background-position-x: 10px;
  background-position-y: 5px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 10px;
  line-height: 14px;
  border-width: 1px;
  border-color: #949494;
}

.btn:hover {
  background-color: #4b4b4b;
  color: white;
}

.btn-def {
  width: 45px;
  height: 28px;
  font-size: 14px;
//   border-radius: 16px;
//   background-color: #c1c1c1;
//   background-image: var(--i);
//   background-position-x: 10px;
//   background-position-y: 5px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
//   padding: 0 10px;
  line-height: 14px;
  border-width: 1px;
  border-color: #949494;
}

.btn-def:hover {
  background-color: #4b4b4b;
  color: white;
}

.btn-white {
  border-radius: 4px;
  background-color: white;
  background-image: var(--i);
  background-size: 24px;
  background-position-x: 8px;
  background-position-y: 5px;
  border-width: 1px;
  border-color: #949494;
}

.btn-red {
//   width: 90px;
//   font-size: 16px;
border-width: 1px;
  border-radius: 4px;
  border-color: red;
  background-color: white;
  color: red;
//   background-image: var(--i);
//   background-repeat: no-repeat;
//   background-size: 24px;
//   background-position-x: 14px;
//   background-position-y: 8px;
//   text-align: right;
}

.btn-blue {
  background-color: white;
  border-width: 1px;
  border-radius: 4px;
  border-color: #2dc3f3;
  color: #2dc3f3;
}

.btn-green {
  width: 90px;
  font-size: 16px;
  border-radius: 4px;
  background-color: #48d1b1;
  color: white;
  background-image: var(--i);
  background-repeat: no-repeat;
  background-size: 24px;
  background-position-x: 14px;
  background-position-y: 8px;
  text-align: right;
}

textarea {
  width: 80vw;
  height: 100px;
  border-width: 1px;
  border-color: #b7b7b7;
  border-style: inset;
  padding: 6px;
  margin: 6px;
}

.roadmap-box {
  text-align: left;
  color: #484848;
  font-size: 22px;
  font-weight: bold;
  line-height: 2.5;
}

.form-box {
  border: 1px solid #ccc;
  text-align: left;
  padding: 18px 24px;
}

.popup {
  position: fixed;
  top: 20px;
  // left: 50%;
  z-index: 1101;
  width: 80vw;
  left: 10vw;
}


.hr-space-square {
  border: 0;
  color: #000;
  background: linear-gradient(currentColor, currentColor) no-repeat center;
  background-size: 100% 2px;
  display: flex;
  justify-content: space-between;
  margin: 0;
  height: 32px;
}
.hr-space-square::before {
  content: attr(data-content);
    padding: 8px 10px 0 0;
    width: 100px;
    display: flex;
    justify-content: flex-end;
    line-height: 1px;
    font-size: 12px;
}
.hr-space-square::after {
  content: '';
  display: block;
  width: .75em;
  height: .75em;
  /* transform: rotate(45deg); */
  box-sizing: border-box;
  border: 8px solid;
  border-color: transparent transparent transparent #000;
  margin-right: -9px;
  margin-top: 8px;
}

.tab-div {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom: 1px solid #c4c4c4;
}

.nav {
  display: flex;
  flex-wrap: wrap;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
}

.nav-tabs {
  border-bottom: 1px solid #dee2e6;
}

.nav-tabs .nav-link {
//   background-color: white;
  height: 40px;
  color: #575757;
  border: none;
  /* padding: 0.8vw 1.7vw; */
  /* border-radius: 10px 10px 0 0; */
  width: 100%;
}

.nav-tabs .nav-link.active {
//   background-color: #ccbfd7;
  color: white;
  border: none;
  /* padding: 0.8vw 1.7vw; */
  /* border-radius: 10px 10px 0 0; */
}

.nav-item {
  flex: 0 0 auto;
  width: 50%;
}

.nav-link {
  cursor: pointer;
}

dl, ol, ul {
  margin-top: 0;
}

.tree {
  .div-tran {
    // margin: 0 8px 8px 8px !important;
  }
}


.box-Cop th {
    background: #7f7f7f !important;
    padding: 4px 1rem !important;
    color: white !important;
}

.box-Cop tr.p-highlight {
    background: #e7e7e7 !important;
    color: #000 !important;
}

.box-Cop .p-checkbox-box.p-highlight {
    background: #7f7f7f !important;
    border-color: #aaa !important;
}

.box-copy td {
    padding: 6px 12px !important;
}

.box-copy th {
    background: #7f7f7f !important;
    padding: 4px !important;
    color: white !important;
}

.box-copy tr.p-highlight {
    background: #e7e7e7 !important;
    color: #000 !important;
}

.box-copy .p-checkbox-box.p-highlight {
    background: #7f7f7f !important;
    border-color: #aaa !important;
}

input[type="file"] {
    border: 0;
}
</style>
