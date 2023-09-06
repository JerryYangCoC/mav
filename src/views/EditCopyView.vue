<template>
    <div class="roadmap-box">
      <span>文案製作作業 - {{ isEdit ? '修改' : '瀏覽'}}</span>
    </div>
    <div style="padding: 18px 24px;">
        <div style="text-align: left;">
            <div style="display: grid; grid-template-columns: 33% 33%;">
                <div>
                    <span><span class="ask-red">*</span>文案型態：</span>
                    <select v-model="copyData.CopyWriteType" disabled>
                        <option value="01">01：簡訊</option>
                        <option value="02">02：APP</option>
                    </select>
                </div>

                <div>
                    <span><span class="ask-red">*</span>旅程型態：</span>
                    <select style="min-width: 185px;" v-model="copyData.JourneyType" disabled>
                        <option value="01">01：回券-POS COUPON</option>
                        <option value="02">02：回券-精算抵用券</option>
                        <option value="03">03：生日</option>
                        <option value="04">04：新會員活動</option>
                        <option value="05">05：新會員權益</option>
                        <option value="06">06：商品購買</option>
                        <option value="07">07：金卡升等-金續金</option>
                        <option value="08">08：金卡升等-普升金</option>
                        <option value="09">09：準金卡升等</option>
                        <option value="10">10：名單匯入</option>
                    </select>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 33% 33% 33%;">
                <div>
                    <span>文案編號：</span>
                    <input type="text" v-model="copyData.CopyWriteID" disabled />
                    <button style="width: 60px;" disabled>複製</button>
                </div>

                <div>
                    <span><span class="ask-red">*</span>有效起日：</span>
                    <!-- <input style="width: 153px;" class="sd-text" type="date" max="9999-12-31" aria-required="false" aria-invalid="false" v-model="copyData.StartYMD" :disabled="!isEdit"> -->
                    <input type="text" id="StartYMD" @change="changeDate($event.target)" v-model="copyData.StartYMD" :disabled="!isEdit" />
                </div>

                <div>
                    <span><span class="ask-red">*</span>有效訖日：</span>
                    <!-- <input style="width: 153px;" class="sd-text" type="date" max="9999-12-31" aria-required="false" aria-invalid="false" v-model="copyData.EndYMD" :disabled="!isEdit"> -->
                    <input type="text" id="EndYMD" @change="changeDate($event.target)" v-model="copyData.EndYMD" :disabled="!isEdit" />
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 50% 50%;">
                <div>
                    <span><span class="ask-red">*</span>文案名稱：</span>
                    <input type="text" style="width: 250px;" v-model="copyData.CopyWriteName" :disabled="!isEdit" />
                </div>

                <div v-if="copyData.CopyWriteType == '02'">
                    <span><span class="ask-red">*</span>APP推播標題：</span>
                    <input type="text" style="width: 250px;" v-model="copyData.title" :disabled="!isEdit" />
                </div>
            </div>
            
            <div>
                <div>
                    <span>參數型態：</span>
                    <select v-model="copyData.ParamType" @change="changeParam()" :disabled="!isEdit">
                        <option value="00">00：無</option>
                        <option value="01">01：預定義</option>
                        <option value="02">02：自定義</option>
                    </select>
                </div>
            </div>

            <div>
                <div>
                    <span><span class="ask-red">*</span>文案參數：</span>
                    <input type="text" placeholder="參數一" v-model="copyData.Param1" :disabled="!isEdit" />
                    <input type="text" placeholder="參數二" v-model="copyData.Param2" :disabled="!isEdit" />
                    <input type="text" placeholder="參數三" v-model="copyData.Param3" :disabled="!isEdit" />
                    <input type="text" placeholder="參數四" v-model="copyData.Param4" :disabled="!isEdit" />
                    <input type="text" placeholder="參數五" v-model="copyData.Param5" :disabled="!isEdit" />
                </div>
            </div>

            <div v-if="copyData.CopyWriteType == '02'">
                <div>
                    <span><span class="ask-red">*</span>顯示類型：</span>
                    <select v-model="copyData.type" :disabled="!isEdit">
                        <option value="show">show: 顯示</option>
                        <option value="open">open: 打開</option>
                    </select>
                </div>
            </div>

            <div v-if="copyData.CopyWriteType == '02' && copyData.type == 'open'">
                <div>
                    <span><span class="ask-red">*</span>推播網址：</span>
                    <input type="text" v-model="copyData.cta_url" :disabled="!isEdit" />
                </div>
            </div>

            <div v-if="copyData.CopyWriteType == '02'">
                <div>
                    <span>圖片網址：</span>
                    <input type="text" v-model="copyData.image" pattern="^https.*" :disabled="!isEdit" />
                </div>
            </div>

            <div>
                <div style="display: flex;">
                    <span style="padding-top: 8px;"><span class="ask-red">*</span>文案內容：</span>
                    <textarea
                        v-model="copyData.message"
                        :disabled="!isEdit"
                        :placeholder="copyData.CopyWriteType == '01' ? '字數一則70字' : '字數限制200字，建議70字以內所有手機才能顯示'"
                        :maxlength="copyData.CopyWriteType == '01' ? 70 : 200"></textarea>
                </div>
            </div>

            <div v-if="copyData.CopyWriteType == '02' && copyData.type == 'open'">
                <div>
                    <span>按鈕標題：</span>
                    <input type="text" v-model="copyData.cta_title" :disabled="!isEdit" />
                </div>
            </div>
        </div>

        <div style="display: flex; justify-content: flex-end;">
            <div style="padding: 12px 6px;" v-if="!isEdit">
                <!-- <button class="btn-blue" style="--i: url('/img/create.png')" @click="(() => {isEdit = true})">修改</button> -->
                <input type="button" class="btn" style="--i: url('/img/create.png')" @click="(() => {isEdit = true})" value="修改" />
            </div>
            
            <div style="padding: 12px 6px;" v-if="!isEdit">
                <!-- <button class="btn-red" style="--i: url('/img/clear.png')" @click="onDel()">刪除</button> -->
                <input type="button" class="btn" style="--i: url('/img/clear.png')" @click="onDel()" value="刪除" />
            </div>

            <div style="padding: 12px 6px;">
                <!-- <button class="btn-blue" style="--i: url('/img/redo.png')" @click="onToList()">返回</button> -->
                <input type="button" class="btn" style="--i: url('/img/redo.png')" @click="onToList()" value="返回" />
            </div>

            <div style="padding: 12px 6px;" v-if="isEdit">
                <!-- <button class="btn-blue" style="--i: url('/img/baseline_save.png'); width: 120px;" @click="onEdit()">存檔(返回)</button> -->
                <input type="button" class="btn" style="--i: url('/img/baseline_save.png'); width: 100px;" @click="onEdit()" value="資料送出" />
            </div>
        </div>
    </div>
    <ConfirmDialog></ConfirmDialog>
</template>

<script lang="ts">
import store from '@/store';
import { Options, Vue } from 'vue-class-component';
import { CopyModel } from '../model/copyList.model';
import Dialog from 'primevue/dialog';
import ConfirmDialog from 'primevue/confirmdialog';
import axios from 'axios';
import { useConfirm } from "primevue/useconfirm";
import moment from 'moment';

@Options({
    components: {

    }
})
export default class EditCopyView extends Vue {
    copyData: CopyModel = {
        CopyWriteName: '',
        CopyWriteType: '01',
        FileType: '2',
        JourneyType: '',
        StartYMD: '',
        EndYMD: '',
        type: 'show',
    };
    isEdit = false;
    confirm = useConfirm();

    /**
     * 初始化
     */
    created(): void {
        console.log('new view copy page')
        this.init();
    }

    init(): void {
        this.copyData = store.state.copy.copyDetail
    }

    onDel(): void {
        this.confirm.require({
            message: '請確認是否「刪除」！',
            header: '確認',
            acceptClass: 'p-button-danger',
            acceptLabel: '取消',
            rejectLabel: '確認',
            reject: () => {
                this.copyData.FileType = '3'
                store.dispatch('setCopy', this.copyData)
                setTimeout(() => {
                    this.onToList();
                }, 300)
            }
        });
    }

    onToList(): void {
        this.$router.push({path: 'copy', query: this.$router.currentRoute.value.query});
        store.state.copy.copyDetail = null
    }

    onEdit(): void {
        console.log(this.copyData)
        this.copyData.UserID = this.$router.currentRoute.value.query?.UserID?.toString();
        this.copyData.FileType = '2'
        this.copyData.StartYMD = this.copyData.StartYMD.replace(/-/g, '/')
        this.copyData.EndYMD = this.copyData.EndYMD.replace(/-/g, '/')

        axios.post('http://10.2.126.194:8030/app/v1/api/CDP/CopyWriteImport', this.copyData)
            .then((res) => {
                console.log('set copy', res)
                if (res.status == 200) {
                    switch(res.data?.Status) {
                        case '0':
                            // 成功
                            alert('修改成功')
                            this.onToList();
                            break;

                        case '1':
                            // 失敗
                            alert(res.data?.Message);
                            store.dispatch('upSess')
                            break;

                        default:
                            break;
                    }
                }
            }).catch((err) => {
                console.log(err)
            })
        // store.dispatch('setCopy', this.copyData)
    }

    /**
     * 轉換日期
     * @param value 日期Event
     */
     changeDate(value: any): void {
        let date = value.value
        if (date?.length == 4) {
        date = moment(date, "MMDD").format('YYYY/MM/DD')
        }
        
        if (date?.length == 8) {
        date = moment(date, "YYYYMMDD").format('YYYY/MM/DD')
        }
        
        if (date == 'Invalid date' || date?.length != 10) {
        date = ''
        alert('日期格式錯誤')
        }
        
        value.id == 'StartYMD' ? this.copyData.StartYMD = date : this.copyData.EndYMD = date
    }

    changeParam(): void {
        if (this.copyData.ParamType == '02') return;

        this.copyData.Param1 = ''
        this.copyData.Param2 = ''
        this.copyData.Param3 = ''
        this.copyData.Param4 = ''
        this.copyData.Param5 = ''

        if (this.copyData.ParamType == '01') {
            switch (this.copyData.JourneyType) {
                case '01':
                    this.copyData.Param1 = '%COUONID%'
                    this.copyData.Param2 = '%PromoEndDate%'
                    break;

                case '02':
                    this.copyData.Param1 = '%CopCode%'
                    this.copyData.Param2 = '%EndDate%'
                    break;

                case '03':
                    this.copyData.Param1 = '%M%'
                    this.copyData.Param2 = '%D%'
                    this.copyData.Param3 = '%WEEK%'
                    break;

                case '06':
                    this.copyData.Param1 = '%ItemCode%'
                    break;

                case '07':
                case '08':
                    this.copyData.Param1 = '%M%+3';
                    break;

                default:
                    break;
            }
        }
    }
}
</script>
<style scoped lang="scss">

</style>