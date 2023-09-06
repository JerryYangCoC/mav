–<template>
  <router-view/>
</template>

<style lang="scss">
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

.box-copy {
  th {
    background-color: rgb(0, 157, 255) !important;
    padding: 4px !important;
  }
}
.purple-tag {
  background-color: #ccbfd7;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 48px;
  color: white;
  border-radius: 10px;
  padding: 13px 0px 3px 0px;
  margin: 0 auto;
  width: 60px;
  height: 60px;
  cursor: pointer;
  padding: 5px 0px;
  position: relative;
  background-image: var(--i);
}

.blue-tag {
  background-color: #ff6600;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 48px;
  color: white;
  border-radius: 10px;
  padding: 13px 19px 0 19px;
  margin: 0 auto;
  width: 60px;
  height: 60px;
  cursor: pointer;
  padding: 5px 0px;
  position: relative;
  background-image: var(--i);
}


.row-3 {
  display: grid;
  grid-template-columns: 30% 30% 30%;
  column-gap: 5%;
}
  

.m-t-30 {
  margin-top: 30px;
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
  padding: 2rem;
  border-radius: 10px;
  margin-bottom: 1rem;

  th {
    background-color: #74808a !important;

  }
}

.p-dropdown {
  align-items: center !important;
  border: 0 !important;
}
.p-dropdown::before {
  content:"每頁列數：";
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
  content:"跳至";
  font-size: 14px;
  color: black;
  padding-right: 5px;
}
.p-inputnumber::after {
  content: "頁";
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

.ask-red {
  color: red;
  margin-left: -10px;
  position: absolute;
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
  width: 90px;
  font-size: 16px;
  border-radius: 4px;
  background-color: red;
  color: white;
  // background-image: url('img/search.png');
  background-image: var(--i);
  background-repeat: no-repeat;
  background-size: 24px;
  background-position-x: 14px;
  background-position-y: 8px;
  text-align: right;
}

.btn-blue {
  // width: 90px;
  // font-size: 16px;
  // border-radius: 4px;
  // background-color: #2dc3f3;
  // color: white;
  // background-image: url('img/search.png');
  // background-image: var(--i);
  // background-repeat: no-repeat;
  // background-size: 24px;
  // background-position-x: 14px;
  // background-position-y: 8px;
  // text-align: right;
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
  // background-image: url('img/search.png');
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
  font-size: 14px;
}
    
</style>
