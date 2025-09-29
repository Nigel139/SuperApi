<template>
    <div class="navbar-container" :class="headerClass">
        <div class="navbar-left">
            <Hamburger />
            <Breadcrumb v-if="appStore.theme.isBreadcrumb" />
        </div>
        <div class="navbar-right">
            <!-- <ComponentSize />
            <Search />
            <Notice /> -->
            <Fullscreen />
            <ClientOnly>
                <User />
            </ClientOnly>
            <Settings />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';

const appStore = useStore.appStore();
const { theme }: any = storeToRefs(appStore);

const headerClass = computed(() => (theme.value.headerStyle === 'theme' ? 'header-theme' : ''));
</script>

<style lang="less" scoped>
.navbar-container {
    height: var(--theme-header-height);
    display: flex;
    align-items: center;
    background: var(--theme-header-bg-color);
    border-bottom: 1px solid var(--theme-border-color-light);
    color: var(--theme-header-text-color);

    ::v-deep(.svg-icon) {
        align-items: center;
        cursor: pointer;
        height: var(--theme-header-height);
        line-height: var(--theme-header-height);
        padding: 0 12px;

        svg {
            color: var(--theme-header-text-color) !important;
            font-size: 16px;
        }

        &:hover {
            background: var(--theme-header-hover-color);
        }
    }
}

.navbar-left {
    flex: 1;
    height: inherit;
    display: flex;
    align-items: center;
}

.navbar-right {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    &-link {
        height: 100%;
        display: flex;
        align-items: center;
        white-space: nowrap;

        &-photo {
            width: 25px;
            height: 25px;
            border-radius: 100%;
        }
    }
}
</style>