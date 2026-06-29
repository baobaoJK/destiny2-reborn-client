<script setup lang="ts">
import { computed, watch } from 'vue'
import { t } from './utils/i18n'

// 设置窗口标题
const title = computed((): string => {
  document.title = t('title')
  return document.title
})

watch(title, (newTitle) => {
  document.title = newTitle
})
</script>

<template>
  <RouterView />
</template>
