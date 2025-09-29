<template>
    <NuxtLayout name="default">
        <div class="page-container" style="min-height: 500px;">
            <ClientOnly>
                <h1 class="welcome-title">欢迎回来，{{ userStore.user.userName }}！</h1>
            </ClientOnly>            
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">

definePageMeta({
    title: "页面",
});
const userStore = useStore.userStore();

</script>

<style lang="less" scoped>
.page-container {
    display: flex;
    justify-content: center;
    align-items: center;

    .welcome-title {
        color: var(--theme-menu-hover-color);
    }
}
</style>
