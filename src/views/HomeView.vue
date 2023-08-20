<template>
  <div class="home">
    <div class="content">
      <!-- 內頁 -->

      <div class="l-div">
        <!-- 左方塊 -->
        <div
          class="tree"
          @dragover="allowDrop"
          @drop="dropTrigger($event)"
          >
          <!-- 旅程樹 -->
          <div v-html="createTree()">

          </div>
          <!-- <div v-for="(item, index) in dataTree" :key="index">
            <div v-html="category(item)">

            </div>
          </div> -->
        </div>
      </div>

      <div class="r-div">
        <!-- 右方塊 -->
        <div class="temTree">
          <!-- 範例 -->
          <div v-for="(item, index) in temA" :key="index" draggable="true" @dragstart="dragStart($event)" @dragover="allowDrop">
            <!-- {{ category(item) }} -->
            <div v-html="category(item)"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import axios from 'axios';
import ABtn from '@/components/ABtn.vue';
import BBtn from '@/components/BBtn.vue';
import CBtn from '@/components/CBtn.vue';

@Options({
  components: {
    ABtn,
    BBtn,
    CBtn,
  },
})
export default class HomeView extends Vue {
  companyName: string | null = '';
  peopleTitle: string | null = '';
  data: any = {
    JourneyId: "B230714001",
    JourneyName: "202307回券-POS COUPON",
    StartDate: "2023/07/01",
    EndDate: "2023/07/01",
    FileType: "1",
    Content: [{"NodeId":"1","NodeName":"COUPON","NodeType":"0201","Seq":"0","IsRecvMsgFlag":"0","IsBestOffer":"0","IsUsed":"0","CouponSList":[{"CouponNo":"C2307140001","CouponName":"COUPON1"},{"CouponNo":"C2307140002","CouponName":"COUPON2"}],"RemindedActivityList":[{"JourneiedId":"C2307140003"},{"JourneiedId":"C2307140004"}],"Position":[{"SeqId":"e1-2","source":1,"target":2,"label":"true"},{"SeqId":"e1-3","source":1,"target":3,"label":"false"}]},{"NodeId":"2","NodeName":"觸發條件","NodeType":"0103","SendType":"0","SelectTime":"12","SendTime":"2023/07/30 12:00:00","Position":[{"SeqId":"e2-4","source":"2","target":"4","label":""}]},{"NodeId":"3","NodeName":"finish","NodeType":"0105","Position":[{"SeqId":"","source":"","target":"","label":""}]},{"NodeId":"4","NodeName":"簡訊","NodeType":"0106","Copywriting":"0","VariableList":[{"VariableSeq":"1","Variable":"test"}],"Position":[{"SeqId":"e4-5","source":"4","target":"5","label":""}]},{"NodeId":"5","NodeName":"finish","NodeType":"0105","Position":[{"SeqId":"","source":"","target":"","label":""}]}],
    UserID: "admin"
  };
  dataTree!: any;
  tmpTree!: any;
  temA = [
    {
      NodeId: '0',
      NodeName: '基本設定',
      NodeType: '0101',
    },
    {
      NodeId: '0',
      NodeName: 'EDM',
      NodeType: '0102',
    },
    {
      NodeId: '0',
      NodeName: '觸發條件',
      NodeType: '0103',
    },
    {
      NodeId: '0',
      NodeName: 'APP',
      NodeType: '0104',
    },
    {
      NodeId: '0',
      NodeName: 'finish',
      NodeType: '0105',
    },
    {
      NodeId: '0',
      NodeName: '簡訊',
      NodeType: '0106',
    },
  ]
  temB = [
    {
      NodeId: '0',
      NodeName: 'COUPON',
      NodeType: '0201',
    },
    {
      NodeId: '0',
      NodeName: '精算抵用券',
      NodeType: '0202',
    },
    {
      NodeId: '0',
      NodeName: '生日禮',
      NodeType: '0203',
    },
    {
      NodeId: '0',
      NodeName: '新會員活動',
      NodeType: '0204',
    },
    {
      NodeId: '0',
      NodeName: '新會員權益',
      NodeType: '0205',
    },
    {
      NodeId: '0',
      NodeName: '商品購買',
      NodeType: '0206',
    },
    {
      NodeId: '0',
      NodeName: '金續金',
      NodeType: '0207',
    },
    {
      NodeId: '0',
      NodeName: '普升金',
      NodeType: '0208',
    },
    {
      NodeId: '0',
      NodeName: '準金卡',
      NodeType: '0209',
    },
    {
      NodeId: '0',
      NodeName: '名單匯入',
      NodeType: '0210',
    },
  ]
  
  /**
   * 初始化
   */
  created(): void {
    console.log('new')
    console.log(this.data);
  }

  createTree() {
    this.dataTree = this.data.Content;

    // let lists = [<Bbtn text={'基本設定'}></Bbtn>, <ALine></ALine>];
    let lists = [];
    let list2 = [];
    let list3 = [];

    lists.push(this.btn('基本設定', 'setting', 'A'));

    for (let item of this.dataTree) {
      // console.log(item)

      switch(item.NodeType) {
        case "0103":
          // list2 ? list2.push(<Bbtn text={item.NodeName} img={'medication-time'}></Bbtn>) : lists.push(<Bbtn text={item.NodeName} img={'medication-time'}></Bbtn>)
          // if (!list2) lists.push(<ALine></ALine>)
          // lists.push(<BLine></BLine>)
          break;
          
        case "0106":
          // list2 ? list2.push(<Bbtn text={item.NodeName} img={'sms-search'}></Bbtn>) : lists.push(<Bbtn text={item.NodeName}></Bbtn>)
          // if (!list2) lists.push(<ALine></ALine>)
          break;
          
        case "0201":
          // lists.push(<Dbtn text={item.NodeName} img={'coupon-2-line'}></Dbtn>)
          // lists.push(<BLine></BLine>)
          // lists.push(<div style={{ display: 'grid', alignContent: 'space-between', height: '200px' }}>{list2}</div>)
          // lists.push(<CLine></CLine>)
          // lists.push(<div style={{ display: 'grid', alignContent: 'space-between', height: '200px' }}>{list3}</div>)
          // list2 = [];
          break;

        case "0105":
          // list3.push(<Bbtn text={item.NodeName} img={'stop-circle-sharp'}></Bbtn>)
          break;

        default:
          // lists.push(<div>{item.NodeName}</div>)
          break;
      }
    }

    return lists;
  }

  createTemTree(type: string | null): string[] {
    let temLists = [];

    switch(type) {
      case 'A':
        for (let item of this.temA) {
          temLists.push('<div draggable="true" @dragstart="dragStart($event)" @dragover="allowDrop">' + this.category(item) + '</div>');
        }
        break;

      case 'B':
        for (let item of this.temB) {
          temLists.push('<div draggable="true" @dragstart="dragStart($event)" @dragover="allowDrop">' + this.category(item) + '</div>');
        }
        break;

      default:
        temLists.push('<div>無內容</div>')
        break;
    }

    return temLists;
  }


  /**
   * 將項目產生方塊
   * @param e 項目
   */
  category(e: any) {
    switch(e.NodeType) {
      case "0101":
        return this.btn(e.NodeName, 'setting', 'A');
        
      case "0102":
        return this.btn(e.NodeName, 'email-line', 'A');
        
      case "0103":
        return this.btn(e.NodeName, 'medication-time', 'A');
        
      case "0104":
        return this.btn(e.NodeName, 'cosmed', 'A');
        
      case "0105":
        return this.btn(e.NodeName, 'stop-circle-sharp', 'A');
        
      case "0106":
        return this.btn(e.NodeName, 'sms-search', 'A');
        
      case "0201":
        return this.btn(e.NodeName, 'coupon-2-line', 'B');
        
      case "0202":
        return this.btn(e.NodeName, 'coupon', 'B');
        
      case "0203":
        return this.btn(e.NodeName, 'cil-birthday-cake', 'B');
        
      case "0204":
        return this.btn(e.NodeName, 'light-member', 'B');
        
      case "0205":
        return this.btn(e.NodeName, 'symbol-enum-member', 'B');
        
      case "0206":
        return this.btn(e.NodeName, 'ad-product', 'B');
        
      case "0207":
        return this.btn(e.NodeName, 'vip-crown-fill', 'B');
        
      case "0208":
        return this.btn(e.NodeName, 'vip-crown-2-line', 'B');
        
      case "0209":
        return this.btn(e.NodeName, 'vip-crown-2-fill', 'B');
        
      case "0210":
        return this.btn(e.NodeName, 'import', 'B');
        
      default:
        return '<div>' + e.NodeName + '</div>';
    }
  }

  /**
   * 結束監聽
   * @param e 方塊
   */
  allowDrop(e: any): void {
    e.preventDefault();
  }

  /**
   * 開始拖動
   * @param e 方塊
   */
  dragStart(e: any) {
    let tar = e.target.innerText;
    console.log(e);
    console.log(tar);
    e.dataTransfer.setData("Text", tar);
  }

  /**
   * 拖動結束
   * @param e 方塊
   */
  dropTrigger(e: any): void {
    this.allowDrop(e);
    const dragText = e.dataTransfer.getData("Text");
    console.log(e);
    console.log(dragText)
  }

  /**
   * 取得推薦結果
   */
  getData(): void {
    /// 192.168.50.234:8000
    // axios.get('http://localhost/api/detection/recommend')
    //   .then((res) => {
    //     console.log('recommend', res)
    //     // this.isApplication = []
    //     this.data = [];
    //     this.companyName = res?.data?.Recommend.Partner
    //     this.itemName = res?.data?.Recommend.Product_Name
    //     this.isApplication = res?.data?.Recommend?.Application_Field
    //     this.data.push(res?.data?.Recommend)
    //     this.data.push(res?.data?.Others[1])
    //     this.data.push(res?.data?.Others[2])
    //     this.data.push(res?.data?.Others[3])
    //     this.changePeopleTitle(res?.data?.age, res?.data?.gender)

    //     setTimeout(() => {
    //       this.viewPage = true;
    //     }, 500)
    //   }).catch((err) => {
    //     console.log(err)
    //     this.doorView = true;
    //     this.touchView = true;
    //     this.viewPage = null;
    //   })
  }

  /**
   * 資料處理
   * @param data 要處理的資料
   */
  changeString(data: string): string {
    return data.replace(/"/g, "”") 
  }

  changeBr(data: string): string {
    return data.replace(/\n/g, "<br>") 
  }

  /**
   * 方塊
   * @param text 文字
   * @param img 圖片
   * @param type 類型
   */
  btn(text: string, img: string, type: string) {
    return `
      <div>
        <div class="${ this.checkBtnClass(type) }" style="--i:url(/img/${ img }.png)"></div>
        <div>
          <span class="f-14">
            ${ text }
          </span>
        </div>
      </div>
    `;
  }

  /**
   * 根據類型回傳樣式
   * @param type 類型
   */
  checkBtnClass(type: string): string {
    switch(type) {
      case 'A':
        return 'purple-tag';
      
      case 'B':
        return 'blue-tag';

      default:
        return '';
    }
  }
}
</script>

<style scoped lang="scss">
  .home {
    height: 100%;
    width: 100%;
    background-repeat: no-repeat;
    background-size: contain;
    // background-color: #213645;
    color: #fff;
  }

  .content {
    // padding-bottom: 0;
    display: flex;
    margin-left: auto;
    margin-right: auto;
    max-width: 100vw;
    padding-bottom: 3rem;
    padding-top: 1rem;
    padding-left: 1rem;
    padding-right: 1rem;
    color: rgba(55, 65, 81, 1);
    width: 100%;
  }


  .r-div {
    box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 10px;
    /* border-radius: 10px; */
    height: 736px;
    width: 200px;
    position: relative;
    overflow-x: hidden;
    overflow-y: auto;
    padding-left: 10px; 
  }

  .l-div {
    cursor: grabbing;
    padding-left: 30px;
    padding-right: 30px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 10px;
    /* border-radius: 10px; */
    height: 736px;
    width: calc(100% - 180px);
    margin-bottom: 25px;
    position: relative;
    overflow-x: auto;
    overflow-y: auto;
  }

  .tree {
    width: auto;
    margin: auto 0;
    display: flex;
    height: 80vh;
    // align-items: center;
    padding-bottom: 280px;
    padding: 32px 0;
  }

  .temTree {
    display: grid;
    height: calc(100% - 40px);
    padding: 16px 0;
    align-items: center;
    grid-template-columns: 50% 50%;
    grid-auto-rows: 100px;
  }

</style>