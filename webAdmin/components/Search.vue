<template>
	<div class="navbar-search">
		<svg-icon name="search" @click="openSearch"></svg-icon>
		<el-dialog v-model="visible" :width="280" :destroy-on-close="true" :modal="false" fullscreen :show-close="false">
			<el-autocomplete
				ref="menuAutocompleteRef"
				v-model="menuValue"
				size="large"
				:prefix-icon="Search"
				:fetch-suggestions="menuSearch"
				placeholder="搜索"
				@select="handleSelect"
				@blur="handleBlur"
			>
				<template #default="{ item }">
					<svg-icon :name="item.meta.icon" />
					{{ item.meta }}
				</template>
			</el-autocomplete>
		</el-dialog>
	</div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue';
import { nextTick, ref } from 'vue';

const routerStore = useStore.routerStore();
const router = useRouter();
const menuAutocompleteRef = ref();
const visible = ref(false);
const menuValue = ref('');

const openSearch = () => {
	visible.value = true;

	nextTick(() => {
		setTimeout(() => {
			menuAutocompleteRef.value.focus();
		})
	})
}

interface Restaurant {
	path: string
	meta: {
		title: string
    [key: string]: string
	}
}

// 菜单搜索
const menuSearch = (queryString: string, cb: any) => {
	const results = queryString ? routerStore.routes.filter(createFilter(queryString)) : routerStore.routes;
	cb(results);
}

const createFilter: any = (queryString: string) => {
	return (restaurant: Restaurant) => {
		// if (isCnLocale(language)) {
		// 	return (
				restaurant.path.toLowerCase().indexOf(queryString.toLowerCase()) > -1 ||
				restaurant.meta.title.toLowerCase().indexOf(queryString.toLowerCase()) > -1
		// 	)
		// } else {
			// const idx = language.indexOf('-');
			// const lang = language.substring(0, idx);
			// const titleKey = `${lang}_title`;
			// return (
			// 	restaurant.path.toLowerCase().indexOf(queryString.toLowerCase()) > -1 ||
			// 	restaurant.meta[titleKey].toLowerCase().indexOf(queryString.toLowerCase()) > -1
			// )
		// }
	}
}

const handleSelect = async (item: any) => {
  await navigateTo(item.path);
	visible.value = false;
}
const handleBlur = () => {
	visible.value = false;
}
</script>

<style lang="less" scoped>
.navbar-search {
	:deep(.el-dialog) {
		box-shadow: unset !important;
		border-radius: 0 !important;
		background: rgba(0, 0, 0, 0.5);
	}
	:deep(.el-autocomplete) {
		width: 560px;
		position: absolute;
		top: 100px;
		left: 50%;
		transform: translateX(-50%);
	}
}
</style>
