<template>
    <div>
        <form @submit.prevent="onClick()">
            <div style="display: grid; grid-template-columns: 160px auto; align-items: center; justify-content: start; justify-items: end;">
                <span>旅程編號：</span>
                <input type="text" v-model="dd.JourneyId" disabled />
            </div>
    
            <div style="display: grid; grid-template-columns: 160px auto; align-items: center; justify-content: start; justify-items: end;">
                <span><span class="ask-red">*</span>旅程名稱：</span>
                <input type="text" style="width: 300px;" v-model="dd.JourneyName" :disabled="isEdit" maxlength="64" required />
            </div>
    
            <div style="display: grid; grid-template-columns: 160px auto; align-items: center; justify-content: start; justify-items: end;">
                <span><span class="ask-red">*</span>有效期間：</span>
                <div>
                    <input type="text" id="StartYMD" @blur="onStartYMD()" @change="changeDate($event.target)" v-model="dd.StartDate" autocomplete="off" :disabled="isEdit" required />
                    ～
                    <input type="text" id="EndYMD" @blur="onEndYMD()" @change="changeDate($event.target)" v-model="dd.EndDate" autocomplete="off" :disabled="isEdit" required />
                </div>
            </div>
    
            <div style="display: grid; grid-template-columns: 160px auto; align-items: center; justify-content: start; justify-items: end;">
                <span><span class="ask-red">*</span>狀態：</span>
                <select v-model="dd.StatusFlag" :disabled="isEdit">
                    <option value="0">啟用</option>
                    <option value="1">未啟用</option>
                </select>
            </div>


            <div style="display: flex; justify-content: flex-end;" v-if="isEdit">
                <input type="button" class="btn" style="--i: url('/img/back.png')" @click="(() => {$router.push({path: 'journey', query: $router.currentRoute.value.query});})" value="返回" />
                <input type="button" class="btn" style="--i: url('/img/editor.png')" @click="edit" value="修改" :disabled="dd.SendFlag == '1'" />
            </div>

            <div style="display: grid; justify-items: end;" v-else>
                <input type="submit" class="btn" style="--i: url('/img/sent.png')" value="確認" />
            </div>

        </form>
    </div>

</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { JourneyModel } from '@/model/journeyList.model';
import moment from 'moment';
import $ from 'jquery';
import store from '@/store';

/**
 * 旅程基本設定
 */
@Options({
  props: {
    dd: null,
    active: null,
    isEdit: null,
    edit: null,
  }
})
export default class JourneyTmp101 extends Vue {
    dd!: JourneyModel;
    active!: () => void;
    edit!: () => void;
    isEdit!: boolean;
    
    created(): void {
        $( function() {
            $( "#StartYMD" ).datepicker({
                dateFormat: "yy/mm/dd",
            });
            $( "#EndYMD" ).datepicker({
                dateFormat: "yy/mm/dd",
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
      
      return value.id == 'StartYMD' ? this.dd.StartDate = date : this.dd.EndDate = date
    }

    onClick(): void {
        // if (this.dd.StartDate >= this.dd.EndDate || this.dd.StartDate < moment().format('YYYY/MM/DD')) return alert('有效日期錯誤');
        if (this.dd.StartDate >= this.dd.EndDate || this.dd.StartDate < moment().format('YYYY/MM/DD')) return store.commit('setErrorMessage', '有效期間錯誤')
        this.active();
    }

    onStartYMD(): void {
        setTimeout(() => {
            this.dd.StartDate = (document.getElementById('StartYMD') as any).value;
            // $( "#StartYMD" ).datepicker( "hide" );
        }, 150)
    }

    onEndYMD(): void {
        setTimeout(() => {
            this.dd.EndDate = (document.getElementById('EndYMD') as any).value
            // $( "#EndYMD" ).datepicker( "hide" );
        }, 150)
    }
}
</script>