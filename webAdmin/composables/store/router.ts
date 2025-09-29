import { defineStore } from 'pinia';

const menuRoutes: any = [
  // {
  //   url: '/',
  //   name: '首页',
  //   icon: 'monitor',
  //   affix: true,
  //   children: [],
  // },
];

const genBreadcrumbs = (routes: any[], path: string) => {
  const breadcrumbs: any[string] = [];
  const format = (routes: any[], id: number = 0) => {
    let subr = routes.find(x=>x.id==id)
    if(subr){
      breadcrumbs.unshift(subr.name)
      if(subr.parentId>0) format(routes, subr.parentId)
    }
  };

  let r = routes.find(x=>x.url==path)
  if(r){
    breadcrumbs.push(r.name)
    format(routes, r.parentId)
  }
  return breadcrumbs;
};

export const routerStore = defineStore('routerStore', {
	state: () => ({
		routes: menuRoutes,
	}),
	actions: {
    getBreadcrumbs(path: string) {
      return genBreadcrumbs(this.routes, path)
    },
		setRoutes(routers: []) {
			this.routes = routers
		},
    initRoutes(routes: []) {
      this.routes = menuRoutes.concat(routes);
    },
	},
  persist: true,
})
