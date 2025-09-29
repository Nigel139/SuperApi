<template>
  <NuxtLayout name="about-layout">
    <section>
      <div id="about-qual" class="container">
        <h2 class="text-center" style="font-size: 36px;">企业资质</h2>
        <div class="intro text-center">
          BSI ISO 9001:2015和ISO 14001:2015注册认证，国家高新技术企业
        </div>
        <div class="swiper1 position-relative">
          <swiper-container class="mySwiper" ref="swiperRef1" :loop="true" :autoplay="3500"
            :pagination="{ clickable: true }" :slides-per-view="2">
            <swiper-slide v-for="(slide, index) in slides1" :key="index">
              <div class="portfolio text-center">
                <a :href="slide.img" :title="slide.title" @click.prevent="showImg(index)">
                  <img :src="slide.img" alt="img" />
                </a>
                <p>{{ slide.title }}</p>
              </div>
            </swiper-slide>
          </swiper-container>
          <div class="swiper-button-prev position-absolute" @click="swiper1.prev()"></div>
          <div class="swiper-button-next position-absolute" @click="swiper1.next()"></div>
        </div>
        <VueEasyLightbox :visible="isShowImg" :imgs="imgSrc" @hide="handleHide"></VueEasyLightbox>
      </div>
      <div id="about-auth">
        <h2 class="text-center text-white">产品认证</h2>
        <div class="intro text-center text-white">
          所有产品均已通过CE和RoHS认证，部分产品通过UL、ETL、DLC、FCC、UKCA和能源之星认证。
        </div>
        <div class="container">
          <div class="swiper2 position-relative">
            <swiper-container class="mySwiper" ref="swiperRef2" :init="false">
              <swiper-slide v-for="(slide, index) in slides2" :key="index">
                <div class="portfolio text-center">
                  <img :src="slide.img" alt="img" />
                  <p>{{ slide.title }}</p>
                </div>
              </swiper-slide>
            </swiper-container>
            <div class="swiper-button-prev position-absolute" @click="swiper2.prev()"></div>
            <div class="swiper-button-next position-absolute" @click="swiper2.next()"></div>
          </div>
        </div>
      </div>
      <div id="about-patent">
        <h2 class="text-center">产品专利</h2>
        <div class="text-center" style="color: #555;">
          超过300多项国内和国际专利，包括美国，德国，英国，欧洲等 </div>
        <div class="container">
          <div class="patent-list d-flex flex-wrap align-items-end">
            <div v-for="(p,index) in patents" :key="index">
              <img :src="p" @click="showPatent(index)"/>
            </div>
          </div>
          <VueEasyLightbox :visible="isShowPatent" :imgs="patentSrc" @hide="hidePatent"></VueEasyLightbox>
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>

<script setup>
import { SwiperSlide } from 'swiper/vue'
import { useSwiper } from '#imports'
import 'swiper/css';
import 'swiper/css/navigation';

const slides1 = reactive([
  {
    img: 'http://signcomplex.com.cn/Uploads/2025-01-03/677758f67bcbc.jpg',
    title: '国家高新技术企业',
  },
  {
    img: 'http://signcomplex.com.cn/Uploads/2022-01-25/61efacdfa0592.png',
    title: 'ISO 9001:2015 认证',
  },
  {
    img: 'http://signcomplex.com.cn/Uploads/2024-11-18/673a9c160192d.png',
    title: 'ISO 14001:2015 认证',
  },
]);

const swiperRef1 = ref(null)
const swiper1 = useSwiper(swiperRef1)

const isShowImg = ref(false)
const imgSrc = ref('#')
function showImg(index) {
  isShowImg.value = true;
  imgSrc.value = slides1[index].img
}

const handleHide = () => {
  isShowImg.value = false;
}

const slides2 = reactive([
  {
    img: 'http://signcomplex.com.cn/Uploads/2022-01-25/61efc4fb60663.png',
    title: 'UL认证',
  },
  {
    img: 'http://signcomplex.com.cn/Uploads/2022-01-25/61efc80d2df49.png',
    title: 'TUV认证',
  },
  {
    img: 'http://signcomplex.com.cn/Uploads/2022-01-25/61efc81b63f77.png',
    title: 'ETL认证',
  },
  {
    img: 'http://signcomplex.com.cn/Uploads/2022-01-25/61efc82b901fd.png',
    title: 'FCC认证',
  },
  {
    img: 'http://signcomplex.com.cn/Uploads/2022-01-25/61efc8453501f.png',
    title: 'RoHS认证',
  },
  {
    img: 'http://signcomplex.com.cn/Uploads/2022-01-25/61efc85009031.png',
    title: 'CE认证',
  },
  {
    img: 'http://signcomplex.com.cn/Uploads/2022-01-25/61efc85b8ee9d.png',
    title: 'SAA认证',
  },
  {
    img: 'http://signcomplex.com.cn/Uploads/2024-11-18/673a9f27970fc.png',
    title: 'UKCA认证',
  },
]);
const swiperRef2 = ref(null)
const swiper2 = useSwiper(swiperRef2, {
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  loop: true,
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 300,
    modifier: 1,
    slideShadows: true,
  },
  spaceBetween: -60,
});

const patents = reactive([
  'http://signcomplex.com.cn/Uploads/2022-01-25/61efd1af844f8.png',
  'http://signcomplex.com.cn/Uploads/2022-01-25/61efd2e0be00d.png',
  'http://signcomplex.com.cn/Uploads/2022-01-25/61efd3c27ae91.png',
  'http://signcomplex.com.cn/Uploads/2022-01-25/61efd47dd7886.png',
  'http://signcomplex.com.cn/Uploads/2022-01-25/61efd593b5069.png',
  'http://signcomplex.com.cn/Uploads/2024-11-18/673aa0e4bf80b.jpg',
  'http://signcomplex.com.cn/Uploads/2024-11-18/673aa0ebcd867.jpg',
  'http://signcomplex.com.cn/Uploads/2024-11-18/673aa0f0dcc78.jpg',
  'http://signcomplex.com.cn/Uploads/2024-11-18/673aa0f894ee1.jpg',
  'http://signcomplex.com.cn/Uploads/2024-11-18/673aa0fe78b33.jpg',
])
const isShowPatent = ref(false)
const patentSrc = ref('#')
function showPatent(index) {
  isShowPatent.value = true;
  patentSrc.value = patents[index]
}

const hidePatent = () => {
  isShowPatent.value = false;
}
</script>

<style scoped>
section {
  background-color: #eff1f6;
  padding-top: 45px;
}

#about-qual {
  margin-top: 35px;
  margin-bottom: 80px;
}

#about-qual .intro {
  color: #999;
  font-size: 18px;
}

#about-qual .swiper1 {
  margin: 50px auto 0;
  max-width: 1000px;
}

#about-qual .portfolio {
  position: relative;
  overflow: hidden;
  position: relative;
  overflow: hidden;
}

#about-qual .portfolio a {
  display: block;
  width: 100%;
  height: auto;
}

#about-qual .portfolio p {
  color: #555;
  margin-top: 10px;
  font-size: 16px;
}

/* 按钮整体容器 */
.swiper-button-prev,
.swiper-button-next {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: rgb(0 77 151 / 20%) !important;
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
  background-color: rgb(0 77 151 / 100%) !important;
}

.swiper-button-prev:hover::after,
.swiper-button-next:hover::after {
  color: #fff;
}

#about-auth {
  background: #1d2733;
  padding: 80px 0;
}

#about-auth h2 {
  margin-bottom: 20px;
  font-size: 36px;
}

#about-auth .intro {
  margin: 0 auto;
  max-width: 610px;
  font-size: 14px;
}

#about-auth .container .swiper2 {
  overflow: hidden;
  max-width: 1280px;
  padding: 30px 0 0;
}

#about-auth .container .portfolio p {
  color: #fff;
  margin-top: 10px;
  font-size: 16px;
}
#about-auth .container swiper-slide {
  background-position: center;
  background-size: cover;
  width: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
  transition: transform 0.5s ease, opacity 0.5s ease;
  position: relative;
}
#about-patent{
  padding: 80px 0 0;
}
#about-patent h2 {
    margin-bottom: 20px;
    line-height: 1;
    font-size: 36px;
}
#about-patent .patent-list{
  margin: 70px -20px;
}
#about-patent .patent-list div{
  max-width: 20%;
  padding: 0 20px;
  width: 20%;
  min-width: 19%;
  flex: 1;
}
#about-patent .patent-list div:nth-child(1n+6) {
    margin-top: 60px;
}
#about-patent .patent-list div:hover {
    min-width: 22%;
    max-width: 22%;
}
#about-patent .patent-list div>img{  
  transition: .3s;
  box-shadow: -6px 0px 3px 0px rgba(116, 103, 94, 0.16);
}
@media (max-width: 767px) {
  #about-qual {
    padding-top: 38px;
  }

  #about-qual .container {
    margin: 0px 0 50px;
  }

  #about-qual .container h2 {
    margin-bottom: 15px;
    font-size: 20px;
  }

  #about-qual .container .intro {
    font-size: 12px;
  }

  #about-qual .container .swiper1 {
    margin: 30px auto 0;
  }

  #about-qual .container .portfolio p {
    font-size: 12px;
  }

  #about-auth {
    padding: 50px 0 0;
  }

  #about-auth h2 {
    font-size: 20px;
  }

  #about-auth .container .portfolio p {
    font-size: 14px;
  }
  #about-auth .container swiper-slide {
    width: 200px;
  }
  #about-patent{
    padding: 50px 0;
  }
  #about-patent h2 {
    font-size: 20px;
  }
  #about-patent .patent-list{
    margin: 30px 0px 0px;
  }
  #about-patent .patent-list div{
    padding: 0 5px;
  }
}
</style>