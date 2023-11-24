export const i18nText = {
  warning: '提醒',
  upload: '上傳',
  chooseFile: '選擇文件',
  chooseFiles: '選擇多個文件',
  preload: '預加載',
  uploading: '上傳中...',
  uploaded: '已上傳',
  uploadFailed: '上傳失敗',
  uploadSuccess: '上傳成功!',
  delete: '刪除',
  reUpload: '重新上傳',
  cancelUpload: '取消上傳',
};

export const getFailedFilesCount = (failedCount: number): string => `${failedCount}個文件上傳失敗！`;
export const getUploadingFilesCount = (uploadingCount: number, filesCount: number): string => `${uploadingCount}/${filesCount}正在上傳`;
export const getSelectedFilesCount = (filesCount: number): string => `已添加${filesCount}個文件`;
