<template>
	<div v-if="sidebarOpened" class="sidebar-logo">
		<el-avatar src="/favicon.ico"></el-avatar>
		<span class="logo-title">官网后台</span>
	</div>
	<div v-else class="sidebar-logo sidebar-logo-expend">
		<el-avatar src="/favicon.ico"></el-avatar>
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

const appStore = useStore.appStore();
const { sidebarOpened }: any = storeToRefs(appStore);
</script>

<style lang="less" scoped>
.sidebar-logo {
	width: var(--theme-aside-width) !important;
	height: var(--theme-header-height);
	line-height: var(--theme-header-height);
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: rgb(0 21 41 / 2%) 0 1px 4px;
	color: var(--theme-logo-text-color);
	font-size: 18px;
	.el-avatar {
		width: 25px;
		height: 25px;
	}
	.logo-title {
		margin-left: 10px;
	}
}
.sidebar-logo-expend {
	width: 100% !important;
}
</style>
