<template>
    <Header />
    <main style="padding-top: 100px;">
        <slot />
    </main>
    <ClientOnly>
        <Footer />
    </ClientOnly>
    
     <ClientOnly>
        <section id="contact">
            <ul class="mb-0">
                <li title="QQ" class="position-relative wx-container">
                    <div class="img-box d-flex align-items-center justify-content-center">
                        <!-- <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=475130793&site=qq&menu=yes"
                            class="text-center">
                            <img src="/images/qq.png" alt="img" />
                        </a> -->
                        <img class="wximg" src="/images/qq.png" alt="img" />
                    </div>
                    <div class="wxQr">
                        <img style="height:100px;" :src="qqImg" alt="img" />
                    </div>
                </li>
                <li title="微信" class="position-relative wx-container">
                    <div class="img-box d-flex align-items-center justify-content-center wx">
                        <img class="wximg" src="/images/weixin.png" alt="img" />
                    </div>
                    <div class="wxQr">
                        <img style="height:100px;" :src="wxImg" alt="img" />
                    </div>
                </li>
                <li v-if="showTopBtn">
                    <div class="img-box">
                        <div id="gotoTop" class="icon-angle-up" @click="scrollToTop"></div>
                    </div>
                </li>
            </ul>
        </section>
    </ClientOnly>
</template>

<script setup>
import Footer from '~/components/Footer.vue'
import Header from '~/components/Header.vue';

// 初始化
onMounted(() => {
    window.addEventListener('scroll', handleScroll);
})

// 清理
onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
})

const showTopBtn = ref(false)
const handleScroll = () => {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    const oneThirdViewportHeight = window.innerHeight / 3;
    showTopBtn.value = scrollPosition > oneThirdViewportHeight;
}

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

const key = 'baseInfo_data'
const baseData = ref({})
if (import.meta.client) {
    let data = sessionStorage.getItem(key);
    if (data) {
        baseData.value = JSON.parse(data);
    }
}

const qqImg = computed(() => genImgUrl(baseData.value.info?.qqImgPath, baseData.value.info?.qqImgName));
const wxImg = computed(() => genImgUrl(baseData.value.info?.wxImgPath, baseData.value.info?.wxImgName));

</script>

<style scoped>
#contact {
    position: fixed;
    right: 0;
    bottom: 120px;
    /* top: 50%; */
    /* transform: translateX(-50%); */
    z-index: 99;
}

#contact ul li~li {
    border-top: 1px solid #fff;
}

#contact .img-box {
    width: 50px;
    height: 50px;
    background-color: #004e98;
    cursor: pointer;
    transition: .3s;
}

#contact .img-box img {
    width: 45%;
}

#contact .wxQr {
    position: absolute;
    right: 105%;
    width: 100px;
    height: 0;
    bottom: 0;
    transition: .3s;
    overflow: hidden;
}

#contact .wx-container:hover .wxQr {
    height: 100px !important;
}

#contact .img-box #gotoTop {
    position: relative;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    font-size: 28px;
    color: #FFF;
    text-align: center;
}
</style>