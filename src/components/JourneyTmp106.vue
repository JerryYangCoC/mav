<template>
    <div>
        <form @submit.prevent="onClick()">
            <div style="display: grid; grid-template-columns: 50% 50%;">
                <div style="display: grid; grid-template-columns: 160px auto; align-items: center; justify-content: start; justify-items: end;">
                    <span><span class="ask-red">*</span>文案：</span>
                    <!-- <input type="text" v-model="value.VariableList" disabled /> -->
                    <div style="display: flex;">
                        <input type="text" :value="selectActivity.CopyWriteID" style="width: 100px;" disabled >
                        <input type="text" :value="selectActivity.CopyWriteName" style="width: 200px;" disabled >
                        <input type="button" class="btn-white" style="--i: url('/img/more_horiz.svg'); width: 40px;" @click="queryActivityView = true; onSearch();" :disabled="isEdit" /> 

                    </div>
                </div>
    
                <div style="display: grid; grid-template-columns: 160px auto; align-items: center; justify-content: start; justify-items: end;">
                    <span>發送人數上限：</span>
                    <input type="text" style="width: 150px;" v-model="value.PeopleLimt" :disabled="isEdit" />
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 50% 50%;">
                <div style="display: grid; grid-template-columns: 160px auto; align-items: center; justify-content: start; justify-items: end;">
                    <span>參數上傳：</span>
                    <!-- <input type="text" style="width: 300px;" v-model="dd.JourneyName" required /> -->
                    <div style="display: flex;" v-if="dd.JourneyType == '01' || dd.JourneyType == '02' || dd.JourneyType == '06'">
                        <input type="file" style="width: 300px;" @change="previewFiles($event, onFile)" accept=".csv" :disabled="isEdit" />
                        <input type="button" class="btn" style="--i: url('/img/export.png'); width: 100px;" @click="onExportFile" value="範例檔案" :disabled="isEdit" />
                    </div>

                </div>
    
                <div style="display: grid; grid-template-columns: 160px auto; align-items: center; justify-content: start; justify-items: end;">
                    <span><span class="ask-red">*</span>狀態：</span>
                    <select v-model="value.SendType" style="width: 150px;" disabled>
                        <option value="0">尚未發送</option>
                        <option value="1">已發送</option>
                        <option value="2">部份發送</option>
                        <option value="3">暫停</option>
                    </select>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 160px auto; align-items: center; justify-content: start; justify-items: end;">
                <span>排除已設定旅程：</span>
                <div>
                    <input type="text" style="width: 150px;" v-model="value.RemindedDate" :disabled="isEdit" />
                    <span>天</span>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 50% 50%;">
                <div style="display: grid; grid-template-columns: 160px auto; align-items: center; justify-content: start; justify-items: end;">
                    <span><span class="ask-red">*</span>願意收促銷訊息：</span>
                    <div>
                        <input type="radio" id="true" value="0" v-model="value.IsRecvMsgFlag" style="width: 20px; height: 20px;" :disabled="isEdit">
                        <label for="true">是</label>
                        <input type="radio" id="false" value="1" v-model="value.IsRecvMsgFlag" style="width: 20px; height: 20px;" :disabled="isEdit">
                        <label for="false">全部</label>
                    </div>
                </div>

                <div style="text-align: right; padding-right: 100px;">
                    <span v-show="tempPeople != ''">{{ tempPeople }} 人</span>
                </div>
            </div>
            
            <div style="display: flex; justify-content: flex-end;" v-if="isEdit">
                <input type="button" class="btn" style="--i: url('/img/back.png')" @click="(() => {$router.push({path: 'journey', query: $router.currentRoute.value.query});})" value="返回" />
                <input type="button" class="btn" style="--i: url('/img/editor.png')" @click="edit" value="修改" :disabled="dd.SendFlag == '1'" />
            </div>
            
            <div style="display: flex; justify-content: flex-end;" v-else>
                <input type="button" class="btn" style="--i: url('/img/search.png'); width: 100px;" @click="onPreview()" value="預覽文案" />
                <input type="button" class="btn" style="--i: url('/img/sent.png')" @click="onStash()" value="暫存" />

                <input type="submit" class="btn" style="--i: url('/img/sent.png')" value="確認" />
            </div>
        </form>
    </div>

    <Dialog v-model:visible="queryActivityView" modal :show-header="false" :style="{ width: '60vw' }">
        <div class="box-copy">
            <div style="text-align: center;">
                <input type="text" style="width: 200px;" v-model="query.CopyWriteID" placeholder="編號" @change="onSearch()" />
                <input type="text" style="width: 200px;" v-model="query.CopyWriteName" placeholder="名稱" @change="onSearch()" />
                <!-- <button @click="queryView = false">返回</button> -->
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
                        <!-- <a class="btn-blue" @click="selectActivity = slotProps.node.data; queryActivityView = false;">選取</a> -->
                        <input type="button" class="btn-def" @click="selectActivity = slotProps.node.data; queryActivityView = false;" value="選取" />
                    </template>
                </Column>
                <Column field="CopyWriteID" header="編號"></Column>
                <Column field="CopyWriteName" header="名稱"></Column>
            </TreeTable>
        </div>
    </Dialog>

    <Dialog v-model:visible="copyWriteView" :closable="false" modal header="文案預覽" :style="{ width: '60vw' }">
        <div>
            {{ copyWriteContent() }}
        </div>

        <div style="display: flex; justify-content: flex-end; margin-top: 12px;">
            <input type="button" class="btn" style="--i: url('/img/back.png')" @click="copyWriteView = false;" value="返回" />
        </div>
    </Dialog>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { CouponModel, JourneyModel, JourneyNodeModel, ProductModel } from '@/model/journeyList.model';
import * as XLSX from 'xlsx';
import store from '@/store';
import axios from 'axios';

/**
 * 簡訊
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
export default class JourneyTmp106 extends Vue {
    dd!: JourneyModel;
    value!: JourneyNodeModel;
    active!: () => void;
    edit!: () => void;
    remove!: () => void;
    queryActivityView = false;
    copyWriteView = false;
    selectActivity = {
        CopyWriteID: '',
        CopyWriteName: ''
    }
    query = {
        CopyWriteName: '',
        JourneyType: '',
        CopyWriteID: '',
        CopyWriteType: '01'
    }
    tempPeople = '';
    isEdit!: boolean;
    fileTitle!: string;
    fileData = [{}];

    created(): void {
        this.selectActivity = {
            CopyWriteID: this.value.CopyWriteId ?? '',
            CopyWriteName: this.value.CopyWriteName ?? ''
        }

        switch(this.dd.JourneyType) {
            case '01':
                // eslint-disable-next-line no-case-declarations
                this.fileData = this.dd.Content[0].CouponList?.map((v: CouponModel) => {
                    return {
                        COUPONID: v.CouponNo + '\t'
                    }
                })
                this.fileTitle = 'COUPONID'
                break;

            case '02':
                // eslint-disable-next-line no-case-declarations
                this.fileData = this.dd.Content[0].CouponsList?.map((v: CouponModel) => {
                    return {
                        CopCode: v.CouponNo + '\t'
                    }
                })
                this.fileTitle = 'CopCode'
                break;

            case '06':
                // eslint-disable-next-line no-case-declarations
                this.fileData = this.dd.Content[0].ProductList?.map((v: ProductModel) => {
                    return {
                        ItemCode: v.itemCode + '\t'
                    }
                })
                this.fileTitle = 'ItemCode'
                break;


            default:
                break;

        }
    }

    onClick(): void {
        if (!this.selectActivity.CopyWriteID) return;
        this.value.CopyWriteId = this.selectActivity.CopyWriteID
        this.value.CopyWriteName = this.selectActivity.CopyWriteName
        this.active();
    }

    onRemove(): void {
        this.remove();
    }

    /**
     * 暫存人數
     */
    onStash(): void {
        let data = {
            JourneyType: '2' + this.dd.JourneyType,
            StartDate: this.dd.StartDate,
            EndDate: this.dd.EndDate,
            NodeType: '106',
            NodeSeq: this.value.NodeSeq,
            IsRecvMsgFlag: this.value.IsRecvMsgFlag,
            RemindedDate: this.value.RemindedDate,
            SendType: this.dd.Content[1].SendType,
            SelectTime: this.dd.Content[1].SelectTime,
            SendTime: this.dd.Content[1].SendTime,
            IsBestOffer: this.dd.Content[1].IsBestOffer,
            CouponsList: null,
            SelectDate: null,
            NewMemStartYMD: null,
            NewMemEndYMD: null,
            NewMemSelectDate: null,
            ProductList: null,
            IsMaxPay: null,
            PayStartYMD: null,
            PayEndYMD: null,
            Import: null,
            ActivityType: null,
            ActivityList: null,
            DateType: null,
            PayAmtStart: null,
            PayAmtEnd: null,
            JudgeType: null,
            ConsumeStartYMD: null,
            ConsumeEndYMD: null,
            GoldSelectDate: null,
            RemindedStartYMD: null,
            RemindedEndYMD: null,
            BirthSelectmonth: null,
        }

        if (this.value.NodeSeq && this.value.NodeSeq?.split('-').length > 2) {
            let seqL = this.value.NodeSeq.split('-');
            let seqE = seqL[seqL.length - 1]
            let seq = this.value.NodeSeq.slice(0, this.value.NodeSeq.length - seqE.length - 1)

            this.dd.Content.forEach((ver: JourneyNodeModel) => {
                if (ver.NodeSeq && ver.NodeSeq == seq) {
                    let select = this.dd.Content.filter((v: JourneyNodeModel) => v.NodeId == ver.Position[0].target)
                    // console.log('select', select[0])
                    if (select.length > 0) {
                        data.SendType = select[0].SendType
                        data.SelectTime = select[0].SelectTime
                        data.SendTime = select[0].SendTime
                        data.IsBestOffer = select[0].IsBestOffer
                    }

                    if (this.dd.JourneyType != '05' && this.dd.JourneyType != '07' && this.dd.JourneyType != '08') {
                        let select2 = this.dd.Content.filter((v: JourneyNodeModel) => v.NodeId == select[0].Position[0].target)
                        // console.log('select2', select2[0])
                        if (select2.length > 0 && select2[0].NodeType == '107') {
                            data.JudgeType = select2[0].JudgeType
                            data.ConsumeStartYMD = select2[0]?.ConsumeStartYMD
                            data.ConsumeEndYMD = select2[0]?.ConsumeEndYMD
                            data.GoldSelectDate = select2[0]?.GoldSelectDate
                            data.RemindedStartYMD = select2[0]?.RemindedStartYMD
                            data.RemindedEndYMD = select2[0]?.RemindedEndYMD
                            data.BirthSelectmonth = select2[0]?.BirthSelectmonth
                        }
                    }
                }
            })
        } else {
            if (this.dd.JourneyType != '05' && this.dd.JourneyType != '07' && this.dd.JourneyType != '08') {
                if (this.dd.Content[2].NodeType == '107') {
                    data.JudgeType = this.dd.Content[2].JudgeType
                    data.ConsumeStartYMD = this.dd.Content[2]?.ConsumeStartYMD
                    data.ConsumeEndYMD = this.dd.Content[2]?.ConsumeEndYMD
                    data.GoldSelectDate = this.dd.Content[2]?.GoldSelectDate
                    data.RemindedStartYMD = this.dd.Content[2]?.RemindedStartYMD
                    data.RemindedEndYMD = this.dd.Content[2]?.RemindedEndYMD
                    data.BirthSelectmonth = this.dd.Content[2]?.BirthSelectmonth
                }
            }
        }

        switch(this.dd.JourneyType) {
            case '01':
                data.CouponsList = this.dd.Content[0].CouponList
                break;

            case '02':
                data.CouponsList = this.dd.Content[0].CouponsList
                break;

            case '03':
            case '07':
            case '08':
                data.SelectDate = this.dd.Content[0].SelectDate
                break;

            case '09':
                data.DateType = this.dd.Content[0].DateType
                data.PayAmtStart = this.dd.Content[0].PayAmtStart
                data.PayAmtEnd = this.dd.Content[0].PayAmtEnd
                data.SelectDate = this.dd.Content[0].SelectDate
                break;

            case '04':
                data.NewMemStartYMD = this.dd.Content[0].NewMemStartYMD
                data.NewMemEndYMD = this.dd.Content[0].NewMemEndYMD
                break;

            case '05':
                data.NewMemSelectDate = this.dd.Content[0].NewMemSelectDate
                break;

            case '06':
                data.ProductList = this.dd.Content[0].ProductList
                data.IsMaxPay = this.dd.Content[0].IsMaxPay
                data.PayStartYMD = this.dd.Content[0].PayStartYMD
                data.PayEndYMD = this.dd.Content[0].PayEndYMD
                break;

            case '10':
                data.Import = this.dd.Content[0].Import
                data.ActivityType = this.dd.Content[0].ActivityType
                data.ActivityList = this.dd.Content[0].ActivityList
                break;
        }


        axios.post('http://10.2.126.194:8030/app/v1/api/CDP/JourneyTempPeopleGet', data)
            .then((res) => {
                console.log('Journey Temp People', res)
                if (res.status == 200 && res.data?.Status == '0') {
                    this.tempPeople = res.data.TempPeople
                }
            }).catch((err) => {
                console.log(err)
            })
    }

    onPreview(): void {
        if (!this.selectActivity.CopyWriteID) return
        
        let data = {
            CopyWriteID: this.selectActivity.CopyWriteID,
            JourneyType: this.dd.JourneyType,
            Param1: this.value.VariableList && this.value.VariableList.length > 0 ? this.value.VariableList?.[0].Param1 : '',
            Param2: this.value.VariableList && this.value.VariableList.length > 0 ? this.value.VariableList?.[0].Param2 : '',
            Param3: this.value.VariableList && this.value.VariableList.length > 0 ? this.value.VariableList?.[0].Param3 : '',
            Param4: this.value.VariableList && this.value.VariableList.length > 0 ? this.value.VariableList?.[0].Param4 : '',
            Param5: this.value.VariableList && this.value.VariableList.length > 0 ? this.value.VariableList?.[0].Param5 : '',
        }
        store.dispatch('getJourneyCopyWriteContent', data)

        setTimeout(() => {
            if (this.copyWriteContent()) this.copyWriteView = true;
        }, 500)
    }

    previewFiles(event: any, callbark: any): void {
        // console.log(this.value.ProductList)
        const fileReader = new FileReader();
        fileReader.readAsText(event.target.files[0]);
        fileReader.onload = function() {
            callbark(this.result)
        };
    }

    onFile(event: any): void {
        this.value.VariableList = event.split('\n').splice(1).map((ver: any) => {
            if (ver.replace(/\r/g, '')) {
                return {
                    VariableNo: ver.split(',')[0].replace(/\t/g, '').replace(/"/g, ''),
                    Param1: ver.split(',')[1],
                    Param2: ver.split(',')[2],
                    Param3: ver.split(',')[3],
                    Param4: ver.split(',')[4],
                    Param5: ver.split(',')[5].replace(/\r/g, ''),
                }
            }
        });

        this.value.VariableList = this.value.VariableList?.filter((v: any) => v != null)
    }

    onExportFile(): void {

        /* create a new blank workbook */
        let workbook = XLSX.utils.book_new();
        let worksheet = null
        let data = this.fileData

        worksheet = XLSX.utils.json_to_sheet(data);
        XLSX.utils.sheet_add_aoa(worksheet, [[this.fileTitle ?? 'Code', "參數1", "參數2", "參數3", "參數4", "參數5"]], { origin: "A1" });
        XLSX.utils.book_append_sheet(workbook, worksheet);


        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const excelBuffer = XLSX.write(workbook, { bookType: 'csv', type: 'array' });
        const data1 = new Blob([excelBuffer], { type: fileType });

        // eslint-disable-next-line @typescript-eslint/no-var-requires
        var FileSaver = require('file-saver');
        FileSaver.saveAs(data1, "範例檔案.csv");
    }
    
    onSearch(): void {
        this.query.JourneyType = this.dd.JourneyType ?? '';
        store.dispatch('getListJourneyCopy', this.query)
    }

    copyList(): any {
        return store.state.journey.journeyCopyList;
    }

    copyWriteContent(): any {
        return store.state.journey.journeyCopyContent
    }
}
</script>