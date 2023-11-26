<template>
    <div class="roadmap-box">
        <span>會員旅程作業 - 新增</span>
    </div>
    
    <div class="home">
        <div class="content">
            <!-- 內頁 -->
            <div :class="'l-div'">
                <!-- 左方塊 -->
                <div :style="journeyData.Content?.length < 12 ? 'padding-right: 100vw;' : ''" class="tree" @dragover="allowDrop" @drop="dropTrigger($event)">
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
                                        <input type="button" class="btn" style="--i: url('/img/delete.png')" @click="(() => {onRemove()})" value="刪除" />
                                        <input type="button" class="btn" style="--i: url('/img/sent.png'); width: 100px;" @click="onCreate()" value="資料送出" />
                                    </div>
                                </div>
                                <JourneyTmp101 :isEdit="false"  :dd="query" :active="(() => {
                                        journeyData.JourneyName = query.JourneyName
                                        journeyData.StartDate = query.StartDate
                                        journeyData.EndDate = query.EndDate
                                        journeyData.StatusFlag = query.StatusFlag
                                        selectContent = null;
                                        bottomDivView = false;
                                    })" v-if="selectContent?.NodeType == '101'"></JourneyTmp101>
                                <JourneyTmp102 :isEdit="false"  :dd="journeyData" :value="selectContent" :active="(() => {
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
                                    })" v-if="selectContent?.NodeType == '102'"></JourneyTmp102>
                                <JourneyTmp103 :isEdit="false"  :dd="journeyData" :value="selectContent" :active="(() => {
                                        dataTree.forEach((ver: JourneyNodeModel) => {
                                            if (ver.NodeId == selectContent?.NodeId) {
                                                ver.SendType = selectContent.SendType
                                                ver.SelectTime = selectContent.SelectTime
                                                ver.SendTime = selectContent.SendTime
                                                ver.IsBestOffer = selectContent.IsBestOffer
                                                selectContent = null
                                                bottomDivView = false
                                                return
                                            }
                                        })
                                    })" :remove="(() => {onRemove()})" v-if="selectContent?.NodeType == '103'"></JourneyTmp103>
                                <JourneyTmp104 :isEdit="false"  :dd="journeyData" :value="selectContent" :active="(() => {
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
                                <JourneyTmp106 :isEdit="false"  :dd="journeyData" :value="selectContent" :active="(() => {
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
                                <JourneyTmp107 :isEdit="false"  :dd="journeyData" :type="importType" :active="(() => {
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
                                                return;
                                            }
                                        });
                                    })" :remove="(() => {onRemove()})" :value="selectContent" v-if="selectContent?.NodeType == '107'"></JourneyTmp107>
                                <JourneyTmp108 :isEdit="false"  :dd="journeyData" :active="(() => {
                                    dataTree.forEach((ver: JourneyNodeModel) => {
                                        if (ver.NodeId == selectContent?.NodeId) {
                                            let p = new Array<string>()
                                            ver.Position.forEach((v: PositionModel) => {
                                                p.push(v.label)
                                            })
                                            let chaLabel: { [name: string]: string} = {
                                                0: '有APP',
                                                1: '無APP',
                                                2: '有簡訊',
                                                3: '無簡訊',
                                                4: '有EDM',
                                                5: '無EDM',
                                            }
                                            let chaType: { [name: string]: string} = {
                                                0: '104',
                                                1: '109',
                                                2: '106',
                                                3: '111',
                                                4: '102',
                                                5: '110',
                                            }
                                            if (ver.Position.length == 0) {
                                                let cl = 0
                                                selectContent.Channel?.split('0').forEach((v) => {
                                                    cl += v.length;
                                                })
                                                let seqI = 1;
                                                let seqNum = '1';
                                                if (seqList.length > 0) {
                                                    seqNum = seqList[0]
                                                    seqList = seqList.filter(v => v != seqNum)
                                                }
                                                ver.Channel = selectContent.Channel
                                                selectContent.Channel?.split('').forEach((v: string, index: number) => {
                                                    const tId = (endId + cl).toString()
                                                    if (v == '1') {
                                                        switch (index) {
                                                            case 0:
                                                                ver.Position.push({
                                                                    SeqId: 'e' + ver.NodeId + '-' + endId.toString(),
                                                                    source: ver.NodeId,
                                                                    target: endId.toString(),
                                                                    label: '有APP'
                                                                })
                                                                journeyData.Content.push({
                                                                    NodeId: endId.toString(),
                                                                    NodeName: 'APP',
                                                                    NodeType: '104',
                                                                    NodeSeq: seqNum + '-' + seqI.toString(),
                                                                    // NodeSeq: seqNum + '-' + (index + 1).toString(),
                                                                    SendType: '0',
                                                                    PeopleLimt: '0',
                                                                    RemindedDate: '0',
                                                                    IsRecvMsgFlag: '0',
                                                                    Position: [
                                                                        {
                                                                            SeqId: 'e' + endId + '-' + tId,
                                                                            source: endId.toString(),
                                                                            target: tId,
                                                                            label: ''
                                                                        }
                                                                    ],
                                                                });
                                                                useId.push(endId.toString() + '-' + tId);
                                                                endId ++;
                                                                seqList.push(seqNum + '-' + seqI.toString())
                                                                // seqList.push(seqNum + '-' + (index + 1).toString())
                                                                seqI++;
                                                                break;
                                                        
                                                            case 1:
                                                                ver.Position.push({
                                                                    SeqId: 'e' + ver.NodeId + '-' + endId.toString(),
                                                                    source: ver.NodeId,
                                                                    target: endId.toString(),
                                                                    label: '無APP'
                                                                })
                                                                journeyData.Content.push({
                                                                    NodeId: endId.toString(),
                                                                    NodeName: '無APP',
                                                                    NodeType: '109',
                                                                    NodeSeq: seqNum + '-' + seqI.toString(),
                                                                    // NodeSeq: seqNum + '-' + (index + 1).toString(),
                                                                    Position: [
                                                                        {
                                                                            SeqId: 'e' + endId + '-' + tId,
                                                                            source: endId.toString(),
                                                                            target: tId,
                                                                            label: ''
                                                                        }
                                                                    ],
                                                                });
                                                                useId.push(endId.toString() + '-' + tId);
                                                                endId ++;
                                                                seqList.push(seqNum + '-' + seqI.toString())
                                                                // seqList.push(seqNum + '-' + (index + 1).toString())
                                                                seqI++;
                                                                break;
                                                        
                                                            case 2:
                                                                ver.Position.push({
                                                                    SeqId: 'e' + ver.NodeId + '-' + endId.toString(),
                                                                    source: ver.NodeId,
                                                                    target: endId.toString(),
                                                                    label: '有簡訊'
                                                                })
                                                                journeyData.Content.push({
                                                                    NodeId: endId.toString(),
                                                                    NodeName: '簡訊',
                                                                    NodeType: '106',
                                                                    NodeSeq: seqNum + '-' + seqI.toString(),
                                                                    // NodeSeq: seqNum + '-' + (index + 1).toString(),
                                                                    SendType: '0',
                                                                    PeopleLimt: '0',
                                                                    RemindedDate: '0',
                                                                    IsRecvMsgFlag: '0',
                                                                    Position: [
                                                                        {
                                                                            SeqId: 'e' + endId.toString() + '-' + tId,
                                                                            source: endId.toString(),
                                                                            target: tId,
                                                                            label: ''
                                                                        }
                                                                    ],
                                                                });
                                                                useId.push(endId.toString() + '-' + tId);
                                                                endId ++;
                                                                seqList.push(seqNum + '-' + seqI.toString())
                                                                // seqList.push(seqNum + '-' + (index + 1).toString())
                                                                seqI++;
                                                                break;
                                                        
                                                            case 3:
                                                                ver.Position.push({
                                                                    SeqId: 'e' + ver.NodeId + '-' + endId.toString(),
                                                                    source: ver.NodeId,
                                                                    target: endId.toString(),
                                                                    label: '無簡訊'
                                                                })
                                                                journeyData.Content.push({
                                                                    NodeId: endId.toString(),
                                                                    NodeName: '無簡訊',
                                                                    NodeType: '111',
                                                                    NodeSeq: seqNum + '-' + seqI.toString(),
                                                                    // NodeSeq: seqNum + '-' + (index + 1).toString(),
                                                                    Position: [
                                                                        {
                                                                            SeqId: 'e' + endId.toString() + '-' + tId,
                                                                            source: endId.toString(),
                                                                            target: tId,
                                                                            label: ''
                                                                        }
                                                                    ],
                                                                });
                                                                useId.push(endId.toString() + '-' + tId);
                                                                endId ++;
                                                                seqList.push(seqNum + '-' + seqI.toString())
                                                                // seqList.push(seqNum + '-' + (index + 1).toString())
                                                                seqI++;
                                                                break;
                                                        
                                                            case 4:
                                                                ver.Position.push({
                                                                    SeqId: 'e' + ver.NodeId + '-' + endId.toString(),
                                                                    source: ver.NodeId,
                                                                    target: endId.toString(),
                                                                    label: '有EDM'
                                                                })
                                                                journeyData.Content.push({
                                                                    NodeId: endId.toString(),
                                                                    NodeName: 'EDM',
                                                                    NodeType: '102',
                                                                    SendType: '0',
                                                                    PeopleLimt: '0',
                                                                    RemindedDate: '0',
                                                                    IsRecvMsgFlag: '0',
                                                                    NodeSeq: seqNum + '-' + seqI.toString(),
                                                                    // NodeSeq: seqNum + '-' + (index + 1).toString(),
                                                                    Position: [
                                                                        {
                                                                            SeqId: 'e' + endId.toString() + '-' + tId,
                                                                            source: endId.toString(),
                                                                            target: tId,
                                                                            label: ''
                                                                        }
                                                                    ],
                                                                });
                                                                useId.push(endId.toString() + '-' + tId);
                                                                endId ++;
                                                                seqList.push(seqNum + '-' + seqI.toString())
                                                                // seqList.push(seqNum + '-' + (index + 1).toString())
                                                                seqI++;
                                                                break;
                                                        
                                                            case 5:
                                                                ver.Position.push({
                                                                    SeqId: 'e' + ver.NodeId + '-' + endId.toString(),
                                                                    source: ver.NodeId,
                                                                    target: endId.toString(),
                                                                    label: '無EDM'
                                                                })
                                                                journeyData.Content.push({
                                                                    NodeId: endId.toString(),
                                                                    NodeName: '無EDM',
                                                                    NodeType: '110',
                                                                    NodeSeq: seqNum + '-' + seqI.toString(),
                                                                    // NodeSeq: seqNum + '-' + (index + 1).toString(),
                                                                    Position: [
                                                                        {
                                                                            SeqId: 'e' + endId.toString() + '-' + tId,
                                                                            source: endId.toString(),
                                                                            target: tId,
                                                                            label: ''
                                                                        }
                                                                    ],
                                                                });
                                                                useId.push(endId.toString() + '-' + tId);
                                                                endId ++;
                                                                seqList.push(seqNum + '-' + seqI.toString())
                                                                // seqList.push(seqNum + '-' + (index + 1).toString())
                                                                seqI++;
                                                                break;
                                                        
                                                            default:
                                                                break;
                                                        }
                                                        // endId += cl;
                                                    }
                                                })
                                                endId += cl;

                                            } else {
                                                let seqNum = '1'
                                                let seqI = 1
                                                dataTree.forEach((j: JourneyNodeModel) => {
                                                    if (j.NodeId == ver.Position[ver.Position.length - 1].target.toString()) {
                                                        let seq = j.NodeSeq?.split('-') ?? ['1']
                                                        let seqE = seq[seq.length - 1] ?? '1'
                                                        seqI += Number(seqE)

                                                        seqNum = j.NodeSeq?.slice(0, j.NodeSeq.length - seqE.length - 1) ?? ''
                                                    }
                                                })
                                                selectContent?.Channel?.split('').forEach((v: string, i: number) => {
                                                    if (v == '0') {
                                                        if (p.includes(chaLabel[i])) {
                                                            ver.Position.forEach((vp: PositionModel, pi: number) => {
                                                                if (vp.label == chaLabel[i]) {
                                                                    removeNode(vp.target.toString())
                                                                    ver.Position.splice(pi, 1)
                                                                }
                                                            })
                                                        }
                                                    } else {
                                                        if (!p.includes(chaLabel[i])) {
                                                            ver.Position.push({
                                                                SeqId: 'e' + ver.NodeId + '-' + endId.toString(),
                                                                source: ver.NodeId,
                                                                target: endId.toString(),
                                                                label: chaLabel[i]
                                                            })
                                                            journeyData.Content.push({
                                                                NodeId: endId.toString(),
                                                                NodeName: chaLabel[i],
                                                                NodeType: chaType[i],
                                                                // NodeSeq: seqNum + '-' + (i + 1).toString(),
                                                                NodeSeq: seqNum + '-' + seqI,
                                                                SendType: '0',
                                                                PeopleLimt: '0',
                                                                RemindedDate: '0',
                                                                IsRecvMsgFlag: '0',
                                                                Position: [
                                                                    {
                                                                        SeqId: 'e' + endId + '-' + (endId+1).toString(),
                                                                        source: endId.toString(),
                                                                        target: endId+1,
                                                                        label: ''
                                                                    }
                                                                ],
                                                            });
                                                            useId.push(endId.toString() + '-' + (endId+1).toString());
                                                            endId+= 2;
                                                            // seqList.push(seqNum + '-' + (i + 1).toString())
                                                            seqList.push(seqNum + '-' + seqI.toString())
                                                            seqI++ ;
                                                        }
                                                    }

                                                });
                                            }
                                            selectContent = null;
                                            bottomDivView = false;
                                        }
                                    });

                                })" :remove="(() => {onRemove()})" :value="selectContent" v-if="selectContent?.NodeType == '108'"></JourneyTmp108>
                                <JourneyTmp201 :isEdit="false"  :dd="journeyData" :value="selectContent" :active="(() => {
                                    dataTree.forEach((ver: JourneyNodeModel) => {
                                        if (ver.NodeId == selectContent?.NodeId) {
                                            ver.CouponList = selectContent.CouponList
                                            selectContent = null;
                                            bottomDivView = false;
                                            return;
                                        }
                                    });
                                    })" :remove="(() => {
                                        confirm.require({
                                            message: '請確認是否「刪除」！',
                                            header: '確認',
                                            acceptClass: 'p-button-danger',
                                            acceptLabel: '取消',
                                            rejectLabel: '確認',
                                            reject: () => {
                                                journeyData.JourneyType = ''
                                                journeyData.Content = []
                                                selectContent = null
                                                bottomDivView = false
                                            }
                                        });
                                    })" v-if="selectContent?.NodeType == '201'"></JourneyTmp201>
                                <JourneyTmp202 :isEdit="false"  :dd="journeyData" :active="(() => {
                                    dataTree.forEach((ver: JourneyNodeModel) => {
                                        if (ver.NodeId == selectContent?.NodeId) {
                                            ver.CouponsList = selectContent.CouponsList
                                            selectContent = null;
                                            bottomDivView = false;
                                        }
                                    });
                                    })" :remove="(() => {
                                        confirm.require({
                                            message: '請確認是否「刪除」！',
                                            header: '確認',
                                            acceptClass: 'p-button-danger',
                                            acceptLabel: '取消',
                                            rejectLabel: '確認',
                                            reject: () => {
                                                journeyData.JourneyType = ''
                                                journeyData.Content = []
                                                selectContent = null
                                                bottomDivView = false
                                            }
                                        });
                                    })" :value="selectContent" v-if="selectContent?.NodeType == '202'"></JourneyTmp202>
                                <JourneyTmp203 :isEdit="false"  :dd="journeyData" :active="(() => {
                                    dataTree.forEach((ver: JourneyNodeModel) => {
                                        if (ver.NodeId == selectContent?.NodeId) {
                                            ver.SelectDate = selectContent.SelectDate
                                            selectContent = null;
                                            bottomDivView = false;
                                        }
                                    });
                                    })" :remove="(() => {
                                        confirm.require({
                                            message: '請確認是否「刪除」！',
                                            header: '確認',
                                            acceptClass: 'p-button-danger',
                                            acceptLabel: '取消',
                                            rejectLabel: '確認',
                                            reject: () => {
                                                journeyData.JourneyType = ''
                                                journeyData.Content = []
                                                selectContent = null
                                                bottomDivView = false
                                            }
                                        });
                                    })" :value="selectContent" v-if="selectContent?.NodeType == '203'"></JourneyTmp203>
                                <JourneyTmp204 :isEdit="false"  :dd="journeyData" :active="(() => {
                                    dataTree.forEach((ver: JourneyNodeModel) => {
                                        if (ver.NodeId == selectContent?.NodeId) {
                                            ver.NewMemStartYMD = selectContent.NewMemStartYMD
                                            ver.NewMemEndYMD = selectContent.NewMemEndYMD
                                            selectContent = null;
                                            bottomDivView = false;
                                        }
                                    });
                                    })" :remove="(() => {
                                        confirm.require({
                                            message: '請確認是否「刪除」！',
                                            header: '確認',
                                            acceptClass: 'p-button-danger',
                                            acceptLabel: '取消',
                                            rejectLabel: '確認',
                                            reject: () => {
                                                journeyData.JourneyType = ''
                                                journeyData.Content = []
                                                selectContent = null
                                                bottomDivView = false
                                            }
                                        });
                                    })" :value="selectContent" v-if="selectContent?.NodeType == '204'"></JourneyTmp204>
                                <JourneyTmp205 :isEdit="false"  :dd="journeyData" :active="(() => {
                                    dataTree.forEach((ver: JourneyNodeModel) => {
                                        if (ver.NodeId == selectContent?.NodeId) {
                                            ver.NewMemSelectDate = selectContent.NewMemSelectDate
                                            selectContent = null;
                                            bottomDivView = false;
                                        }
                                    });
                                    })" :remove="(() => {
                                        confirm.require({
                                            message: '請確認是否「刪除」！',
                                            header: '確認',
                                            acceptClass: 'p-button-danger',
                                            acceptLabel: '取消',
                                            rejectLabel: '確認',
                                            reject: () => {
                                                journeyData.JourneyType = ''
                                                journeyData.Content = []
                                                selectContent = null
                                                bottomDivView = false
                                            }
                                        });
                                    })" :value="selectContent" v-if="selectContent?.NodeType == '205'"></JourneyTmp205>
                                <JourneyTmp206 :isEdit="false"  :dd="journeyData" :active="(() => {
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
                                    })" :remove="(() => {
                                        confirm.require({
                                            message: '請確認是否「刪除」！',
                                            header: '確認',
                                            acceptClass: 'p-button-danger',
                                            acceptLabel: '取消',
                                            rejectLabel: '確認',
                                            reject: () => {
                                                journeyData.JourneyType = ''
                                                journeyData.Content = []
                                                selectContent = null
                                                bottomDivView = false
                                            }
                                        });
                                    })" :value="selectContent" v-if="selectContent?.NodeType == '206'"></JourneyTmp206>
                                <JourneyTmp207 :isEdit="false"  :dd="journeyData" :active="(() => {
                                    dataTree.forEach((ver: JourneyNodeModel) => {
                                        if (ver.NodeId == selectContent?.NodeId) {
                                            ver.SelectDate = selectContent.SelectDate
                                            selectContent = null;
                                            bottomDivView = false;
                                        }
                                    });
                                    })" :remove="(() => {
                                        confirm.require({
                                            message: '請確認是否「刪除」！',
                                            header: '確認',
                                            acceptClass: 'p-button-danger',
                                            acceptLabel: '取消',
                                            rejectLabel: '確認',
                                            reject: () => {
                                                journeyData.JourneyType = ''
                                                journeyData.Content = []
                                                selectContent = null
                                                bottomDivView = false
                                            }
                                        });
                                    })" :value="selectContent" v-if="selectContent?.NodeType == '207'"></JourneyTmp207>
                                <JourneyTmp208 :isEdit="false"  :dd="journeyData" :active="(() => {
                                    dataTree.forEach((ver: JourneyNodeModel) => {
                                        if (ver.NodeId == selectContent?.NodeId) {
                                            ver.SelectDate = selectContent.SelectDate
                                            selectContent = null;
                                            bottomDivView = false;
                                        }
                                    });
                                    })" :remove="(() => {
                                        confirm.require({
                                            message: '請確認是否「刪除」！',
                                            header: '確認',
                                            acceptClass: 'p-button-danger',
                                            acceptLabel: '取消',
                                            rejectLabel: '確認',
                                            reject: () => {
                                                journeyData.JourneyType = ''
                                                journeyData.Content = []
                                                selectContent = null
                                                bottomDivView = false
                                            }
                                        });
                                    })" :value="selectContent" v-if="selectContent?.NodeType == '208'"></JourneyTmp208>
                                <JourneyTmp209 :isEdit="false"  :dd="journeyData" :active="(() => {
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
                                    })" :remove="(() => {
                                        confirm.require({
                                            message: '請確認是否「刪除」！',
                                            header: '確認',
                                            acceptClass: 'p-button-danger',
                                            acceptLabel: '取消',
                                            rejectLabel: '確認',
                                            reject: () => {
                                                journeyData.JourneyType = ''
                                                journeyData.Content = []
                                                selectContent = null
                                                bottomDivView = false
                                            }
                                        });
                                    })" :value="selectContent" v-if="selectContent?.NodeType == '209'"></JourneyTmp209>
                                <JourneyTmp210 :isEdit="false" :dd="journeyData" :active="(() => {
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
                                    })" :remove="(() => {
                                        confirm.require({
                                            message: '請確認是否「刪除」！',
                                            header: '確認',
                                            acceptClass: 'p-button-danger',
                                            acceptLabel: '取消',
                                            rejectLabel: '確認',
                                            reject: () => {
                                                journeyData.JourneyType = ''
                                                journeyData.Content = []
                                                selectContent = null
                                                bottomDivView = false
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
                    <div style="
                        width: 220px; 
                        position: fixed;
                        z-index: 10;
                        top: 55px;
                        right: 0;
                        background: white;
                        "
                        v-if="rightDivView"
                        >
                        <div style="position: absolute; top: 352px; right: 200px; z-index: 999;">
                            <button style="width: 20px; padding: 0;" class="bg-purple" @click="(() => { rightDivView = !rightDivView })">
                                <img src="/img/right.png" width="20" height="20" />
                            </button>
                        </div>

                        <div class="r-div">
                            <!-- 右方塊 -->
                            <div class="tab-div">
                                <ul class="nav nav-tabs">
                                    <li class="nav-item">
                                        <button :class=" stemp == 'B' ? 'nav-link active bg-orange' : 'nav-link bg-white' " @click="(() => { stemp = 'B' })">旅程</button>
                                    </li>
                            
                                    <!-- <li class="nav-item">
                                        <button :class=" stemp == 'C' ? 'nav-link active' : 'nav-link' " @click="(() => { stemp = 'C' })">工具</button>
                                    </li> -->
                            
                                    <li class="nav-item">
                                        <button :class=" stemp == 'A' ? 'nav-link active bg-purple' : 'nav-link bg-white' " @click="(() => { stemp = 'A' })">功能</button>
                                    </li>
                            
                                    <!-- <li class="nav-item">
                                        <button :class=" stemp == 'D' ? 'nav-link active' : 'nav-link' " @click="(() => { stemp = 'D' })">範本</button>
                                    </li> -->
                                </ul>
                            </div>

                            <div class="temTree">
                                <!-- 項目選單 -->
                                <div v-show="stemp == 'A'" v-for="(item, index) in temA" :key="index" :draggable="true" @dragstart="dragStart($event)" @dragover="allowDrop">
                                    <div v-html="category(item)"></div>
                                </div>

                                <div v-show="stemp == 'B'" v-for="(item, index) in temB" :key="index" :draggable="!journeyData.JourneyType || journeyData?.JourneyType == item.NodeType.slice(1)" @dragstart="dragStart($event)" @dragover="allowDrop">
                                    <div v-html="category(item, journeyData.JourneyType != '' && (journeyData?.JourneyType != item.NodeType.slice(1)))"></div>
                                </div>

                                <div v-show="stemp == 'C'" v-for="(item, index) in temC" :key="index" draggable="true" @dragstart="dragStart($event)" @dragover="allowDrop">
                                    <div v-html="category(item)"></div>
                                </div>
                            </div>
                        </div>
                    </div>
            
                    <div style="position: fixed; top: 423px; right: 0; z-index: 999;" v-else>
                        <button style="width: 20px; padding: 0;" class="bg-purple" @click="(() => { rightDivView = !rightDivView })">
                            <img src="/img/left.png" width="20" height="20" />
                        </button>
                    </div>
                </Transition>
            </div>
        </div>
    </div>
    <ConfirmDialog></ConfirmDialog>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import axios from 'axios';
import { JourneyModel, JourneyNodeModel, PositionModel } from '@/model/journeyList.model';
import store from '@/store';
import { useConfirm } from 'primevue/useconfirm';
import $ from 'jquery'

@Options({
  components: {
  },
})
export default class HomeView extends Vue {
    journeyData: JourneyModel = {
        JourneyId: "",
        JourneyName: "",
        JourneyType: '',
        StartDate: "",
        EndDate: "",
        FileType: "1",
        Content: [],
        UserID: "",
    };
    dataTree!: any;
    tmpTree!: any;

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
            NodeName: '生日',
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

    /**
     * 工具項目
     */
    temC: Array<JourneyNodeModel> = [
        {
            NodeId: '0',
            NodeName: 'EDM',
            NodeType: '102',
            Position: [],
        }, {
            NodeId: '0',
            NodeName: 'APP',
            NodeType: '104',
            Position: [],
        }, {
            NodeId: '0',
            NodeName: '簡訊',
            NodeType: '106',
            Position: [],
        }, {
            NodeId: '0',
            NodeName: '無APP',
            NodeType: '109',
            Position: [],
        }, {
            NodeId: '0',
            NodeName: '無EDM',
            NodeType: '110',
            Position: [],
        }, {
            NodeId: '0',
            NodeName: '無簡訊',
            NodeType: '111',
            Position: [],
        },
    ]

    rightDivView = true;
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
        StatusFlag: '1'
    };
    useId: Array<string> = new Array<string>();
    endId!: number;
    importType!: string;
    seqList: Array<string> = new Array<string>();
    confirm = useConfirm();
    row!: number;
    col!: number;
    contentList: Array<string> = new Array<string>();
  
    /**
     * 初始化
     */
    created(): void {
        console.log('new')
        $( function() {
            $( "#StartYMD" ).datepicker({
                dateFormat: "yy/mm/dd"
            });
            $( "#EndYMD" ).datepicker({
                dateFormat: "yy/mm/dd"
            });
        });

        console.log(store.state.journey.journeyMapSample)
        if (store.state.journey.journeyMapSample) {
            this.journeyData = store.state.journey.journeyMapSample
            this.query.JourneyId = this.journeyData.JourneyId?.toString()
            this.query.JourneyName = this.journeyData.JourneyName.toString()
            this.query.JourneyType = this.journeyData.JourneyType.toString()
            this.query.StartDate = this.journeyData.StartDate.toString()
            this.query.EndDate = this.journeyData.EndDate.toString()
            this.query.StatusFlag = this.journeyData.StatusFlag?.toString()
            this.query.SendFlag = this.journeyData.SendFlag?.toString()
        }
    }

    /**
     * 繪製旅程樹
     */
    createTree(): [{ [name: string]: any }] {
        if (typeof this.journeyData.Content == 'string') {
            this.journeyData.Content = JSON.parse(this.journeyData.Content)
            this.journeyData.JourneyType = this.journeyData.Content[0].NodeType.slice(1)
            this.query.JourneyType = this.journeyData.JourneyType
        }
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
                // console.log(this.useId)
                console.log('item', item)
                if (item.NodeType == '105') n--;
                data.push({value: this.category(item), data: item, column: col, row: this.row})
                row = this.row
                
                if (item.Position.length == 1) {
                    if (item.NodeType != '105') {
                        data.push({value: this.CLine(item.Position[0].label), column: col + 1, row: this.row})
                        if (this.useId.length > 0 && item.NodeId == this.useId[0].split('-')[0]) {
                            data.push({value: this.Dbtn(), column: col + 2, row: this.row})
                        }
                    } else {
                        // n--;
                    }
                } else if (item.Position.length > 1) {
                    ctl = item.Position.map((v: PositionModel) => {
                        return v.label
                    })

                    data.push({value: this.CLine(ctl[0]), column: col + 1, row: this.row})
                    cnt += item.Position.length - 1
                }

                col += 2;

                item.Position.forEach((ip: PositionModel, i: number) => {
                    if (i != 0) {
                        this.row++;
                        data.push({value: this.DLine(ctl[i], this.row - row), column: col - 1, row: this.row})

                        if (this.useId.length > 0 && ip.SeqId.slice(1) == this.useId[0]) {
                            data.push({value: this.Dbtn(), column: col, row: this.row})
                        }
                    } else if (item.NodeType == '107') {
                        if (this.useId.length > 0 && ip.SeqId.slice(1) == this.useId[0]) {
                            data.push({value: this.Dbtn(), column: col + 2, row: this.row})
                        }
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
        if (this.useId?.length > 0) {
            return alert('尚未完成旅程建檔')
        }
        store.dispatch('upLoading', true)
        console.log(this.journeyData)
        this.journeyData.Content = JSON.stringify(this.journeyData.Content)
        this.journeyData.UserID = this.$router.currentRoute.value.query?.UserID?.toString();
        this.journeyData.FileType = '1';

        axios.post('http://10.2.126.194:8030/app/v1/api/CDP/JourneyImport', this.journeyData)
            .then((res) => {
                store.dispatch('upLoading', false)
                console.log('set journey', res)
                if (res.status == 200) {
                    switch(res.data?.Status) {
                        case '0':
                            // 成功
                            alert('新增成功')
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

    onRemove(): void {
        this.confirm.require({
            message: '請確認是否「刪除」！',
            header: '確認',
            acceptClass: 'p-button-danger',
            acceptLabel: '取消',
            rejectLabel: '確認',
            reject: () => {
                this.remove()
            }
        });
    }

    remove(): void {
        this.journeyData.Content.forEach((v: JourneyNodeModel) => {
            v.Position.forEach((vp: PositionModel) => {
                if (vp.target == this.selectContent?.NodeId) {
                    this.useId = [vp.source + '-' + vp.target, ...this.useId]
                }
            })
        })
        this.removeNode(this.selectContent?.NodeId ?? '')
        this.selectContent = null
        this.bottomDivView = false
    }

    removeNode(value: string): void {
        this.useId = this.useId.filter((v) => v.split('-')[0] != value)
        this.journeyData.Content.forEach((v: JourneyNodeModel, i: number) => {
            if(v.NodeId == value) {
                if (v.NodeSeq) {
                    this.seqList = this.seqList.filter((s: string) => s != v.NodeSeq)
                    if (!this.seqList.includes(v.NodeSeq.slice(0, v.NodeSeq.length - 2)) && v.NodeSeq.slice(0, v.NodeSeq.length - 2) != '1') {
                        this.seqList = [v.NodeSeq.slice(0, v.NodeSeq.length - 2), ...this.seqList]
                    }
                }
                v.Position.forEach((vp: PositionModel) => {
                    if (vp.target) this.removeNode(vp.target?.toString())
                })
                this.journeyData.Content.splice(i, 1)
            }
        })
        // this.journeyData.Content = this.journeyData?.Content?.filter((ver: JourneyNodeModel) => ver.NodeId != value)
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
    category(e: JourneyNodeModel, disabled?: boolean): string {
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
            '201': this.btn(e.NodeName, 'coupon-2-line', disabled ? 'D' : 'B', ''),
            '202': this.btn(e.NodeName, 'coupon', disabled ? 'D' : 'B', ''),
            '203': this.btn(e.NodeName, 'cil-birthday-cake', disabled ? 'D' : 'B', ''),
            '204': this.btn(e.NodeName, 'light-member', disabled ? 'D' : 'B', ''),
            '205': this.btn(e.NodeName, 'symbol-enum-member', disabled ? 'D' : 'B', ''),
            '206': this.btn(e.NodeName, 'ad-product', disabled ? 'D' : 'B', ''),
            '207': this.btn(e.NodeName, 'vip-crown-fill', disabled ? 'D' :'B', ''),
            '208': this.btn(e.NodeName, 'vip-crown-2-line', disabled ? 'D' :'B', ''),
            '209': this.btn(e.NodeName, 'vip-crown-2-fill', disabled ? 'D' : 'B', ''),
            '210': this.btn(e.NodeName, 'import', disabled ? 'D' : 'B', '')
        }

        return typeValue[e.NodeType] ?? ''
    }

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
        // console.log(dragText)
        // console.log(this.useId)
        // console.log(this.endId)

        if (this.selectContent && (
            this.selectContent.NodeType !== '105' &&
            this.selectContent.NodeType !== '109' &&
            this.selectContent.NodeType !== '110' &&
            this.selectContent.NodeType !== '111'
            )) return alert('此節點無法連結');

        if (this.useId.length > 0 && dragText == '結束') {
            const uId = this.useId[0].split('-')[0].toString();
            this.dataTree.forEach((ver: JourneyNodeModel) => {
                if (ver.NodeId == uId) {
                    // console.log(ver.NodeType)
                    if (ver.NodeType == '102' || 
                        ver.NodeType == '104' || 
                        ver.NodeType == '106' || 
                        ver.NodeType == '107' || 
                        ver.NodeType == '109' || 
                        ver.NodeType == '110' || 
                        ver.NodeType == '111'
                    ) {
                        if (ver.NodeType != '107') {
                            this.seqList = this.seqList.filter(v => v != ver.NodeSeq)
                        }
                        this.dataTree.push({
                            NodeId: this.useId[0].split('-')[1],
                            NodeName: dragText,
                            NodeType: "105",
                            Position: [{
                                "SeqId": "",
                                "source": "",
                                "target": "",
                                "label": ""
                            }]
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
                    } else {
                        return alert('此節點無法連結');
                    }
                }
            })

        }

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

            case '生日':
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
                        NewMemSelectDate: '1',
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
                        NewMemSelectDate: '1',
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
                        IsMaxPay: '0',
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
                        IsMaxPay: '0',
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
                        SelectDate: '15',
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
                        SelectDate: '15',
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
                        SelectDate: '15',
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
                        SelectDate: '15',
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
                        SelectDate: '15',
                        DateType: '0',
                        PayAmtStart: '0',
                        PayAmtEnd: '0',
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
                        SelectDate: '15',
                        DateType: '0',
                        PayAmtStart: '0',
                        PayAmtEnd: '0',
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
                        Position: [],
                    };
                    this.bottomDivView = true;
                    this.useId = ['2-3']
                    this.endId = 4
                    return;
                } else if (this.useId.length > 0) {
                    const uId = this.useId[0].split('-')[0].toString();
                    this.dataTree.forEach((ver: JourneyNodeModel) => {
                        if (ver.NodeId == uId) {
                            if (
                                ver.NodeType == '102' || 
                                ver.NodeType == '104' || 
                                ver.NodeType == '106' || 
                                ver.NodeType == '109' || 
                                ver.NodeType == '110' || 
                                ver.NodeType == '111'
                            ) {
                                // if (this.seqList.length > 0) this.seqList.splice(0, 1)
                                this.dataTree.push({
                                    NodeId: this.useId[0].split('-')[1],
                                    NodeName: dragText,
                                    NodeType: "103",
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
                                    Position: [],
                                };
                                this.bottomDivView = true;
                                this.useId.push(this.useId[0].split('-')[1] + '-' + this.endId)
                                this.useId.splice(0, 1)
                                this.endId ++;
                                return;
                            } else {
                                return alert('此節點無法連結');
                            }
                        }
                    })
                } else {
                    return alert('此節點無法連結');
                }
                break;

            case '判斷條件':
                if (this.useId.length > 0) {
                    const uId = this.useId[0].split('-')[0].toString();
                    this.dataTree.forEach((ver: JourneyNodeModel) => {
                        if (ver.NodeId == uId ) {
                            if (( this.journeyData.JourneyType == '01' ||
                                this.journeyData.JourneyType == '02' ||
                                this.journeyData.JourneyType == '03' ||
                                this.journeyData.JourneyType == '04' ||
                                this.journeyData.JourneyType == '06' ||
                                this.journeyData.JourneyType == '09' ||
                                this.journeyData.JourneyType == '10' )
                                && ver.NodeType == '103'
                            ) {
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
                            } else {
                                return alert('此節點無法連結');
                            }
                        }
                    })
                } else {
                    return alert('此節點無法連結'); 
                }
                break;

            case '溝通管道':
                if (this.useId.length > 0) {
                    const uId = this.useId[0].split('-')[0].toString();
                    this.dataTree.forEach((ver: JourneyNodeModel) => {
                        if (ver.NodeId == uId) {
                            if (ver.NodeType == '103' || ver.NodeType == '107') {
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
                            } else {
                                return alert('此節點無法連結');
                            }
                        }
                    })

                }
                break;

            default:
                // alert('此節點無法連結');
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

    Dbtn() {
        return `
            <div>

                <div class="default-tag""></div>
                
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
            'C': 'blue-tag',
            'D': 'grey-tag'
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