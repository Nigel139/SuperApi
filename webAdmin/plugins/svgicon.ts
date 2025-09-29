import SvgIcon from '@/components/SvgIcon.vue';
import 'virtual:svg-icons-register';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('svg-icon', SvgIcon);
})