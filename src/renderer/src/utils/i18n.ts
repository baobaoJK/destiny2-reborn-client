import i18n from '@renderer/plugins/i18n' // 你的 createI18n 实例

export const t = (key: string, params?: Record<string, any>): string => {
  return i18n.global.t(key, params || {})
}
