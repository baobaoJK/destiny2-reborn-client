<script setup lang="ts">
import { onMounted, h, computed, watch } from 'vue'
import { ElMessageBox } from 'element-plus'
import { t } from './utils/i18n'

// 设置窗口标题
const title = computed((): string => {
  document.title = t('title')
  return document.title
})

watch(title, (newTitle) => {
  document.title = newTitle
})

// 检查更新的函数
const checkUpdate = async (): Promise<void> => {
  try {
    // 判断 preload 是否正常加载
    if (!window.updater) {
      console.warn('updater API 未找到')
      return
    }

    const result = await window.updater.checkUpdate()

    if (result.hasUpdate) {
      ElMessageBox.confirm(
        h('div', {}, [
          h('h2', '发现新版本'),
          h('p', `当前版本：${result.currentVersion}`),
          h('p', `最新版本：${result.latestVersion}`),
          h('p', result.notes ?? ''),
          h('p', '是否前往下载？')
        ]),
        '软件更新',
        {
          confirmButtonText: '立即更新',
          cancelButtonText: '取消更新'
        }
      ).then(async () => {
        await window.updater.openUpdateUrl(result.downloadUrl)
      })
    }
  } catch (err) {
    console.error('检查更新失败：', err)
  }
}

onMounted(() => {
  checkUpdate()
})
</script>

<template>
  <RouterView />
</template>
