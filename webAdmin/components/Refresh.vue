<template>
	<svg-icon name="reload" @click="refresh"></svg-icon>
</template>

<script setup lang="ts">
const router = useRouter()
const route = useRoute()
const tabStore = useStore.tabStore();

const refresh = () => {
	tabStore.delCachedView(route).then(() => {
		nextTick(() => {
			let path = route.path;
			path = path.replaceAll('\/', '@@@');
			router.replace({ path: '/admin/redirect/' + path }).catch(err => {
				console.warn(err)
			})
		})
	})
}
</script>
