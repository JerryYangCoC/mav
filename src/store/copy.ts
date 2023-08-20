import axios from 'axios';
import { CopyListModel, CopyModel } from '../views/copyList.model';

export const moduleCopy = {
    state: {
        lists: new Array<CopyListModel>(),
        copyDetail: null
    },
    mutations: {
        setCopy(state: any, data: any): void {
            state.lists = data.map((v: any, i: number) => {
                return {
                    key: i,
                    data: v
                }
            })
        },
        setCopyDetail(state: any, data: any): void {
            state.copyDetail = data
        }
    },
    actions: {
        getListCopy(context: any) {
            axios.post('http://10.2.126.194:8030/app/v1/api/CDP/CopyWriteGet')
                .then((res) => {
                    console.log('copy', res)
                    if (res.status == 200) {
                        context.commit('setCopy', res.data?.CopyWrite_List)
                    }
                }).catch((err) => {
                    console.log(err)
                })
        },
        getDetailCopy(context: any, value: string) {
            axios.post('http://10.2.126.194:8030/app/v1/api/CDP/CopyWriteSingleGet', { CopyWriteID: value })
                .then((res) => {
                    console.log('copy detail', res)
                    if (res.status == 200) {
                        context.commit('setCopyDetail', res.data?.CopyWrite_List)
                    }
                }).catch((err) => {
                    console.log(err)
                })
        },
        setCopy(context: any, data: CopyModel) {
            axios.post('http://10.2.126.194:8030/app/v1/api/CDP/CopyWriteImport', data)
                .then((res) => {
                    console.log('add copy', res)
                }).catch((err) => {
                    console.log(err)
                })
        }
    }
}
