<template>
    <div style="padding: 18px 24px;">
        <div style="text-align: left;">
            <div style="display: grid; grid-template-columns: 33% 33%;">
                <div>
                    <span>文案型態：</span>
                    <select v-model="copyData.CopyWriteType">
                        <option value="1">簡訊</option>
                        <option value="2">APP</option>
                    </select>
                </div>

                <div>
                    <span>旅程型態：</span>
                    <select>
                        <option>回券-POS COUPON</option>
                        <option>回券-精算抵用券</option>
                        <option>生日</option>
                        <option>新會員活動</option>
                        <option>新會員權益</option>
                        <option>商品購買</option>
                        <option>金卡升等-金續金</option>
                        <option>金卡升等-普升金</option>
                        <option>準金卡升等</option>
                        <option>名單匯入</option>
                    </select>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 33% 33% 33%;">
                <div>
                    <span>文案編號：</span>
                    <input type="text" />
                    <button class="btn-blue" style="width: 60px;">複製</button>
                </div>

                <div>
                    <span>有效起日：</span>
                    <input type="date" />
                </div>

                <div>
                    <span>有效迄日：</span>
                    <input type="date" />
                </div>
            </div>

            <div>
                <div>
                    <span>文案名稱：</span>
                    <input type="text" />
                </div>
            </div>
            
            <div>
                <div>
                    <span>參數型態：</span>
                    <select>
                        <option>無</option>
                        <option>預定義</option>
                        <option>自定義</option>
                    </select>
                </div>
            </div>

            <div>
                <div>
                    <span>文案參數：</span>
                    <input type="text" placeholder="參數一" />
                    <input type="text" placeholder="參數二" />
                    <input type="text" placeholder="參數三" />
                    <input type="text" placeholder="參數四" />
                    <input type="text" placeholder="參數五" />
                </div>
            </div>

            <div>
                <div>
                    <span>文案內容：</span>
                    <textarea
                        :placeholder="copyData.CopyWriteType == '1' ? '字數一則70字' : '字數限制200字，建議70字以內所有手機才能顯示'"
                        :maxlength="copyData.CopyWriteType == '1' ? 70 : 200"></textarea>
                </div>
            </div>
        </div>

        <div style="display: flex; justify-content: flex-end;">
            <div style="padding: 12px 6px;">
                <button class="btn-blue" style="--i: url('/img/baseline_save.png'); width: 170px;">存檔(連續新增)</button>
            </div>
            
            <div style="padding: 12px 6px;">
                <button class="btn-blue" style="--i: url('/img/baseline_cleaning_services.png'); width: 120px;">清除重來</button>
            </div>

            <div style="padding: 12px 6px;">
                <button class="btn-blue" style="--i: url('/img/redo.png')" @click="onToList()">返回</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import store from '@/store';
import { Options, Vue } from 'vue-class-component';
import { CopyModel } from './copyList.model';
import Dialog from 'primevue/dialog';

@Options({
    components: {

    }
})
export default class AddCopyView extends Vue {
    copyData: CopyModel = {
        CopyWriteName: '',
        CopyWriteType: '1',
        FileType: '1',
        JourneyType: '01',
        StartYMD: '',
        EndYMD: '',
    };

    /**
     * 初始化
     */
    created(): void {
        console.log('new add copy page')
        console.log(this.copyData)
    }

    onToList(): void {
        this.$router.push("/copy");
    }
}
</script>
<style scoped lang="scss">

</style>