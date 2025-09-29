<template>
    <VideoPlayer :src="videoSrc" @close="videoSrc=''" />
    <NuxtLayout name="default">
        <section class="swiper-container" :class="{ 'vh-10011': (!isMobile) }" v-if="slideVideos">
            <swiper-container :loop="true" class="mySwiper" ref="swiperRef"
                :pagination="{ el: '.swiper-pagination', clickable: true }">
                <swiper-slide v-for="(slide, index) in slideVideos" :key="index">
                    <div class="position-relative">
                        <img :src="genImgUrl(slide.imgPath, slide.imgName)" class="d-block w-100" />
                        <a @click.prevent="videoSrc=slide.url"
                            class="a-play position-absolute start-50 top-50 translate-middle">
                            <i class="icon-play text-white"></i>
                        </a>
                    </div>
                </swiper-slide>
            </swiper-container>
            <!-- <div class="swiper-pagination"></div> -->
            <div class="swiper-button-prev" @click="goPrev()"></div>
            <div class="swiper-button-next" @click="goNext()"></div>
        </section>

        <section id="video-menu" :class="{ 'fixed': (fixedMenu) }">
            <div class="container">
                <nav class="w-100">
                    <ul class="d-flex item-aligns-center flex-wrap">
                        <li v-for="(t, index) in videoType" :key="index">
                            <a href="#" :class="{ active: (typeId == t.id) }" @click.prevent="typeId = t.id">
                                {{ t.name }}
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </section>

        <section id="video-list">
            <div class="container">
                <div class="video-list2">
                    <div class="col-12 col-sm-4"
                        v-for="(v, index) in videoData?.filter(x => x.typeId == typeId)" :key="index">
                        <div class="content">
                            <div class="img position-relative">
                                <img :src="genImgUrl(v.imgPath, v.imgName)" alt="img" class="width_100">
                                <a href="#"  @click.prevent="videoSrc=v.url"
                                    class="position-absolute start-50 top-50 translate-middle d-flex align-items-center justify-content-center">
                                    <i class="icon-play white"></i>
                                </a>
                            </div>
                            <div class="text">
                                <h3>{{ v.name }}</h3>
                                <div class="date">{{ v.showDay }}</div>
                                <div class="intro d-none">{{ v.remark }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </NuxtLayout>
</template>

<script setup>
const route = useRoute()
import VideoPlayer from '@/components/VideoPlayer'

import { useDevice } from '#imports'
const { isMobile } = useDevice()

const swiperRef = ref(null)

const typeId = ref(route.query.id??1);
const videoType = ref([])
const videoData = ref(null)
const slideVideos = ref(null)

const fixedMenu = ref(false)
const handleScroll = () => {
    let scrollPosition = window.scrollY || document.documentElement.scrollTop;
    if (isMobile) fixedMenu.value = scrollPosition > 145;
    else fixedMenu.value = scrollPosition > 490;
}
onMounted(() => {
    window.addEventListener('scroll', handleScroll);
})

const getVideoInfo = async () => {
    const res = await allVideoInfo();
    if (res.code === '0') {
        videoType.value = res.types;
        videoData.value = res.videos?.filter(x => x.isTop != 1);
        slideVideos.value = res.videos?.filter(x => x.isTop == 1);
        typeId.value = res.types[0]?.id;
    }
}
getVideoInfo();

const goNext = () => swiperRef.value?.swiper.slideNext()
const goPrev = () => swiperRef.value?.swiper.slidePrev()

onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
})

const videoSrc = ref(null)
</script>

<style scoped>
.swiper-container {
    position: relative;
    width: 100%;
    max-height: 590px;
    overflow: hidden;
    top: -104px;
    margin-bottom: -104px;
}

.swiper-container .a-play {
    border: 1px solid #fff;
    height: 50px;
    border-radius: 30px;
    width: 83px;
    font-size: 20px;
    opacity: 0.8;
    transition: .3s;
    z-index: 9;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* 按钮整体容器 */
.swiper-button-prev,
.swiper-button-next {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: rgb(22 23 23 / 40%);
    cursor: pointer;
    z-index: 10;
    top: 50%;
    margin-top: -26px;
    border: 0;
    background-image: none;
    -webkit-transition: background-color .3s ease-in-out;
    -o-transition: background-color .3s ease-in-out;
    transition: background-color .3s ease-in-out;
}

.swiper-button-prev {
    left: 26px;
}

.swiper-button-next {
    right: 26px;
}

.swiper-button-next::after,
.swiper-button-prev::after {
    font-family: "font-icons";
    content: "\e7a5";
    /* 右箭头图标 */
    color: #656c72;
    /* 设置图标颜色 */
    font-size: 34px;
    /* 设置图标大小 */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.swiper-button-prev::after {
    content: "\e7a4";
}

.swiper-button-prev:hover,
.swiper-button-next:hover {
    background-color: rgba(0, 0, 0, 0.6) !important;
}

.swiper-button-prev:hover::after,
.swiper-button-next:hover::after {
    color: #fff;
}

#video-menu {
    background-color: #fff !important;
    border-bottom: 1px solid #eff1f6;
}

#video-menu.fixed {
    position: fixed;
    top: 100px;
    left: 0;
    width: 100%;
    z-index: 99;
}

#video-menu nav>ul {
    margin-bottom: 0;
}

#video-menu nav li a {
    display: block;
    color: #999999;
    font-size: 16px;
    height: auto;
    line-height: 1.5;
    padding: 20px 15px 12px;
    margin: 0 !important;
}

#video-menu nav li .active {
    color: #004e98;
    border-bottom: 5px solid #004e98;
}

#video-list {
    min-height: 450px;
    background-color: #eff1f6;
    padding: 50px 0 100px;
}

.video-list2 {
    margin: 0 -20px;
}

.video-list2 .content {
    background-color: #ffffff;
    overflow: hidden;
    border-radius: 15px;
    transition: .3s;
}

.video-list2 .content:hover {
    background: #004e98;
    overflow: inherit;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
}

.video-list2 .content .img {
    overflow: hidden;
    padding: 10px 10px 0 10px;
}

.video-list2 .content .img>img {
    border-radius: 15px;
}

.video-list2 .content .img>a {
    width: 70px;
    height: 70px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    cursor: pointer;
    transition: .3s;
}

.video-list2 .content .img>a:hover {
    background-color: #004e98;
}

.video-list2 .content .img>a>i {
    font-size: 24px;
    color: #fff;
}

.video-list2 .content .text {
    padding: 20px;
    transition: .3s;
}

.video-list2 .content .text h3 {
    font-size: 20px;
    color: #111;
    margin-bottom: 10px;
    transition: .3s;
    font-weight: 400 !important;
    line-height: 1.1;
}

.video-list2 .content:hover .text h3,
.video-list2 .content:hover .text .date {
    color: white;
}

.video-list2 .content .text .date {
    color: #999;
    font-size: 12px;
    margin-bottom: 0px;
}

.video-list2 .content .text .intro {
    color: white;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    padding: 20px 0 30px;
    transition: .3s;
}

.video-list2 .content:hover .text .intro {
    display: block !important;
}

.video-modal {
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.video-modal .modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  position: relative;
}

.video-modal .close {
  position: absolute;
  right: 15px;
  top: 10px;
  font-size: 20px;
  cursor: pointer;
}

@media (max-width: 767px) {
    .swiper-container {
        top: 0;
        margin-bottom: 0;
    }

    .swiper-container .a-play {
        height: 30px;
        width: 45px;
        font-size: 14px;
    }

    .swiper-button-prev,
    .swiper-button-next {
        display: none;
    }

    #video-menu nav li a {
        padding: 12px 8px 6px;
        font-size: 14px;
        margin: 0 !important;
    }

    #video-list {
        min-height: 200px;
        padding: 30px 15px;
    }

    .video-list2 .content .img>a {
        width: 40px;
        height: 40px;
    }

    .video-list2 .content .img>a>i {
        font-size: 12px;
    }

    .video-list2 .content .text h3 {
        font-size: 14px;
    }

    .video-list2 .content .text .intro {
        font-size: 12px;
    }
}
</style>