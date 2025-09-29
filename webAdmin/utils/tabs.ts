const tabStore = useStore.tabStore();

// �ر�tab
export const closeTab = (router: any, tab: any) => {
	if (tab.closable) return;

	tabStore.delView(tab);
	toLastView(router, tabStore.visitedViews, tab);
}

// �ر�����tabs
export const closeOthersTabs = (router: any, tab: any) => {
	router.push(tab);
	tabStore.delOthersViews(tab);
}

// �ر�ȫ��tabs
export const closeAllTabs = (router: any, tab: any) => {
	tabStore.delAllViews();
	toLastView(router, tabStore.visitedViews, tab);
}

// ��ת�����һ��tab
export const toLastView = (router: any, visitedViews: any[], view: any) => {
	const latestView = visitedViews.slice(-1)[0];
	if (latestView) {
		router.push(latestView.path);
	}
}
