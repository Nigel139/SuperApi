<template>
    <NuxtLayout name="default">
        <section id="details-top">
            <div class="container">
                <div class="d-flex justify-content-start" style="padding-top: 20px;">
                    <a href="#" class="d-inline-block" style="color: #001111;font-size: 16px;" @click.prevent="goBack">
                        <i class="icon-angle-left me-2"></i>返回
                    </a>
                </div>
                <div class="row top-info">
                    <div class="col-12 col-sm-7 left-img">
                        <swiper-container :loop="true" class="mySwiper"
                            :pagination="{ el: '.swiper-pagination', clickable: true }">
                            <swiper-slide v-for="(i1, idx1) in prodDetails.imgs?.filter(x=>x.type==1)" :key="idx1">
                                <img :src="genImgUrl(i1.imgPath, i1.imgName)" class="d-block w-100" />
                            </swiper-slide>
                        </swiper-container>
                    </div>
                    <div class="col-12 col-sm-5 right-text">
                        <div class="content">
                            <h1>{{ prodDetails.prod?.name }}</h1>
                            <p v-html="prodDetails.prod?.description"></p>
                            <a class="d-inline-block mt-5" href="#" @click.prevent="handleCounsel()"><i
                                    class="icon-comment2"></i> 咨询</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="details-menu" :class="{ 'fixed': (fixedMenu) }">
            <div class="container">
                <nav class="w-100">
                    <ul class="d-flex item-aligns-center">
                        <li class="d-inline-block" @click="infoIdx = 0;">
                            <a :class="{ active: (infoIdx == 0) }">详情</a>
                        </li>
                        <li class="d-inline-block" @click="infoIdx = 1;">
                            <a :class="{ active: (infoIdx == 1) }">规格</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </section>

        <section id="details-info">
            <div v-if="infoIdx == 0">
                <div class="text-center" v-for="(i2, idx2) in prodDetails.imgs?.filter(x=>x.type==2)" :key="idx2">
                    <img :src="genImgUrl(i2.imgPath, i2.imgName)" alt="详情" />
                </div>
            </div>
            <div v-else class="info2">
                <div class="container param-box">
                    <div>
                        <span class="title">参数</span>
                        <div class="content" v-html="prodDetails.prod.params"></div>
                    </div>
                    <div class="mt-5">
                        <div v-if="prodDetails.prod?.sizeUnit">
                            <span class="title">尺寸</span>
                            <p>单位：{{ prodDetails.prod?.sizeUnit }}</p>
                        </div>                        
                        <p>
                            <img :src="genImgUrl(i3.imgPath, i3.imgName)" v-for="(i3, idx3) in prodDetails.imgs?.filter(x=>x.type==3)" :key="idx3" alt="尺寸" />
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section id="details-other">
            <!-- <div class="bg-white" style="padding-top: 10px; padding-bottom: 30px;">
                <div class="container">
                    <h2>相关产品</h2>
                    <div style="margin-top: 20px;">
                        <div style="background: #f5f6fa; padding: 20px;">
                            <ClientOnly>
                                <swiper-container :loop="true" class="mySwiper" :space-between="20"
                                    :slides-per-view="slidesPerView"
                                    :pagination="{ el: '.swiper-pagination', clickable: true }">
                                    <swiper-slide v-for="(slide, index) in detailsData.other" :key="index">
                                        <img :src="slide.img" class="d-block w-100" />
                                        <div class="info d-flex align-items-center justify-content-center">
                                            <span>{{ slide.title }}</span>
                                        </div>
                                    </swiper-slide>
                                </swiper-container>
                            </ClientOnly>
                        </div>
                    </div>
                </div>
            </div> -->
            <div class="container">
                <div class="contactus text-center" @click="handleCounsel">
                    如需了解产品的更多信息，请联系我们！
                </div>
            </div>
        </section>

        <Modal :show="showModal" v-if="showModal" title="产品咨询" @close="showModal = false" @on-open="refreshCaptcha">
            <template #content>
                <div class="row g3">
                    <div class="col-6 mt-3">
                        <input type="text" class="form-control" v-model="counselInfo.name" placeholder="姓名*" maxlength="20" required>
                    </div>
                    <div class="col-6 mt-3">
                        <input type="text" class="form-control" v-model="counselInfo.tel" placeholder="电话" maxlength="20" />
                    </div>
                    <div class="col-6 mt-3">
                        <input type="text" class="form-control" v-model="counselInfo.email" placeholder="邮箱*" maxlength="50" />
                    </div>
                    <div class="col-6 mt-3">
                        <input type="text" class="form-control" v-model="counselInfo.corpName" placeholder="公司名称" maxlength="20" />
                    </div>
                    <div class="col-12 mt-3">
                        <textarea class="form-control" v-model="counselInfo.content" placeholder="咨询内容*" maxlength="500" />
                    </div>
                    <div class="col-12 mt-3 d-flex">
                        <input type="text" class="form-control" v-model="counselInfo.validCode" placeholder="验证码*"
                            style="flex:1;" />
                        <img :src="captchaSrc" @click="refreshCaptcha" title="点击刷新" style="height: 38px;" />
                    </div>
                </div>
                <div class="text-center mt-5">
                    <button type="button" class="btn btn-primary" @click="submitCounsel"> 提 交 </button>
                    <button type="button" class="btn btn-secondary ms-3" @click="showModal = false"> 取 消 </button>
                </div>
            </template>
        </Modal>
    </NuxtLayout>
</template>

<script setup>
import { SwiperSlide } from 'swiper/vue'
import { useDevice } from '#imports'
const { isMobile } = useDevice()

import { useRouter } from 'vue-router'
const router = useRouter()

const goBack = () => {
    router.go(-1)
}

const infoIdx = ref(0)
const prodDetails = ref({})
const getProdInfo = async () => {
    const res = await getProdDetails({id: useRoute().query.id});
    if (res.code === '0') {
        prodDetails.value.imgs = res.imgs;
        prodDetails.value.prod = res.prod;
    }
}
getProdInfo();

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
})
// 清理
onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
})

const fixedMenu = ref(false)
const handleScroll = () => {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    if (isMobile) fixedMenu.value = scrollPosition > 800;
    else fixedMenu.value = scrollPosition > 550;
}

const captchaSrc = ref('')
const captchaId = ref('')
const fetchCaptcha = async () => {
	getCapcha().then(async (res) => {
		captchaSrc.value = `data:image/png;base64,${res.image}`
		captchaId.value = res.captchaId
	})
}
const refreshCaptcha = () => {
	fetchCaptcha()
}

const showModal = ref(false)
const counselInfo = ref(null);
const handleCounsel = async()=>{
    counselInfo.value = {};
    showModal.value = true;
}

//import { useToast } from 'vue-toastification'
import pkg from 'vue-toastification';
const { useToast } = pkg;

const submitCounsel = async () => {
    let opt = {
        position: "top-center",
        closeButton: "button",
    }
    const toast = useToast()
    if (!counselInfo.value.name) return toast.error('请输入您的姓名或称呼', opt)
    if (!counselInfo.value.email) return toast.error('请输入您的联系邮箱', opt)
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(counselInfo.value.email)) return toast.error('您输入的邮箱格式有误', opt)
    if (!counselInfo.value.content) return toast.error('请输入您的咨询内容', opt)
    if (!counselInfo.value.validCode) return toast.error('请输入验证码', opt)

    counselInfo.value.capchaId = captchaId.value;
    const res = await createCounsel(counselInfo.value);
    if (res.code === '0') {
        toast.success('提交成功成，我们将尽快联系您。')
        showModal.value = false;
    }else{
        return toast.error(res.msg, opt)
    }
}
</script>

<style scoped>
#details-top .left-img {
    padding: 30px;
}
.top-info{
    padding-left: 30px;
    padding-right: 30px;
}
#details-top .left-img .mySwiper {
    height: 400px;
    max-height: 400px;
}

#details-top .right-text {
    padding: 28px 15px 30px;
}

#details-top .right-text .content {
    max-width: 550px;
}

#details-top .right-text .content>h1 {
    font-size: 30px;
    color: #111;
    margin-bottom: 10px;
    font-weight: 400 !important;
}

#details-top .right-text .content>p {
    color: #111;
}

#details-top .right-text .content>a {
    color: #fff;
    background: #004e98;
    padding: 8px 30px;
    font-size: 14px;
    border-radius: 20px;
}

#details-menu {
    height: auto;
    line-height: 1.5;
    background-color: #f5f6fa !important;
}

#details-menu.fixed {
    position: fixed;
    top: 100px;
    left: 0;
    width: 100%;
    z-index: 99;
}

#details-menu nav ul li {
    padding: 0;
    margin: 20px 40px 10px 0;
}

#details-menu nav ul li>a {
    cursor: pointer;
    color: #999999;
    font-size: 18px;
    height: auto;
    line-height: 1.5;
    padding: 5px 15px;
    margin: 0 !important;
    display: inline-block;
}

#details-menu nav ul li>a.active {
    color: #004e98;
    border-bottom: 3px solid #004e98;
}

#details-info {
    display: block;
    padding-left: 30px;
    padding-right: 30px;
    background-color: rgb(255, 255, 255);
}

#details-info .info2 {
    /* background-color: #f5f6fa !important; */
}

#details-info .info2 .title {
    color: #444343;
    font-size: 20px;
    border-left: 6px solid #004e98;
    line-height: 1;
    padding-left: 15px;
    margin: 40px 0 0 0;
    font-weight: 400px;
}

#details-info .info2 p {
    margin: 30px;
}

#details-info .info2 .content {
    margin-top: 30px;
}

#details-other {
    background: #f5f6fa;
    padding-top: 30px;
    padding-bottom: 50px;
    margin-top: 20px;
}

#details-other h2 {
    color: #444343;
    font-size: 20px;
    border-left: 6px solid #004e98;
    line-height: 1;
    padding-left: 10px;
    margin: 20px 0 0 0;
    font-weight: 400;
}
.param-box{
    padding: 40px 60px;
}
/* #details-other .mySwiper {
    background: #f5f6fa;
    margin-top: 20px;
    height: 300px;
} */

#details-other .info {
    position: absolute;
    top: 0;
    left: 0;
    background: rgb(29 39 51 / 0%);
    transition: .5s;
    height: 100%;
    width: 100%;
}

#details-other .info:hover {
    background: rgb(29 39 51 / 80%);
}

#details-other .info:hover span {
    opacity: 1;
}

#details-other .info>span {
    color: #fff;
    font-size: 14px;
    transition: opacity .4s ease-in-out;
    opacity: 0;
}

.contactus {
    cursor: pointer;
    color: #999999;
    font-size: 18px;
    font-weight: 700;
    padding: 25px 10px;
    margin: 50px 0 0;
    border: 1px solid #eee;
    transition: .3s;
}

.contactus:hover {
    background: #004e98;
    color: #fff;
    border-color: #004e98;
}

@media (max-width: 767px) {
    #details-top .left-img {
        padding: 15px 0 20px;
        height: auto;
    }
    .top-info{
        padding: 0px;
    }
    #details-top .right-text {
        padding-top: 0;
    }

    #details-top .right-text .content>h1 {
        font-size: 20px;
    }

    #details-top .right-text .content>p {
        margin-bottom: 10px;
    }

    #details-top .right-text .content>a {
        margin-top: 20px !important;
    }
    .param-box{
        padding: 20px;
    }
    #details-other .mySwiper {
        padding: 15px 10px;
        height: auto;
    }

    #details-other {
        padding-bottom: 20px;
    }

    .contactus {
        font-size: 14px;
        padding: 10px 10px;
        margin: 20px 0 0;
    }

    #details-info {
    display: block;
    padding: 0;
}
}
</style>
