<template>
    <div>
        <form @submit.prevent="onClick()">
            <div style="display: grid; grid-template-columns: 160px auto; align-items: center; justify-content: start; justify-items: end;">
                <span><span class="ask-red">*</span>判斷類型：</span>
                <select v-model="value.JudgeType" :disabled="isEdit" @change="changeJudgeType($event.target)">
                    <option value="0" v-if="dd.JourneyType == '01' || dd.JourneyType == '02'">用券</option>
                    <option value="1" v-if="dd.JourneyType == '03'">全店消費(生日)</option>
                    <option value="2" v-if="dd.JourneyType == '09'">全店消費(準金卡)</option>
                    <option value="3" v-if="dd.JourneyType == '04' || ( dd.JourneyType == '10' && type == '0' )">全店消費(期間)</option>
                    <option value="4" v-if="dd.JourneyType == '10' && type == '1'">3G活動消費</option>
                    <option value="5" v-if="dd.JourneyType == '10' && type == '2'">精算活動消費</option>
                    <option value="6" v-if="dd.JourneyType == '06'">商品消費</option>
                </select>
            </div>

            <div style="display: grid; grid-template-columns: 160px auto; align-items: center; justify-content: start; justify-items: end;" v-if="value.JudgeType == '1'">
                <span><span class="ask-red">*</span>往前推：</span>
                <div>
                    <input type="text" style="width: 150px;" v-model="value.BirthSelectmonth" required :disabled="isEdit" />
                    <span>月</span>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 160px auto; align-items: center; justify-content: start; justify-items: end;" v-if="value.JudgeType == '2'">
                <span><span class="ask-red">*</span>全店消費1/1~當月：</span>
                <div>
                    <input type="text" style="width: 150px;" v-model="value.GoldSelectDate" required :disabled="isEdit" />
                    <span>號</span>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 160px auto; align-items: center; justify-content: start; justify-items: end;" v-if="value.JudgeType == '3' || value.JudgeType == '4' || value.JudgeType == '5'">
                <span><span class="ask-red">*</span>消費期間：</span>
                <div>
                    <input type="text" id="StartYMD" @change="changeDate($event.target)" @blur="onStartYMD()" v-model="value.ConsumeStartYMD" autocomplete="off" required :disabled="isEdit" />
                    ～
                    <input type="text" id="EndYMD" @change="changeDate($event.target)" @blur="onEndYMD()" v-model="value.ConsumeEndYMD" autocomplete="off" required :disabled="isEdit" />
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 160px auto; align-items: center; justify-content: start; justify-items: end;" v-if="value.JudgeType == '6'">
                <span><span class="ask-red">*</span>排除商品消費期間：</span>
                <div>
                    <input type="text" id="RStartYMD" @change="changeDate($event.target)" @blur="onRStartYMD()" v-model="value.RemindedStartYMD" autocomplete="off" required :disabled="isEdit" />
                    ～
                    <input type="text" id="REndYMD" @change="changeDate($event.target)" @blur="onREndYMD()" v-model="value.RemindedEndYMD" autocomplete="off" required :disabled="isEdit" />
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
 * 判斷條件
 */
@Options({
  props: {
    dd: null,
    value: null,
    active: null,
    remove: null,
    type: null,
    isEdit: null,
    edit: null,
  }
})
export default class JourneyTmp107 extends Vue {
    dd!: JourneyModel;
    value!: JourneyNodeModel;
    active!: () => void;
    edit!: () => void;
    remove!: () => void;
    type!: string;
    isEdit!: boolean;

    created(): void {
        $( function() {
            $( "#StartYMD" ).datepicker({
                dateFormat: "yy/mm/dd"
            });
            $( "#EndYMD" ).datepicker({
                dateFormat: "yy/mm/dd"
            });
            $( "#RStartYMD" ).datepicker({
                dateFormat: "yy/mm/dd"
            });
            $( "#REndYMD" ).datepicker({
                dateFormat: "yy/mm/dd"
            });
        });
        
        setTimeout(() => {
            (document.getElementById("ui-datepicker-div") as any).addEventListener("click", function(event: any){
                if (event.target.innerText != 'Prev' && event.target.innerText != 'Next') {
                    $( "#StartYMD" ).datepicker( "hide" );
                    $( "#EndYMD" ).datepicker( "hide" );
                    $( "#RStartYMD" ).datepicker( "hide" );
                    $( "#REndYMD" ).datepicker( "hide" );
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
      
      switch(value.id) {
        case 'StartYMD':
            return this.value.ConsumeStartYMD = date;
        
        case 'EndYMD':
            return this.value.ConsumeEndYMD = date;

        case 'RStartYMD':
            return this.value.RemindedStartYMD = date;

        case 'REndYMD':
            return this.value.RemindedEndYMD = date;

        default:
            break;
      }
    }

    onStartYMD(): void {
        setTimeout(() => {
            this.value.ConsumeStartYMD = (window.document.getElementById('StartYMD') as any).value
            // $( "#StartYMD" ).datepicker( "hide" );
        }, 150)
    }

    onEndYMD(): void {
        setTimeout(() => {
            this.value.ConsumeEndYMD = (window.document.getElementById('EndYMD') as any).value
            // $( "#EndYMD" ).datepicker( "hide" );
        }, 150)
    }

    onRStartYMD(): void {
        setTimeout(() => {
            this.value.RemindedStartYMD = (window.document.getElementById('RStartYMD') as any).value
            // $( "#RStartYMD" ).datepicker( "hide" );
        }, 150)
    }

    onREndYMD(): void {
        setTimeout(() => {
            this.value.RemindedEndYMD = (window.document.getElementById('REndYMD') as any).value
            // $( "#REndYMD" ).datepicker( "hide" );
        }, 150)
    }

    changeJudgeType(value: any): void {
        switch(value.value) {
            case '3':
            case '4':
            case '5':
                $( function() {
                    $( "#StartYMD" ).datepicker({
                        dateFormat: "yy/mm/dd"
                    });
                    $( "#EndYMD" ).datepicker({
                        dateFormat: "yy/mm/dd"
                    });
                });
                break;
                
            case '6':
                $( function() {
                    $( "#RStartYMD" ).datepicker({
                        dateFormat: "yy/mm/dd"
                    });
                    $( "#REndYMD" ).datepicker({
                        dateFormat: "yy/mm/dd"
                    });
                });
                break;
        }
    }

    onClick(): void {
        this.active()
    }

    onRemove(): void {
        this.remove();
    }
}
</script>