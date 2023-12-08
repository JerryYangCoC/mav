<template>
    <div>
        <form @submit.prevent="onClick()">
            <div style="display: grid; grid-template-columns: 160px auto; align-items: center; justify-content: start; justify-items: end;">
                <span><span class="ask-red">*</span>新入會期間：</span>
                <div>
                    <input type="text" id="StartYMD" @change="changeDate($event.target)" @blur="onStartYMD()" v-model="value.NewMemStartYMD" autocomplete="off" required :disabled="isEdit" />
                    ～
                    <input type="text" id="EndYMD" @change="changeDate($event.target)" @blur="onEndYMD()" v-model="value.NewMemEndYMD" autocomplete="off" required :disabled="isEdit" />
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
 * 新會員活動
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
export default class JourneyTmp204 extends Vue {
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

    onStartYMD(): void {
        setTimeout(() => {
            this.value.NewMemStartYMD = (window.document.getElementById('StartYMD') as any).value
            // $( "#StartYMD" ).datepicker( "hide" );
        }, 150)
    }

    onEndYMD(): void {
        setTimeout(() => {
            this.value.NewMemEndYMD = (window.document.getElementById('EndYMD') as any).value
            // $( "#EndYMD" ).datepicker( "hide" );
        }, 150)
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
      
      return value.id == 'StartYMD' ? this.value.NewMemStartYMD = date : this.value.NewMemEndYMD = date
    }

    onClick(): void {
        this.active()
    }

    onRemove(): void {
        this.remove();
    }
}
</script>