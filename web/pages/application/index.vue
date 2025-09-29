<template>
    <NuxtLayout name="default">
        <section class="banner position-relative">
            <img src="/images/banner/61d8073de8b61.jpg" alt="img" class="w-100" />
            <div class="position-absolute top-50 start-50 translate-middle">
                <h1 class="text-center text-white mb-0">应用案例</h1>
            </div>
        </section>

        <section id="app-menu" :class="{ 'fixed': (fixedMenu) }">
            <div class="container">
                <nav class="w-100">
                    <ul class="d-flex item-aligns-center flex-wrap">
                        <li v-for="(t, index) in appData.types" :key="index">
                            <a href="#" :class="{ active: (curTypeId == t.id) }" @click.prevent="curTypeId = t.id">
                                {{ t.name }}
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </section>

        <section v-if="!isMobile" id="app-type1">
            <div class="row h-100">
                <div class="left col-sm-5 position-relative h-100 text-white">
                    <div class="position-absolute start-50 top-50 translate-middle">
                        <h2 class="title">{{ appData.types?.find(x=>x.id==curTypeId)?.name }}</h2>
                        <div class="content">
                            <div class="subtitle">{{ curApp[infoIdx]?.title }}</div>
                            <div v-html="curApp[infoIdx]?.remark"></div>
                        </div>
                    </div>
                </div>
                <div class="right col-sm-7 h-100 d-flex flex-column">
                    <div v-for="(cur, idx) in curApp" :key="idx" class="flex-fill overflow-hidden"
                        :class="{ active: (infoIdx == idx) }" @mouseenter="infoIdx = idx">
                        <img :src="genImgUrl(cur.imgPath,cur.imgName)" class="img-fluid object-fit-cover" alt="img" />
                    </div>
                </div>
            </div>
        </section>

        <section v-else id="app-type2">
            <div class="container pb-5 mt-3">
                <swiper-container :loop="true" class="mySwiper"
                    :pagination="{ el: '.swiper-pagination', clickable: true }">
                    <swiper-slide v-for="(slide, index) in curApp" :key="index">
                        <img :src="genImgUrl(slide.imgPath,slide.imgName)" class="d-block w-100" />
                        <div>
                            <h2 class="title">{{ appData.types?.find(x=>x.id==curTypeId)?.name }}</h2>
                            <div class="content">
                                <div class="subtitle">{{ slide.title }}</div>
                                <div v-html="slide.remark" style="color: #555;"></div>
                            </div>
                        </div>
                    </swiper-slide>
                </swiper-container>
                <div class="swiper-pagination"></div>
            </div>
        </section>
    </NuxtLayout>
</template>

<script setup>

import { useDevice } from '#imports'
const { isMobile } = useDevice()

const curTypeId = ref(useRoute().query.id??0);

const infoIdx = ref(0)
const fixedMenu = ref(false)
const handleScroll = () => {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    if (isMobile) fixedMenu.value = scrollPosition > 145;
    else fixedMenu.value = scrollPosition > 448;
}

const curApp = computed(() => {
    return appData.value.shows?.filter(x=>x.typeId==curTypeId.value) ?? [];
})

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
})
// 清理
onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
})

const key = 'app_data'
const appData = ref({})
const getAppsData = async () => {
    const res = await allAppInfo();
    if (res.code === '0') {
        appData.value.types = res.types;
        appData.value.shows = res.shows;

        if(!curTypeId.value) curTypeId.value = res.types[0]?.id;
        let json = JSON.stringify(appData.value);
        sessionStorage.setItem(key, json);
    }
}
if (import.meta.client) {
    let data = sessionStorage.getItem(key);
    if (data) {
        appData.value = JSON.parse(data);
        if(!curTypeId.value) curTypeId.value = appData.value.types[0]?.id;
    } else {
        getAppsData();
    }
}
</script>

<style scoped>

.banner img {
    width: auto;
    height: 448px;
}

.banner h1 {
    font-size: 40px;
    font-weight: 400;
}

#app-menu {
    background-color: #fff !important;
    border-bottom: 1px solid #eff1f6;
}

#app-menu.fixed {
    position: sticky;
    top: 100px;
    left: 0;
    width: 100%;
    z-index: 99;
}

#app-menu nav>ul {
    margin-bottom: 0;
}

#app-menu nav li a {
    display: block;
    color: #999999;
    font-size: 16px;
    height: auto;
    line-height: 1.5;
    padding: 20px 15px 12px;
    margin: 0 !important;
}

#app-menu nav li .active {
    color: #004e98;
    border-bottom: 5px solid #004e98;
}

#app-type1 {
    height: 850px;
    background: #1d2733;
}

#app-type1 .title {
    font-size: 36px;
    margin-bottom: 40px;
}

#app-type1 .subtitle {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 15px;
}

#app-type1 .right>div {
    opacity: 0.5;
}

#app-type1 .right>div.active {
    margin-left: -100px;
    opacity: 1;
    overflow: visible !important;
}

#app-type2 {
    padding-left: 10px;
}

#app-type2 .title {
    font-size: 18px;
    color: #111;
    margin: 10px 0 15px;
}
#app-type2 .subtitle {
    font-size: 16px;
    color: #333;
    margin-bottom: 10px;
}
#app-type2 {
    --swiper-pagination-top: 160px
}
@media (max-width: 767px) {
    .banner>div>h1 {
        font-size: 20px;
    }

    .banner img {
        height: 145px;
    }

    #app-menu nav li a {
        padding: 12px 8px 6px;
        font-size: 14px;
        margin: 0 !important;
    }
}
</style>