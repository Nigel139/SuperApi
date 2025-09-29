<template>
  <div @click="handleClick">
    <svg-icon :name="icon"></svg-icon>
  </div>
</template>

<script setup lang="ts">
const appStore = useStore.appStore();
const { sidebarOpened }: any = storeToRefs(appStore);

const handleClick = () => {
  appStore.setSidebarOpened();
}
const icon = computed(() => (sidebarOpened.value ? 'outdent' : 'indent'))
</script>