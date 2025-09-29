import { defineStore } from 'pinia'

export const userStore = defineStore('userStore', {
	state: () => ({
		user: {
			id: '',
			userName: '',
			email: '',
			avatar: '/favicon.ico'
		},
		token: '',
		imgTags: [],
	}),
	actions: {
		setUser(val: any) {
			this.user = val
		},
		setToken(val: any) {
			this.token = val
		},
		// 用户登录
		async loginAction(loginForm: any) {
		},
		// 获取用户信息
		async getUserInfoAction() {
		},
		// 用户退出
		async logout() {
			this.token = undefined
		},
		initTags(tags: []) {
			this.imgTags = tags;
		},
	}
})
