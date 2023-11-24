<template>
    <div>
        <form @submit.prevent="onClick()">
            <div style="display: grid; grid-template-columns: 160px auto auto auto; align-items: center; justify-content: start; justify-items: end;">
                <span><span class="ask-red">*</span>商品：</span>
                <input type="file" style="width: 300px;" @change="previewFiles($event, onFile)" accept=".csv" required v-if="!isEdit" />
                <input type="button" class="btn-white" style="--i: url('/img/more_horiz.svg'); width: 40px;" @click="queryView = true;" /> 
                <input type="button" class="btn" style="--i: url('/img/export.png'); width: 100px;" @click="onExportFile" value="範例檔案" v-if="!isEdit" />
            </div>

            <div style="display: grid; grid-template-columns: 160px auto; align-items: center; justify-content: start; justify-items: end;">
                <span><span class="ask-red">*</span>商品消費期間：</span>
                <div>
                    <input type="text" id="StartYMD" @change="changeDate($event.target)" @blur="onStartYMD()" v-model="value.PayStartYMD" required :disabled="isEdit" />
                    ～
                    <input type="text" id="EndYMD" @change="changeDate($event.target)" @blur="onEndYMD()" v-model="value.PayEndYMD" required :disabled="isEdit" />
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 160px auto; align-items: center; justify-content: start; justify-items: end;">
                <span><span class="ask-red">*</span>最大單品消費金額：</span>
                <div>
                    <input type="radio" id="true" value="0" style="width: 20px; height: 20px;" v-model="value.IsMaxPay" :disabled="isEdit">
                    <label for="true">是</label>
                    <input type="radio" id="false" value="1" style="width: 20px; height: 20px;" v-model="value.IsMaxPay" :disabled="isEdit">
                    <label for="false">否</label>
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


    <Dialog v-model:visible="queryView" modal :show-header="false" :style="{ width: '50vw' }">
        <div class="box-copy" style="margin-top: 20px;">
            <DataTable :value="copList()" tableStyle="min-width: 20rem; border: 1px solid #ccc;" v-if="copList()">
                <Column field="ItemCode" header="品號"></Column>
                <Column field="ItemInvNM" header="名稱"></Column>
            </DataTable>

            <DataTable :value="value.ProductList" tableStyle="min-width: 20rem; border: 1px solid #ccc;" v-else>
                <Column field="itemCode" header="品號"></Column>
                <Column field="itemName" header="名稱"></Column>
            </DataTable>

            <div style="display: flex; justify-content: flex-end; margin-top: 12px;">
                <input type="button" class="btn" style="--i: url('/img/back.png')" @click="queryView = false;" value="返回" />
            </div>
        </div>
    </Dialog>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { JourneyModel, JourneyNodeModel, ProductModel } from '@/model/journeyList.model';
import moment from 'moment';
import * as XLSX from 'xlsx';
import $ from 'jquery';
import store from '@/store';

/**
 * 商品購買
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
export default class JourneyTmp206 extends Vue {
    dd!: JourneyModel;
    value!: JourneyNodeModel;
    active!: () => void;
    edit!: () => void;
    remove!: () => void;
    queryView = false;
    isEdit!: boolean;

    created(): void {
        $( function() {
            $( "#StartYMD" ).datepicker({
                dateFormat: "yy/mm/dd"
            });
            $( "#EndYMD" ).datepicker({
                dateFormat: "yy/mm/dd"
            });
        });
    }

    onStartYMD(): void {
        setTimeout(() => {
            this.value.PayStartYMD = (window.document.getElementById('StartYMD') as any).value
        }, 300)
    }

    onEndYMD(): void {
        setTimeout(() => {
            this.value.PayEndYMD = (window.document.getElementById('EndYMD') as any).value
        }, 300)
    }

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
      
      return value.id == 'StartYMD' ? this.value.PayStartYMD = date : this.value.PayEndYMD = date
    }

    previewFiles(event: any, callbark: any): void {
        // console.log(this.value.ProductList)
        const fileReader = new FileReader();
        fileReader.readAsText(event.target.files[0]);
        fileReader.onload = function() {
            callbark(this.result)
        };
    }

    onExportFile(): void {

        /* create a new blank workbook */
        let workbook = XLSX.utils.book_new();
        let worksheet = null
        let data = [{}]
        
        worksheet = XLSX.utils.json_to_sheet(data);
        XLSX.utils.sheet_add_aoa(worksheet, [["品號"]], { origin: "A1" });
        XLSX.utils.book_append_sheet(workbook, worksheet);

        
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const excelBuffer = XLSX.write(workbook, { bookType: 'csv', type: 'array' });
        const data1 = new Blob([excelBuffer], { type: fileType });
        
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        var FileSaver = require('file-saver');
        FileSaver.saveAs(data1, "範例檔案.csv");
    }

    onClick(): void {
        if (!this.copList() && !this.value.ProductList) return;
        if (this.copList()) {
            this.value.ProductList = this.copList().map((v: ProductModel) => {
                return {
                    itemCode: v.ItemCode,
                    itemName: v.ItemInvNM,
                }
            })
        }
        this.active();
    }

    onRemove(): void {
        this.remove();
    }

    onFile(event: any): void {
        // console.log(event)
        let itemList = event.split('\n').splice(1).map((ver: any) => {
            if (ver != '') {
                return {
                    itemCode: ver.replace(/\r/g, '')
                }
            }
        });

        store.dispatch('getJourneyGetSingleItem', {itemList})
    }

    copList(): any {
        return store.state.journey.journeySingleItemList
    }
}
</script>