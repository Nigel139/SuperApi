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
		// �û���¼
		async loginAction(loginForm: any) {
		},
		// ��ȡ�û���Ϣ
		async getUserInfoAction() {
		},
		// �û��˳�
		async logout() {
			this.token = undefined
		},
		initTags(tags: []) {
			this.imgTags = tags;
		},
	}
})
