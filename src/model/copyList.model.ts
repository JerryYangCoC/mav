// eslint-disable-next-line @typescript-eslint/no-empty-interface
import { TreeNode } from 'primevue/tree';

export interface CopyListModel extends TreeNode {
    data: CopyModel
}

export interface CopyModel {
    /**
     * 文案編號
     */
    CopyWriteID?: string,

    /**
     * 文案名稱
     */
    CopyWriteName: string,

    /**
     * 文案型態
     */
    CopyWriteType: string,

    /**
     * 旅程型態
     */
    JourneyType: string,

    /**
     * 有效起日
     */
    StartYMD: string,

    /**
     * 有效訖日
     */
    EndYMD: string,

    /**
     * 建檔類型
     */
    FileType?: string,

    /**
     * 文案參數1
     */
    Param1?: string,

    /**
     * 文案參數2
     */
    Param2?: string,

    /**
     * 文案參數3
     */
    Param3?: string,
    
    /**
     * 文案參數4
     */
    Param4?: string,

    /**
     * 文案參數5
     */
    Param5?: string,

    /**
     * 顯示類型
     */
    type?: string,

    /**
     * 推播網址
     */
    cta_url?: string,

    /**
     * 按鈕標題
     */
    cta_title?: string,

    /**
     * 推播圖片
     */
    image?: string,

    /**
     * 文案內容
     */
    message?: string,

    /**
     * 建檔人員
     */
    UserID?: string,

    /**
     * 參數型態
     */
    ParamType?: string,

    /**
     * APP推播標題
     */
    title?: string,
}