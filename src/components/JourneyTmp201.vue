<template>
    <div>
        <form @submit.prevent="onClick()">
            <div style="display: grid; grid-template-columns: 160px auto auto; align-items: center; justify-content: start; justify-items: end;">
                <span><span class="ask-red">*</span>POS COUPON：</span>
                <div style="width: 300px; height: 40px; border: 1px solid #ccc; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; line-height: 40px; padding-left: 8px;" required>
                    <span v-for="(item, index) in value.CouponList" :key="index" style="padding-right: 4px;">{{ index > 0 ? ' | ' + item?.CouponName : item?.CouponName }}</span>
                </div>
                <input type="button" class="btn-white" style="--i: url('/img/more_horiz.svg'); width: 40px;" @click="queryView = true; onSearch();" :disabled="isEdit" /> 
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


    <Dialog v-model:visible="queryView" modal :show-header="false" :style="{ width: '90vw' }">
        <div class="box-Cop">
            <div style="text-align: left; display: flex; margin: 8px 0;">
                <input type="text" style="width: 200px;" v-model="query.CopCode" placeholder="編號" />
                <input type="text" style="width: 200px;" v-model="query.CopDesc" placeholder="名稱" />
                
                <div style="margin-left: 10px;">
                    <span><span class="ask-red">*</span>類別：</span>
                    <select style="width: 100px;" v-model="query.MoneyType" @change="onSearch(); selectedProduct = []">
                        <option value="0">折價</option>
                        <option value="1">折扣</option>
                    </select>
                </div>

                <!-- <input type="button" class="btn-def" @click="onSearch()" value="搜尋" /> -->
                <!-- <input type="button" class="btn-def" @click="queryView = false;" value="返回" /> -->
              
                <input type="button" class="btn" style="--i: url('/img/search.png')" @click="onSearch()" value="搜尋" />
                <input type="button" class="btn" style="--i: url('/img/icon_clear.png')" @click="(() => { query = { CopCode: '', CopDesc: '', MoneyType: '0', }; selectedProduct = [] })" value="清除" />
                <input type="button" class="btn" style="--i: url('/img/back.png')" @click="queryView = false;" value="返回" />
                <input type="button" class="btn" style="--i: url('/img/sent.png')" @click="onClickProduct()" value="確認" />
            </div>

            <div>
                <span>已選擇 {{ selectedProduct.length }} 筆 / 共 {{ copList().length }} 筆</span>
            </div>

            <div style="display: grid; grid-template-columns: 50% 50%;">
                <DataTable
                    :value="copList()"
                    tableStyle="min-width: 20rem; border: 1px solid #ccc;"
                    v-model:selection="selectedProduct"
                    dataKey="CopCode"
                >
                    <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                    <Column field="CopCode" header="編號"></Column>
                    <Column field="CopDesc" header="名稱"></Column>
                    <Column field="EdDate" header="到期日"></Column>
                </DataTable>
    
                <div style="min-width: 40vw; border: 1px solid #ccc;" class="p-fileupload p-fileupload-advanced p-component">
                    <div class="p-fileupload-file" v-for="(item, index) in selectedProduct" :key="index">
                        <div class="p-fileupload-file-details">
                            <div>{{ item.CopDesc }}</div>
                        </div>
                        
                        <div class="p-fileupload-file-actions">
                            <button style="width: 24px;" class="p-button p-component p-button-icon-only p-button-danger p-button-rounded p-button-text p-fileupload-file-remove" type="button" @click="selectedProduct = selectedProduct.filter(v => v.CopCode != item.CopCode)" outlined rounded  severity="danger">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="p-icon p-button-icon" aria-hidden="true">
                                    <path d="M8.01186 7.00933L12.27 2.75116C12.341 2.68501 12.398 2.60524 12.4375 2.51661C12.4769 2.42798 12.4982 2.3323 12.4999 2.23529C12.5016 2.13827 12.4838 2.0419 12.4474 1.95194C12.4111 1.86197 12.357 1.78024 12.2884 1.71163C12.2198 1.64302 12.138 1.58893 12.0481 1.55259C11.9581 1.51625 11.8617 1.4984 11.7647 1.50011C11.6677 1.50182 11.572 1.52306 11.4834 1.56255C11.3948 1.60204 11.315 1.65898 11.2488 1.72997L6.99067 5.98814L2.7325 1.72997C2.59553 1.60234 2.41437 1.53286 2.22718 1.53616C2.03999 1.53946 1.8614 1.61529 1.72901 1.74767C1.59663 1.88006 1.5208 2.05865 1.5175 2.24584C1.5142 2.43303 1.58368 2.61419 1.71131 2.75116L5.96948 7.00933L1.71131 11.2675C1.576 11.403 1.5 11.5866 1.5 11.7781C1.5 11.9696 1.576 12.1532 1.71131 12.2887C1.84679 12.424 2.03043 12.5 2.2219 12.5C2.41338 12.5 2.59702 12.424 2.7325 12.2887L6.99067 8.03052L11.2488 12.2887C11.3843 12.424 11.568 12.5 11.7594 12.5C11.9509 12.5 12.1346 12.424 12.27 12.2887C12.4053 12.1532 12.4813 11.9696 12.4813 11.7781C12.4813 11.5866 12.4053 11.403 12.27 11.2675L8.01186 7.00933Z" fill="currentColor"></path>
                                </svg>
                                <span class="p-button-label" data-pc-section="label">&nbsp;</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- <div style="display: flex; justify-content: flex-end; margin-top: 12px;">
                <input type="button" class="btn" style="--i: url('/img/back.png')" @click="queryView = false;" value="返回" />
                <input type="button" class="btn" style="--i: url('/img/icon_clear.png')" @click="(() => {
                    query = {
                        CopCode: '',
                        CopDesc: '',
                        MoneyType: '0',
                    }
                })" value="清除" />
                <input type="button" class="btn" style="--i: url('/img/sent.png')" @click="onClickProduct()" value="確認" />
            </div> -->
        </div>
    </Dialog>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { CouponModel, JourneyModel, JourneyNodeModel } from '@/model/journeyList.model';
import store from '@/store';

/**
 * COUPON
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
export default class JourneyTmp201 extends Vue {
    dd!: JourneyModel;
    value!: JourneyNodeModel;
    active!: () => void;
    edit!: () => void;
    remove!: () => void;
    queryView = false;
    query = {
        CopCode: '',
        CopDesc: '',
        MoneyType: '0',
    }
    selectedProduct: Array<CouponModel> = [];
    isEdit!: boolean;

    created(): void {
        this.selectedProduct = this.value.CouponList?.map((ver: CouponModel) => {
            return {
                CopCode: ver.CouponNo,
                CopDesc: ver.CouponName
            }
        }) ?? []
    }

    onClick(): void {
        if (this.selectedProduct.length == 0) return;
        this.active()
    }

    onRemove(): void {
        this.remove();
    }

    onClickProduct(): void {
        this.value.CouponList = this.selectedProduct.map((ver: CouponModel) => {
            return {
                CouponNo: ver.CopCode,
                CouponName: ver.CopDesc
            }
        })

        this.queryView = false;
    }

    /**
     * 查詢
     */
    onSearch(): void {
        store.dispatch('getListJourneyCoupon', this.query)
    }

    copList(): any {
        return store.state.journey.journeyCouponList
    }
}
</script>

<style scoped lang="scss">
.p-fileupload-file {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    background: #eeeeee;
}

.p-button-text {
    color: black !important;
    padding: 0;
    height: auto !important;
}

.p-fileupload {
    padding: 1rem 12px;
}

</style>
