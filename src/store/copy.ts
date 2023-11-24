import axios from 'axios';
import { CopyListModel, CopyModel } from '../model/copyList.model';
import router from '@/router';

export const moduleCopy = {
    state: {
        lists: new Array<CopyListModel>(),
        copyDetail: null,
        copyList: new Array<CopyListModel>(),
    },
    mutations: {
        setCopy(state: any, data: any): void {
            state.lists = data.map((v: CopyModel, i: number) => {
                return {
                    key: i.toString(),
                    data: v
                }
            })
        },
        removeCopy(state: any, data: CopyModel): void {
            state.lists = state.lists.filter((ver: CopyListModel) => ver.data.CopyWriteID != data.CopyWriteID)
        },
        setCopyList(state: any, data: any): void {
            state.copyList = data.map((v: CopyModel, i: number) => {
                return {
                    key: i.toString(),
                    data: v
                }
            })
        },
        setCopyDetail(state: any, data: CopyModel[]): void {
            data?.forEach((v) => {
                state.copyDetail = v
            });
        }
    },
    actions: {
        getListCopy(context: any, data: CopyModel): void {
            axios.post('http://10.2.126.194:8030/app/v1/api/CDP/CopyWriteGet', data)
                .then((res) => {
                    console.log('copy', res)
                    if (res.status == 200 && res.data?.Status == '0') {
                        context.commit('setCopy', res.data?.CopyWrite_List)
                    }
                    context.commit('setLoading', false)
                }).catch((err) => {
                    console.log(err)
                    context.commit('setLoading', false)
                })
        },
        getCopy(context: any, data: CopyModel): void {
            axios.post('http://10.2.126.194:8030/app/v1/api/CDP/CopyWriteGet', data)
                .then((res) => {
                    console.log('copy', res)
                    if (res.status == 200 && res.data?.Status == '0') {
                        context.commit('setCopyList', res.data?.CopyWrite_List)
                    }
                }).catch((err) => {
                    console.log(err)
                })
        },
        getDetailCopy(context: any, value: string) {
            axios.post('http://10.2.126.194:8030/app/v1/api/CDP/CopyWriteSingleGet', { CopyWriteID: value })
                .then((res) => {
                    console.log('copy detail', res)
                    if (res.status == 200 && res.data?.Status == '0') {
                        context.commit('setCopyDetail', res.data?.CopyWrite_List)
                        setTimeout(() => {
                            router.push({path: 'copy/edit', query: router.currentRoute.value.query})
                        }, 300)
                    }
                }).catch((err) => {
                    console.log(err)
                })
        },
        setCopy(context: any, data: CopyModel) {
            axios.post('http://10.2.126.194:8030/app/v1/api/CDP/CopyWriteImport', data)
                .then((res) => {
                    console.log('set copy', res)
                    if (res.status == 200 && res.data?.Status == '0' && data.FileType == '3') {
                        context.commit('removeCopy', data)
                    }
                }).catch((err) => {
                    console.log(err)
                })
        }
    }
}
