<template>
    <div class="loading-box" v-show="visible()">
        <img src="/img/loading.gif" />
    </div>
</template>
  
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Paginator from "primevue/paginator";
import store from '@/store';

@Options({
    props: {
        Paginator
    }
})
export default class Loading extends Vue {
    

    visible(): boolean {
        return store.state.loading
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.loading-box {
    position: fixed;
    height: 100%;
    width: 100%;
    left: 0px;
    top: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1101;
    background: rgba($color: #333, $alpha: 0.6);
}
</style>
