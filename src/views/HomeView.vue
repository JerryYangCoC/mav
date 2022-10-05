<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->

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
        <img src="../assets/img/img_touch.png" @click="onStart">
      </div>
    </transition>

    <div class="content">

    </div>

    <div class="door door-bg"></div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Options({
  components: {
    HelloWorld,
  },
})
export default class HomeView extends Vue {
  doorView = true;
  touchView = true;
  
  created(): void {
    console.log('Home pages')
    this.doorView = true;
    this.touchView = true;
  }

  onStart(): void {
    console.log('touch start button')
    this.touchView = !this.touchView;
    setTimeout(() => {
      this.doorView = !this.doorView;
    }, 200)
  }
}
</script>

<style lang="scss">
  .home {
    // background-repeat: no-repeat;
    // background-size: contain;
    height: 100%;
    width: 100%;
    background-color: #213645;
  }

  .content {
    height: 100%;
    width: 100%;
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
  
  .door {
    background-repeat: no-repeat;
    background-size: contain;
    height: 100vh;
    width: 100vw;
    position: absolute;
    top: 0;
    left: 0;
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
  .left-leave-to {
    transform: translateX(-100%);
  }

  .touch-enter-active,
  .touch-leave-active {
    transition: all .4s ease;
  }
  .touch-leave-to {
    opacity: 0;
  }
</style>