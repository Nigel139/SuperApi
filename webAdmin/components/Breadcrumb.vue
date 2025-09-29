<template>
	<el-breadcrumb separator="/" :separator-icon="ArrowRight" class="navbar-breadcrumb">
		<ClientOnly>
			<el-breadcrumb-item v-for="(item, index) in breadcrumb" :key="index">
				{{ item }}
			</el-breadcrumb-item>
		</ClientOnly>
	</el-breadcrumb>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue';

const routerStore = useStore.routerStore();
const route = useRoute();

const breadcrumb = computed(() => {
	let path = route.path;
	const breadcrumbs = routerStore.getBreadcrumbs(path);
	return breadcrumbs;
});

</script>

<style lang="less" scoped>
.navbar-breadcrumb {
	::v-deep(.el-breadcrumb__inner) {
		color: var(--theme-header-text-color) !important;
	}

	padding-left: 10px;
}
</style>
