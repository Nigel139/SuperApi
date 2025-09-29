<template>
  <el-container class="layout-container">
    <Sidebar />
    <el-container>
      <el-header class="layout-header" :style="layoutHeaderHeight">
        <Navbar />
        <Tabs v-if="theme.isTabsView" />
      </el-header>
      <el-scrollbar>
        <el-main class="layout-main">
          <el-scrollbar class="layout-scrollbar">
            <div class="layout-card" :style="layoutMainHeight">
              <slot />
            </div>
          </el-scrollbar>
        </el-main>
      </el-scrollbar>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
// import Sidebar from './components/Sidebar/index.vue';
// import Navbar from './components/Navbar/index.vue';
// import Tabs from './components/Tabs/index.vue';
// import { computed } from 'vue';
import { storeToRefs } from 'pinia';

const appStore = useStore.appStore();
const { theme }: any = storeToRefs(appStore);

const layoutHeaderHeight = computed(() => {
  if (!theme.value.isTabsView) {
    return 'height:var(--theme-header-height) !important';
  } else {
    return '';
  }
})

const layoutMainHeight = computed(() => {
  if (!theme.value.isTabsView) {
    return 'height:calc(100vh - var(--theme-header-height) - 30px';
  } else {
    return '';
  }
})

const userStore: any = useStore.userStore();
const loadUserInfo = async () => {
  const result: any = await queryUserInfo({});
  if (result.code == 200) {
    userStore.setUser(result.data)
  }
}
//loadUserInfo();
</script>