<template>
    <div>
        <form @submit.prevent="onClick()">
            <div style="display: grid; grid-template-columns: 160px auto auto; align-items: center; justify-content: start; justify-items: end;">
                <span><span class="ask-red">*</span>發送類型：</span>
                <select v-model="value.SendType" :disabled="isEdit" @change="changeSendType($event.target)">
                    <option value="0" v-if="dd.JourneyType == '01' || dd.JourneyType == '02'">D-</option>
                    <option value="1" v-if="dd.JourneyType == '03' || dd.JourneyType == '07' || dd.JourneyType == '08' || dd.JourneyType == '09'">每月</option>
                    <option value="2" v-if="dd.JourneyType == '04' || dd.JourneyType == '06' || dd.JourneyType == '09' || dd.JourneyType == '10'">指定日期</option>
                    <option value="3" v-if="dd.JourneyType == '05'">新入會後</option>
                </select>
                <div>
                    <div v-if="value.SendType == '0' || value.SendType == '3'">
                        <input type="text" v-model="value.SelectTime" :disabled="isEdit" required />
                        <span>天</span>
                    </div>

                    <div v-if="value.SendType == '1'">
                        <input type="text" v-model="value.SelectTime" :disabled="isEdit" required />
                        <span>號</span>
                    </div>

                    <div v-if="value.SendType == '2'">
                        <input type="text" id="StartYMD" @blur="onStartYMD()" @change="changeDate($event.target)" v-model="value.SelectTime" autocomplete="off" required :disabled="isEdit" />
                    </div>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 160px auto; align-items: center; justify-content: start; justify-items: end;">
                <span>發送時間：</span>
                <!-- <input type="text" v-model="value.SendTime" disabled /> -->
                <div>
                    <InputMask id="basic" v-model="value.SendTime" mask="99:99" placeholder="HH:MM" :readonly="isEdit" />
                    <span style="font-weight: bold; color: red;">（此欄位非必填，若未填寫，則以排程時間發送）</span>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 160px auto; align-items: center; justify-content: start; justify-items: end;" v-if="value.SendType == '0'">
                <span><span class="ask-red">*</span>最優惠：</span>
                <div>
                    <input type="radio" id="true" value="0" style="width: 20px; height: 20px;" v-model="value.IsBestOffer" :disabled="isEdit">
                    <label for="true">是</label>
                    <input type="radio" id="false" value="1" style="width: 20px; height: 20px;" v-model="value.IsBestOffer" :disabled="isEdit">
                    <label for="false">全部</label>
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
 * 發送時間
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
export default class JourneyTmp103 extends Vue {
    dd!: JourneyModel;
    value!: JourneyNodeModel;
    active!: () => void;
    edit!: () => void;
    remove!: () => void;
    isEdit!: boolean;

    created(): void {
        $( function() {
            $( "#StartYMD" ).datepicker({
                dateFormat: "yy/mm/dd"
            });
        });
        
        setTimeout(() => {
            (document.getElementById("ui-datepicker-div") as any).addEventListener("click", function(event: any){
                if (event.target.innerText != 'Prev' && event.target.innerText != 'Next') {
                    $( "#StartYMD" ).datepicker( "hide" );
                }
            });
        }, 300)

        if (!this.value.SendType) {
            switch(this.dd.JourneyType) {
                case '01':
                case '02':
                    this.value.SendType = '0';
                    break;

                case '03':
                case '07':
                case '08':
                    this.value.SendType = '1';
                    break;

                case '04':
                case '06':
                case '10':
                    this.value.SendType = '2';
                    break;

                case '05':
                    this.value.SendType = '3';
                    break;
                    
                default:
                    break;
            }
        }
    }

    onClick(): void {
        this.active();
    }

    onRemove(): void {
        this.remove();
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
      
      return this.value.SelectTime = date
    }

    changeSendType(value: any): void {
        this.value.SelectTime = '';
        switch(value.value) {
            case '0':
                this.value.IsBestOffer = '0'
                break;

            case '2':
                $( function() {
                    $( "#StartYMD" ).datepicker({
                        dateFormat: "yy/mm/dd"
                    });
                });
                break;

            default:
                break;
        }
    }

    onStartYMD(): void {
        setTimeout(() => {
            this.value.SelectTime = (document.getElementById('StartYMD') as any).value
            // $( "#StartYMD" ).datepicker( "hide" );
        }, 150)
    }
}
</script>