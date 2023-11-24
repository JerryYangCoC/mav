<template>
    <div class="roadmap-box">
        <span>會員旅程作業 - 查詢</span>
    </div>
    
    <div>
        <form @submit.prevent="onSearch()" style="border: 1px solid #ccc;">
            <!-- 查詢條件 -->
            <div class="box-query">
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
                    <span><span class="ask-red">*</span>期間：</span>
                    <div>
                        <input type="text" id="StartYMD" @blur="onStartYMD()" @change="changeDate($event.target)" v-model="query.StartDate" required />
                        ～
                        <input type="text" id="EndYMD" @blur="onEndYMD()" @change="changeDate($event.target)" v-model="query.EndDate" required />
                    </div>
                </div>

                <div>
                    <span>旅程編號：</span>
                    <input type="text" v-model="query.JourneyId" />
                </div>

                <div></div>

                <div>
                    <span>旅程名稱：</span>
                    <input type="text" v-model="query.JourneyName" style="width: 250px;" />
                </div>

            </div>

            <div style="display: flex; justify-content: center; background-color: #f6f6f6;">
                <div style="padding: 12px 6px;">
                    <input class="btn" style="--i: url('/img/search.png')" type="submit" value="查詢" />
                </div>
        
                <div style="padding: 12px 6px;">
                    <input class="btn" style="--i: url('/img/baseline_cleaning_services.png')" type="button" @click="onInit()" value="清除" />
                </div>
        
                <div style="padding: 12px 6px;">
                    <input class="btn" style="--i: url('/img/add.png'); width: 100px;" type="button" @click="addView = true" value="新增資料" />
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
                    :value="JourneyList()"
                    :paginator="true"
                    :rows="10"
                    :rowsPerPageOptions="[5, 10, 25, 50]"
                    :alwaysShow="true"
                    paginatorTemplate="RowsPerPageDropdown PrevPageLink PageLinks NextPageLink JumpToPageInput CurrentPageReport"
                    currentPageReportTemplate="{totalRecords} 筆 / 共 {totalPages} 頁"
                >
                    <Column field="JourneyType" header="旅程型態">
                        <template #body="slotProps">
                            {{ slotProps.node.data.JourneyType }}_{{ journeyType(slotProps.node.data.JourneyType) }}
                        </template>
                    </Column>
                    <Column field="JourneyId" header="旅程編號"></Column>
                    <Column field="JourneyName" header="旅程名稱"></Column>
                    <Column field="StartYMD" header="有效起日"></Column>
                    <Column field="EndYMD" header="有效訖日"></Column>
                    <Column header="功能" style="width: 140px;">
                        <template #body="slotProps">
                            <div style="display: flex; justify-content: space-between;">
                                <button
                                    style="width: 54px;"
                                    class="btn-blue"
                                    @click="onDetail(slotProps.node.data.JourneyId)">瀏覽</button>
                        
                                <button
                                    style="width: 54px;"
                                    :class="slotProps.node.data.SendFlag == '0' ? 'btn-red' : ''"
                                    :disabled="slotProps.node.data.SendFlag != '0'"
                                    @click="onRemove(slotProps.node.data)">刪除</button>

                            </div>
                        </template>
                    </Column>
                </TreeTable>
            </div>
        </div>
    </div>

    <Dialog v-model:visible="addView" :closable="false" modal header="新增資料" :style="{ width: '90vw' }">

        <div style="padding: 20px 10px; width: 100%;">
            <div style="display: flex; flex-wrap: wrap;">
                <div class="green-tag" style="--i:url(/img/file_b.png); --i2:url(/img/file.png); margin: 10px;" @click="onToAdd()">
                    <div style="margin-top: 60px; text-align: center;">
                        <span class="f-14">空白</span>
                    </div>
                </div>

                <div class="green-tag" style="--i:url(/img/coupon-2-line_b.png); --i2:url(/img/coupon-2-line.png); margin: 10px;" @click="store.dispatch('getJourneyMapSample', '201')">
                    <div style="margin-top: 60px; text-align: center; display: grid; line-height: 16px;">
                        <span class="f-14">COUPON</span>
                        <span class="f-14">範本</span>
                    </div>
                </div>

                <div class="green-tag" style="--i:url(/img/coupon_b.png); --i2:url(/img/coupon.png); margin: 10px;" @click="store.dispatch('getJourneyMapSample', '202')">
                    <div style="margin-top: 60px; text-align: center; display: grid; line-height: 16px;">
                        <span class="f-14">精算抵用券</span>
                        <span class="f-14">範本</span>
                    </div>
                </div>

                <div class="green-tag" style="--i:url(/img/cil-birthday-cake_b.png); --i2:url(/img/cil-birthday-cake.png); margin: 10px;" @click="store.dispatch('getJourneyMapSample', '203')">
                    <div style="margin-top: 60px; text-align: center; display: grid; line-height: 16px;">
                        <span class="f-14">生日</span>
                        <span class="f-14">範本</span>
                    </div>
                </div>

                <div class="green-tag" style="--i:url(/img/light-member_b.png); --i2:url(/img/light-member.png); margin: 10px;" @click="store.dispatch('getJourneyMapSample', '204')">
                    <div style="margin-top: 60px; text-align: center; display: grid; line-height: 16px;">
                        <span class="f-14">新會員活動</span>
                        <span class="f-14">範本</span>
                    </div>
                </div>

                <div class="green-tag" style="--i:url(/img/symbol-enum-member_b.png); --i2:url(/img/symbol-enum-member.png); margin: 10px;" @click="store.dispatch('getJourneyMapSample', '205')">
                    <div style="margin-top: 60px; text-align: center; display: grid; line-height: 16px;">
                        <span class="f-14">新會員權益</span>
                        <span class="f-14">範本</span>
                    </div>
                </div>

                <div class="green-tag" style="--i:url(/img/ad-product_b.png); --i2:url(/img/ad-product.png); margin: 10px;" @click="store.dispatch('getJourneyMapSample', '206')">
                    <div style="margin-top: 60px; text-align: center; display: grid; line-height: 16px;">
                        <span class="f-14">商品購買</span>
                        <span class="f-14">範本</span>
                    </div>
                </div>

                <div class="green-tag" style="--i:url(/img/vip-crown-fill_b.png); --i2:url(/img/vip-crown-fill.png); margin: 10px" @click="store.dispatch('getJourneyMapSample', '207')">
                    <div style="margin-top: 60px; text-align: center; display: grid; line-height: 16px;">
                        <span class="f-14">金續金</span>
                        <span class="f-14">範本</span>
                    </div>
                </div>

                <div class="green-tag" style="--i:url(/img/vip-crown-2-line_b.png); --i2:url(/img/vip-crown-2-line.png); margin: 10px;" @click="store.dispatch('getJourneyMapSample', '208')">
                    <div style="margin-top: 60px; text-align: center; display: grid; line-height: 16px;">
                        <span class="f-14">普升金</span>
                        <span class="f-14">範本</span>
                    </div>
                </div>

                <div class="green-tag" style="--i:url(/img/vip-crown-2-fill_b.png); --i2:url(/img/vip-crown-2-fill.png); margin: 10px;" @click="store.dispatch('getJourneyMapSample', '209')">
                    <div style="margin-top: 60px; text-align: center; display: grid; line-height: 16px;">
                        <span class="f-14">準金卡</span>
                        <span class="f-14">範本</span>
                    </div>
                </div>

                <div class="green-tag" style="--i:url(/img/import_b.png); --i2:url(/img/import.png); margin: 10px;" @click="store.dispatch('getJourneyMapSample', '210')">
                    <div style="margin-top: 60px; text-align: center; display: grid; line-height: 16px;">
                        <span class="f-14">名單匯入</span>
                        <span class="f-14">範本</span>
                    </div>
                </div>
            </div>
        </div>

        <div style="display: flex; justify-content: flex-end; margin-top: 20px;">
            <input type="button" class="btn" style="--i: url('/img/back.png')" @click="addView = false" value="返回" />
        </div>
    </Dialog>
    <ConfirmDialog></ConfirmDialog>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import moment from 'moment';
import { JourneyListModel, JourneyModel } from '@/model/journeyList.model';
import store from '@/store';
import * as XLSX from 'xlsx';
import { useConfirm } from "primevue/useconfirm";
import axios from 'axios';
import $ from 'jquery';

@Options({
    components: {
    },
})
export default class JourneyView extends Vue {
    query: JourneyModel = {
        JourneyId: '',
        JourneyName: '',
        JourneyType: '',
        StartDate: '',
        EndDate: ''
    };
    confirm = useConfirm();
    addView = false;
    store = store

    /**
     * 初始化
     */
    created(): void {
        console.log('new journey')
        $( function() {
            $( "#StartYMD" ).datepicker({
                dateFormat: "yy/mm/dd"
            });
            $( "#EndYMD" ).datepicker({
                dateFormat: "yy/mm/dd"
            });
        });

        store.commit('setJourneyMapSample', null)
    }

    /**
     * 清除
     */
    onInit(): void {
        this.query = {
            JourneyId: '',
            JourneyName: '',
            JourneyType: '',
            StartDate: '',
            EndDate: ''
        }

        store.commit('setJourneyList', [])
    }

    /**
     * 查詢
     */
    onSearch(): void {
        store.dispatch('upLoading', true)
        store.dispatch('getListJourney', this.query)
    }

    /**
     * 詳細資料
     * @param value 旅程編號
     */
    onDetail(value: string): void {
        console.log('goto detail')
        store.dispatch('getJourney', { JourneyId: value })
    }

    onRemove(value: JourneyModel): void {
        let data = value
        data.UserID = this.$router.currentRoute.value.query?.UserID?.toString();

        this.confirm.require({
            message: '請確認是否「刪除」！',
            header: '確認',
            acceptClass: 'p-button-danger',
            acceptLabel: '取消',
            rejectLabel: '確認',
            reject: () => {
                data.FileType = '3'

                axios.post('http://10.2.126.194:8030/app/v1/api/CDP/JourneyImport', data)
                    .then((res) => {
                        store.dispatch('upLoading', false)
                        console.log('set journey', res)
                        if (res.status == 200) {
                            switch(res.data?.Status) {
                                case '0':
                                    // 成功
                                    setTimeout(() => {
                                        this.onSearch()
                                    }, 300)
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
                        store.dispatch('upLoading', false)
                    })
            }
        });
    }
    
    /**
     * 匯出Excel
     */
    onExportExcel(): void {
        store.dispatch('upLoading', true)

        /* create a new blank workbook */
        let workbook = XLSX.utils.book_new();
        let worksheet = null
        let data = this.JourneyList().map((res: JourneyListModel) => {
            return {
                JourneyType: res.data.JourneyType + '_' + this.journeyType(res.data.JourneyType),
                JourneyId: res.data.JourneyId,
                JourneyName: res.data.JourneyName,
                StartYMD: res.data.StartYMD,
                EndYMD: res.data.EndYMD
            }
        })
    
        worksheet = XLSX.utils.json_to_sheet(data);
        XLSX.utils.sheet_add_aoa(worksheet, [["旅程型態", "旅程編號", "旅程名稱", "有效起日", "有效訖日"]], { origin: "A1" });
        XLSX.utils.book_append_sheet(workbook, worksheet);

    
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data1 = new Blob([excelBuffer], { type: fileType });
    
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        var FileSaver = require('file-saver');
        FileSaver.saveAs(data1, "旅程匯出");

        setTimeout(() => {
            store.dispatch('upLoading', false)
        }, 300)
    }

    /**
     * 前往新增資料
     */
    onToAdd(): void {
        this.$router.push({path: 'journey/add', query: this.$router.currentRoute.value.query});
    }

    /**
     * 旅程清單資料
     */
    JourneyList(): any {
        return store.state.journey.journeyList
    }

    onStartYMD(): void {
        setTimeout(() => {
            this.query.StartDate = (window.document.getElementById('StartYMD') as any).value
        }, 300)
    }

    onEndYMD(): void {
        setTimeout(() => {
            this.query.EndDate = (window.document.getElementById('EndYMD') as any).value
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
            alert('日期格式錯誤')
        }
    
        value.id == 'StartYMD' ? this.query.StartDate = date : this.query.EndDate = date
    }

    /**
     * 旅程型態
     * @param value 旅程Type
     */
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