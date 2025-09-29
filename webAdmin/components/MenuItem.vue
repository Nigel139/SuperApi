<template>
	<el-sub-menu v-if="menu.children && menu.children.length > 0" :index="menu.id.toString()">
		<template #title>
			<svg-icon :name="menu.icon"></svg-icon>
			<span>{{ menu.name }}</span>
		</template>
		<menu-item v-for="sub in menu.children.filter(x=>x.status==1)" :key="sub.url" :menu="sub"></menu-item>
	</el-sub-menu>
	<el-menu-item v-else :key="menu.url" :index="menu.url">
		<svg-icon :name="menu.icon"></svg-icon>
		<template #title><span>{{ menu.name }}</span></template>
	</el-menu-item>
</template>

<script setup lang="ts">
defineProps({
	menu: {
		type: Object as PropType<any>,
		required: true
	}
})
</script>
