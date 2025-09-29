<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup>

const baseData = ref({
  info: {},
  addrs: []
})
const siteTitle = computed(()=> baseData.value.info?.siteTitle??'');
const siteKeywords = computed(()=> baseData.value.info?.siteKeyword??'');
const siteDescription = computed(()=> baseData.value.info?.siteDesc??'');
const siteAuthor = computed(()=> baseData.value.info?.siteAuthor??'');
useHead({
  htmlAttrs: { lang: 'zh-CN' },
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'keywords', content: siteKeywords },
    { name: 'description', content: siteDescription },
    { name: 'author', content: siteAuthor },
    { name: 'apple-mobile-web-app-title', content: siteTitle }
  ],
  title: siteTitle
})


const key = 'baseInfo_data'
const getBaseData = async () => {
  const res = await getBaseInfo();
  if (res.code === '0') {
    baseData.value.info = res.baseInfo;
    baseData.value.addrs = res.addrs;
    let json = JSON.stringify(baseData.value);
    sessionStorage.setItem(key, json);
  }
}

const getProdData = async () => {
  const res = await allProds();
  if (res.code === '0') {
    let prodData = {
      types: res.types,
      prods: res.prods
    }
    let json = JSON.stringify(prodData);
    sessionStorage.setItem('prod_data', json);
  }
}
if (import.meta.client) {
  let data = sessionStorage.getItem(key);
  if (data) {
    baseData.value = JSON.parse(data);
  } else {
    getBaseData();
  }

  getProdData();
}
</script>

<style>
:root {
  --swiper-pagination-bottom: 50px;
}

.transition_3 {
  transition: .3s;
}
</style>