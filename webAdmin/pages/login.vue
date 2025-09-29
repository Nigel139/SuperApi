<template>
	<div class="login-container">
		<div class="right-tool">
			<el-switch v-model="isDark" :active-action-icon="Moon" :inactive-action-icon="Sunny" size="small" />
		</div>
		<!-- <div class="login-intro">
			<div class="login-bg"><img src="@/assets/login.jpg" alt="" /></div>
		</div> -->
		<div class="login-form">
			<el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" @keyup.enter="onLogin">
				<div class="login-title">官网后台登录</div>
				<el-form-item prop="username">
					<el-input v-model="loginForm.username" :prefix-icon="User" placeholder="用户名"></el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input v-model="loginForm.password" :prefix-icon="Lock" show-password
						placeholder="密码"></el-input>
				</el-form-item>
				<el-form-item prop="captcha" class="login-captcha">
					<el-input v-model="loginForm.captcha" placeholder="验证码" :prefix-icon="Key"></el-input>
					<img :src="captchaSrc" @click="refreshCaptcha" title="点击刷新" />
				</el-form-item>
				<el-form-item class="login-button">
					<el-button type="primary" @click="onLogin()">登录</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { User, Lock, Key, Moon, Sunny } from '@element-plus/icons-vue';
import { useDark } from '@vueuse/core';

const isDark = useDark();

// const router = useRouter();
const loginFormRef: any = ref(null);

const loginForm = ref({
	username: '',
	password: '',
	captcha: '',
})

const loginRules = ref({
	username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
	password: [{ required: true, message: '登录密码不能为空', trigger: 'blur' }],
	captcha: [{ required: true, message: '验证码不能为空', trigger: 'blur' }]
})

const captchaSrc = ref('')
const captchaId = ref('')
const fetchCaptcha = async () => {
	const res: any = await getCapcha();

	captchaSrc.value = `data:image/png;base64,${res.image}`
	captchaId.value = res.captchaId
}
const refreshCaptcha = () => {
	fetchCaptcha()
}
if (import.meta.client) {
	fetchCaptcha();
}

const userStore = useStore.userStore();
const routerStore = useStore.routerStore();
const onLogin = () => {
	loginFormRef.value.validate((valid: boolean) => {
		if (!valid) {
			return false;
		}
		const data = {
			username: loginForm.value.username,
			pwd: loginForm.value.password,
			capcha: loginForm.value.captcha,
			capchaId: captchaId.value
		}
		login(data).then(async (res: any) => {
			if (res?.code === '0') {
				const token = useCookie('token');
				token.value = res.data;

				userStore.setUser(res.user)
				userStore.setToken(res.token);
				
				await loadMenus();
				await loadImgTag();
				window.location.href = '/';
			}
		})
	})
}
const loadMenus = async () => {
	const result: any = await queryAllRoutes();
	if (result.code === '0') {
		const menus = toTree(result.menus, 'id', 'parentId');
		routerStore.initRoutes(menus);
	}
}
const loadImgTag = async () => {
	const result: any = await imgtagAll();
	if (result.code === '0') {
		const tags = result.tags.map(({ id, name }) => ({ id, name }));
		userStore.initTags(tags);
	}
}

</script>

<style lang="less" scoped>
.right-tool {
	position: fixed;
	top: 10px;
	right: 10px;
	display: flex;
	align-items: center;
}

.login-container {
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	height: 100vh;
}

.login-intro {
	display: flex;
	flex-direction: column;
	width: 520px;
	flex: 0 1 auto;
}

.login-intro h1 {
	color: var(--el-color-primary);
}

.login-intro .desc {
	color: rgb(113, 115, 112);
	line-height: 32px;
	padding: 15px 0;
}

.login-bg img {
	width: 520px;
}

.login-form {
	background-color: #fff;
	flex: 0 1 auto;
	padding: 40px;
	border-radius: 6px;
	box-shadow: 1px 1px 8px #aaa6a6;
	box-sizing: border-box;

	:deep(.el-input) {
		height: 45px;
		margin-top: 5px;

		.el-input__inner {
			padding: 10px 15px 10px 5px;
			height: 45px;
			line-height: 45px;
			color: #666;
			font-size: 16px;
		}
	}
}

.login-title {
	display: flex;
	justify-content: center;
	margin-bottom: 35px;
	font-size: 24px;
	color: #444;
	letter-spacing: 4px;
}

.login-captcha {
	:deep(.el-input) {
		width: 200px !important;
	}
}

.login-captcha img {
	width: 100px;
	height: 40px;
	margin: 5px 0 0 10px;
	cursor: pointer;
}

.login-button {
	:deep(.el-button--primary) {
		margin-top: 10px;
		width: 100%;
		height: 45px;
		font-size: 18px;
		letter-spacing: 8px;
	}
}

@media only screen and (max-width: 992px) {
	.login-intro {
		display: none;
	}
}

@media only screen and (max-width: 768px) {
	.login-container {
		background: #fff;
	}

	.login-intro {
		display: none;
	}

	.login-form {
		flex: 0 1 auto;
		border-radius: 0;
		box-shadow: none;
	}

	.login-captcha {
		:deep(.el-input) {
			width: 150px;
		}
	}
}
</style>