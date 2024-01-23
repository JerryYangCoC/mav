<template>
    <div>
        <form @submit.prevent="onClick()">
            <div style="display: grid; grid-template-columns: 160px auto; align-items: center; justify-content: start; justify-items: end;">
                <span><span class="ask-red">*</span>篩選類型：</span>
                <div style="display: flex;">
                    <select v-model="value.DateType" style="width: 150px;" :disabled="isEdit" @change="changeDateType($event.target)">
                        <option value="0">每月</option>
                        <option value="1">指定日期</option>
                    </select>
                    <div v-if="value.DateType == '0'">
                        <input type="text" style="width: 150px;" v-model="value.SelectDate" required :disabled="isEdit" />
                        <span>號</span>
                    </div>
                    <div v-if="value.DateType == '1'">
                        <input type="text" id="YMD" style="width: 150px;" @change="changeDate($event.target)" @blur="onYMD()" v-model="value.SelectDate" autocomplete="off" required :disabled="isEdit" />
                    </div>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 160px auto; align-items: center; justify-content: start; justify-items: end;">
                <span><span class="ask-red">*</span>消費金額區間：</span>
                <div>
                    <input type="text" style="width: 150px;" v-model="value.PayAmtStart" required :disabled="isEdit" />
                    ～
                    <input type="text" style="width: 150px;" v-model="value.PayAmtEnd" required :disabled="isEdit" />
                    <span style="font-weight: bold; color: red;">（排除當年度已升等會員，消費已達2萬）</span>
                </div>
            </div>
                        
            <div style="display: flex; justify-content: flex-end;" v-if="isEdit">
                <input type="button" class="btn" style="--i: url('/img/back.png')" @click="(() => {$router.push({path: 'journey', query: $router.currentRoute.value.query});})" value="返回" />
                <input type="button" class="btn" style="--i: url('/img/editor.png')" @click="edit" value="修改" :disabled="dd.SendFlag == '1'" />
            </div>

            <div style="display: flex; justify-content: flex-end;" v-else>
                <input type="button" class="btn" style="--i: url('/img/delete.png')" @click="onRemove()" value="刪除" v-if="remove" />

                <input type="submit" class="btn" style="--i: url('/img/sent.png')" value="確認" />
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { JourneyModel, JourneyNodeModel } from '@/model/journeyList.model';
import moment from 'moment';
import $ from 'jquery';
import store from '@/store';

/**
 * 準金卡
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
export default class JourneyTmp209 extends Vue {
    dd!: JourneyModel;
    value!: JourneyNodeModel;
    active!: () => void;
    edit!: () => void;
    remove!: () => void;
    isEdit!: boolean;

    created(): void {
        $( function() {
            $( "#YMD" ).datepicker({
                dateFormat: "yy/mm/dd"
            });
        });

        setTimeout(() => {
            (document.getElementById("ui-datepicker-div") as any).addEventListener("click", function(event: any){
                if (event.target.innerText != 'Prev' && event.target.innerText != 'Next') {
                    $( "#YMD" ).datepicker( "hide" );
                }
            });
        }, 300)
    }

    onClick(): void {
        if (this.value.PayAmtStart == '0' || this.value.PayAmtEnd == '0') return;
        this.active();
    }

    onRemove(): void {
        this.remove();
    }

    onYMD(): void {
        setTimeout(() => {
            this.value.SelectDate = (window.document.getElementById('YMD') as any).value
            // $( "#YMD" ).datepicker( "hide" );
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
        //   alert('日期格式錯誤')
        store.commit('setErrorMessage', '日期格式錯誤')
      }
      
      return this.value.SelectDate = date
    }

    changeDateType(value: any): void {
        switch(value.value) {
            case '0':
                this.value.SelectDate = '15'
                break;

            case '1':
                this.value.SelectDate = ''
                $( function() {
                    $( "#YMD" ).datepicker({
                        dateFormat: "yy/mm/dd"
                    });
                });
                break;

            default:
                break;
        }
    }
}
</script>