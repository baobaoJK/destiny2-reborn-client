export {}

// 这个文件用于声明 Electron 相关的全局类型，确保在 TypeScript 中能够正确识别 `window.updater` 的类型。
declare global {
  interface Window {
    updater: {
      checkUpdate: () => Promise<{
        currentVersion: string
        latestVersion: string
        hasUpdate: boolean
        downloadUrl: string
        notes?: string
      }>
      openUpdateUrl: (url: string) => Promise<void>
    }
  }
}
