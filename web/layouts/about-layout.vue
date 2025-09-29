<template>
    <NuxtLayout name="default">
        <section class="banner position-relative">
            <img v-if="pageInfo.img" :src="pageInfo.img" alt="img" class="w-100" />
            <div class="position-absolute top-50 start-50 translate-middle">
                <h1 class="text-center text-white mb-0 fw-bold">{{ pageInfo.title }}</h1>
            </div>
        </section>
        <section class="about-menu" :class="{ 'fixed': (fixedMenu) }">
            <div class="container">
                <nav class="w-100">
                    <ul class="d-flex item-aligns-center">
                        <li>
                            <a href="/about" :class="{active:(pageInfo.title=='关于我们')}">关于我们</a>
                        </li>
                        <li>
                            <a href="/about-qual" :class="{active:(pageInfo.title=='企业资质')}">企业资质</a>
                        </li>
                        <li>
                            <a href="/about-dev" :class="{active:(pageInfo.title=='研发生产')}">研发生产</a>
                        </li>
                        <li>
                            <a href="/about-hr" :class="{active:(pageInfo.title=='人才招聘')}">人才招聘</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </section>
        <slot />
    </NuxtLayout>
</template>

<script setup>
import { useDevice } from '#imports'
const { isMobile } = useDevice()
import { useRoute } from 'vue-router'

const pageInfo = reactive({
    img: '',
    title: ''
})
const route = useRoute()
onMounted(() => {
    var p = route.path.toLowerCase();
    if (p == '/about' || p == '/about/') {
        pageInfo.img = '/images/about.jpg'
        pageInfo.title = '关于我们'
    } else if (p == '/about-qual' || p == '/about-qual/') {
        pageInfo.img = '/images/about_1.jpg'
        pageInfo.title = '企业资质'
    } else if (p == '/about-dev' || p == '/about-dev/') {
        pageInfo.img = '/images/about_1.jpg'
        pageInfo.title = '研发生产'
    } else if (p == '/about-hr' || p == '/about-hr/') {
        pageInfo.img = '/images/about_3.jpg'
        pageInfo.title = '人才招聘'
    }

    window.addEventListener('scroll', handleScroll);
})
// 清理
onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
})

const fixedMenu = ref(false)
const handleScroll = () => {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    if(isMobile) fixedMenu.value = scrollPosition > 145;
    else fixedMenu.value = scrollPosition > 448;
}
</script>

<style scoped>
.banner {
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
}
.banner img{
    width: auto;
    height: 448px;
}
.about-menu {
    background-color: #fff !important;
}
.about-menu.fixed {
  position: fixed;
  top: 100px;
  left: 0;
  width: 100%;
  z-index: 99;
}
.about-menu nav > ul{
    margin-bottom: 0;
}
.about-menu nav li a{
    display: block;
    color: #999999;
    font-size: 16px;
    height: auto;
    line-height: 1.5;
    padding: 20px 15px 12px;
    margin: 0 !important;
}
.about-menu nav li .active{
    color: #004e98;;
    border-bottom: 5px solid #004e98;;
}
@media (max-width: 767px) {
    .banner>div>h1 {
        font-size: 20px;
    }
    
    .banner img{
        height: 145px;
    }
    .about-menu nav li a{
        padding: 12px 8px 6px;
        font-size: 14px;
        margin: 0 !important;
    }
}
</style>