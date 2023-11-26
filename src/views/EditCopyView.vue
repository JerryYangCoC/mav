<template>
    <div class="roadmap-box">
      <span>文案製作作業 - {{ isEdit ? '修改' : '瀏覽'}}</span>
    </div>
    <div>
        <div class="form-box">
            <div style="display: grid; grid-template-columns: 33% 33%;">
                <div style="display: grid; grid-template-columns: 90px auto; place-items: center end; justify-content: start;">
                    <span><span class="ask-red">*</span>文案型態：</span>
                    <select v-model="copyData.CopyWriteType" disabled>
                        <option value="01">01：簡訊</option>
                        <option value="02">02：APP</option>
                    </select>
                </div>

                <div style="display: grid; grid-template-columns: 90px auto; place-items: center end; justify-content: start;">
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
                <div style="display: grid; grid-template-columns: 90px auto; place-items: center end; justify-content: start;">
                    <span>文案編號：</span>
                    <div>
                        <input type="text" v-model="copyData.CopyWriteID" disabled />
                        <button style="width: 60px;" disabled>複製</button>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 90px auto; place-items: center end; justify-content: start;">
                    <span><span class="ask-red">*</span>有效起日：</span>
                    <input type="text" id="StartYMD" @change="changeDate($event.target)" @blur="onStartYMD()" v-model="copyData.StartYMD" :disabled="!isEdit" />
                </div>

                <div style="display: grid; grid-template-columns: 90px auto; place-items: center end; justify-content: start;">
                    <span><span class="ask-red">*</span>有效訖日：</span>
                    <input type="text" id="EndYMD" @change="changeDate($event.target)" @blur="onEndYMD()" v-model="copyData.EndYMD" :disabled="!isEdit" />
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 50% 50%;">
                <div style="display: grid; grid-template-columns: 90px auto; place-items: center end; justify-content: start;">
                    <span><span class="ask-red">*</span>文案名稱：</span>
                    <input type="text" style="width: 250px;" v-model="copyData.CopyWriteName" :disabled="!isEdit" />
                </div>

                <div v-if="copyData.CopyWriteType == '02'" style="display: grid; grid-template-columns: 120px auto; place-items: center end; justify-content: start;">
                    <span><span class="ask-red">*</span>APP推播標題：</span>
                    <input type="text" style="width: 250px;" v-model="copyData.title" :disabled="!isEdit" />
                </div>
            </div>
            
            <div>
                <div style="display: grid; grid-template-columns: 90px auto; place-items: center end; justify-content: start;">
                    <span><span class="ask-red">*</span>參數型態：</span>
                    <select v-model="copyData.ParamType" disabled>
                        <option value="00">00：無</option>
                        <option value="01">01：預定義</option>
                        <option value="02">02：自定義</option>
                    </select>
                </div>
            </div>

            <div>
                <div style="display: grid; grid-template-columns: 90px auto; place-items: center end; justify-content: start;">
                    <span>文案參數：</span>
                    <div>
                        <input type="text" placeholder="參數一" v-model="copyData.Param1" :disabled="!isEdit" />
                        <input type="text" placeholder="參數二" v-model="copyData.Param2" :disabled="!isEdit" />
                        <input type="text" placeholder="參數三" v-model="copyData.Param3" :disabled="!isEdit" />
                        <input type="text" placeholder="參數四" v-model="copyData.Param4" :disabled="!isEdit" />
                        <input type="text" placeholder="參數五" v-model="copyData.Param5" :disabled="!isEdit" />
                    </div>
                </div>
            </div>

            <div v-if="copyData.CopyWriteType == '02'">
                <div style="display: grid; grid-template-columns: 90px auto; place-items: center end; justify-content: start;">
                    <span><span class="ask-red">*</span>顯示類型：</span>
                    <select v-model="copyData.type" :disabled="!isEdit">
                        <option value="show">show: 顯示</option>
                        <option value="open">open: 打開</option>
                    </select>
                </div>
            </div>

            <div v-if="copyData.CopyWriteType == '02' && copyData.type == 'open'">
                <div style="display: grid; grid-template-columns: 90px auto;  place-items: center end; justify-content: start;">
                    <span><span class="ask-red">*</span>推播網址：</span>
                    <input type="text" style="width: 80vw;" v-model="copyData.cta_url" :disabled="!isEdit" />
                </div>
            </div>

            <div v-if="copyData.CopyWriteType == '02'">
                <div style="display: grid; grid-template-columns: 90px auto; place-items: start end; justify-content: start;">
                    <span style="padding-top: 8px;">推播圖片：</span>
                    <div style="margin: 6px; min-width: 80vw;">
                        <Toast position='top-center' />
                        <FileUpload
                            url="http://10.2.126.194:8030/app/v1/api/CDP/UploadImages"
                            @upload="onAdvancedUpload($event)"
                            @error="onErrorEvent"
                            @before-send="store.dispatch('upLoading', true)"
                            @uploader="store.dispatch('upLoading', false)"
                            :multiple="true"
                            :fileLimi="1"
                            accept="image/*"
                            :maxFileSize="2097152"
                            :invalidFileSizeMessage="'檔案無法上傳，圖片須為(900*900)(檔案大小限制2MB)'"
                            :pt="{
                                message: { 
                                    root: {
                                        class: 'popup p-toast'
                                    }
                                }
                            }">
                            <template #header="{ chooseCallback, uploadCallback, files }">
                                <div>
                                    <div>
                                        <input type="button" style="width: 80px;" @click="onChooseEvent(chooseCallback)" :disabled="files && files.length > 0" value="選擇檔案" />
                                        <input type="button" style="width: 80px;" @click="onUploadEvent(uploadCallback, files, (() => { toast.add({ severity: 'error', detail: '檔案無法上傳，圖片須為(900*900)(檔案大小限制2MB)' }); }))" :disabled="!files || files.length === 0" value="檔案上傳" />
                                        <span>(900*900)(檔案大小限制2MB)</span>
                                    </div>
                                </div>
                            </template>
    
                            <template #content v-if="visible">
                                <div class="p-fileupload-file">
                                    <img role="presentation" :src="copyData?.image" width="50" class="p-fileupload-file-thumbnail">
                                    
                                    <div class="p-fileupload-file-details">
                                        <div class="p-fileupload-file-name">{{  copyData?.image?.split('http://10.2.126.194:8010/APPImage/')[1] }}</div>
                                    </div>
                                    
                                    <div class="p-fileupload-file-actions" v-if="isEdit">
                                        <button class="p-button p-component p-button-icon-only p-button-danger p-button-rounded p-button-text p-fileupload-file-remove" type="button" @click="onRemove()" outlined rounded  severity="danger">
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="p-icon p-button-icon" aria-hidden="true">
                                                <path d="M8.01186 7.00933L12.27 2.75116C12.341 2.68501 12.398 2.60524 12.4375 2.51661C12.4769 2.42798 12.4982 2.3323 12.4999 2.23529C12.5016 2.13827 12.4838 2.0419 12.4474 1.95194C12.4111 1.86197 12.357 1.78024 12.2884 1.71163C12.2198 1.64302 12.138 1.58893 12.0481 1.55259C11.9581 1.51625 11.8617 1.4984 11.7647 1.50011C11.6677 1.50182 11.572 1.52306 11.4834 1.56255C11.3948 1.60204 11.315 1.65898 11.2488 1.72997L6.99067 5.98814L2.7325 1.72997C2.59553 1.60234 2.41437 1.53286 2.22718 1.53616C2.03999 1.53946 1.8614 1.61529 1.72901 1.74767C1.59663 1.88006 1.5208 2.05865 1.5175 2.24584C1.5142 2.43303 1.58368 2.61419 1.71131 2.75116L5.96948 7.00933L1.71131 11.2675C1.576 11.403 1.5 11.5866 1.5 11.7781C1.5 11.9696 1.576 12.1532 1.71131 12.2887C1.84679 12.424 2.03043 12.5 2.2219 12.5C2.41338 12.5 2.59702 12.424 2.7325 12.2887L6.99067 8.03052L11.2488 12.2887C11.3843 12.424 11.568 12.5 11.7594 12.5C11.9509 12.5 12.1346 12.424 12.27 12.2887C12.4053 12.1532 12.4813 11.9696 12.4813 11.7781C12.4813 11.5866 12.4053 11.403 12.27 11.2675L8.01186 7.00933Z" fill="currentColor"></path>
                                            </svg>
                                            <span class="p-button-label" data-pc-section="label">&nbsp;</span>
                                        </button>
                                    </div>
                                </div>
                            </template>
                        </FileUpload>
                    </div>
                </div>
            </div>

            <div>
                <div style="display: grid; grid-template-columns: 90px auto; place-items: start end; justify-content: start;">
                    <span style="padding-top: 8px;"><span class="ask-red">*</span>文案內容：</span>
                    <div style="display: grid;">
                        <textarea
                            v-model="copyData.message"
                            :disabled="!isEdit"
                            :placeholder="copyData.CopyWriteType == '01' ? '字數一則70字' : '字數限制200字，建議70字以內所有手機才能顯示'"></textarea>
                        <div>
                            <span :style="copyData.message && copyData.message.length > 70 ? 'color: red;' : 'color: black;'">{{ copyData.message?.length ?? '0' }}</span>/70
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="copyData.CopyWriteType == '02' && copyData.type == 'open'">
                <div style="display: grid; grid-template-columns: 90px auto;  place-items: center end; justify-content: start;">
                    <span>按鈕標題：</span>
                    <input type="text" style="width: 80vw;" v-model="copyData.cta_title" :disabled="!isEdit" />
                </div>
            </div>
        </div>

        <div style="display: flex; justify-content: flex-end;">
            <div style="padding: 12px 6px;" v-if="!isEdit">
                <input type="button" class="btn" style="--i: url('/img/create.png')" @click="(() => {isEdit = true})" value="修改" />
            </div>
            
            <div style="padding: 12px 6px;" v-if="!isEdit">
                <input type="button" class="btn" style="--i: url('/img/clear.png')" @click="onDel()" value="刪除" />
            </div>

            <div style="padding: 12px 6px;">
                <input type="button" class="btn" style="--i: url('/img/redo.png')" @click="onToList()" value="返回" />
            </div>

            <div style="padding: 12px 6px;" v-if="isEdit">
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
import { useToast } from 'primevue/usetoast';
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
    toast = useToast();
    store = store;
    visible = false;

    /**
     * 初始化
     */
    created(): void {
        console.log('new view copy page')
        this.init();
    }

    init(): void {
        this.copyData = store.state.copy.copyDetail
        this.visible = this.copyData.image ? true : false;
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
                }, 150)
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

    onRemove(): void {
        this.copyData.image = '';
        this.visible = false;
    }

    onAdvancedUpload(event: any): void {
        console.log(event)
        let xhr: XMLHttpRequest = event?.xhr
        let res = JSON.parse(xhr.response)
        store.dispatch('upLoading', false)
        console.log(res)
        if (res.Status == '0') {
            this.copyData.image = res.ImageName
            return;
        }
        this.toast.add({ severity: "error", summary: res.Message });
    }

    onErrorEvent(): void {
        store.dispatch('upLoading', false)
        this.toast.add({ severity: "error", summary: "檔案上傳失敗" });
    }

    onUploadEvent(callbark: any, files: File[], error: any): void {
        var _URL = window.URL || window.webkitURL; // 檢查各個瀏覽器的 method
        var img = new Image();
        img.onload = function() {
            console.log(img.height, img.width);
            if (img.height != 900 || img.width != 900) {
                error()
                return false;
            }
            callbark()
        };
        
        img.src = _URL.createObjectURL(files['0']);
    }

    onChooseEvent(callbark: any): void {
        if (!this.isEdit || this.visible) return;

        callbark();
    }

    onStartYMD(): void {
        setTimeout(() => {
            this.copyData.StartYMD = (window.document.getElementById('StartYMD') as any).value
        }, 150)
    }

    onEndYMD(): void {
        setTimeout(() => {
            this.copyData.EndYMD = (window.document.getElementById('EndYMD') as any).value
        }, 150)
    }

    /**
     * 轉換日期
     * @param value 日期Event
     */
     changeDate(value: any): void {
        if(value.value == '') return;
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
                    this.copyData.Param1 = '%CouponMoney%'
                    this.copyData.Param2 = '%PromoEndDate%'
                    break;

                case '02':
                    this.copyData.Param1 = '%CopMoney%'
                    this.copyData.Param2 = '%EndDate%'
                    break;

                case '03':
                    this.copyData.Param1 = '%MM%'
                    this.copyData.Param2 = '%DD%'
                    break;

                case '06':
                    this.copyData.Param1 = '%ItemName%'
                    break;

                case '07':
                case '08':
                    this.copyData.Param1 = '%MM%';
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