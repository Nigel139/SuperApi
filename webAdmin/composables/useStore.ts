import { appStore } from './store/app';
import { userStore } from './store/user';
import { tabStore } from './store/tabs';
import { routerStore } from './store/router';

const store: any = {
  appStore,
  userStore,
  tabStore,
  routerStore,
}
export const useStore = store;
