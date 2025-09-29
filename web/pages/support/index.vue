<template>
    <NuxtLayout name="default">
        <section class="banner position-relative">
            <img src="/images/banner/61d6b57cbb4da.jpg" alt="img" class="w-100" />
            <!-- <div class="search position-absolute top-50 start-50 translate-middle d-flex">
                <button class="icon-line-search bg-transparent border-0" @click="$router.push('/search')"></button>
                <input type="text" name="keyword" placeholder="您需要哪些帮助呢？" class="bg-transparent border-0 flex-fill" @keyup.enter="$router.push('/search')">
            </div> -->
        </section>

        <section id="supp-menu" :class="{ 'fixed': (fixedMenu) }">
            <div class="container">
                <nav class="w-100">
                    <ul class="d-flex item-aligns-center flex-wrap">
                        <li v-for="(supp, index) in suppMenu" :key="index">
                            <a href="#" :class="{ active: (suppIdx == index) }" @click.prevent="suppIdx = index">
                                {{ supp }}
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </section>

        <section id="supp-content" v-if="suppIdx == 0">
            <div class="container">
                <div class="bg-white summary1" v-html="supportData.agreement?.content??''">
                </div>
                <div class="summary2">
                    <h2>产品保修</h2>
                    <div class="bg-white">
                        <div class="spec row border-bottom" v-for="g in qualityGroup">
                            <template v-for="q in g" :key="q.id">
                                <div class="col-3 text-center">{{q.prod}}</div>
                                <div class="col-3 text-center">{{ q.val }} {{q.unit}}</div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section id="supp-content" v-else>
            <div class="container">
                <div class="fqa-box row">
                    <div class="col-12 col-sm-6" v-for="(qa, index) in supportData.qas" :key="index">
                        <div class="fqa bg-white">
                            <div class="q" @click="qa.open=!qa.open">
                                <i :class="[qa.open?'icon-angle-down':'icon-angle-right']"></i>
                                <span>{{ qa.question }}</span>
                            </div>
                            <div class="a" :class="{'d-none':(!qa.open)}">{{ qa.answer }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </NuxtLayout>
</template>

<script setup>
const route = useRoute()

import { useDevice } from '#imports'
const { isMobile } = useDevice()

const suppMenu = reactive(['产品质保','常见问答'])

const suppIdx = ref(0)
if(route.query.type) suppIdx.value=route.query.type;

const fixedMenu = ref(false)
const handleScroll = () => {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    if (isMobile) fixedMenu.value = scrollPosition > 145;
    else fixedMenu.value = scrollPosition > 448;
}

const qualityGroup = computed(() => {
  const size = 2
  const arr = []
  let data = supportData.value.quality;
  for (let i = 0; i < data?.length; i += size) {
    arr.push(data.slice(i, i + size))
  }
  return arr
})

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
})
// 清理
onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
})

const key = 'support_data'
const supportData = ref({})
const getSpportData = async () => {
    const res = await allSupportInfo();
    if (res.code === '0') {
        supportData.value.qas = res.qas;
        supportData.value.quality = res.quality;
        supportData.value.agreement = res.agreement;
        let json = JSON.stringify(supportData.value);
        sessionStorage.setItem(key, json);
    }
}
if (import.meta.client) {
    let data = sessionStorage.getItem(key);
    if (data) {
        supportData.value = JSON.parse(data);
    } else {
        getSpportData();
    }
}
</script>

<style scoped>
.banner .search {
    background-color: #ffffff;
    border-radius: 39px;
    max-width: 540px;
}

.banner .search button {
    font-size: 24px;
    padding: 0 30px;
}

.banner .search input {
    font-size: 24px;
    padding: 20px 30px 20px 0;
    min-width: 350px;
}

#supp-menu {
    top: 100px;
    background-color: #fff !important;
    border-bottom: 1px solid #eff1f6;
}

#supp-menu.fixed {
    position: fixed;
    top: 100px;
    left: 0;
    width: 100%;
    z-index: 99;
}

#supp-menu nav>ul {
    margin-bottom: 0;
}

#supp-menu nav li a {
    display: block;
    color: #999999;
    font-size: 16px;
    height: auto;
    line-height: 1.5;
    padding: 20px 15px 12px;
    margin: 0 !important;
}

#supp-menu nav li .active {
    color: #004e98;
    border-bottom: 5px solid #004e98;
}

#supp-content {
    padding: 1px;
    background-color: #eff1f6;
}

#supp-content .summary1 {
    padding: 70px;
    margin: 40px 0;
}

#supp-content .summary2 {
    margin-bottom: 40px;
}

#supp-content .summary2 h2 {
    font-size: 18px;
    color: #111;
    margin-bottom: 20px;
}

#supp-content .summary2>div {
    padding: 20px 100px;
}

#supp-content .summary2 .spec {
    padding: 20px 0;
    color: #111;
    font-size: 16px;
    cursor: pointer;
}
#supp-content {
    padding: 1px;
    background-color: #eff1f6;
}
#supp-content .fqa-box {
    margin: 35px -30px 0;
}
#supp-content .fqa-box > div {
    padding: 0 30px;
}
#supp-content .fqa-box .fqa {
    margin-bottom: 30px;
}
#supp-content .fqa-box .fqa .q {
    color: #111;
    font-weight: 400;
    line-height: 66px;
    padding: 0 10px 0 70px;
    font-size: 16px;
    border-radius: 2px;
    cursor: pointer;
    position: relative
}
#supp-content .fqa-box .fqa .q>i {
    line-height: 66px;
    font-size: 18px;
    left: 25px;
    top: 0;
    position: absolute;
}
#supp-content .fqa-box .fqa .a {
    color: #555;
    padding: 0 30px 30px 70px;
    font-size: 14px;
    text-align: justify;
}
@media (max-width: 767px) {
    .banner .search {
        width: 100%;
        padding: 0 15px;
    }

    .banner .search button {
        font-size: 14px;
        padding: 0 15px;
    }

    .banner .search input {
        min-width: 1px;
        font-size: 14px;
        padding: 5px 10px 5px 0;
    }

    #supp-content .summary1 {
        padding: 30px 10px;
        margin: 20px 0;
    }

    #supp-content .summary2>div {
        padding: 20px 10px;
    }

    #supp-content .summary2 .spec {
        padding: 10px 0;
        font-size: 12px;
    }
    #supp-content .fqa-box {
        margin: 40px 0;
    }
    #supp-content .fqa-box {
        margin: 40px 0;
    }
    #supp-content .fqa-box > div {
        padding: 0;
    }
    #supp-content .summary2 {
        margin-bottom: 20px;
    }
    
    #supp-content .fqa-box {
        margin: 20px 0;
    }
    #supp-content .fqa-box .fqa .q>i {
        line-height: 35px;
        font-size: 14px;
        left: 6px;
    }
    #supp-content .fqa-box .fqa .q {
        line-height: 35px;
        font-size: 14px;
        padding: 0 10px 0 30px;
    }
    #supp-content .fqa-box .fqa .a {
        padding: 0 10px 20px 30px;
        font-size: 14px;
    }
    #supp-content .fqa-box .fqa {
        margin-bottom: 20px;
    }
}
</style>