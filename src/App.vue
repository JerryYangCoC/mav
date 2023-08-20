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
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif,
    Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
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
  border-style: solid;
  border-color: currentColor;
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
  border-width: 1px;
  border-color: #b7b7b7;
  border-style: inset;
  height: 36px;
  padding: 6px;
  margin: 6px;
  // min-width: 160px;
}

select {
  border-width: 1px;
  border-color: #b7b7b7;
  border-style: inset;
  height: 36px;
  padding: 6px;
  margin: 6px;
  min-width: 160px;
}

button {
  padding: 8px 12px;

}


.card {
    background: var(--surface-card);
    padding: 2rem;
    border-radius: 10px;
    margin-bottom: 1rem;
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
  // border: 1px solid #dee2e6;
  border-width: 0 1px 0 0;
}
.p-treetable .p-treetable-tbody > tr > td {
  padding: 8px;
  border-width: 0 0 1px 1px;
}
.p-treetable .p-treetable-thead > tr > th {
  padding: 8px;
  border-width: 1px 0 1px 1px;
}

.p-paginator {
  justify-content: flex-end !important;
}

.p-link {
  padding: 8px !important;
  font-size: 16px;
}
.p-highlight {
  background-color: rgb(0, 157, 255) !important;
  color: white !important;
  border-radius: 6px;
}

.btn-blue {
  width: 90px;
  font-size: 16px;
  border-radius: 4px;
  background-color: #2dc3f3;
  color: white;
  // background-image: url('img/search.png');
  background-image: var(--i);
  background-repeat: no-repeat;
  background-size: 24px;
  background-position-x: 14px;
  background-position-y: 8px;
  text-align: right;
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
    
</style>
