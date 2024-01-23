<template>
    <div class="roadmap-box">
      <span>文案製作作業 - 新增</span>
    </div>
    <form @submit.prevent="onCreate()">
        <div class="form-box">
            <div style="display: grid; grid-template-columns: 33% 33%;">
                <div style="display: grid; grid-template-columns: 120px auto; place-items: center end; justify-content: start;">
                    <span><span class="ask-red">*</span>文案型態：</span>
                    <select v-model="copyData.CopyWriteType" required>
                        <option value="01">01：簡訊</option>
                        <option value="02">02：APP</option>
                    </select>
                </div>

                <div style="display: grid; grid-template-columns: 90px auto; place-items: center end; justify-content: start;">
                    <span><span class="ask-red">*</span>旅程型態：</span>
                    <select style="min-width: 185px;" v-model="copyData.JourneyType" @change="copyData.ParamType = ''; changeParam()" required>
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

            <div style="display: grid; grid-template-columns: 33% 33% 33%;;">
                <div style="display: grid; grid-template-columns: 120px auto; place-items: center end; justify-content: start;">
                    <span>文案編號：</span>
                    <div>
                        <input type="text" v-model="copyData.CopyWriteID" disabled />
                        <input type="button" style="width: 60px;" @click="visible = true" value="複製" />
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 90px auto; place-items: center end; justify-content: start;">
                    <span><span class="ask-red">*</span>有效起日：</span>
                    <input type="text" id="StartYMD" @change="changeDate($event.target)" @blur="onStartYMD()" autocomplete="off" v-model="copyData.StartYMD" required />
                </div>

                <div style="display: grid; grid-template-columns: 90px auto; place-items: center end; justify-content: start;">
                    <span><span class="ask-red">*</span>有效訖日：</span>
                    <input type="text" id="EndYMD" @change="changeDate($event.target)" @blur="onEndYMD()" autocomplete="off" v-model="copyData.EndYMD" required />
                </div>
            </div>

            <div>
                <div style="display: grid; grid-template-columns: 120px auto; place-items: center end; justify-content: start;">
                    <span><span class="ask-red">*</span>文案名稱：</span>
                    <input type="text" style="width: 250px;" v-model="copyData.CopyWriteName" required />
                </div>

            </div>
            
            <div>
                <div style="display: grid; grid-template-columns: 120px auto; place-items: center end; justify-content: start;">
                    <span><span class="ask-red">*</span>參數型態：</span>
                    <select v-model="copyData.ParamType" :disabled="copyParamType" @change="changeParam()">
                        <option value="00">00：無</option>
                        <option value="01" v-if="copyData.JourneyType && copyData.JourneyType != '04' && copyData.JourneyType != '05' && copyData.JourneyType != '09' && copyData.JourneyType != '10'">01：預定義</option>
                        <option value="02" v-if="copyData.JourneyType == '01' || copyData.JourneyType == '02' || copyData.JourneyType == '06'">02：自定義</option>
                    </select>
                </div>
            </div>

            <div>
                <div style="display: grid; grid-template-columns: 120px auto; place-items: center end; justify-content: start;">
                    <div>
                        <span>文案參數：</span>
                    </div>
                    <div>
                        <input type="text" placeholder="參數一" v-model="copyData.Param1" :disabled="copyData.ParamType != '02'"  />
                        <input type="text" placeholder="參數二" v-model="copyData.Param2" :disabled="copyData.ParamType != '02'"  />
                        <input type="text" placeholder="參數三" v-model="copyData.Param3" :disabled="copyData.ParamType != '02'"  />
                        <input type="text" placeholder="參數四" v-model="copyData.Param4" :disabled="copyData.ParamType != '02'"  />
                        <input type="text" placeholder="參數五" v-model="copyData.Param5" :disabled="copyData.ParamType != '02'" />
                    </div>
                </div>
            </div>

            <div style="margin-top: -10px;">
                <div style="display: grid; grid-template-columns: 120px auto; place-items: center end; justify-content: start;">
                    <span style="color: red; font-weight: bold;">（不可拖曳）</span>
                    <div></div>
                </div>
            </div>

            <div v-if="copyData.CopyWriteType == '02'">
                <div style="display: grid; grid-template-columns: 120px auto; place-items: center end; justify-content: start;">
                    <span><span class="ask-red">*</span>顯示類型：</span>
                    <select v-model="copyData.type" required>
                        <option value="show">show: 顯示</option>
                        <option value="open">open: 打開</option>
                    </select>
                </div>
            </div>

            <div v-if="copyData.CopyWriteType == '02' && copyData.type == 'open'">
                <div style="display: grid; grid-template-columns: 120px auto; place-items: center end; justify-content: start;">
                    <span><span class="ask-red">*</span>推播網址：</span>
                    <input type="text" style="width: 80vw;" v-model="copyData.cta_url" required />
                </div>

            </div>

            <div v-if="copyData.CopyWriteType == '02'">
                <div style="display: grid; grid-template-columns: 120px auto; place-items: start end; justify-content: start;">
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
                            :maxFileSize="1048576"
                            :invalidFileSizeMessage="'(建議900*900)(檔案大小限制1MB)(檔案格式為JPG、PNG、JPEG)'"
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
                                        <input type="button" class="" style="width: 80px;" @click="onChooseEvent(chooseCallback)" :disabled="files && files.length > 0" value="選擇檔案" />
                                        <input type="button" class="" style="width: 80px;" @click="onUploadEvent(uploadCallback, files, (() => { toast.add({ severity: 'error', detail: '檔案無法上傳，圖片須為(900*900)(檔案大小限制2MB)' }); }))" :disabled="!files || files.length === 0" value="檔案上傳" />
                                        <span>(建議900*900)(檔案大小限制1MB)(檔案格式為JPG、PNG、JPEG)</span>
                                    </div>
                                </div>
                            </template>
    
                            <template #content v-if="copyImageView">
                                <div class="p-fileupload-file">
                                    <img role="presentation" :src="copyData?.image" width="50" class="p-fileupload-file-thumbnail">
                                    
                                    <div class="p-fileupload-file-details">
                                        <div class="p-fileupload-file-name">{{  copyData?.image?.split('/')[4] }}</div>
                                    </div>
                                    
                                    <div class="p-fileupload-file-actions">
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

            <div v-if="copyData.CopyWriteType == '02'">
                <div style="display: grid; grid-template-columns: 120px auto; place-items: center end; justify-content: start;">
                    <span><span class="ask-red">*</span>APP推播標題：</span>
                    <input type="text" style="width: 250px;" v-model="copyData.title" required />
                </div>
            </div>
            
            <div>
                <div style="display: grid; grid-template-columns: 120px auto; place-items: start end; justify-content: start;">
                    <span style="padding-top: 8px;"><span class="ask-red">*</span>文案內容：</span>
                    <div style="display: grid;">
                        <textarea
                            v-model="copyData.message"
                            required
                            :placeholder="copyData.CopyWriteType == '01' ? '字數一則70字' : '字數限制200字，建議70字以內所有手機才能顯示'"
                            ></textarea>
                        
                        <div>
                            <span :style="copyData.message && copyData.message?.length > 70 ? 'color: red;' : 'color: black;'">{{ copyData.message?.length ?? '0' }}</span>/70
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="copyData.CopyWriteType == '02' && copyData.type == 'open'">
                <div style="display: grid; grid-template-columns: 120px auto; place-items: center end; justify-content: start;">
                    <span>按鈕標題：</span>
                    <input type="text" style="width: 80vw;" v-model="copyData.cta_title" />
                </div>
            </div>
        </div>

        <div style="display: flex; justify-content: flex-end;">
            <div style="padding: 12px 6px;">
                <input type="button" class="btn" style="--i: url('/img/redo.png')" @click="onToList()" value="返回" />
            </div>

            <div style="padding: 12px 6px;">
                <input type="button" class="btn" style="--i: url('/img/baseline_cleaning_services.png');" @click="init()" value="清除" />
            </div>

            <div style="padding: 12px 6px;">
                <input type="submit" class="btn"  style="--i: url('/img/baseline_save.png'); width: 140px;" value="存檔(連續新增)" />
            </div>
        </div>
    </form>

    <Dialog v-model:visible="visible" :closable="false" modal header="複製文案" :style="{ width: '50vw' }">
        <div>
            <div style="display: flex; align-items: center;">
                <span>文案：</span>
                <input type="text" v-model="changeCopy.CopyWriteID" disabled />
                <input type="text" v-model="changeCopy.CopyWriteName" disabled />
                <input type="button" class="btn-white" style="--i: url('/img/more_horiz.svg'); width: 40px;" @click="queryView = true; onSearch();" /> 
            </div>
        </div>
        <template #footer>
            <div style="display: flex; justify-content: center;">
                <input type="button" class="btn" style="--i: url('/img/redo.png')" @click="visible = false" value="返回" />
                <input type="button" class="btn" style="--i: url('/img/baseline_cleaning_services.png');" value="清除" @click="initCopy()" />
                <input type="button" class="btn"  style="--i: url('/img/baseline_save.png')" value="確認" @click="onCopy(changeCopy.CopyWriteID ?? '')" />
            </div>
        </template>

        
        <Dialog v-model:visible="queryView" modal :show-header="false" :style="{ width: '60vw' }">
            <div class="box-copy">
                <div style="text-align: center; display: flex;">
                    <input type="text" style="width: 200px;" v-model="query.CopyWriteID" placeholder="編號" />
                    <input type="text" style="width: 200px;" v-model="query.CopyWriteName" placeholder="名稱" />
                    <!-- <input type="button" class="btn-def" @click="onSearch()" value="搜尋" />
                    <input type="button" class="btn-def" @click="queryView = false;" value="返回" /> -->
                    <input type="button" class="btn" style="--i: url('/img/search.png')" @click="onSearch()" value="搜尋" />
                    <input type="button" class="btn" style="--i: url('/img/back.png')" @click="queryView = false;" value="返回" />
                </div>
                <TreeTable
                    :value="copyList()"
                    :paginator="true"
                    :rows="10"
                    :rowsPerPageOptions="[5, 10, 25, 50]"
                    :alwaysShow="true"
                    paginatorTemplate="RowsPerPageDropdown PrevPageLink PageLinks NextPageLink JumpToPageInput CurrentPageReport"
                    currentPageReportTemplate="{totalRecords} 筆 / 共 {totalPages} 頁"
                    >
                    <Column header="選取" style="width: 90px;">
                        <template #body="slotProps">
                            <!-- <a class="btn-blue" @click="changeCopy = slotProps.node.data; queryView = false;">選取</a> -->
                        <input type="button" class="btn-def" @click="changeCopy = slotProps.node.data; queryView = false;" value="選取" />
                        </template>
                    </Column>
                    <Column field="CopyWriteID" header="編號"></Column>
                    <Column field="CopyWriteName" header="名稱"></Column>
                </TreeTable>
            </div>
        </Dialog>
    </Dialog>
</template>

<script lang="ts">
import store from '@/store';
import { Options, Vue } from 'vue-class-component';
import { CopyModel } from '../model/copyList.model';
import axios from 'axios';
import moment from 'moment';
import { useToast } from 'primevue/usetoast';
import Message from 'primevue/message';
import $ from 'jquery';

@Options({
    components: {}
})
export default class AddCopyView extends Vue {
    copyData: CopyModel = {
        CopyWriteName: '',
        CopyWriteType: '01',
        FileType: '1',
        JourneyType: '',
        StartYMD: '',
        EndYMD: '',
        type: '',
    };
    visible = false;
    queryView = false;
    query = {
        CopyWriteName: '',
        CopyWriteType: '',
        CopyWriteID: ''
    }
    changeCopy: CopyModel =  {
        CopyWriteID: '',
        CopyWriteName: '',
        CopyWriteType: '',
        JourneyType: '',
        StartYMD: '',
        EndYMD: '',
        type: '',
    }; // 複製文案選擇資料
    toast = useToast();
    store = store;
    copyImageView = false;
    copyParamType = false;

    /**
     * 初始化
     */
    created(): void {
        console.log('new add copy page')

        $( function() {
            $( "#StartYMD" ).datepicker({
                dateFormat: "yy/mm/dd"
            });
            $( "#EndYMD" ).datepicker({
                dateFormat: "yy/mm/dd"
            });
        });


        setTimeout(() => {
            (document.getElementById("ui-datepicker-div") as any).addEventListener("click", function(event: any){
                if (event.target.innerText != 'Prev' && event.target.innerText != 'Next') {
                    $( "#StartYMD" ).datepicker( "hide" );
                    $( "#EndYMD" ).datepicker( "hide" );
                }
            });
        }, 300)
    }

    /**
     * 初始化
     */
    init(): void {
        this.copyData = {
            CopyWriteName: '',
            CopyWriteType: '01',
            FileType: '1',
            JourneyType: '',
            StartYMD: '',
            EndYMD: '',
            type: '',
        }
        this.copyImageView = false;
        this.copyParamType = false;

        store.dispatch('upLoading', false)
    }

    /**
     * 清除文案查詢
     */
    initCopy(): void {
        this.changeCopy =  {
            CopyWriteID: '',
            CopyWriteName: '',
            CopyWriteType: '',
            JourneyType: '',
            StartYMD: '',
            EndYMD: '',
            type: '',
        };
    }

    /**
     * 前往文案查詢頁面
     */
    onToList(): void {
        this.$router.push({path: 'copy', query: this.$router.currentRoute.value.query});
    }

    /**
     * 新增
     */
    onCreate(): void {
        // store.dispatch('upLoading', true)
        console.log(this.copyData)
        this.copyData.UserID = this.$router.currentRoute.value.query?.UserID?.toString();
        this.copyData.FileType = '1';

        axios.post('http://10.2.126.194:8030/app/v1/api/CDP/CopyWriteImport', this.copyData)
            .then((res) => {
                console.log('set copy', res)
                if (res.status == 200) {
                    switch(res.data?.Status) {
                        case '0':
                            // 成功
                            // alert('新增成功')
                            store.commit('setCopyQueryData', null)
                            store.commit('setCopy', [])
                            store.commit('setErrorMessage', '新增成功')
                            this.init();
                            break;

                        case '1':
                            // 失敗
                            // alert(res.data?.Message);
                            store.commit('setErrorMessage', res.data?.Message)
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
     * 查詢
     */
    onSearch(): void {
        this.query.CopyWriteType = this.copyData.CopyWriteType;
        store.dispatch('getCopy', this.query)
    }

    /**
     * 複製文案
     */
    onCopy(value: string): void {
        axios.post('http://10.2.126.194:8030/app/v1/api/CDP/CopyWriteSingleGet', { CopyWriteID: value })
            .then((res) => {
                console.log('copy detail', res)
                if (res.status == 200 && res.data?.Status == '0') {
                    let data = res.data?.CopyWrite_List[0]
                    this.copyData.CopyWriteName = data.CopyWriteName
                    this.copyData.JourneyType = data.JourneyType
                    this.copyData.StartYMD = data.StartYMD
                    this.copyData.EndYMD = data.EndYMD
                    this.copyData.Param1 = data.Param1
                    this.copyData.Param2 = data.Param2
                    this.copyData.Param3 = data.Param3
                    this.copyData.Param4 = data.Param4
                    this.copyData.Param5 = data.Param5
                    this.copyData.type = data.type
                    this.copyData.cta_url = data.cta_url
                    this.copyData.cta_title = data.cta_title
                    this.copyData.image = data.image
                    this.copyData.message = data.message
                    this.copyData.ParamType = data.ParamType
                    this.copyData.title = data.title

                    if (data.CopyWriteType == '02' && data.image) this.copyImageView = true;
                    this.copyParamType = true;
                    this.visible = false;
                }
            }).catch((err) => {
                console.log(err)
                // alert('複製文案失敗')
                store.commit('setErrorMessage', '複製文案失敗')
            })
    }

    /**
     * 文案列表
     */
    copyList(): any {
        return store.state.copy.copyList;
    }

    /**
     * 刪除圖片
     */
    onRemove(): void {
        this.copyData.image = '';
        this.copyImageView = false;
    }

    /**
     * 選擇檔案進行上傳
     * @param event 檔案
     */
    onAdvancedUpload(event: any): void {
        let xhr: XMLHttpRequest = event?.xhr
        let res = JSON.parse(xhr.response)
        store.dispatch('upLoading', false)
        if (res.Status == '0') {
            this.copyData.image = res.ImageName
            return;
        }
        this.toast.add({ severity: "error", summary: res.Message });
    }

    onChooseEvent(callbark: any): void {
        if (this.copyImageView) return;

        callbark();
    }
    
    /**
     * 失敗事件
     */
    onErrorEvent(): void {
        store.dispatch('upLoading', false)
        this.toast.add({ severity: "error", summary: "檔案上傳失敗" });
    }

    /**
     * 
     * @param callbark 
     * @param files 
     * @param error 
     */
    onUploadEvent(callbark: any, files: File[], error: any): void {
        var _URL = window.URL || window.webkitURL; // 檢查各個瀏覽器的 method
        var img = new Image();
        img.onload = function() {
            console.log(img.height, img.width);
            // if (img.height != 900 || img.width != 900) {
            //     error()
            //     return false;
            // }
            callbark()
        };
        
        img.src = _URL.createObjectURL(files['0']);
    }

    onStartYMD(): void {
        setTimeout(() => {
            this.copyData.StartYMD = (window.document.getElementById('StartYMD') as any).value
            // $( "#StartYMD" ).datepicker( "hide" );
        }, 300)
    }

    onEndYMD(): void {
        setTimeout(() => {
            this.copyData.EndYMD = (window.document.getElementById('EndYMD') as any).value
            // $( "#EndYMD" ).datepicker( "hide" );
        }, 300)
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
            // alert('日期格式錯誤')
            store.commit('setErrorMessage', '日期格式錯誤')
        }
        
        value.id == 'StartYMD' ? this.copyData.StartYMD = date : this.copyData.EndYMD = date
    }

    /**
     * 根據旅程型態鍵入文案參數
     */
    changeParam(): void {
        // if (this.copyData.ParamType == '02') return;

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
.ask-red {
    margin-top: 8px;
}
</style>