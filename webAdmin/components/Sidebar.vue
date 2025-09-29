<template>
  <el-aside class="layout-sidebar" :class="sidebarClass">
    <Logo v-if="theme.isLogo" />
    <Menu />
  </el-aside>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

const appStore = useStore.appStore();
const { sidebarOpened, theme }: any = storeToRefs(appStore);

const sidebarClass = computed(() => {
  const sidebar = sidebarOpened.value ? 'aside-expend' : 'aside-compress';
  const isDark = theme.value.sidebarStyle === 'dark' ? 'sidebar-dark' : ''
  return `${sidebar} ${isDark}`;
})
</script>