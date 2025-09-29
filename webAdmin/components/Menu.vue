<template>
	<el-scrollbar>
		<el-menu :default-active="defaultActive" :collapse="isCollapse" :unique-opened="uniqueOpened"
			:collapse-transition="false" background-color="transparent" mode="vertical" router>
			<ClientOnly>
				<menu-item v-for="menu in routerStore.routes.filter(x=>x.status==1)" :key="menu.id" :menu="menu"></menu-item>
			</ClientOnly>
		</el-menu>
	</el-scrollbar>
</template>

<script setup lang="ts">

const routerStore = useStore.routerStore();
const appStore = useStore.appStore();
const { sidebarOpened, theme }: any = storeToRefs(appStore);

const route = useRoute();
const defaultActive = computed(() => {
	const { path } = route;
	return path;
})

const isCollapse = computed(() => {
	return !sidebarOpened.value;
})

const uniqueOpened = computed(() => {
	return theme.value.uniqueOpened;
})
</script>
