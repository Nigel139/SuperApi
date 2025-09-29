<template>
  <NuxtLayout name="default">
    <section class="swiper-container" :class="{ 'vh-100': (!isMobile) }">
      <swiper-container :loop="true" class="mySwiper" ref="swiperRef"
        :pagination="{ el: '.swiper-pagination', clickable: true }">
        <swiper-slide v-for="(slide, index) in slides" :key="index">
          <img :src="slide.image" class="d-block w-100" />
        </swiper-slide>
      </swiper-container>
      <div class="swiper-pagination"></div>
      <div class="swiper-button-prev" @click="swiper.prev()"></div>
      <div class="swiper-button-next" @click="swiper.next()"></div>
      <a href="#data" class="text-white">
        <i class="icon-angle-down infinite animated fadeInDown"></i>
      </a>
    </section>

    <section id="data" class="container" style="scroll-margin-top: 50px;">
      <div id="dataSec" class="row" ref="dataSec">
        <div class="col-6 col-md-3 text-center">
          <div>
            <div class="counter">
              <CountTo :startVal="2" :endVal="19" :duration="2000" v-if="isDataShow" />
              &nbsp;年
            </div>
            <h5>成立于2006年</h5>
          </div>
        </div>

        <div class="col-6 col-md-3 text-center">
          <div>
            <div class="counter">
              <CountTo :startVal="100" :endVal="130000" :duration="2000" v-if="isDataShow" />
              &nbsp;㎡
            </div>
            <h5>130000 ㎡的工厂</h5>
          </div>
        </div>

        <div class="col-6 col-md-3 text-center">
          <div>
            <div class="counter">
              <CountTo :startVal="15" :endVal="50" :duration="2000" v-if="isDataShow" />
              &nbsp;+合作国家
            </div>
            <h5>销售至50多个国家</h5>
          </div>
        </div>
        <div class="col-6 col-md-3 text-center">
          <div>
            <div class="counter">
              <CountTo :startVal="10" :endVal="300" :duration="2000" v-if="isDataShow" />
              &nbsp;+专利
            </div>
            <h5>300多项专利</h5>
          </div>
        </div>
      </div>
    </section>

    <section id="prod">
      <div id="home-prod-sec" class="d-flex flex-md-row flex-column">
        <div class="col-md-4 col-12" style="cursor: pointer;">
          <div class="prod-container">
            <div class="prod-box flex-column hanchor" v-for="(item, index) in prods" :key="index"
              @mouseenter="prodChanged(index)" @mouseleave="prodOut">
              <span class="text-center img-box">
                <img :src="item.img1" alt="img" />
              </span>
              <h2>{{ item.title }}</h2>
              <div v-if="isMobile || prods[index].show" class="prod-details">{{ item.details }}</div>
              <div v-if="prods[index].show" class="triangle"></div>
            </div>
          </div>
        </div>
        <div class="col-md-8 col-12 p-0 h-100 hanchor" @mouseenter="prodChanged()" @mouseleave="prodOut">
          <div class="position-relative">
            <img :src="prods[prodIndex].img2" class="w-100" alt="img" />
            <div v-if="prods[prodIndex].show" class="prod-in-img hcontent d-flex">
              <a v-for="(sub, idx2) in prods[prodIndex].children" :key="idx2" :href="sub.link"
                class="flex-fill text-center">
                <img :src="sub.img" alt="img" data-size="113*60" />
                <h3>{{ sub.title }}</h3>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="application">
      <div class="title">
        <h2>应用案例</h2>
        <a href="#">查看更多 >></a>
      </div>
      <div class="content">
        <swiper-container class="mySwiper" ref="swiperRef2" :loop="true" :autoplay="3500" :slides-per-view="1"
          :space-between="20" :breakpoints="{
            768: { slidesPerView: 3 },
            1400: { slidesPerView: 5 }
          }">
          <swiper-slide v-for="(slide, index) in appSlides" :key="index">
            <img :src="slide.img" class="d-block w-100" />
            <div class="info d-flex align-items-center">
              <div>
                <span>{{ slide.title }}</span>
                <div>{{ slide.details }}</div>
              </div>
            </div>
          </swiper-slide>
        </swiper-container>
        <div class="swiper-button-prev app-content-btn" @click="swiper2.prev()"></div>
        <div class="swiper-button-next app-content-btn" @click="swiper2.next()"></div>
      </div>
    </section>

    <section id="about">
      <div class="title">
        <h2>关于我们</h2>
      </div>
      <div class="container d-md-flex">
        <div class="col-md-6 left position-relative">
          <swiper-container class="mySwiper" :loop="true" :autoplay="3500" :pagination="{ clickable: true }">
            <swiper-slide v-for="(slide, index) in aboutSlides" :key="index">
              <img :src="slide" class="d-block w-100" />
            </swiper-slide>
          </swiper-container>
        </div>
        <div class="col-md-6 right">
          <div>
            思坎普科技有限公司成立于2006年， 致力于智能照明普通照明灯具的研发及生产，是具有ISO9001质量管理体系、ISO14001环境管理体系、SRG体系认证的国家级高新技术企业。
          </div>
          <ul>
            <li v-for="(info, index) in aboutInfo" :key="index">
              <a :href="info.link" class="d-flex align-items-center">
                <span class="inlineblock"><img :src="info.img" alt="img" /></span>
                <h3 class="text">{{ info.title }}</h3>
                <p class="text">查看更多 >></p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section id="oem">
      <img src="/images/oem_01.jpg" alt="img" class="w-100 h-100" />
      <div class="text-center">
        <h2 class="title">OEM / ODM服务</h2>
        <div class="desc">
          我们每月定制4-5款产品，无论您是做工程还是电子商务，我们都可以根据您的要求和创意设计生产出来。
        </div>
        <a class="start" href="/contact">联系我们</a>
      </div>
    </section>
  </NuxtLayout>
</template>

<script setup>
import { reactive, ref, onMounted, onUnmounted } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules';
import { useSwiper } from '#imports'
import { CountTo } from 'vue3-count-to';

// 引入必要的样式
import 'swiper/css';
import 'swiper/css/navigation';
const swiperBasicRef = ref(null)
const modules = [Navigation];

import { useDevice } from '#imports'
const { isMobile } = useDevice()

const swiperRef = ref(null)
const swiper = useSwiper(swiperRef)

const dataSec = ref(null);
const isDataShow = ref(false)

const slides = reactive([
  {
    image: '/images/banner/6778d73179890.jpg',
  },
  {
    image: '/images/banner/6778efa8ebb1a.jpg',
  },
  {
    image: '/images/banner/6778ff598a0f9.jpg',
  },
]);
const prods = reactive([
  {
    img1: '/images/light1.png',
    title: '氛围灯具',
    details: '氛围灯是一种用于营造特定环境氛围的照明灯具，可以创造出温馨、浪漫、神秘或者任何你想要的氛围，还可以选择与其他智能设备联动的氛围灯，以实现更加个性化的家居体验。',
    img2: '/images/index/677b4491710de.jpg',
    show: false,
    children: [
      {
        title: '落地灯',
        img: '/images/light4.png',
        link: '#',
      },
      {
        title: '电视灯带',
        img: '/images/light6.png',
        link: '#',
      },
      {
        title: '灯串',
        img: '/images/light7.png',
        link: '#',
      },
    ]
  },
  {
    img1: '/images/light3.png',
    title: '护眼灯具',
    details: '护眼灯具是指通过科学设计的照明系统，旨在提供对人体健康有益的光环境。它不仅考虑了视觉舒适度，还关注光照对长期健康的影响，既能保护视力又能增强整体幸福感的生活空间。',
    img2: '/Images/index/677b474de3135.jpg',
    show: false,
    children: [
      {
        title: '大路灯',
        img: '/images/light5.png',
        link: '#',
      }
    ]
  },
]);
const prodIndex = ref(0)
const prodChanged = (index) => {
  if (index == undefined) index = prodIndex.value;
  prodIndex.value = index;
  prods[index].show = true;
}
const prodOut = () => {
  prods[prodIndex.value].show = false;
}
const swiperRef2 = ref(null)
const swiper2 = useSwiper(swiperRef2)
const appSlides = reactive([
  {
    img: '/images/index/6209b4e73f883.jpg',
    title: '办公场所',
    details: '思坎普的LED灯具节能，可以帮助您节省成本，从而为您创造一个环保的办公室。',
    link: '#',
  },
  {
    img: '/images/index/6209b61ef2029.jpg',
    title: '工业',
    details: '思坎普工业照明系列可满足车间、仓库、网球场、超市、工厂等场所的照明要求。',
    link: '#',
  },
  {
    img: '/images/index/6209b70fed2d1.jpg',
    title: '零售业',
    details: '正确使用灯光可以增强顾客的购物体验，使商店更具吸引力，员工更满意。',
    link: '#',
  },
  {
    img: '/images/index/6209b98653662.jpg',
    title: '酒店业',
    details: '灯光在酒店设计中扮演着重要的角色，酒店设计师可以利用灯光为顾客创造独特而难忘的体验。',
    link: '#',
  },
  {
    img: '/images/index/6209ba8dd8d8a.jpg',
    title: '文化艺术',
    details: '更好地展示艺术品的色彩，突出其鲜明的特点，创造视觉对比效果，从而激发参观者的感受，吸引更多的参观者。',
    link: '#',
  },
  {
    img: '/images/index/6209bb85d4ce3.jpg',
    title: '医疗保健',
    details: '照明在医疗行业具有重要意义，可以改善患者体验和护理人员的工作满意度。',
    link: '#',
  },
  {
    img: '/images/index/6209bc2208df5.jpg',
    title: '家居',
    details: '思坎普的家居照明灯具种类繁多，为所有室内外空间提供了大量选择。',
    link: '#',
  },
  {
    img: '/images/index/6209bcbdd6e70.jpg',
    title: '建筑',
    details: '智能照明系统可以提供理想的照明效果，美丽的照明会让市民感到安全和快乐。',
    link: '#',
  },
  {
    img: '/images/index/6209c5e3cc150.jpg',
    title: '超市',
    details: '随着数字化越来越普遍，超市必须探索一种全新的模式来吸引顾客，改善店内体验。',
    link: '#',
  },
  {
    img: '/images/index/6209c68db9e7b.jpg',
    title: '景观',
    details: '通过独特的视觉体验吸引市民和游客，塑造独特的城市形象，促进旅游业发展。',
    link: '#',
  },
]);

const aboutSlides = reactive([
  '/images/index/6221aa8de8c0a.jpg',
  '/images/index/6221aa9697674.jpg',
  '/images/index/6221aa9a9f6e3.jpg',
]);
const aboutInfo = reactive([
  { img: '/images/about/61ef8c8c5e458.png', title: '公司简介', link: '#' },
  { img: '/images/about/61ef730d6d505.png', title: '企业资质', link: '#' },
  { img: '/images/about/61ef8edd9a455.png', title: '公司新闻', link: '#' },
]);

let observer;
onMounted(() => {
  window.addEventListener('resize', updateAppSwiper);
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        isDataShow.value = true;
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1 // 当至少10%的元素可见时触发
  });
  if (dataSec.value.getBoundingClientRect().top < window.innerHeight - 10) {
    isDataShow.value = true;
  } else {
    observer.observe(dataSec.value);
  }
});
onUnmounted(() => {
  window.removeEventListener('resize', updateAppSwiper);
});
function updateAppSwiper() {
  let swiper = swiperRef2.value?.swiper
  if (!swiper) return;

  let w = window.innerWidth
  let cnt = 1
  if (w < 768) cnt = 1;
  else if (w >= 768 && w < 1400) cnt = 3;
  else cnt = 5;

  swiper.params.slidesPerView = cnt
  swiper.update()
  swiper.updateSlides()  // 强制重新计算 slide 数量和宽度
}
</script>

<style scoped>
.swiper-container {
  position: relative;
  width: 100%;
  height: auto;
  overflow: hidden;
  top: -104px;
  margin-bottom: -104px;
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

@media (max-width: 767px) {
  .swiper-container {
    top: 0;
    margin-bottom: 0;
  }

  .swiper-button-prev,
  .swiper-button-next {
    display: none;
  }
}

/* data sectiong */
#dataSec>div {
  padding: 55px 20px;
}

#dataSec .counter {
  font-size: 17px;
  color: #444343;
  font-weight: 400;
}

#dataSec .counter span {
  font-size: 50px;
  color: #004e98;
  font-weight: 600;
}

#dataSec h5 {
  font-size: 17px;
  font-weight: 400;
  text-transform: none;
  color: #444343;
  line-height: 1;
  margin-bottom: 0;
  letter-spacing: 0px;
  margin-top: 10px;
}

@media (max-width: 767px) {
  #dataSec>div {
    padding: 12px 10px 12px 0;
  }

  .counter {
    font-size: 12px !important;
  }

  .counter span {
    font-size: 32px !important;
  }

  .counter+h5 {
    font-size: 16px !important;
    margin-top: 10px;
  }
}
</style>