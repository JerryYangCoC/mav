<template>
    <div class="roadmap-box">
      <span>文案製作作業 - 查詢</span>
    </div>
    <div>
      <form @submit.prevent="onSearch()" style="border: 1px solid #ccc;">
        <!-- 查詢條件 -->
        <div class="box-query">
          <div>
            <span>文案型態：</span>
            <select v-model="query.CopyWriteType">
              <option value="00">00：全選</option>
              <option value="01">01：簡訊</option>
              <option value="02">02：APP</option>
            </select>
          </div>
  
          <div>
            <span>旅程型態：</span>
            <select style="min-width: 185px;" v-model="query.JourneyType">
              <option value="00">00：全選</option>
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
  
          <div>
            <span>文案編號：</span>
            <input type="text" v-model="query.CopyWriteID" />
          </div>
  
          <div>
            <span>文案內容：</span>
            <input type="text" v-model="query.message" />
          </div>
  
          <div>
            <span>文案名稱：</span>
            <input type="text" v-model="query.CopyWriteName" />
          </div>
  
          <div>
            <span><span class="ask-red">*</span>期間：</span>
            <div>
              <input type="text" id="StartYMD" @blur="onStartYMD()" @change="changeDate($event.target)" v-model="query.StartYMD" autocomplete="no-autofill" required />
              ～
              <input type="text" id="EndYMD" @blur="onEndYMD()" @change="changeDate($event.target)" v-model="query.EndYMD" autocomplete="no-autofill" required />
              <span class="ask-red" style="margin-left: 10px; margin-top: 10px; font-weight: bold; font-size: 14px;">(限查2年資料)</span>
            </div>
          </div>
        </div>

        <div style="display: flex; justify-content: center; background-color: #f6f6f6;">
          <div style="padding: 12px 6px;">
            <input class="btn" style="--i: url('/img/search.png')" type="submit" value="查詢" />
          </div>
          
          <div style="padding: 12px 6px;">
            <input class="btn" style="--i: url('/img/baseline_cleaning_services.png')" type="button" @click="init()" value="清除" />
          </div>
          
          <div style="padding: 12px 6px;">
            <input class="btn" style="--i: url('/img/add.png'); width: 100px;" type="button" @click="onToAdd()" value="新增資料" />
          </div>

          <div style="padding: 12px 6px;">
            <input class="btn" style="--i: url('/img/file_download.png'); width: 120px;" type="button" @click="onExportExcel()" value="匯出EXCEL" />
          </div>
        </div>
      </form>

      <div>
        <!-- 文案清單 -->
        <div class="card">
          <TreeTable
            :value="CopyList()"
            :paginator="true"
            :rows="10"
            :rowsPerPageOptions="[5, 10, 25, 50]"
            :alwaysShow="true"
            paginatorTemplate="RowsPerPageDropdown PrevPageLink PageLinks NextPageLink JumpToPageInput CurrentPageReport"
            currentPageReportTemplate="{totalRecords} 筆 / 共 {totalPages} 頁"
            >
              <Column field="CopyWriteType" header="文案型態">
                <template #body="slotProps">
                  {{ slotProps.node.data.CopyWriteType }}： {{ slotProps.node.data.CopyWriteType == '01' ? '簡訊' : 'APP' }}
                </template>
              </Column>
              <Column field="JourneyType" header="旅程型態">
                <template #body="slotProps">
                  {{ slotProps.node.data.JourneyType }}： {{ journeyType(slotProps.node.data.JourneyType) }}
                </template>
              </Column>
              <Column field="CopyWriteID" header="文案編號"></Column>
              <Column field="CopyWriteName" header="文案名稱"></Column>
              <Column field="message" header="文案內容"></Column>
              <Column field="StartYMD" header="有效起日"></Column>
              <Column field="EndYMD" header="有效訖日"></Column>
              <Column header="功能" style="width: 90px;">
                <template #body="slotProps">
                    <button
                      style="width: 54px;"
                      class="btn-blue"
                      @click="onDetail(slotProps.node.data.CopyWriteID)">瀏覽</button>
                </template>
              </Column>
          </TreeTable>
        </div>

      </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Paginator from "primevue/paginator";
import Column from 'primevue/column';
import TreeTable from 'primevue/treetable';
import store from '@/store';
import { TreeNode } from 'primevue/tree';
import { CopyListModel, CopyModel } from '@/model/copyList.model';
import moment from 'moment';
import * as XLSX from 'xlsx';
import $ from 'jquery';

@Options({
  components: {
    Paginator,
    Column,
    TreeTable
  },
})
export default class CopyView extends Vue {
  query: CopyModel = {
    CopyWriteID: '',
    CopyWriteName: '',
    CopyWriteType: '',
    JourneyType: '',
    StartYMD: '',
    EndYMD: '',
    message: ''
  };

  /**
   * 初始化
   */
  created(): void {
    console.log('new copy page')

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

  init(): void {
    this.query = {
      CopyWriteID: '',
      CopyWriteName: '',
      CopyWriteType: '',
      JourneyType: '',
      StartYMD: '',
      EndYMD: '',
      message: ''
    }

    store.commit('setCopy', [])
  }

  CopyList(): any {
    return store.state.copy.lists;
  }

  changeData(value: string): string {
    return value.replace(/\//g, '-')
  }

    onStartYMD(): void {
        setTimeout(() => {
            this.query.StartYMD = (window.document.getElementById('StartYMD') as any).value
            // $( "#StartYMD" ).datepicker( "hide" );
        }, 150)
    }

    onEndYMD(): void {
        setTimeout(() => {
            this.query.EndYMD = (window.document.getElementById('EndYMD') as any).value
            // $( "#EndYMD" ).datepicker( "hide" );
        }, 150)
    }

  /**
   * 查詢
   */
  onSearch(): void {
    store.dispatch('upLoading', true)
    store.dispatch('getListCopy', this.query)
  }

  /**
   * 瀏覽
   * @param id 文案編號
   */
  onDetail(id: string): void {
    store.dispatch('getDetailCopy', id)
  }

  /**
   * 前往新增資料
   */
  onToAdd(): void {
    this.$router.push({path: 'copy/add', query: this.$router.currentRoute.value.query});
  }

  /**
   * 匯出Excel
   */
  onExportExcel(): void {
    store.dispatch('upLoading', true)

    /* create a new blank workbook */
    let workbook = XLSX.utils.book_new();
    let worksheet = null
    let data = this.CopyList().map((res: CopyListModel) => {
      return {
        CopyWriteType: res.data.CopyWriteType + '：' + this.copyType(res.data.CopyWriteType),
        JourneyType: res.data.JourneyType + '：' + this.journeyType(res.data.JourneyType),
        CopyWriteID: res.data.CopyWriteID,
        CopyWriteName: res.data.CopyWriteName,
        message: res.data.message,
        StartYMD: res.data.StartYMD,
        EndYMD: res.data.EndYMD
      }
    })
    
    worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.sheet_add_aoa(worksheet, [["文案型態", "旅程型態", "文案編號", "文案名稱", "文案內容", "有效起日", "有效訖日"]], { origin: "A1" });
    XLSX.utils.book_append_sheet(workbook, worksheet);

    
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data1 = new Blob([excelBuffer], { type: fileType });
    
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    var FileSaver = require('file-saver');
    FileSaver.saveAs(data1, "文案匯出");

    setTimeout(() => {
      store.dispatch('upLoading', false)
    }, 100)
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
    //   alert('日期格式錯誤')
        store.commit('setErrorMessage', '日期格式錯誤')
    }
    
    value.id == 'StartYMD' ? this.query.StartYMD = date : this.query.EndYMD = date
  }

  copyType(value: string): string {
    const typeValue: { [name: string]: string } = {
      '01': '簡訊',
      '02': 'APP'
    }

    return typeValue[value] ?? '';
  }

  journeyType(value: string): string {
    const typeValue: { [name: string]: string } = {
      '01': '回券-POS COUPON',
      '02': '回券-精算抵用券',
      '03': '生日',
      '04': '新會員活動',
      '05': '新會員權益',
      '06': '商品購買',
      '07': '金卡升等-金續金',
      '08': '金卡升等-普升金',
      '09': '準金卡升等',
      '10': '名單匯入',
    }

    return typeValue[value] ?? ''
  }
}
</script>
<style scoped lang="scss">
.box-query {
  display: grid;
  grid-template-columns: 35% 65%;
  padding: 1rem;

  > div {
    display: grid;
    grid-template-columns: 140px auto;
    align-items: center;
    justify-content: start;
    justify-items: end;
  }
}
</style>