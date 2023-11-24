<template>
    <div>
        <form @submit.prevent="onClick()">
            <div style="display: grid; grid-template-columns: 160px auto; align-items: center; justify-content: start; justify-items: end;">
                <span><span class="ask-red">*</span>溝通管道：</span>
                <div>
                    <input type="checkbox" id="1" style="width: 20px; height: 20px;" :value="true" v-model="prm1" :disabled="isEdit">
                    <label for="1">有APP</label>
                    <input type="checkbox" id="2" style="width: 20px; height: 20px;" :value="true" v-model="prm2" :disabled="isEdit">
                    <label for="2">無APP</label>
                    <input type="checkbox" id="3" style="width: 20px; height: 20px;" :value="true" v-model="prm3" :disabled="isEdit">
                    <label for="3">有簡訊</label>
                    <input type="checkbox" id="4" style="width: 20px; height: 20px;" :value="true" v-model="prm4" :disabled="isEdit">
                    <label for="4">無簡訊</label>
                    <input type="checkbox" id="5" style="width: 20px; height: 20px;" :value="true" v-model="prm5" :disabled="isEdit">
                    <label for="5">有EDM</label>
                    <input type="checkbox" id="6" style="width: 20px; height: 20px;" :value="true" v-model="prm6" :disabled="isEdit">
                    <label for="6">無EDM</label>
                </div>
            </div>
            
            <div style="display: flex; justify-content: flex-end;" v-if="isEdit">
                <input type="button" class="btn" style="--i: url('/img/back.png')" @click="(() => {$router.push({path: 'journey', query: $router.currentRoute.value.query});})" value="返回" />
            </div>

            <div style="display: flex; justify-content: flex-end;" v-else>
                <input type="button" class="btn" style="--i: url('/img/delete.png')" @click="onRemove()" value="刪除" v-if="remove" />

                <input type="submit" class="btn" style="--i: url('/img/sent.png')" value="確認" />
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { JourneyModel, JourneyNodeModel } from '@/model/journeyList.model';

/**
 * 溝通管道
 */
@Options({
  props: {
    dd: null,
    value: null,
    active: null,
    remove: null,
    isEdit: null,
  }
})
export default class JourneyTmp108 extends Vue {
    dd!: JourneyModel;
    value!: JourneyNodeModel;
    active!: () => void;
    remove!: () => void;
    prm1!: boolean;
    prm2!: boolean;
    prm3!: boolean;
    prm4!: boolean;
    prm5!: boolean;
    prm6!: boolean;
    isEdit!: boolean;

    created(): void {
        this.prm1 = this.value.Channel?.slice(0, 1) == '1' ?? false
        this.prm2 = this.value.Channel?.slice(1, 2) == '1' ?? false
        this.prm3 = this.value.Channel?.slice(2, 3) == '1' ?? false
        this.prm4 = this.value.Channel?.slice(3, 4) == '1' ?? false
        this.prm5 = this.value.Channel?.slice(4, 5) == '1' ?? false
        this.prm6 = this.value.Channel?.slice(5, 6) == '1' ?? false
    }

    onClick(): void {
        if (this.prm1 == false && this.prm2 == false && this.prm3 == false && this.prm4 == false && this.prm5 == false && this.prm6 == false) return;
        this.value.Channel = this.prm1 ? '1' : '0'
        this.value.Channel += this.prm2 ? '1' : '0'
        this.value.Channel += this.prm3 ? '1' : '0'
        this.value.Channel += this.prm4 ? '1' : '0'
        this.value.Channel += this.prm5 ? '1' : '0'
        this.value.Channel += this.prm6 ? '1' : '0'
        this.active()
    }

    onRemove(): void {
        this.remove()
    }
}
</script>