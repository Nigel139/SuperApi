<template>
  <el-config-provider :size="size">
    <NuxtPage />
  </el-config-provider>
</template>

<script setup lang="ts">
useHead({
  htmlAttrs: { lang: 'zh-CN' },
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  title: '我的官网'
})

const appStore = useStore.appStore();
import { storeToRefs } from 'pinia';
const { componentSize, theme }: any = storeToRefs(appStore);
const size = computed(() => componentSize.value);

if(import.meta.client){
  const userStore = useStore.userStore();
  if(!userStore.token){
    const router = useRouter();
    router.push('/login');
  }
}
onMounted(() => {
    nextTick(() => {
      handleThemeStyle(theme.value);
    })
});
</script>