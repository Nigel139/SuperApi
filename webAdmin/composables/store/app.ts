import { defineStore } from 'pinia';
import type { Theme } from '@/typeModule/AppModule';

const themeConfig: Theme = {
  sidebarStyle: 'dark',
  headerStyle: 'light',
  primaryColor: '#409eff',
  uniqueOpened: true,
  isLogo: true,
  isBreadcrumb: true,
  isTabsView: true,
  isTabsCache: true,
  tabsStyle: 'style-1'
}

export const appStore = defineStore('appStore', {
	state: () => ({
		// sidebar �Ƿ�չ��
		sidebarOpened: true,
		// ���ʻ�
		language: 'zh-CN',
		// �����С
		componentSize: 'default',
		// ����
		theme: themeConfig
	}),
	actions: {
		setSidebarOpened() {
			this.sidebarOpened = !this.sidebarOpened;
		},
		setLanguage(locale: string) {
			this.language = locale;
		},
		setComponentSize(size: string) {
			this.componentSize = size;
		},
		setTheme(theme: Theme) {
			this.theme = theme;
		}
	},
	persist: true,
})
