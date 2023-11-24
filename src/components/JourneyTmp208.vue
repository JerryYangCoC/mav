<template>
    <div>
        <form @submit.prevent="onClick()">
            <div style="display: grid; grid-template-columns: 160px auto; align-items: center; justify-content: start; justify-items: end;">
                <span><span class="ask-red">*</span>金卡會員每月：</span>
                <div>
                    <input type="text" style="width: 150px;" v-model="value.SelectDate" required :disabled="isEdit" />
                    <span>號</span>
                </div>
            </div>
            
            <div style="display: flex; justify-content: flex-end;" v-if="isEdit">
                <input type="button" class="btn" style="--i: url('/img/back.png')" @click="(() => {$router.push({path: 'journey', query: $router.currentRoute.value.query});})" value="返回" />
                <input type="button" class="btn" style="--i: url('/img/editor.png')" @click="edit" value="修改" />
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
 * 普升金
 */
@Options({
  props: {
    dd: null,
    value: null,
    active: null,
    remove: null,
    isEdit: null,
    edit: null,
  }
})
export default class JourneyTmp208 extends Vue {
    dd!: JourneyModel;
    value!: JourneyNodeModel;
    active!: () => void;
    edit!: () => void;
    remove!: () => void;
    isEdit!: boolean;

    onClick(): void {
        this.active();
    }

    onRemove(): void {
        this.remove();
    }
}
</script>