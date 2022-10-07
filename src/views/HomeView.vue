<template>
  <div class="home">
    <transition name="left">
      <!-- left door -->
      <div class="door left-door" v-show="doorView"></div>
    </transition>

    <transition name="right">
      <!-- right door -->
      <div class="door right-door" v-show="doorView"></div>
    </transition>

    <transition name="touch">
      <!-- touch button -->
      <div class="btn-touch" v-show="touchView">
        <img src="/img/img_touch.png" @click="onStart">
      </div>
    </transition>

    <div class="door door-bg" v-show="doorView || touchView || viewPage == null"></div>

    <div class="content" v-if="!doorView && !touchView && viewPage != null">
      <!-- 內頁 -->
      <div class="title">
        <!-- 標題 -->
        <span v-if="viewPage">
          {{ peopleTitle }}您好，歡迎來到<br>
          SDIA智慧顯示創新應用館
        </span>
        <span v-else>
          業成集團X英特盛科技
        </span>
      </div>

      <div class="big-image m-t-30" :style="'--i:url(\'/img/' + data?.[dataIndex || 0]?.Partner + '/' + changeString(data?.[dataIndex || 0]?.Product_Name) + '-大.png'" v-if="!viewPage">
        <span>120"透明多曲面互動LED顯示器</span>
      </div>

      

      <div class="info" v-if="viewPage">
        <!-- 資訊 -->
        <div>
          <span>綜合評估，最適合您的應用領域是:</span>
        </div>
        <div>
          <span>
            <input type="checkbox" value="R零售" v-model="isApplication">
            零售
          </span>
          <span>
            <input type="checkbox" value="T移動" v-model="isApplication">
            移動
          </span>
          <span>
            <input type="checkbox" value="H醫療" v-model="isApplication">
            醫療
          </span>
          <span>
            <input type="checkbox" value="E育樂" v-model="isApplication">
            育樂
          </span>
        </div>
        <div>
          <span>以下是從 20 項展品中，為您推薦的焦點展品</span>
        </div>
      </div>

      <div class="item-info m-t-30" v-else>
        <div class="">
          <span class="f-32">展品介紹</span>
        </div>
        <div class="m-t-30">
          <span class="f-24">1. 運用透明LED薄膜顯示技術，具備可撓曲、高亮度、高穿透、可拼接的特性。<br>
2. 結合自行開發的模組化驅動系統與肢體偵測，展示全球第一個120" 透明多曲面互動顯示器。<br>
3. 可作為在智慧移動交通站體之交通資訊與廣告、公共顯示…等應用的新興選項。</span>
        </div>
      </div>

      <div class="image-box" v-if="viewPage">
        <!-- 圖片 -->
        <div class="big-image" :style="'--i:url(\'/img/' + companyName + '/' + changeString(itemName || '') + '-大.png'"  @click="onGoDeatil(0)">
          <span>{{ companyName }}</span>
          <span>{{ itemName }}</span>
        </div>

        <div class="row-3" v-if="data">
          <div @click="onGoDeatil(1)">
            <img :src="'/img/' + data?.[1]?.Partner + '/' + changeString(data?.[1]?.Product_Name) + '-灰.png'">
          </div>
          <div></div>
          <div @click="onGoDeatil(2)">
            <img :src="'/img/' + data?.[2]?.Partner + '/' + changeString(data?.[2]?.Product_Name) + '-灰.png'">
          </div>
          <div></div>
          <div @click="onGoDeatil(3)">
            <img :src="'/img/' + data?.[3]?.Partner + '/' + changeString(data?.[3]?.Product_Name) + '-灰.png'">
          </div>
        </div>
      </div>

      <div class="item-map m-t-30" v-else>
        <div class="">
          <span class="f-32">展品介紹</span>
        </div>
        <div></div>
      </div>

      <div class="footer-box" @click="onGoTo()">
        <!-- 底部 -->
        <span>返回</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import axios from 'axios';

@Options({
  components: {
  },
})
export default class HomeView extends Vue {
  doorView: boolean | null = true;
  touchView: boolean | null = true;
  isApplication: Array<string> | undefined = []
  companyName: string | null = '業成集團X英特盛科技';
  itemName: string | null = '';
  viewPage: boolean | null = null;
  peopleTitle: string | null = ''
  data: any | null = null;
  dataIndex: number | undefined = 0;
  
  created(): void {
    this.doorView = true;
    this.touchView = true;    
  }

  onStart(): void {
    this.touchView = false;
    this.getData();
    setTimeout(() => {
      this.doorView = false;
    }, 200)
    setTimeout(() => {
      this.viewPage = true;
    }, 1200)
  }

  getData(): void {
    axios.get('http://192.168.50.234:8000/api/detection/recommend')
      .then((res) => {
        console.log('recommend', res)
        // this.isApplication = []
        this.data = [];
        this.companyName = res?.data?.Recommend.Partner
        this.itemName = res?.data?.Recommend.Product_Name
        this.isApplication = res?.data?.Recommend?.Application_Field
        this.data.push(res?.data?.Recommend)
        this.data.push(res?.data?.Others[1])
        this.data.push(res?.data?.Others[2])
        this.data.push(res?.data?.Others[3])

      }).catch((err) => {
        console.log(err)
      })
  }

  onGoHome(): void {
    this.doorView = true;
    this.touchView = true;
    this.viewPage = null;
  }

  onGoDeatil(i: number): void {
    console.log('go to detail')
    this.dataIndex = i
    this.viewPage = false
  }

  onGoTo(): void {
    console.log('go to')
    switch(this.viewPage) {
      case true:
        this.onGoHome()
        break;

      case false:
        this.viewPage = true;
        break;
    }
  }

  changePeopleTitle(data_age: number, data_gender: string) {
    if(data_age < 26) {
      this.peopleTitle = data_gender == 'female' ? '少女' : '少年'
    } else if (data_age < 36) {
      this.peopleTitle = data_gender == 'female' ? '小姐' : '帥哥'
    } else if (data_age < 46) {
      this.peopleTitle = data_gender == 'female' ? '美女' : '型男'
    } else {
      this.peopleTitle = data_gender == 'female' ? '女士' : '紳士'
    }
  }

  changeString(data: string): string {
    return data.replace(/"/g, "”") 
  }

  // changeBigImage(): void {
  //   switch(this.companyName) {
  //     case '業成集團X英特盛科技':
  //       break;
  //     case '業成集團X英特盛科技':
  //       break;
  //     case '業成集團X英特盛科技':
  //       break;
  //     case '業成集團X英特盛科技':
  //       break;
  //     case '業成集團X英特盛科技':
  //       break;
  //     case '業成集團X英特盛科技':
  //       break;
  //     case '業成集團X英特盛科技':
  //       break;
  //   }
  // }
}
</script>

<style scoped lang="scss">
  .home {
    // background-repeat: no-repeat;
    // background-size: contain;
    height: 100%;
    width: 100%;
    background-image: url('../assets/img/img_bg.png');
    background-repeat: no-repeat;
    background-size: contain;
    background-color: #213645;
    color: #fff;
  }

  .content {
    height: calc(100% - 136px);
    width: calc(100% - 272px);
    padding: 136px;
    padding-bottom: 0;
  }

  .title {
    margin-top: 32px;
    font-weight: bold;
    font-size: 60px;
  }

  .info {
    margin: 94px 0;
    text-align: left;
    font-size: 36px;
    font-weight: bold;

    div {
      padding: 8px 0;
    }

    span {
      padding-right: 42px;
      display: inline-flex;
      align-items: center;
    }

    input {
      width: 33px;
      height: 33px;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      border-radius: 50%;
      border: 3px solid #fff;
      transition: 0.2s all linear;
      outline: none;
      margin-right: 20px;
      // position: relative;
      // top: 4px;
      display: grid;
      place-content: center;
    }

    input::before {
      content: "";
      width: 21px;
      height: 21px;
      border-radius: 50%;
      transform: scale(0);
      box-shadow: inset 0 0 0 20px #8DD8AB;
    }

    input:checked::before {
      transform: scale(1);
    }
  }

  .item-info {
    text-align: left;
  }

  .image-box {
    width: 810px;
    height: 927px;
    
    .big-image {
      margin-bottom: 80px;

    }

    img {
      width: 100%;
    }
  }

  .item-map {
    text-align: left  ;
  }

  .big-image {
    width: calc(810px - 32px);
    height: calc(600px - 32px);
    background-image: var(--i);
    background-repeat: no-repeat;
    background-size: contain;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    padding: 16px;

    span {
      font-weight: bold;
      font-size: 36px;
      line-height: 52px;
      letter-spacing: 0.1em;
    }
  }
  
  .btn-touch {
    width: 500px;
    height: 500px;
    border-radius: 50%;
    background-color: rgba($color: #000000, $alpha: .4);
    position: absolute;
    left: calc(50vw - 250px);
    top: calc(50vh - 250px);
    z-index: 99999;


    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 40%;
    }
  }

  .row-3 {
    display: grid;
    grid-template-columns: 30% 5% 30% 5% 30%;
  }
  
  .footer-box {
    background: url('../assets/img/img_btn_bg.png');
    background-repeat: no-repeat;
    background-size: auto;
    width: 807.5px;
    height: 76px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 22px;

    span {
      color: #fff;
      font-size: 40px;
      font-weight: bold;
    }
  }

  .door {
    background-repeat: no-repeat;
    background-size: contain;
    height: 100vh;
    width: 100vw;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 8;
  }

  .door-bg {
    background-image: url('../assets/img/img_bg.png');
    z-index: 9;
  }

  .left-door {
    background-image: url('../assets/img/img_leftDoor.png');
  }
  
  .right-door {
    background-image: url('../assets/img/img_rightDoor.png');
    
  }
  .right-enter-active,
  .right-leave-active,
  .left-enter-active,
  .left-leave-active {
    transition: all 2s ease;
  }
  .right-leave-to {
    transform: translateX(100%);
  }
  .left-leave-to{
    transform: translateX(-100%);
  }

  .touch-enter-active,
  .touch-leave-active {
    transition: all .4s ease;
  }
  .touch-leave-to {
    opacity: 0;
  }

  .m-t-30 {
    margin-top: 30px;
  }

  .f-24 {
    font-size: 24px;
  }
  .f-32 {
    font-size: 32px;
  }
  .f-36 {
    font-size: 36px;
  }
</style>