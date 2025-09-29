<template>
	<el-dropdown trigger="click" @command="componentSizeChange">
		<svg-icon name="font-size"></svg-icon>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item command="large" :disabled="getComponentSize === 'large'">大型</el-dropdown-item>
				<el-dropdown-item command="default" :disabled="getComponentSize === 'default'">默认</el-dropdown-item>
				<el-dropdown-item command="small" :disabled="getComponentSize === 'small'">小型</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<script setup lang="ts">
// import { storeToRefs } from 'pinia';

const appStore = useStore.appStore();
const { componentSize }: any = storeToRefs(appStore);

const getComponentSize = computed(() => {
  return componentSize.value;
})
const componentSizeChange = (size: string) => {
	appStore.setComponentSize(size)
}
</script>
