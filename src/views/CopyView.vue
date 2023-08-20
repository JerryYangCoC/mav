<template>
    <div>
      <div>
        <!-- 查詢條件 -->
        <div style="display: grid; grid-template-columns: 50% 50%;">
          <div>
            <span>文案型態：</span>
            <select>
              <option>全選</option>
              <option>簡訊</option>
              <option>APP</option>
            </select>
          </div>
  
          <div>
            <span>旅程型態：</span>
            <select>
              <option>全選</option>
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
  
          <div>
            <span>文案編號：</span>
            <input type="text" />
          </div>
  
          <div>
            <span>文案內容：</span>
            <input type="text" />
          </div>
  
          <div>
            <span>文案名稱：</span>
            <input type="text" />
          </div>
  
          <div>
            <span>期間：</span>
            <input type="date" />
            ～
            <input type="date" />
          </div>
        </div>

        <div style="display: flex; justify-content: center; background-color: rgb(217, 217, 217);">
          <div style="padding: 12px 6px;">
            <button class="btn-blue" style="--i: url('/img/search.png')" @click="onSearch()">查詢</button>
          </div>
          
          <div style="padding: 12px 6px;">
            <button class="btn-blue" style="--i: url('/img/baseline_cleaning_services.png'); width: 120px;">清除重來</button>
          </div>

          <div style="padding: 12px 6px;">
            <button class="btn-green" style="--i: url('/img/add.png')" @click="onToAdd()">新增</button>
          </div>

          <div style="padding: 12px 6px;">
            <button class="btn-blue" style="--i: url('/img/file_download.png'); width: 140px;">匯出EXCEL</button>
          </div>
        </div>
      </div>

      <div>
        <!-- 文案清單 -->
        <div class="card">
          <TreeTable
            :value="CopyList()"
            :paginator="true"
            :rows="5"
            :rowsPerPageOptions="[5, 10, 25, 50]"
            :alwaysShow="true"
            paginatorTemplate="RowsPerPageDropdown PrevPageLink PageLinks NextPageLink JumpToPageInput CurrentPageReport"
            currentPageReportTemplate="{totalRecords} 筆/共 {totalPages} 頁"
            >
              <Column field="CopyWriteType" header="文案型態">
                <template #body="slotProps">
                  {{ slotProps.node.data.CopyWriteType }}： {{ slotProps.node.data.CopyWriteType == '1' ? '簡訊' : 'APP' }}
                </template>
              </Column>
              <Column field="JourneyType" header="旅程型態">
                <template #body="slotProps">
                  {{ slotProps.node.data.JourneyType }}： {{ journeyType(slotProps.node.data.JourneyType) }}
                </template>
              </Column>
              <Column field="CopyWriteID" header="文案編號"></Column>
              <Column field="CopyWriteName" header="文案名稱"></Column>
              <!-- <Column field="" header="文案內容"></Column> -->
              <Column field="StartYMD" header="有效起日"></Column>
              <Column field="EndYMD" header="有效迄日"></Column>
              <Column header="功能">
                <template #body="slotProps">
                    <button @click="onDetail(slotProps.node.data.CopyWriteID)">瀏覽</button>
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

@Options({
  components: {
    Paginator,
    Column,
    TreeTable
  },
})
export default class CopyView extends Vue {

  /**
   * 初始化
   */
  created(): void {
    console.log('new copy page')
  }

  CopyList(): any {
    return store.state.copy.lists;
  }

  /**
   * 查詢
   */
  onSearch(): void {
    store.dispatch('getListCopy')
  }

  onDetail(id: string): void {
    console.log('getDetail', id)
    store.dispatch('getDetailCopy', id)
  }

  onToAdd(): void {
    this.$router.push("copy/add");
  }

  copyType(value: string): string {
    switch(value) {
      case '1':
        return '簡訊'

      case '2':
        return 'APP'

      default:
        return ''
    }
  }

  journeyType(value: string): string {
    switch(value) {
      case '01':
        return '回券-POS COUPON'
      
      case '02':
        return '回券-精算抵用券'
      
      case '03':
        return '生日'
      
      case '04':
        return '新會員活動'
      
      case '05':
        return '新會員權益'
      
      case '06':
        return '商品購買'
      
      case '07':
        return '金卡升等-金續金'
      
      case '08':
        return '金卡升等-普升金'
      
      case '09':
        return '準金卡升等'
      
      case '10':
        return '名單匯入'
      
      default:
        return ''
    }
  }
}
</script>
<style scoped lang="scss">

</style>