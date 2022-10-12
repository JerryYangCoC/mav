# TIE Frontend - Technical Documentation

###### tags: `Vue`、`Vuex`、`TypeScript`

> GitHub [Retailing-Data/tie-frontend-vue](https://github.com/Retailing-Data/tie-frontend-vue)


## Table of Content
[ToC]

## What do I start?

### Step 1: Install node.js

Download [node.js](https://nodejs.org/zh-tw/download/)

![node.js](https://www.hyyat.com/zasogooh/2021/08/Nodejs.jpg)

Install node.js

![install](http://www.w3big.com/nodejs/install-node-msi-version-on-windows-step2.png)

Open cmd check node version

```
> node -v
```

### Step 2: Install Vue Cli

Open cmd, install vue cli

```
> npm i -g @vue/cli
```

![cmd](https://www.howtogeek.com/wp-content/uploads/2017/06/W10-Command-Prompt.png?height=200p&trim=2,2,2,2)

### Step 3: Install Visual Studio Code

Download [VS Code](https://code.visualstudio.com/download), install Visual Studio Code

![vs code](https://code.visualstudio.com/opengraphimg/opengraph-home.png)


## Project Structure

``` javascript
 ├──node_modules/                /// node 相關套件
 ├──dist/                        /// 打包後的產出
 ├──public/                      /// webpack 預設檔案
 ├──src/                         /// 主程式
 │    ├──assets/                 /// 靜態資源
 │    │   └──img/                /// 圖片
 │    │
 │    ├──components/             /// 共用元件
 │    ├──router/
 │    │   └──index.ts            /// 路由
 │    │
 │    ├──store/                  /// store管理
 │    │   └──index.ts
 │    │
 │    ├──views/                  /// 所有頁面
 │    │   └──HomeView.vue        /// 主頁
 │    │
 │    ├──App.vue                 /// 根主件
 │    └──main.ts                 /// 程式主要進入點
 │   
 ├──tests/                       /// 自動化測試
 │    ├──e2e/                    /// E2E Test
 │    └──unit/                   /// Unit Test
 │   
 └──package.json                 /// 專案、相依套件設定檔
```

## Activity Diagram

```sequence
Note left of HomePage part1: start
HomePage part1->HomePage part2: on click start button \n get API to people info
HomePage part2->HomePage part3: on click image
HomePage part3->HomePage part2: on click return button
HomePage part2->HomePage part1: on click return button
```

## Project setup
```
> npm install
```

### Compiles and hot-reloads for development
```
> npm run serve
```

### Compiles and minifies for production
```
> npm run build
```

### Run your unit tests
```
> npm run test:unit
```

### Run your end-to-end tests
```
> npm run test:e2e
```

### Lints and fixes files
```
> npm run lint
```

## Work Breakdown Structure

| work             | 10/5 | 10/6 | 10/7 | 10/11 |
| --------         | ---- | ---- | ---- | ----- |
| Init project     | V    |      |      |       |
| create HomePage  | V    |      |      |       |
| door animation   | V    |      |      |       |
| to part 1        | V    |      |      |       |
| to part 2        |      |  V   |      |       |
| to part 3        |      |      |  V   |       |
| get API          |      |      |  V   |       |
| test             |      |      |      | V     |
| finish           |      |      |      | V     |


## Reference

- [Vue CLI](https://cli.vuejs.org/)
- [Vue with Typescript](https://vuejs.org/guide/typescript/overview.html)

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Want...

