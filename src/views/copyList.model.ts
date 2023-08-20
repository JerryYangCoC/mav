// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CopyListModel {
    key: number,
    data: CopyModel
}

export interface CopyModel {
    CopyWriteID?: string,
    CopyWriteName: string,
    CopyWriteType: string,
    JourneyType: string,
    StartYMD: string,
    EndYMD: string,
    FileType?: string,
    Param1?: string,
    Param2?: string,
    Param3?: string,
    Param4?: string,
    Param5?: string,
    type?: string,
    cta_url?: string,
    cta_title?: string,
    image?: string,
    message?: string,
    UserID?: string,
}