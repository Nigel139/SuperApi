import { defineStore } from 'pinia';

export const tabStore = defineStore('tabStore', {
	state: () => ({
		visitedViews: [] as any[],
		cachedViews: [] as any[]
	}),
	actions: {
		logout() {
			this.visitedViews=[]
		},
		addTab(title: string, path: string, closable: boolean) {
			if (!this.visitedViews.some(t => t.path === path)) {
				this.visitedViews.push({ title, path, closable })
			}
		},
		addCachedView(view: any) {
			if (this.cachedViews.includes(view.name)) {
				return;
			}

			if (view.meta.cache) {
				this.cachedViews.push(view.name);
			}
		},
		delView(view: any) {
			for (const [i, v] of this.visitedViews.entries()) {
				if (v.path === view.path) {
					this.visitedViews.splice(i, 1);
					break;
				}
			}

			this.delCachedView(view).then()
		},
		delCachedView(view: any) {
			return new Promise(resolve => {
				const index = this.cachedViews.indexOf(view.name);
				if (index > -1) {
					this.cachedViews.splice(index, 1);
				}
				resolve([...this.cachedViews]);
			})
		},
		delOthersViews(view: any) {
			this.visitedViews = this.visitedViews.filter(v => {
				return v.meta.affix || v.path === view.path;
			})

			const index = this.cachedViews.indexOf(view.name);
			if (index > -1) {
				this.cachedViews = this.cachedViews.slice(index, index + 1);
			} else {
				this.cachedViews = [];
			}
		},
		delAllViews() {
			this.visitedViews = this.visitedViews.filter(tab => tab.meta.affix);
			this.cachedViews = [];
		}
	}
})
