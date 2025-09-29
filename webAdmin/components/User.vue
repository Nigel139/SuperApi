<template>
	<el-dropdown class="avatar-container" trigger="hover">
		<div class="avatar-wrapper">
			<el-avatar shape="circle" :size="30" :src="user.avatar"></el-avatar>
			<span>{{ user.userName }}</span>
			<el-icon class="el-icon--right">
				<ArrowDown />
			</el-icon>
		</div>
		<template #dropdown>
			<el-dropdown-menu class="user-dropdown">
				<el-dropdown-item>
					<a href="/sys/modifyPwd">修改密码</a>
				</el-dropdown-item>
				<el-dropdown-item @click="logout">退出</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<script setup lang="ts">
import { ArrowDown } from '@element-plus/icons-vue';

const user = ref(useStore.userStore().user);
const router = useRouter();

const logout = () => {
 	useStore.tabStore().logout();
	useStore.userStore().logout();
	router.push('/login');
};
</script>

<style lang="less" scoped>
.avatar-container {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	height: var(--theme-header-height);

	.avatar-wrapper {
		display: flex;
		align-items: center;
		white-space: nowrap;
		cursor: pointer;
		padding: 0 8px;
		color: var(--theme-header-text-color);

		span {
			margin-left: 6px;
		}
	}

	&:hover {
		background: var(--theme-header-hover-color);
	}
}
</style>
