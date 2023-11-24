import { CouponModel, JourneyListModel, JourneyModel, ProductModel, VariableModel } from "@/model/journeyList.model";
import router from "@/router";
import axios from "axios";

export const moduleJourney = {
    state: {
        journeyList: new Array<JourneyListModel>(),
        journeyDetail: null,
        journeyItemList: new Array<ProductModel>(),
        journeyCouponList: new Array<CouponModel>(),
        journeyCouponMList: new Array<CouponModel>(),
        journeyCopyContent: null,
        journeyTempPeople: null,
        journeyReminded: null,
        journeyCopyList: new Array<VariableModel>(),
        journeyActivityList: new Array<CouponModel>(),
        journeyMapSample: null,
        journeySingleItemList: new Array<ProductModel>(),
    },
    mutations: {
        setJourneyList(state: any, data: any): void {
            state.journeyList = data.map((v: JourneyModel, i: number) => {
                return {
                    key: i.toString(),
                    data: v
                }
            })
        },
        setJourneyDetail(state: any, data: JourneyModel[]): void {
            data?.forEach((v) => {
                state.journeyDetail = v
            })
        },
        setJourneyItemList(state: any, data: any): void {
            state.journeyItemList = data
        },
        setJourneyGetSingleItem(state: any, data: any): void {
            state.journeySingleItemList = data
        },
        setJourneyCouponList(state: any, data: any): void {
            state.journeyCouponList = data
        },
        setJourneyCouponMList(state: any, data: any): void {
            state.journeyCouponMList = data
        },
        setJourneyCopyWriteContent(state: any, data: any): void {
            state.journeyCopyContent = data
        },
        setJourneyTempPeople(state: any, data: any): void {
            state.journeyTempPeople = data
        },
        setJourneyReminded(state: any, data: any): void {
            state.journeyReminded = data
        },
        setJourneyCopyList(state: any, data: any): void {
            state.journeyCopyList = data.map((v: any, i: number) => {
                return {
                    key: i.toString(),
                    data: v
                }
            })
            // state.journeyCopyList = data
        },
        setJourneyActivityList(state: any, data: any): void {
            state.journeyActivityList = data.map((v: any, i: number) => {
                return {
                    key: i.toString(),
                    data: v
                }
            })
        },
        setJourneyMapSample(state: any, data: any): void {
            // data?.forEach((v: any) => {
            //     state.journeyMapSample = v
            // })
            state.journeyMapSample = data
        }
    },
    actions: {
        /**
         * 取得旅程清單
         * @param context 
         * @param data 
         */
        getListJourney(context: any, data: JourneyModel): void {
            axios.post('http://10.2.126.194:8030/app/v1/api/CDP/JourneyMapGet', data)
                .then((res) => {
                    console.log('journey', res)
                    if (res.status == 200 && res.data?.Status == '0') {
                        context.commit('setJourneyList', res.data?.JourneyMap_List)
                    } 
                    context.commit('setLoading', false)
                }).catch((err) => {
                    console.log(err)
                    context.commit('setLoading', false)
                })
        },
        /**
         * 取得單一旅程
         * @param context 
         * @param data 
         */
        getJourney(context: any, data: any): void {
            axios.post('http://10.2.126.194:8030/app/v1/api/CDP/JourneyMapSingleGet', data)
                .then((res) => {
                    console.log('journey detail', res)
                    if (res.status == 200 && res.data?.Status == '0') {
                        context.commit('setJourneyDetail', res.data?.JourneyMap_List)
                        setTimeout(() => {
                            router.push({path: 'journey/edit', query: router.currentRoute.value.query})
                        }, 300)
                    }
                    context.commit('setLoading', false)
                }).catch((err) => {
                    console.log(err)
                    context.commit('setLoading', false)
                })
        },
        /**
         * 取得旅程商品
         * @param context 
         * @param data 
         */
        getListJourneyItem(context: any, data: any): void {
            axios.post('http://10.2.126.194:8030/app/v1/api/CDP/JourneyGetItem', data)
                .then((res) => {
                    console.log('Journey Item', res)
                    if (res.status == 200 && res.data?.Status == '0') {
                        context.commit('setJourneyItemList', res.data?.Item_List)
                    }
                    context.commit('setLoading', false)
                }).catch((err) => {
                    console.log(err)
                    context.commit('setLoading', false)
                })
        },
        getJourneyGetSingleItem(context: any, data: any): void {
            axios.post('http://10.2.126.194:8030/app/v1/api/CDP/JourneyGetSingleItem', data)
                .then((res) => {
                    console.log('Journey Get Single Item', res)
                    if (res.status == 200 && res.data?.Status == '0') {
                        context.commit('setJourneyGetSingleItem', res.data?.Item_List)
                    }
                    context.commit('setLoading', false)
                }).catch((err) => {
                    console.log(err)
                    context.commit('setLoading', false)
                })
        },
        /**
         * 取得旅程COUPON
         * @param context 
         * @param data 
         */
        getListJourneyCoupon(context: any, data: any): void {
            axios.post('http://10.2.126.194:8030/app/v1/api/CDP/JourneyGetCoupon', data)
                .then((res) => {
                    console.log('Journey Coupon', res)
                    if (res.status == 200 && res.data?.Status == '0') {
                        context.commit('setJourneyCouponList', res.data?.Coupon_List)
                    }
                    context.commit('setLoading', false)
                }).catch((err) => {
                    console.log(err)
                    context.commit('setLoading', false)
                })
        },
        /**
         * 取得旅程精算抵用券
         * @param context 
         * @param data 
         */
        getListJourneyCouponM(context: any, data: any): void {
            axios.post('http://10.2.126.194:8030/app/v1/api/CDP/JourneyGetCouponM', data)
                .then((res) => {
                    console.log('Journey CouponM', res)
                    if (res.status == 200 && res.data?.Status == '0') {
                        context.commit('setJourneyCouponMList', res.data?.Coupon_List)
                    }
                    context.commit('setLoading', false)
                }).catch((err) => {
                    console.log(err)
                    context.commit('setLoading', false)
                })
        },
        /**
         * 取得旅程文案預覽
         * @param context 
         * @param data 
         */
        getJourneyCopyWriteContent(context: any, data: any): void {
            axios.post('http://10.2.126.194:8030/app/v1/api/CDP/JourneyCopyWriteContent', data)
                .then((res) => {
                    console.log('Journey Copy Write Content', res)
                    if (res.status == 200 && res.data?.Status == '0') {
                        context.commit('setJourneyCopyWriteContent', res.data?.Content)
                    }
                    context.commit('setLoading', false)
                }).catch((err) => {
                    console.log(err)
                    context.commit('setLoading', false)
                })
        },
        /**
         * 暫存人數查詢
         * @param context 
         * @param data 
         */
        getJourneyTempPeople(context: any, data: any): void {
            axios.post('http://10.2.126.194:8030/app/v1/api/CDP/JourneyTempPeopleGet', data)
                .then((res) => {
                    console.log('Journey Temp People', res)
                    if (res.status == 200 && res.data?.Status == '0') {
                        context.commit('setJourneyTempPeople', '')
                    }
                    context.commit('setLoading', false)
                }).catch((err) => {
                    console.log(err)
                    context.commit('setLoading', false)
                })
        },
        /**
         * 排除提醒查詢
         * @param context 
         * @param data 
         */
        getJourneyReminded(context: any, data: any): void {
            axios.post('http://10.2.126.194:8030/app/v1/api/CDP/JourneyGetReminded', data)
                .then((res) => {
                    console.log('Journey Reminded', res)
                    if (res.status == 200 && res.data?.Status == '0') {
                        context.commit('setJourneyReminded', '')
                    }
                    context.commit('setLoading', false)
                }).catch((err) => {
                    console.log(err)
                    context.commit('setLoading', false)
                })
        },
        /**
         * 查詢旅程文案
         * @param context 
         * @param data 
         */
        getListJourneyCopy(context: any, data: any): void {
            axios.post('http://10.2.126.194:8030/app/v1/api/CDP/JourneyCopyWriteGet', data)
                .then((res) => {
                    console.log('Journey Copy List', res)
                    if (res.status == 200 && res.data?.Status == '0') {
                        context.commit('setJourneyCopyList', res.data?.CopyWrite_List)
                    }
                    context.commit('setLoading', false)
                }).catch((err) => {
                    console.log(err)
                    context.commit('setLoading', false)
                })
        },
        /**
         * 查詢旅程EDM文案
         * @param context 
         * @param data 
         */
        getListJourneyCopyEDM(context: any, data: any): void {
            axios.post('http://10.2.126.194:8030/app/v1/api/CDP/JourneyCopyWriteEDM', data)
                .then((res) => {
                    console.log('Journey Copy List', res)
                    if (res.status == 200 && res.data?.Status == '0') {
                        context.commit('setJourneyCopyList', res.data?.CopyWrite_List)
                    }
                    context.commit('setLoading', false)
                }).catch((err) => {
                    console.log(err)
                    context.commit('setLoading', false)
                })
        },
        /**
         * 查詢活動來源
         * @param context 
         * @param data 
         */
        getListJourneyActivity(context: any, data: any): void {
            axios.post('http://10.2.126.194:8030/app/v1/api/CDP/JourneyGetActivity', data)
                .then((res) => {
                    console.log(res)
                    if (res.status == 200 && res.data?.Status == '0') {
                        context.commit('setJourneyActivityList', res.data?.Coupon_List)
                    }
                    context.commit('setLoading', false)
                }).catch((err) => {
                    console.log(err)
                    context.commit('setLoading', false)
                })
        },
        /**
         * 取得範例旅程
         * @param context 
         * @param data 
         */
        getJourneyMapSample(context: any, data: string): void {
            axios.post('http://10.2.126.194:8030/app/v1/api/CDP/JourneyMapSample', { JourneyType: data })
                .then((res) => {
                    console.log(res)
                    if (res.status == 200 && res.data?.Status == '0') {
                        context.commit('setJourneyMapSample', res.data?.JourneyMap_List)
                        setTimeout(() => {
                            router.push({path: 'journey/add', query: router.currentRoute.value.query})
                        }, 300)
                    }
                    context.commit('setLoading', false)
                }).catch((err) => {
                    console.log(err)
                    context.commit('setLoading', false)
                })
        }

    },
}