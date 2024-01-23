<template>
    <div>
        <form @submit.prevent="onClick()">
            <div style="display: grid; grid-template-columns: 160px auto auto; align-items: center; justify-content: start; justify-items: end;">
                <span><span class="ask-red">*</span>名單匯入：</span>
                <input id="inputFile" type="file" style="width: 300px;" @change="previewFiles($event, upFile)" accept=".csv" v-if="!isEdit" />
                <!-- <input type="button" class="btn-white" style="--i: url('/img/more_horiz.svg'); width: 40px;" @click="queryView = true;" />  -->
                <input type="button" class="btn" style="--i: url('/img/export.png'); width: 100px;" @click="onExportFile" value="範例檔案" v-if="!isEdit" />
            </div>

            <div style="display: grid; grid-template-columns: 160px auto; align-items: center; justify-content: start; justify-items: end;">
                <span><span class="ask-red">*</span>活動來源：</span>
                <div style="display: flex;">
                    <select v-model="value.ActivityType" required :disabled="isEdit" @change="selectActivity = {CopCode: '', CopDesc: '', MmNo: ''}">
                        <option value="0">全店</option>
                        <option value="1">3G活動</option>
                        <option value="2">精算活動</option>
                    </select>

                    <div v-if="value.ActivityType == '1' || value.ActivityType == '2'" style="display: flex;">
                        <input type="text" :value="selectActivity.CopCode" style="width: 100px;" disabled >
                        <input type="text" :value="selectActivity.MmNo" style="width: 75px;" v-if="value.ActivityType == '1'" disabled >
                        <input type="text" :value="selectActivity.CopDesc" style="width: 200px;" disabled >
                        <input type="button" class="btn-white" style="--i: url('/img/more_horiz.svg'); width: 40px;" @click="queryActivityView = true; onSearch();" :disabled="isEdit" /> 

                    </div>
                </div>
            </div>
                        
            <div style="display: flex; justify-content: flex-end;" v-if="isEdit">
                <input type="button" class="btn" style="--i: url('/img/back.png')" @click="(() => {$router.push({path: 'journey', query: $router.currentRoute.value.query});})" value="返回" />
                <input type="button" class="btn" style="--i: url('/img/export.png'); width: 100px;" @click="onExportGID()" value="匯出名單" />
                <input type="button" class="btn" style="--i: url('/img/editor.png')" @click="edit" value="修改" :disabled="dd.SendFlag == '1'" />
            </div>

            <div style="display: flex; justify-content: flex-end;" v-else>
                <input type="button" class="btn" style="--i: url('/img/delete.png')" @click="onRemove()" value="刪除" v-if="remove" />
                <input type="button" class="btn" style="--i: url('/img/export.png'); width: 100px;" @click="onExportGID()" value="匯出名單" :disabled="value.ImportName == undefined" />

                <input type="submit" class="btn" style="--i: url('/img/sent.png')" value="確認" />
            </div>
        </form>
    </div>

    <!-- <Dialog v-model:visible="queryView" modal :show-header="false" :style="{ width: '50vw' }">
        <div class="box-copy" style="margin-top: 20px;">
            <DataTable
                :value="gidList()"
                tableStyle="min-width: 20rem; border: 1px solid #ccc;"
            >
                <Column field="GID" header="編號"></Column>
            </DataTable>

            <div class="p-datatable p-component p-datatable-responsive-scroll">
                <table class="p-datatable-table" style="min-width: 20rem; border: 1px solid rgb(204, 204, 204);">
                    <thead class="p-datatable-thead">
                        <tr>
                            <th>
                                <div class="p-column-header-content">
                                    <span class="p-column-title">編號</span>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    
                    <tbody class="p-datatable-tbody">
                        <tr v-for="(item, index) in gidList()" v-bind:key="index">
                            <td>
                                {{ item.GID }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div style="display: flex; justify-content: flex-end; margin-top: 12px;">
                <input type="button" class="btn" style="--i: url('/img/back.png')" @click="queryView = false;" value="返回" />
            </div>
        </div>
    </Dialog> -->


    <Dialog v-model:visible="queryActivityView" modal :show-header="false" :style="{ width: '60vw' }">
        <div class="box-copy">
            <div style="text-align: center; display: flex;">
                <input type="text" style="width: 200px;" v-model="query.ActionID" placeholder="編號" />
                <input type="text" style="width: 200px;" maxlength="4" v-model="query.MmNo" placeholder="小四碼" v-if="value.ActivityType == '1'" />
                <input type="text" style="width: 200px;" v-model="query.ActionName" placeholder="名稱" />
                <!-- <input type="button" class="btn-def" @click="onSearch()" value="搜尋" />
                <input type="button" class="btn-def" @click="queryActivityView = false;" value="返回" /> -->
                <input type="button" class="btn" style="--i: url('/img/search.png')" @click="onSearch()" value="搜尋" />
                <input type="button" class="btn" style="--i: url('/img/back.png')" @click="queryActivityView = false;" value="返回" />
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
                <Column field="CopCode" header="編號"></Column>
                <Column field="MmNo" header="小四碼" v-if="value.ActivityType == '1'"></Column>
                <Column field="CopDesc" header="名稱"></Column>
            </TreeTable>
        </div>
    </Dialog>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { ImportModel, JourneyModel, JourneyNodeModel } from '@/model/journeyList.model';
import * as XLSX from 'xlsx';
import store from '@/store';
import axios from 'axios';

/**
 * 名單匯入
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
export default class JourneyTmp210 extends Vue {
    dd!: JourneyModel;
    value!: JourneyNodeModel;
    active!: () => void;
    edit!: () => void;
    remove!: () => void;
    queryView = false;
    queryActivityView = false;
    selectActivity = {
        CopCode: '',
        CopDesc: '',
        MmNo: ''
    }
    query = {
        Type: '',
        ActionID: '',
        ActionName: '',
        MmNo: ''
    }
    isEdit!: boolean;

    created(): void {
        if (this.value.ActivityList && this.value.ActivityList.length > 0) {
            this.selectActivity.CopCode = this.value.ActivityList[0].ActivityNo
            this.selectActivity.CopDesc = this.value.ActivityList[0].ActivityNm
            this.selectActivity.MmNo = this.value.ActivityList[0].MmNo ?? ''
        }
    }

    onClick(): void {
        if (this.value.ActivityType != '0') {
            if (!this.selectActivity.CopCode) return;
            this.value.ActivityList = [{
                ActivityNo: this.selectActivity.CopCode,
                ActivityNm: this.selectActivity.CopDesc,
                MmNo: this.selectActivity.MmNo,
            }]
        }


        this.active()
    }

    onRemove(): void {
        this.remove();
    }

    previewFiles(event: any, callbark: any): void {
      console.log(event.target.files[0])
        if (event.target.files[0].type != 'text/csv') {
            (document.getElementById('inputFile') as any).value = null
            store.commit('setErrorMessage', '選擇檔案格式錯誤')
            return;
        }

        const formData = new FormData();
        formData.append('FileUpload', event.target.files[0], event.target.files[0].name)
        console.log(formData)
        callbark(formData)
        // console.log(this.value.ProductList)
        // const fileReader = new FileReader();
        // fileReader.readAsText(event.target.files[0]);
        // fileReader.onload = function() {
        //     callbark(this.result)
        // };
    }

    onExportFile(): void {

        /* create a new blank workbook */
        let workbook = XLSX.utils.book_new();
        let worksheet = null
        let data = [{}]
        
        worksheet = XLSX.utils.json_to_sheet(data);
        XLSX.utils.sheet_add_aoa(worksheet, [["GID"]], { origin: "A1" });
        XLSX.utils.book_append_sheet(workbook, worksheet);

        
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const excelBuffer = XLSX.write(workbook, { bookType: 'csv', type: 'array' });
        const data1 = new Blob([excelBuffer], { type: fileType });
        
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        var FileSaver = require('file-saver');
        FileSaver.saveAs(data1, "範例檔案.csv");
    }

    onFile(event: any): void {
        this.value.Import = event.split('\n').splice(1).map((ver: any) => {
            if (ver != '') {
                return {
                    GID: ver.replace(/\r/g, '')
                }
            }
        });

        this.value.Import = this.value.Import?.filter((v: any) => v != null)
    }

    upFile(data: any): void {
      store.dispatch('upLoading', true)
      axios.post('http://10.2.126.194:8030/app/v1/api/CDP/UploadImport', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((res) => {
          store.dispatch('upLoading', false)
          console.log(res)
          if (res.status == 200) {
            if (res.data?.Status == '0') {
              this.value.ImportName = res.data.FileName
            } else {
              store.commit('setErrorMessage', res.data?.Message)
            }
          }
        }).catch((err) => {
          store.dispatch('upLoading', false)
          console.log(err)
        })
    }

    onSearch(): void {
        this.query.Type = this.value.ActivityType ?? '';
        store.dispatch('getListJourneyActivity', this.query)
    }

    // gidList(): ImportModel[] {
    //     return this.value.Import ?? []
    // }

    copyList(): any {
        return store.state.journey.journeyActivityList;
    }

    onExportGID(): void {
        store.dispatch('upLoading', true)
        store.dispatch('getJourneyCheckGID', this.value.ImportName)
    }
}
</script>