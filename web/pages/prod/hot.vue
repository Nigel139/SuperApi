<template>
    <NuxtLayout name="default">
        <section id="hot-banner" class="position-relative">
            <img src="/images/banner/677b8aff37c51.jpg" alt="img" class="w-100" />
            <div class="position-absolute start-50 top-50 translate-middle">
                <h1 class="text-center mb-0 text-white">热销推荐</h1>
                <div class="intro text-white">基于思坎普强大的研发和创新能力，我们每月将推出4-5款具有市场竞争力的爆品。</div>
            </div>
        </section>
        <section id="prod-hot" class="pt-0">
            <div v-for="(item, index) in hotProds" :key="index" class="hot-box">
                <div class="">
                    <div class="container">
                        <h2 class="text-center">{{ item.key }}</h2>
                        <swiper-container class="mySwiper" :loop="true" :slides-per-view="slidesPerView" :space-between="20" :autoplay="3500">
                            <swiper-slide v-for="(p, idx2) in item.prods" :key="idx2">
                                <div class="text-center" style="overflow: hidden !important;max-height: 260px;">
                                    <a :href="`/prod/details?id=${p.id}`" class="pimg">
                                        <img :src="genImgUrl(p.imgPath, p.imgName)" class="transition_3" />
                                    </a>
                                    <h3 class="text-center">{{ p.name }}</h3>
                                    <a :href="`/prod/details?id=${p.id}`" class="prod-more d-inline-block">查看更多</a>
                                </div>
                            </swiper-slide>
                        </swiper-container>
                    </div>
                </div>
            </div>
        </section>
    </NuxtLayout>
</template>

<script setup>
import { SwiperSlide } from 'swiper/vue'
import { useDevice } from '#imports'
const { isMobile } = useDevice()

const slidesPerView = computed(()=> isMobile?2:3)

const hotProds = computed(() => {    
    let ps = prodData.value.prods?.filter(x=>x.isHot == true)??[];
    const grouped = Object.entries(ps.reduce((acc, item) => {
        let t = prodData.value.types?.find(x=>x.id==item.type2);
        const key = t.name;
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(item);
        return acc;
    }, {})).map(([key, prods]) => ({ key, prods }));
    return grouped;
})

const key = 'prod_data'
const prodData = ref({})
const getProdData = async () => {
    const res = await allProds();
    if (res.code === '0') {
        prodData.value.types = res.types;
        prodData.value.prods = res.prods;
        let json = JSON.stringify(prodData.value);
        sessionStorage.setItem(key, json);
    }
}
if (import.meta.client) {
    let data = sessionStorage.getItem(key);
    if (data) {
        prodData.value = JSON.parse(data);
    } else {
        getProdData();
    }
}
</script>

<style scoped>
#hot-banner {
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url("/images/banner/677b8aff37c51.jpg");
}

#hot-banner h1 {
    font-size: 40px;
    font-weight: 400;
}

#hot-banner .intro {
    max-width: 600px;
    margin-top: 30px;
}

#prod-hot {
    background-color: #eff1f6;
    padding-top: 50px !important;
}

#prod-hot .hot-box {
    padding: 0 0 50px;
    cursor: pointer;
}

#prod-hot .hot-box .mySwiper h3 {
    color: #111;
    font-size: 18px;
    font-weight: 400;
    margin: 15px 0 20px;
}
.pimg {
    position: relative;
    overflow: hidden !important;
}
.pimg>img{
    width: 100%;
    height: 260px; 
    object-fit: cover;  /* 关键：裁剪图片以填满区域 */
    display: block;
}
.pimg>img:hover { transform: scale(1.3); }
.prod-more {
    color: #fff;
    background-color: #004e98;
    padding: 10px 20px;
    font-size: 14px;
    transition: .3s;
}
@media (max-width: 767px) {
    #hot-banner h1 {
        font-size: 20px;
    }
    #hot-banner .intro {
        font-size: 12px;
        margin-top: 10px;
    }
    #hot-banner > div {
        width: 100%;
        padding: 0 15px;
    }
    #prod-hot .hot-box h2 {
        font-size: 24px;
        margin-bottom: 20px;
    }
    #prod-hot .hot-box .mySwiper h3 {
        font-size: 14px;
        margin: 10px 0 15px;
    }
    .prod-more {
        padding: 5px 18px;
        font-size: 12px;
        width: 90%;
    }
}
</style>