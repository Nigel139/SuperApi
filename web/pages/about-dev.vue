<template>
  <NuxtLayout name="about-layout">
    <section id="about-dev">
      <div class="container d-flex flex-nowrap">
        <div class="left">
          <ul class="d-inline-block">
            <li v-for="(item, index) in slides1" :key="index" @click="index1 = index"
              :class="{ 'active': (index == index1) }">{{ item.title }} </li>
          </ul>
        </div>
        <div class="right position-relative">
          <div class="">
            <swiper-container class="mySwiper" ref="swiperRef" :init="false">
              <swiper-slide v-for="(group, index) in curGroup" :key="index">
                <div class="d-flex flex-wrap justify-content-evenly">
                  <div class="portfolio" v-for="(g,idx2) in group" :key="idx2">
                    <a href="#" @click.prevent="showImg(index, idx2)">
                      <img :src="g" alt="img" />
                    </a>
                  </div>
                </div>                
              </swiper-slide>
            </swiper-container>
          </div>
          <VueEasyLightbox :visible="isShowImg" :imgs="imgSrc" @hide="handleHide"></VueEasyLightbox>
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>

<script setup>
const index1 = ref(0)
const slides1 = reactive([
  {
    title: 'LED 灯条',
    imgs: [
      'http://signcomplex.com.cn/Uploads/2022-01-26/61f0a69632b35.jpg',
      'http://signcomplex.com.cn/Uploads/2022-01-26/61f0a6963a81b.jpg',
      'http://signcomplex.com.cn/Uploads/2022-01-26/61f0a7b9389d2.jpg',
      'http://signcomplex.com.cn/Uploads/2022-01-26/61f0a7b93d0a8.jpg',
      'http://signcomplex.com.cn/Uploads/2022-01-26/61f0b1d98a573.jpg',
      'http://signcomplex.com.cn/Uploads/2022-01-26/61f0b1d98ea4a.jpg',
      'http://signcomplex.com.cn/Uploads/2022-01-26/61f0b1d9935d0.jpg',
      'http://signcomplex.com.cn/Uploads/2022-01-26/61f0b8f011a82.jpg',
    ]
  },
  {
    title: '工业照明',
    imgs: [
      'http://signcomplex.com.cn/Uploads/2022-01-26/61f0badf55b63.jpg',
      'http://signcomplex.com.cn/Uploads/2022-01-26/61f0badf5a35b.jpg',
      'http://signcomplex.com.cn/Uploads/2022-01-26/61f0bebcda25c.jpg',
      'http://signcomplex.com.cn/Uploads/2022-01-26/61f0bebcde788.jpg',
    ]
  },
  {
    title: '商业照明',
    imgs: [
      'http://signcomplex.com.cn/Uploads/2022-01-26/61f0c02dd05ab.jpg',
      'http://signcomplex.com.cn/Uploads/2022-01-26/61f0c02dd4338.jpg',
      'http://signcomplex.com.cn/Uploads/2022-01-26/61f0c02dd869c.jpg',
      'http://signcomplex.com.cn/Uploads/2022-01-26/61f0c15d0fd97.jpg',
    ]
  },
  {
    title: '智能照明',
    imgs: [
      'http://signcomplex.com.cn/Uploads/2022-01-26/61f0c6ec6bd88.jpg',
      'http://signcomplex.com.cn/Uploads/2022-01-26/61f0c6ec5f688.jpg',
      'http://signcomplex.com.cn/Uploads/2022-01-26/61f0c6ec63d55.jpg',
      'http://signcomplex.com.cn/Uploads/2022-01-26/61f0c6ec67db9.jpg',
    ]
  },
  {
    title: '实验室&测试',
    imgs: [
      'http://signcomplex.com.cn/Uploads/2022-01-26/61f0e17ea39cf.jpg',
      'http://signcomplex.com.cn/Uploads/2022-01-26/61f0e17eb4914.jpg',
      'http://signcomplex.com.cn/Uploads/2022-01-26/61f0e17ebcb38.jpg',
      'http://signcomplex.com.cn/Uploads/2022-01-26/61f0e17eb8be8.jpg',
      'http://signcomplex.com.cn/Uploads/2022-01-26/61f0e5281157f.jpg',
      'http://signcomplex.com.cn/Uploads/2022-01-26/61f0e52815c5c.jpg',
      'http://signcomplex.com.cn/Uploads/2022-01-26/61f0e5281a139.jpg',
      'http://signcomplex.com.cn/Uploads/2022-01-26/61f0e5281e961.jpg',
    ]
  },
]);

const swiperRef = ref(null)
useSwiper(swiperRef, {
  loop: true,
});
const curGroup = computed(()=>{
  let g = [];
  let size = 4;
  for (let i = 0; i < slides1[index1.value].imgs.length; i += size) {
    g.push(slides1[index1.value].imgs.slice(i, i + size));
  }
  if(g.length==1) g.push(g[0])
  return g;
})

const isShowImg = ref(false)
const imgSrc = ref('#')
function showImg(idx1, idx2) {
  isShowImg.value = true;
  imgSrc.value = curGroup.value[idx1][idx2]
}
const handleHide = () => {
  isShowImg.value = false;
}
</script>

<style scoped>
#about-dev {
  padding: 15px 0;
  background-color: #eff1f6;
}

#about-dev .left {
  width: 31%;
  min-width: 31%;
  margin-right: 15px;
  background: #1d2733;
  padding: 100px 60px 50px 80px;
}

#about-dev .left ul li {
  font-size: 18px;
  color: #fff;
  padding-bottom: 10px;
  cursor: pointer;
  position: relative;
}

#about-dev .left ul li~li {
  margin-top: 50px;
}

#about-dev .left ul li::after {
  content: '';
  left: 0;
  bottom: 0;
  width: 0%;
  height: 3px;
  transition: .3s;
  position: absolute;
}

#about-dev .left ul li:hover::after,
#about-dev .left ul li.active::after {
  background-color: #004e98;
  width: 100%;
}

#about-dev .left ul li.active {
  color: #004e98;
}

#about-dev .right {
  width: 69%;
  background: #1d2733;
  padding-top: 26px;
  padding-bottom: 26px;
  cursor: pointer;
}
#about-dev .right .portfolio {
  width: 45%;  
  overflow: hidden;
}
#about-dev .right .portfolio:nth-child(1n+3) {
    margin-top: 26px;
}
#about-dev .right .portfolio img {
  transition: transform 0.5s ease, box-shadow 0.5s ease;
  transform-origin: 50% 50%;
}
#about-dev .right .portfolio img:hover {
  transform: scale(1.1); /* 放大图片 */
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3); /* 添加阴影效果，增强立体感 */
}
@media (max-width: 767px) {
  #about-dev .container {
    display: block !important;
  }
 #about-dev .left {
    margin-right: 0;
    padding: 0 10px;
    width: 100%;
    margin-bottom: 10px;
  }
  #about-dev .left ul {
    width: 100%;
    padding: 20px 0;
    display: flex !important;
    flex-wrap: wrap;
  }
  #about-dev .left ul li {
    width: 40%;
    font-size: 14px;
    padding-bottom: 8px;
    margin: 12px;
  }
  #about-dev .left ul li~li {
    margin-top: auto;
  }
  #about-dev .right {
    padding-top: 14px;
    padding-bottom: 14px;
    max-width: 100%;
    min-width: 100%;
  }
  #about-dev .right .portfolio:nth-child(1n+3) {
    margin-top: 14px;
  }
}
</style>
