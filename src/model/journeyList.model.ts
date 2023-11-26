import { TreeNode } from "primevue/tree";

export interface JourneyListModel extends TreeNode {
    data: JourneyModel
}

export interface JourneyModel {
    /**
     * 旅程編號
     */
    JourneyId?: string,

    /**
     * 旅程名稱
     */
    JourneyName: string,

    /**
     * 旅程型態
     */
    JourneyType: string,

    /**
     * 有效起日
     */
    StartYMD?: string,

    /**
     * 有效訖日
     */
    EndYMD?: string,

    /**
     * 有效起日
     */
    StartDate: string,

    /**
     * 有效訖日
     */
    EndDate: string,

    /**
     * 建檔類型
     */
    FileType?: string,

    /**
     * 狀態
     */
    StatusFlag?: string,

    /**
     * 內容
     */
    Content?: Array<JourneyNodeModel> | any,

    /**
     * 建檔人員
     */
    UserID?: string,
    SendFlag?: string,
}

/**
 * 旅程節點
 */
export interface JourneyNodeModel {

    /**
     * 節點編號
     */
    NodeId: string,
    
    /**
     * 節點名稱
     */
    NodeName: string,
    
    /**
     * 節點類型
     */
    NodeType: string,
    
    /**
     * 節點順序
     */
    NodeSeq?: string,

    /**
     * 人數上限
     */
    PeopleLimt?: string,

    /**
     * 是否願意接受促銷資訊
     */
    IsRecvMsgFlag?: string,

    /**
     * 狀態
     */
    SendType?: string,

    /**
     * 文案編號
     */
    CopyWriteId?: string,
    CopyWriteName?: string,

    /**
     * 觸發時間
     */
    SelectTime?: string,

    /**
     * 發送時間
     */
    SendTime?: string,

    /**
     * 最優惠
     */
    IsBestOffer?: string,
    
    /**
     * 判斷型態
     */
    JudgeType?: string,

    /**
     * 消費起日
     */
    ConsumeStartYMD?: string,

    /**
     * 消費迄日
     */
    ConsumeEndYMD?: string,

    /**
     * 準金卡每月選日
     */
    GoldSelectDate?: string,

    /**
     * 排除起日
     */
    RemindedStartYMD?: string,

    /**
     * 排除迄日
     */
    RemindedEndYMD?: string,

    /**
     * 生日選月
     */
    BirthSelectmonth?: string,

    /**
     * 溝通管道
     */
    Channel?: string,

    /**
     * 生日每月幾號撈取資料/ 每月幾號
     */
    SelectDate?: string,

    /**
     * 新入會起日
     */
    NewMemStartYMD?: string,

    /**
     * 新入會迄日
     */
    NewMemEndYMD?: string,

    /**
     * 新入會後幾日撈取資料
     */
    NewMemSelectDate?: string,

    /**
     * 商品明細
     */
    ProductList?: Array<ProductModel>,

    /**
     * 最大單品消費金額
     */
    IsMaxPay?: string,

    /**
     * 消費起日
     */
    PayStartYMD?: string,

    /**
     * 消費迄日
     */
    PayEndYMD?: string,

    /**
     * 篩選類型
     */
    DateType?: string,

    /**
     * 每月幾號
     */
    // SelectDate: string,

    /**
     * 消費起金額
     */
    PayAmtStart?: string,

    /**
     * 消費迄金額
     */
    PayAmtEnd?: string,

    /**
     * 名單匯入明細
     */
    Import?: Array<ImportModel>,

    /**
     * 活動來源
     */
    ActivityType?: string,

    /**
     * 活動明細
     */
    ActivityList?: Array<ActivityModel>

    /**
     * 文案參數
     */
    VariableList?: Array<VariableModel>,

    /**
     * 位置
     */
    Position: Array<PositionModel>,

    /**
     * COUPON 清單
     */
    CouponList?: Array<CouponModel>,

    /**
     * COUPONS 清單
     */
    CouponsList?: Array<CouponModel>,

    /**
     * 排除已設定旅程天數
     */
    RemindedDate?: string,

}

/**
 * COUPON
 */
export interface CouponModel {

    /**
     * COUPON 編號
     */
    CouponNo?: string,
    
    /**
     * CouponID
     */
    CopCode?:  string,

    /**
     * Coupon名稱
     */
    CopDesc?: string,

    /**
     * 起始日
     */
    StDate?: string,

    /**
     * 起迄日
     */
    EdDate?: string,
    
    /**
     * Coupon面額
     */
    CopMoney?: string,
    
    /**
     * Coupon名稱
     */
    CouponName?: string,
}

/**
 * 節點位置
 */
export interface PositionModel {

    /**
     * 連線ID
     */
    SeqId: string,

    /**
     * 連線起點
     */
    source: string | number,

    /**
     * 連線迄點
     */
    target: string | number,

    /**
     * 事件內容
     */
    label: string,
}

/**
 * 文案參數
 */
export interface VariableModel {

    /**
     * 對應編號
     */
    VariableNo?: string,

    /**
     * 參數一
     */
    Param1: string,

    /**
     * 參數二
     */
    Param2: string,

    /**
     * 參數三
     */
    Param3: string,

    /**
     * 參數四
     */
    Param4: string,

    /**
     * 參數五
     */
    Param5: string,

    /**
     * 文案編號
     */
    CopyWriteID?: string,
    
    /**
     * 文案名稱
     */
    CopyWriteName?: string,

    /**
     * 文案型態
     */
    CopyWriteType?: string,

    /**
     * 旅程型態
     */
    JourneyType?: string,
    
    /**
     * 有效起日
     */
    StartYMD?: string,

    /**
     * 有效訖日
     */
    EndYMD?: string,

    /**
     * 參數型態
     */
    ParamType?: string,
}

/**
 * 活動
 */
export interface ActivityModel {

    /**
     * 活動品號
     */
    ActivityNo: string,

    /**
     * 活動名稱
     */
    ActivityNm: string,
}

/**
 * 名單
 */
export interface ImportModel {

    /**
     * 卡號
     */
    GID: string,
}

/**
 * 商品明細
 */
export interface ProductModel {

    /**
     * 商品ID
     */
    ItemCode: string,
    itemCode?: string,

    /**
     * 商品名稱
     */
    ItemInvNM?: string,

    /**
     * 商品名稱
     */
    ItemName: string,
    itemName?: string,
}