const tabStore = useStore.tabStore();

// 关闭tab
export const closeTab = (router: any, tab: any) => {
	if (tab.closable) return;

	tabStore.delView(tab);
	toLastView(router, tabStore.visitedViews, tab);
}

// 关闭其他tabs
export const closeOthersTabs = (router: any, tab: any) => {
	router.push(tab);
	tabStore.delOthersViews(tab);
}

// 关闭全部tabs
export const closeAllTabs = (router: any, tab: any) => {
	tabStore.delAllViews();
	toLastView(router, tabStore.visitedViews, tab);
}

// 跳转到最后一个tab
export const toLastView = (router: any, visitedViews: any[], view: any) => {
	const latestView = visitedViews.slice(-1)[0];
	if (latestView) {
		router.push(latestView.path);
	}
}
