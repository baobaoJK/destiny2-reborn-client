<script setup lang="ts">
import Versions from './components/Versions.vue'
import { onMounted, h } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

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
    } else {
      ElMessage({
        message: `当前已是最新版本：${result.currentVersion}`,
        type: 'info'
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
  <img alt="logo" class="logo" src="./assets/electron.svg" />
  <div class="creator">Powered by electron-vite</div>
  <div class="text">
    Build an Electron app with
    <span class="vue">Vue</span>
    and
    <span class="ts">TypeScript</span>
  </div>
  <p class="tip">Please try pressing <code>F12</code> to open the devTool</p>
  <div class="actions">
    <div class="action">
      <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">Documentation</a>
    </div>
  </div>
  <Versions />
</template>
