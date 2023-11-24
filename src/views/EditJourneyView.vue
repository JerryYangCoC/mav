<template>
    <div class="roadmap-box">
        <span>會員旅程作業 - {{ isEdit ? '瀏覽' : '修改' }}</span>
    </div>
    
    <div class="home">
        <div class="content">
            <!-- 內頁 -->
            <div :class="'l-div'">
                <!-- 左方塊 -->
                <div class="tree" @dragover="allowDrop" @drop="dropTrigger($event)">
                    <!-- 旅程樹 -->
                    <div v-for="(item, index) of createTree()" :key="index" :style="{'grid-column-start': item.column, 'grid-row-start': item.row}">
                        <div v-html="item.value" @click="(() => { bottomDivView = true; selectContent = item?.data; })"></div>
                    </div>
                </div>

                <!-- bottom div -->
                <Transition name="bottom" mode="out-in">
                    <div style="z-index: 10; top: 500px; left: 0; background: white; position: fixed;" :style="rightDivView ? 'width: calc(100% - 220px)' : 'width: 100%'" v-if="bottomDivView">
                        <div style="height: 280px; box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 10px; text-align: left;">
                            <div style="padding: 8px; display: flex; align-items: center;" :class="checkBDivClass(selectContent?.NodeType)">
                                <button :class="selectContent?.NodeType == '105' ? 'bg-purple' : 'bg-transparent'" :style="selectContent?.NodeType == '105' ? 'width: 60px' : 'width: 20px'" style="height: 20px; padding: 0; color: white;" @click="bottomDivView = !bottomDivView;">
                                    <img src="/img/more.png" width="20" height="20" />
                                </button>
                                <span style="color: white; font-weight: bold;">{{ checkBDivTitle(selectContent) }}</span>
                            </div>

                            <div style="padding: 16px 8px;">
                                <div v-if="selectContent?.NodeType == '105'">
                                    <div style="display: flex; justify-content: flex-end;">
                                        <input type="button" class="btn" style="--i: url('/img/back.png')" @click="(() => {
                                            $router.push({path: 'journey', query: $router.currentRoute.value.query});
                                        })" value="返回" />
                                        <input type="button" class="btn" style="--i: url('/img/sent.png'); width: 100px;" @click="onCreate()" value="資料送出" />
                                    </div>
                                </div>
                                <JourneyTmp101 :isEdit="isEdit" :edit="(() => { isEdit = false })" :dd="query" :active="(() => {
                                    journeyData.JourneyName = query.JourneyName
                                    journeyData.StartDate = query.StartDate
                                    journeyData.EndDate = query.EndDate
                                    journeyData.StatusFlag = query.StatusFlag
                                    selectContent = null;
                                    bottomDivView = false;
                                    isEdit = true
                                    })" v-if="selectContent?.NodeType == '101'"></JourneyTmp101>
                                <JourneyTmp102 :isEdit="isEdit" :edit="(() => { isEdit = false })" :dd="journeyData" :value="selectContent" :active="(() => {
                                        dataTree.forEach((ver: JourneyNodeModel) => {
                                            if (ver.NodeId == selectContent?.NodeId) {
                                                ver.PeopleLimt = selectContent.PeopleLimt
                                                ver.IsRecvMsgFlag = selectContent.IsRecvMsgFlag
                                                ver.RemindedDate = selectContent.RemindedDate
                                                ver.CopyWriteId = selectContent.CopyWriteId
                                                ver.CopyWriteName = selectContent.CopyWriteName
                                                ver.VariableList = selectContent.VariableList
                                                selectContent = null
                                                bottomDivView = false
                                                return
                                            }
                                        });
                                    })"  v-if="selectContent?.NodeType == '102'"></JourneyTmp102>
                                <JourneyTmp103 :isEdit="isEdit" :edit="(() => { isEdit = false })" :dd="journeyData" :value="selectContent" :active="(() => {
                                        dataTree.forEach((ver: JourneyNodeModel) => {
                                            if (ver.NodeId == selectContent?.NodeId) {
                                                ver.SendType = selectContent.SendType
                                                ver.SelectTime = selectContent.SelectTime
                                                ver.SendTime = selectContent.SendTime
                                                ver.IsBestOffer = selectContent.IsBestOffer
                                                selectContent = null
                                                bottomDivView = false
                                                isEdit = true
                                                return
                                            }
                                        })
                                    })" v-if="selectContent?.NodeType == '103'"></JourneyTmp103>
                                <JourneyTmp104 :isEdit="isEdit" :edit="(() => { isEdit = false })" :dd="journeyData" :value="selectContent" :active="(() => {
                                        dataTree.forEach((ver: JourneyNodeModel) => {
                                            if (ver.NodeId == selectContent?.NodeId) {
                                                ver.PeopleLimt = selectContent.PeopleLimt
                                                ver.IsRecvMsgFlag = selectContent.IsRecvMsgFlag
                                                ver.RemindedDate = selectContent.RemindedDate
                                                ver.CopyWriteId = selectContent.CopyWriteId
                                                ver.CopyWriteName = selectContent.CopyWriteName
                                                ver.VariableList = selectContent.VariableList
                                                selectContent = null
                                                bottomDivView = false
                                                return
                                            }
                                        });
                                    })" v-if="selectContent?.NodeType == '104'"></JourneyTmp104>
                                <JourneyTmp106 :isEdit="isEdit" :edit="(() => { isEdit = false })" :dd="journeyData" :value="selectContent" :active="(() => {
                                        dataTree.forEach((ver: JourneyNodeModel) => {
                                            if (ver.NodeId == selectContent?.NodeId) {
                                                ver.PeopleLimt = selectContent.PeopleLimt
                                                ver.IsRecvMsgFlag = selectContent.IsRecvMsgFlag
                                                ver.RemindedDate = selectContent.RemindedDate
                                                ver.CopyWriteId = selectContent.CopyWriteId
                                                ver.CopyWriteName = selectContent.CopyWriteName
                                                ver.VariableList = selectContent.VariableList
                                                selectContent = null
                                                bottomDivView = false
                                                return
                                            }
                                        });
                                    })" v-if="selectContent?.NodeType == '106'"></JourneyTmp106>
                                <JourneyTmp107 :isEdit="isEdit" :edit="(() => { isEdit = false })" :dd="journeyData" :type="importType" :active="(() => {
                                        dataTree.forEach((ver: JourneyNodeModel) => {
                                            if (ver.NodeId == selectContent?.NodeId) {
                                                ver.JudgeType = selectContent.JudgeType
                                                ver.ConsumeStartYMD = selectContent.ConsumeStartYMD
                                                ver.ConsumeEndYMD = selectContent.ConsumeEndYMD
                                                ver.GoldSelectDate = selectContent.GoldSelectDate
                                                ver.RemindedStartYMD = selectContent.RemindedStartYMD
                                                ver.RemindedEndYMD = selectContent.RemindedEndYMD
                                                ver.BirthSelectmonth = selectContent.BirthSelectmonth
                                                selectContent = null;
                                                bottomDivView = false;
                                                isEdit = true
                                                return
                                            }
                                        });
                                    })" :value="selectContent" v-if="selectContent?.NodeType == '107'"></JourneyTmp107>
                                <JourneyTmp108 :isEdit="isEdit" :dd="journeyData" :value="selectContent" :active="(() => { 
                                    selectContent = null;
                                    bottomDivView = false;
                                    return;
                                })" v-if="selectContent?.NodeType == '108'"></JourneyTmp108>
                                <JourneyTmp201 :isEdit="isEdit" :edit="(() => { isEdit = false })" :dd="journeyData" :value="selectContent" :active="(() => {
                                    dataTree.forEach((ver: JourneyNodeModel) => {
                                        if (ver.NodeId == selectContent?.NodeId) {
                                            ver.CouponList = selectContent.CouponList
                                            selectContent = null;
                                            bottomDivView = false;
                                            isEdit = true
                                            return;
                                        }
                                    });
                                    })" v-if="selectContent?.NodeType == '201'"></JourneyTmp201>
                                <JourneyTmp202 :isEdit="isEdit" :edit="(() => { isEdit = false })" :dd="journeyData" :active="(() => {
                                    dataTree.forEach((ver: JourneyNodeModel) => {
                                        if (ver.NodeId == selectContent?.NodeId) {
                                            ver.CouponList = selectContent.CouponList
                                            selectContent = null;
                                            bottomDivView = false;
                                        }
                                    });
                                    })" :value="selectContent" v-if="selectContent?.NodeType == '202'"></JourneyTmp202>
                                <JourneyTmp203 :isEdit="isEdit" :edit="(() => { isEdit = false })" :dd="journeyData" :active="(() => {
                                    dataTree.forEach((ver: JourneyNodeModel) => {
                                        if (ver.NodeId == selectContent?.NodeId) {
                                            ver.SelectDate = selectContent.SelectDate
                                            selectContent = null;
                                            bottomDivView = false;
                                        }
                                    });
                                    })" :value="selectContent" v-if="selectContent?.NodeType == '203'"></JourneyTmp203>
                                <JourneyTmp204 :isEdit="isEdit" :edit="(() => { isEdit = false })" :dd="journeyData" :active="(() => {
                                    dataTree.forEach((ver: JourneyNodeModel) => {
                                        if (ver.NodeId == selectContent?.NodeId) {
                                            ver.NewMemStartYMD = selectContent.NewMemStartYMD
                                            ver.NewMemEndYMD = selectContent.NewMemEndYMD
                                            selectContent = null;
                                            bottomDivView = false;
                                        }
                                    });
                                    })" :value="selectContent" v-if="selectContent?.NodeType == '204'"></JourneyTmp204>
                                <JourneyTmp205 :isEdit="isEdit" :edit="(() => { isEdit = false })" :dd="journeyData" :active="(() => {
                                    dataTree.forEach((ver: JourneyNodeModel) => {
                                        if (ver.NodeId == selectContent?.NodeId) {
                                            ver.NewMemSelectDate = selectContent.NewMemSelectDate
                                            selectContent = null;
                                            bottomDivView = false;
                                        }
                                    });
                                    })" :value="selectContent" v-if="selectContent?.NodeType == '205'"></JourneyTmp205>
                                <JourneyTmp206 :isEdit="isEdit" :edit="(() => { isEdit = false })" :dd="journeyData" :active="(() => {
                                    dataTree.forEach((ver: JourneyNodeModel) => {
                                        if (ver.NodeId == selectContent?.NodeId) {
                                            ver.ProductList = selectContent.ProductList
                                            ver.IsMaxPay = selectContent.IsMaxPay
                                            ver.PayStartYMD = selectContent.PayStartYMD
                                            ver.PayEndYMD = selectContent.PayEndYMD
                                            selectContent = null;
                                            bottomDivView = false;
                                        }
                                    });
                                    })" :value="selectContent" v-if="selectContent?.NodeType == '206'"></JourneyTmp206>
                                <JourneyTmp207 :isEdit="isEdit" :edit="(() => { isEdit = false })" :dd="journeyData" :active="(() => {
                                    dataTree.forEach((ver: JourneyNodeModel) => {
                                        if (ver.NodeId == selectContent?.NodeId) {
                                            ver.SelectDate = selectContent.SelectDate
                                            selectContent = null;
                                            bottomDivView = false;
                                        }
                                    });
                                    })" :value="selectContent" v-if="selectContent?.NodeType == '207'"></JourneyTmp207>
                                <JourneyTmp208 :isEdit="isEdit" :edit="(() => { isEdit = false })" :dd="journeyData" :active="(() => {
                                    dataTree.forEach((ver: JourneyNodeModel) => {
                                        if (ver.NodeId == selectContent?.NodeId) {
                                            ver.SelectDate = selectContent.SelectDate
                                            selectContent = null;
                                            bottomDivView = false;
                                        }
                                    });
                                    })" :value="selectContent" v-if="selectContent?.NodeType == '208'"></JourneyTmp208>
                                <JourneyTmp209 :isEdit="isEdit" :edit="(() => { isEdit = false })" :dd="journeyData" :active="(() => {
                                    dataTree.forEach((ver: JourneyNodeModel) => {
                                        if (ver.NodeId == selectContent?.NodeId) {
                                            ver.DateType = selectContent.DateType
                                            ver.SelectDate = selectContent.SelectDate
                                            ver.PayAmtStart = selectContent.PayAmtStart
                                            ver.PayAmtEnd = selectContent.PayAmtEnd
                                            selectContent = null;
                                            bottomDivView = false;
                                        }
                                    });
                                    })" :value="selectContent" v-if="selectContent?.NodeType == '209'"></JourneyTmp209>
                                <JourneyTmp210 :isEdit="isEdit" :edit="(() => { isEdit = false })" :dd="journeyData" :active="(() => {
                                    dataTree.forEach((ver: JourneyNodeModel) => {
                                        if (ver.NodeId == selectContent?.NodeId) {
                                            ver.ActivityType = selectContent.ActivityType
                                            importType = selectContent.ActivityType ?? ''
                                            ver.Import = selectContent.Import
                                            ver.ActivityList = selectContent.ActivityList
                                            selectContent = null;
                                            bottomDivView = false;
                                        }
                                    });
                                    })" :value="selectContent" v-if="selectContent?.NodeType == '210'"></JourneyTmp210>
                            </div>
                        </div>
                    </div>
            
                    <div style="position: absolute; bottom: 0; left: 50%; z-index: 999; height: 20px;" v-else>
                        <button style="width: 40px; height: 20px; padding: 0;" class="bg-purple" @click="(() => { bottomDivView = !bottomDivView })">
                            <img src="/img/less.png" width="20" height="20" />
                        </button>
                    </div>
                </Transition>

                <!-- right div -->
                <Transition name="right" mode="out-in">
                    <div style="position: fixed; top: 423px; right: 0; z-index: 999;">
                        <button style="width: 20px; padding: 0;" class="bg-purple">
                            <img src="/img/left.png" width="20" height="20" />
                        </button>
                    </div>
                </Transition>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import axios from 'axios';
import { JourneyModel, JourneyNodeModel, PositionModel } from '@/model/journeyList.model';
import store from '@/store';

@Options({
  components: {
  },
})
export default class EditJourneyView extends Vue {
    journeyData: JourneyModel = {
        JourneyId: "",
        JourneyName: "",
        JourneyType: '',
        StartDate: "",
        EndDate: "",
        FileType: "2",
        Content: [],
        UserID: "",
    };
    dataTree!: any;
    tmpTree!: any;
    isEdit = true;

    /**
     * 功能項目
     */
    temA: Array<JourneyNodeModel> = [
        {
            NodeId: '0',
            NodeName: '發送時間',
            NodeType: '103',
            Position: [],
        }, {
            NodeId: '0',
            NodeName: '結束',
            NodeType: '105',
            Position: [],
        }, {
            NodeId: '0',
            NodeName: '判斷條件',
            NodeType: '107',
            Position: [],
        }, {
            NodeId: '0',
            NodeName: '溝通管道',
            NodeType: '108',
            Position: [],
        },
    ];

    /**
     * 旅程項目
     */
    temB: Array<JourneyNodeModel> = [
        {
            NodeId: '0',
            NodeName: 'COUPON',
            NodeType: '201',
            Position: [],
        }, {
            NodeId: '0',
            NodeName: '精算抵用券',
            NodeType: '202',
            Position: [],
        }, {
            NodeId: '0',
            NodeName: '生日禮',
            NodeType: '203',
            Position: [],
        }, {
            NodeId: '0',
            NodeName: '新會員活動',
            NodeType: '204',
            Position: [],
        }, {
            NodeId: '0',
            NodeName: '新會員權益',
            NodeType: '205',
            Position: [],
        }, {
            NodeId: '0',
            NodeName: '商品購買',
            NodeType: '206',
            Position: [],
        }, {
            NodeId: '0',
            NodeName: '金續金',
            NodeType: '207',
            Position: [],
        }, {
            NodeId: '0',
            NodeName: '普升金',
            NodeType: '208',
            Position: [],
        }, {
            NodeId: '0',
            NodeName: '準金卡',
            NodeType: '209',
            Position: [],
        }, {
            NodeId: '0',
            NodeName: '名單匯入',
            NodeType: '210',
            Position: [],
        },
    ];

    rightDivView = false;
    bottomDivView = true;
    stemp = 'B';
    selectContent: JourneyNodeModel | null = {
        NodeId: "0",
        NodeName: "基本設定",
        NodeType: "101",
        Position: [],
    };
    query: JourneyModel = {
        JourneyId: '',
        JourneyName: '',
        JourneyType: '',
        StartDate: '',
        EndDate: '',
    };
    useId: Array<string> = new Array<string>();
    endId!: number;
    importType!: string;
    row!: number;
    col!: number;
    contentList: Array<string> = new Array<string>();
  
    /**
     * 初始化
     */
    created(): void {
        console.log('edit')
        this.journeyData = store.state.journey.journeyDetail
        this.journeyData.Content = JSON.parse(this.journeyData.Content)
        this.journeyData.JourneyType = this.journeyData?.Content[0].NodeType.slice(1)
        this.query = {
            JourneyId: this.journeyData.JourneyId?.toString(),
            JourneyName: this.journeyData.JourneyName.toString(),
            JourneyType: this.journeyData.JourneyType.toString(),
            StartDate: this.journeyData.StartDate.toString(),
            EndDate: this.journeyData.EndDate.toString(),
            StatusFlag: this.journeyData.StatusFlag?.toString()
        }
    }

    /**
     * 繪製旅程樹
     */
    createTree(): [{ [name: string]: any }] {
        this.dataTree = this.journeyData.Content;
        let column = 1;
        let row = 1;
        let row1 = 1;
        let rowCont = 1;
        let lists: [ { [name: string]: any }] = [{value: this.btn('基本設定', 'setting', 'A', ''), data: { NodeId: '0', NodeName: '基本設定', NodeType: '101', }, column: column, row: 1}];
        let useList: Array<string> = [];
    
        lists.push({value: this.ALine(), column: column+1, row: 1})

        column++;
        column++;

        this.col = 1;
        this.row = 1;
        let contentList = new Array<string>();
        if (this.dataTree.length > 0) this.forTree(lists, '1', column, row, 0, 1, contentList)

        return lists;
    }

    forTree(data: any, value: string, col: number, row: number, n: number, cnt: number, ctl: Array<string>): void {
        for (const item of this.dataTree) {
            if (item.NodeId == value) {
                console.log('item', item)
                if (item.NodeType == '105') n--;
                data.push({value: this.category(item), data: item, column: col, row: this.row})
                row = this.row
                
                if (item.Position.length == 1) {
                    if (item.NodeType != '105') {
                        data.push({value: this.ALine(), column: col + 1, row: this.row})
                    } else {
                        // n--;
                    }
                } else if (item.Position.length > 0) {
                    ctl = item.Position.map((v: PositionModel) => {
                        return v.label
                    })
                    // data.push({value: this.BLine(this.contentList), column: col + 1, row: this.row})

                    data.push({value: this.CLine(ctl[0]), column: col + 1, row: this.row})
                    // col++;
                    cnt += item.Position.length - 1
                }

                col += 2;

                item.Position.forEach((ip: PositionModel, i: number) => {
                    if (i != 0) {
                        this.row++;
                        data.push({value: this.DLine(ctl[i], this.row - row), column: col - 1, row: this.row})
                    }
                    this.forTree(data, ip.target.toString(), col, row, n, cnt, ctl)
                    n++;
                })
            }
        }
    }

    /**
     * 新增
     */
    onCreate(): void {
        store.dispatch('upLoading', true)
        console.log(this.journeyData)
        this.journeyData.Content = JSON.stringify(this.journeyData.Content)
        this.journeyData.UserID = this.$router.currentRoute.value.query?.UserID?.toString();
        this.journeyData.FileType = '2';

        axios.post('http://10.2.126.194:8030/app/v1/api/CDP/JourneyImport', this.journeyData)
            .then((res) => {
                store.dispatch('upLoading', false)
                console.log('set journey', res)
                if (res.status == 200) {
                    switch(res.data?.Status) {
                        case '0':
                            // 成功
                            alert('修改成功')
                            this.$router.push({path: 'journey', query: this.$router.currentRoute.value.query});
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

    /**
     * 建立項目按鈕
     * @param type 項目類別
     */
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
    category(e: JourneyNodeModel): string {
        const typeValue: { [name: string]: string } = {
            '101': this.btn(e.NodeName, 'setting', 'A', ''),
            '102': this.btn(e.NodeName, 'email-line', 'C', e.NodeSeq ?? ''),
            '103': this.btn(e.NodeName, 'medication-time', 'A', this.sendType(e.SendType ?? '', e.SelectTime ?? '')),
            '104': this.btn(e.NodeName, 'cosmed', 'C', e.NodeSeq ?? ''),
            '105': this.btn(e.NodeName, 'stop-circle-sharp', 'A', ''),
            '106': this.btn(e.NodeName, 'sms-search', 'C', e.NodeSeq ?? ''),
            '107': this.btn(e.NodeName, 'pipeline', 'AT', this.judgeType(e.JudgeType ?? '')),
            '108': this.btn(e.NodeName, 'help', 'AT', ''),
            '109': this.btn(e.NodeName, 'not_app', 'C', e.NodeSeq ?? ''),
            '110': this.btn(e.NodeName, 'not_edm', 'C', e.NodeSeq ?? ''),
            '111': this.btn(e.NodeName, 'not_sms', 'C', e.NodeSeq ?? ''),
            '201': this.btn(e.NodeName, 'coupon-2-line', 'B', ''),
            '202': this.btn(e.NodeName, 'coupon', 'B', ''),
            '203': this.btn(e.NodeName, 'cil-birthday-cake', 'B', ''),
            '204': this.btn(e.NodeName, 'light-member', 'B', ''),
            '205': this.btn(e.NodeName, 'symbol-enum-member', 'B', ''),
            '206': this.btn(e.NodeName, 'ad-product', 'B', ''),
            '207': this.btn(e.NodeName, 'vip-crown-fill', 'B', ''),
            '208': this.btn(e.NodeName, 'vip-crown-2-line', 'B', ''),
            '209': this.btn(e.NodeName, 'vip-crown-2-fill', 'B', ''),
            '210': this.btn(e.NodeName, 'import', 'B', '')
        }

        return typeValue[e.NodeType] ?? ''
    }

    /**
     * 判斷條件類型
     * @param value 判斷條件Type
     */
    judgeType(value: string): string {
        const typeValue: { [name: string]: string } = {
            '0': '用券',
            '1': '全店消費(生日)',
            '2': '全店消費(準金卡)',
            '3': '全店消費(期間)',
            '4': '3G活動消費',
            '5': '精算活動消費',
            '6': '商品消費',
        }

        return typeValue[value] ?? ''
    }

    /**
     * 發送時間類型
     * @param value 發送時間Type 
     * @param time 發送時間
     */
    sendType(value: string, time: string): string {
        const typeValue: { [name: string]: string } = {
            '0': 'D-' + time + '天',
            '1': '每月' + time + '號',
            '2': time,
            '3': '新入會後' + time + '天',
        }

        return typeValue[value] ?? ''
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
        e.dataTransfer.setData("Text", tar);
    }

    /**
     * 拖動結束
     * @param e 方塊
     */
    dropTrigger(e: any): void {
        this.allowDrop(e);
        const dragText = e.dataTransfer.getData("Text");

        if (this.useId.length > 0 && dragText == '結束') {
            const uId = this.useId[0].split('-')[0].toString();
            this.dataTree.forEach((ver: JourneyNodeModel) => {
                if (ver.NodeId == uId) {
                    if (ver.NodeType == '102' || 
                        ver.NodeType == '104' || 
                        ver.NodeType == '106' || 
                        ver.NodeType == '107' || 
                        ver.NodeType == '109' || 
                        ver.NodeType == '110' || 
                        ver.NodeType == '111'
                    ) {
                        this.dataTree.push({
                            NodeId: this.useId[0].split('-')[1],
                            NodeName: dragText,
                            NodeType: "105",
                            Position: []
                        })
                        this.selectContent = {
                            NodeId: this.useId[0].split('-')[1],
                            NodeName: dragText,
                            NodeType: "105",
                            Position: [],
                        };
                        this.bottomDivView = true;
                        this.useId.splice(0, 1)
                        return;
                    }
                }
            })

        }

        if (this.selectContent) return;

        switch(dragText) {
            case 'COUPON':
                if (this.dataTree.length == 0) {
                    this.journeyData.JourneyType = '01'
                    this.dataTree.push({
                        NodeId: "1",
                        NodeName: dragText,
                        NodeType: "201",
                        Position: [
                            {
                                "SeqId": "e1-2",
                                "source": '1',
                                "target": '2',
                                "label": ""
                            }
                        ],
                    });
                    this.selectContent = {
                        NodeId: "1",
                        NodeName: dragText,
                        NodeType: "201",
                        Position: [],
                    };
                    this.bottomDivView = true;
                }
                break;

            case '精算抵用券':
                if (this.dataTree.length == 0) {
                    this.journeyData.JourneyType = '02'
                    this.dataTree.push({
                        NodeId: "1",
                        NodeName: dragText,
                        NodeType: "202",
                        Position: [
                            {
                                "SeqId": "e1-2",
                                "source": '1',
                                "target": '2',
                                "label": ""
                            }
                        ],
                    });
                    this.selectContent = {
                        NodeId: "1",
                        NodeName: dragText,
                        NodeType: "202",
                        Position: [],
                    };
                    this.bottomDivView = true;
                }
                break;

            case '生日禮':
                if (this.dataTree.length == 0) {
                    this.journeyData.JourneyType = '03'
                    this.dataTree.push({
                        NodeId: "1",
                        NodeName: dragText,
                        NodeType: "203",
                        Position: [
                            {
                                "SeqId": "e1-2",
                                "source": '1',
                                "target": '2',
                                "label": ""
                            }
                        ],
                    });
                    this.selectContent = {
                        NodeId: "1",
                        NodeName: dragText,
                        NodeType: "203",
                        Position: [],
                    };
                    this.bottomDivView = true;
                }
                break;

            case '新會員活動':
                if (this.dataTree.length == 0) {
                    this.journeyData.JourneyType = '04'
                    this.dataTree.push({
                        NodeId: "1",
                        NodeName: dragText,
                        NodeType: "204",
                        Position: [
                            {
                                "SeqId": "e1-2",
                                "source": '1',
                                "target": '2',
                                "label": ""
                            }
                        ],
                    });
                    this.selectContent = {
                        NodeId: "1",
                        NodeName: dragText,
                        NodeType: "204",
                        Position: [],
                    };
                    this.bottomDivView = true;
                }
                break;

            case '新會員權益':
                if (this.dataTree.length == 0) {
                    this.journeyData.JourneyType = '05'
                    this.dataTree.push({
                        NodeId: "1",
                        NodeName: dragText,
                        NodeType: "205",
                        Position: [
                            {
                                "SeqId": "e1-2",
                                "source": '1',
                                "target": '2',
                                "label": ""
                            }
                        ],
                    });
                    this.selectContent = {
                        NodeId: "1",
                        NodeName: dragText,
                        NodeType: "205",
                        Position: [],
                    };
                    this.bottomDivView = true;
                }
                break;

            case '商品購買':
                if (this.dataTree.length == 0) {
                    this.journeyData.JourneyType = '06'
                    this.dataTree.push({
                        NodeId: "1",
                        NodeName: dragText,
                        NodeType: "206",
                        Position: [
                            {
                                "SeqId": "e1-2",
                                "source": '1',
                                "target": '2',
                                "label": ""
                            }
                        ],
                    });
                    this.selectContent = {
                        NodeId: "1",
                        NodeName: dragText,
                        NodeType: "206",
                        Position: [],
                    };
                    this.bottomDivView = true;
                }
                break;

            case '金續金':
                if (this.dataTree.length == 0) {
                    this.journeyData.JourneyType = '07'
                    this.dataTree.push({
                        NodeId: "1",
                        NodeName: dragText,
                        NodeType: "207",
                        Position: [
                            {
                                "SeqId": "e1-2",
                                "source": '1',
                                "target": '2',
                                "label": ""
                            }
                        ],
                    });
                    this.selectContent = {
                        NodeId: "1",
                        NodeName: dragText,
                        NodeType: "207",
                        Position: [],
                    };
                    this.bottomDivView = true;
                }
                break;

            case '普升金':
                if (this.dataTree.length == 0) {
                    this.journeyData.JourneyType = '08'
                    this.dataTree.push({
                        NodeId: "1",
                        NodeName: dragText,
                        NodeType: "208",
                        Position: [
                            {
                                "SeqId": "e1-2",
                                "source": '1',
                                "target": '2',
                                "label": ""
                            }
                        ],
                    });
                    this.selectContent = {
                        NodeId: "1",
                        NodeName: dragText,
                        NodeType: "208",
                        Position: [],
                    };
                    this.bottomDivView = true;
                }
                break;

            case '準金卡':
                if (this.dataTree.length == 0) {
                    this.journeyData.JourneyType = '09'
                    this.dataTree.push({
                        NodeId: "1",
                        NodeName: dragText,
                        NodeType: "209",
                        Position: [
                            {
                                "SeqId": "e1-2",
                                "source": '1',
                                "target": '2',
                                "label": ""
                            }
                        ],
                    });
                    this.selectContent = {
                        NodeId: "1",
                        NodeName: dragText,
                        NodeType: "209",
                        Position: [],
                    };
                    this.bottomDivView = true;
                }
                break;

            case '名單匯入':
                if (this.dataTree.length == 0) {
                    this.journeyData.JourneyType = '10'
                    this.dataTree.push({
                        NodeId: "1",
                        NodeName: dragText,
                        NodeType: "210",
                        Position: [
                            {
                                "SeqId": "e1-2",
                                "source": '1',
                                "target": '2',
                                "label": ""
                            }
                        ],
                    });
                    this.selectContent = {
                        NodeId: "1",
                        NodeName: dragText,
                        NodeType: "210",
                        Position: [],
                    };
                    this.bottomDivView = true;
                }
                break;

            case '發送時間':
                if (this.dataTree.length == 1) {
                    this.dataTree.push({
                        NodeId: "2",
                        NodeName: dragText,
                        NodeType: "103",
                        IsBestOffer: '0',
                        Position: [
                            {
                                "SeqId": "e2-3",
                                "source": '2',
                                "target": '3',
                                "label": ""
                            }
                        ],
                    });
                    this.selectContent = {
                        NodeId: "2",
                        NodeName: dragText,
                        NodeType: "103",
                        IsBestOffer: '0',
                        Position: [],
                    };
                    this.bottomDivView = true;
                    this.useId.push('2-3')
                    this.endId = 4
                } else if (this.useId.length > 0) {
                    const uId = this.useId[0].split('-')[0].toString();
                    this.dataTree.forEach((ver: JourneyNodeModel) => {
                        if (ver.NodeId == uId && (
                            ver.NodeType == '102' || 
                            ver.NodeType == '104' || 
                            ver.NodeType == '106' || 
                            ver.NodeType == '109' || 
                            ver.NodeType == '110' || 
                            ver.NodeType == '111'
                        )) {
                            this.dataTree.push({
                                NodeId: this.useId[0].split('-')[1],
                                NodeName: dragText,
                                NodeType: "103",
                                IsBestOffer: '0',
                                Position: [
                                    {
                                        "SeqId": "e" + this.useId[0].split('-')[1] + '-' + this.endId,
                                        "source": this.useId[0].split('-')[1],
                                        "target": this.endId,
                                        "label": ""
                                    }
                                ]
                            })
                            this.selectContent = {
                                NodeId: this.useId[0].split('-')[1],
                                NodeName: dragText,
                                NodeType: "103",
                                IsBestOffer: '0',
                                Position: [],
                            };
                            this.bottomDivView = true;
                            this.useId.push(this.useId[0].split('-')[1] + '-' + this.endId)
                            this.useId.splice(0, 1)
                            this.endId ++;
                            return;
                        }
                    })
                }
                break;

            case '判斷條件':
                if (this.useId.length > 0) {
                    const uId = this.useId[0].split('-')[0].toString();
                    this.dataTree.forEach((ver: JourneyNodeModel) => {
                        if (ver.NodeId == uId && ver.NodeType == '103' && (
                            this.journeyData.JourneyType == '01' ||
                            this.journeyData.JourneyType == '02' ||
                            this.journeyData.JourneyType == '03' ||
                            this.journeyData.JourneyType == '04' ||
                            this.journeyData.JourneyType == '06' ||
                            this.journeyData.JourneyType == '09' ||
                            this.journeyData.JourneyType == '10'
                        )) {
                            this.dataTree.push({
                                NodeId: this.useId[0].split('-')[1],
                                NodeName: dragText,
                                NodeType: "107",
                                JudgeType: '',
                                Position: [
                                    {
                                        "SeqId": "e" + this.useId[0].split('-')[1] + '-' + this.endId,
                                        "source": this.useId[0].split('-')[1],
                                        "target": this.endId++,
                                        "label": "有"
                                    },
                                    {
                                        "SeqId": "e" + this.useId[0].split('-')[1] + '-' + this.endId,
                                        "source": this.useId[0].split('-')[1],
                                        "target": this.endId,
                                        "label": "無"
                                    },
                                ]
                            })
                            this.selectContent = {
                                NodeId: this.useId[0].split('-')[1],
                                NodeName: dragText,
                                NodeType: "107",
                                Position: [],
                            };
                            this.bottomDivView = true;
                            this.endId--;
                            this.useId.push(this.useId[0].split('-')[1] + '-' + this.endId++)
                            this.useId.push(this.useId[0].split('-')[1] + '-' + this.endId++)
                            this.useId.splice(0, 1)
                            // this.endId ++;
                            return;
                        }
                    })
                }
                break;

            case '溝通管道':
                if (this.useId.length > 0) {
                    const uId = this.useId[0].split('-')[0].toString();
                    this.dataTree.forEach((ver: JourneyNodeModel) => {
                        if (ver.NodeId == uId && (ver.NodeType == '103' || ver.NodeType == '107')) {
                            this.dataTree.push({
                                NodeId: this.useId[0].split('-')[1],
                                NodeName: dragText,
                                NodeType: "108",
                                Position: []
                            })
                            this.selectContent = {
                                NodeId: this.useId[0].split('-')[1],
                                NodeName: dragText,
                                NodeType: "108",
                                Position: [],
                            };
                            this.bottomDivView = true;
                            this.useId.splice(0, 1)
                            // this.endId ++;
                            return;
                        }
                    })

                }
                break;

            default:
                break;
        
        }
    }

    /**
     * 資料處理
     * @param data 要處理的資料
     */
    changeString(data: string): string {
        return data.replace(/"/g, "”") 
    }
  
    /**
     * 資料處理
     * @param data 要處理的資料
     */  
    changeBr(data: string): string {
        return data.replace(/\n/g, "<br>") 
    }

    /**
     * 方塊
     * @param text 文字
     * @param img 圖片
     * @param type 類型
     */
    btn(text: string, img: string, type: string, seq: string) {
        return `
            <div>
                <div style="${seq ? 'min-width: 60px; text-align: center; margin-top: -25px; width: max-content;' : 'display: none'}">
                    <span class="f-12">${ seq }</span>
                </div>

                <div class="${ this.checkBtnClass(type) }" style="--i:url(/img/${ img }.png)"></div>
                
                <div style="white-space:nowrap;">
                    <span class="f-14">${ text }</span>
                </div>
            </div>
        `;
    }


    /**
     * 一般線
     */
    ALine() {
        return `
            <div>
                <div style="width: 110px; margin-top: 14px">
                    <div>
                        <hr class="hr-space-square" />
                    </div>
                </div>
            </div>
        `
    }

    /**
     * 複雜線
     * @param count 線上文字列表
     */
    BLine(count: Array<string>) {
        return `
            <div style="display: flex; margin-top: 22px;">
                <div style="width: 30px;">
                    <div>
                        <hr style="border: none; height: 0; border-top: 2px solid #000; width: 100%;" />
                    </div>
                </div>
            
                <div style="height: ${(count?.length - 1) * 160}px; margin-top: 8px;">
                    <div>
                        <svg width="2" height="${(count?.length - 1) * 160}" viewBox="0 0 2 ${(count?.length - 1) * 250}" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 0L0.999999 ${(count?.length - 1) * 250}" stroke="#000" stroke-width="2"/>
                        </svg>
                    </div>
                </div>
            
                <div style="width: 80px; height: ${ 30 + (count?.length - 1) * 160 }px; display: grid; align-content: space-between; margin-left: -2px; margin-top: -7px;">
                    <div style="${count[0] ? '' : 'display: none'}">
                        <hr class="hr-space-square" data-content="${count[0]}" />
                    </div>
                    
                    <div style="${count[1] ? '' : 'display: none'}">
                        <hr class="hr-space-square" data-content="${count[1]}" />
                    </div>
                    
                    <div style="${count[2] ? '' : 'display: none'}">
                        <hr class="hr-space-square" data-content="${count[2]}" />
                    </div>
                    
                    <div style="${count[3] ? '' : 'display: none'}">
                        <hr class="hr-space-square" data-content="${count[3]}" />
                    </div>
                    
                    <div style="${count[4] ? '' : 'display: none'}">
                        <hr class="hr-space-square" data-content="${count[4]}" />
                    </div>
                    
                    <div style="${count[5] ? '' : 'display: none'}">
                        <hr class="hr-space-square" data-content="${count[5]}" />
                    </div>
                    
                </div>
            </div>
        `
    }


    CLine(value: string) {
        return `
            <div>
                <div style="width: 110px; margin-top: 14px">
                    <div>
                        <hr class="hr-space-square" data-content="${value}" />
                    </div>
                </div>
            </div>
        `
    }

    DLine(value: string, row: number) {
        return `
            <div style="display: flex;">

                <div style="width: 30px;">
                    <div>
                    </div>
                </div>

                <div style="height: 10px; margin-top: ${(row * -160) + 30}px;">
                    <div>
                        <svg width="2" viewBox="0 0 2 ${row * 160}" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 0L0.999999 ${row * 160}" stroke="#000" stroke-width="2"/>
                        </svg>
                    </div>
                </div>
                
                <div style="width: 80px; margin-top: 14px">
                    <div>
                        <hr class="hr-space-square" data-content="${value}" />
                    </div>
                </div>
            </div>
        `
    }

    /**
     * 根據項目回傳背景樣式
     * @param type 項目類型
     */
    checkBDivClass(type: string | undefined): string {
        const typeValue: { [name: string]: string} = {
            '101': 'bg-purple',
            '102': 'bg-blue',
            '103': 'bg-purple',
            '104': 'bg-blue',
            '106': 'bg-blue',
            '107': 'bg-purple',
            '108': 'bg-purple',
            '109': 'bg-blue',
            '110': 'bg-blue',
            '111': 'bg-blue',
            '201': 'bg-orange',
            '202': 'bg-orange',
            '203': 'bg-orange',
            '204': 'bg-orange',
            '205': 'bg-orange',
            '206': 'bg-orange',
            '207': 'bg-orange',
            '208': 'bg-orange',
            '209': 'bg-orange',
            '210': 'bg-orange',
        }

        return typeValue[type ?? ''] ?? ''
    }

    /**
     * 根據類型回傳樣式
     * @param type 類型
     */
    checkBtnClass(type: string): string {
        const typeValue: { [name: string]: string } = {
            'A': 'purple-tag',
            'AT': 'purple-tag div-tran',
            'B': 'orange-tag',
            'C': 'blue-tag'
        }

        return typeValue[type] ?? ''
    }

    checkBDivTitle(data: JourneyNodeModel | null): string {
        const typeValue: { [name: string]: string} = {
            '201': 'POS COUPON',
            '207': '金卡升等-金續金',
            '208': '金卡升等-普升金',
            '209': '準金卡升等',
        }

        return typeValue[data?.NodeType ?? ''] ?? data?.NodeName

    }
}
</script>

<style scoped lang="scss">
    .home {
        height: calc(100% - 55px);
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
        // padding-bottom: 3rem;
        // padding-top: 1rem;
        // padding-left: 1rem;
        // padding-right: 1rem;
        color: rgba(55, 65, 81, 1);
        width: 100%;
        border: 1px solid #ccc;
    }


    .r-div {
        box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 10px;
        height: 736px;
        width: 220px;
        position: relative;
        overflow-x: hidden;
        overflow-y: auto;
    }

    .l-div {
        cursor: grabbing;
        padding-left: 30px;
        padding-right: 30px;
        box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 10px;
        /* border-radius: 10px; */
        height: 736px;
        width: 100%;
        // margin-bottom: 25px;
        position: relative;
        overflow-x: auto;
        overflow-y: auto;
    }


    .tree {
        width: fit-content;
        margin: auto 0;
        display: grid;
        height: 80vh;
        padding: 32px 20vw 280px 0;
        margin-right: 10vw;
        overflow: auto;
        // grid-template-rows: 160px 160px 160px 160px 160px 160px 160px 160px 160px 160px 160px 160px 160px 160px 160px 160px 160px 160px 160px;
        grid-auto-rows: 160px;
    }

    .temTree {
        display: grid;
        height: calc(100% - 42px);
        padding: 16px 12px;
        align-items: center;
        grid-template-columns: 50% 50%;
        grid-auto-rows: 100px;
    }


    // #region 主頁動畫效果
    .right-enter-active,
    .right-leave-active {
        transition: all 0.6s ease-out;
    }
    .right-enter-from,
    .right-leave-to {
        transform: translateX(100%);
    }

    .right-enter-to {
        transform: translateX(0);
    }

    .bottom-enter-active,
    .bottom-leave-active {
        transition: all 0.6s ease-out;
    }

    .bottom-enter-from,
    .bottom-leave-to {
        transform: translateY(100%);
    }

    .bottom-enter-to {
        transform: translateY(0);
    }

</style>